import { NextResponse } from "next/server";
import { interpretFortuneResult } from "@/ai";
import { canUseFeature, consumeUsage } from "@/core/commercial/entitlement-service";
import { aggregatedResultSchema, queryTypeSchema, supportedLocaleSchema } from "@/core/domain/schemas";
import type { AggregatedFortuneResult } from "@/core/domain";
import { getAuthSession } from "@/core/member/session";
import { getDictionary, t } from "@/i18n";
import {
  assertAiInputBudget,
  classifyIntent,
  enforceRetrievalBudget,
  getDeterministicFaqAnswer,
  localKnowledgeRetriever,
  writeIntentAudit
} from "@/ai/guardrails";
import type { AllowedIntent, IntentDecision } from "@/ai/guardrails";

function allowedIntent(decision: IntentDecision): AllowedIntent {
  if (!decision.allowed) throw new Error("INTENT_NOT_ALLOWED");
  return decision.intent as AllowedIntent;
}

function guardedOutput(input: { locale: "th" | "en" | "zh-CN"; summary: string; providerId: string }) {
  return {
    locale: input.locale,
    headline: input.summary,
    summary: input.summary,
    keyInsights: [],
    recommendedActions: [],
    cautionNotes: [],
    disclaimer: input.summary,
    providerId: input.providerId,
    generatedAt: new Date().toISOString()
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = {
      locale: supportedLocaleSchema.parse(body.locale),
      queryType: queryTypeSchema.parse(body.queryType),
      userObjective: typeof body.userObjective === "string" ? body.userObjective.slice(0, 240) : undefined,
      userMessage: typeof body.userMessage === "string" ? body.userMessage.slice(0, 1200) : undefined,
      aggregatedResult: aggregatedResultSchema.parse(body.aggregatedResult) as AggregatedFortuneResult
    };
    const session = await getAuthSession();
    const decision = classifyIntent({ message: input.userMessage, queryType: input.queryType, hasFortuneResult: true });
    if (!decision.allowed) {
      writeIntentAudit({
        requestId: input.aggregatedResult.requestId,
        memberId: session.memberId,
        decision,
        ragUsed: false,
        retrievedDocumentIds: [],
        providerId: "intent-guard",
        tokenEstimate: 0,
        cacheStatus: "not_applicable"
      });
      const dictionary = getDictionary(input.locale);
      return NextResponse.json({
        success: true,
        data: guardedOutput({ locale: input.locale, summary: t(dictionary, "offTopic.message"), providerId: "intent-guard" })
      });
    }

    const intent = allowedIntent(decision);
    const faqAnswer = getDeterministicFaqAnswer(input.locale, intent, input.userMessage ?? "");
    if (faqAnswer) {
      writeIntentAudit({
        requestId: input.aggregatedResult.requestId,
        memberId: session.memberId,
        decision,
        ragUsed: false,
        retrievedDocumentIds: [],
        providerId: "deterministic-faq",
        tokenEstimate: 0,
        cacheStatus: "hit"
      });
      return NextResponse.json({ success: true, data: guardedOutput({ locale: input.locale, summary: faqAnswer, providerId: "deterministic-faq" }) });
    }

    const usageSubject = session.memberId ?? `guest:${session.guestId}`;
    const entitlementDecision = await canUseFeature(usageSubject, "ai_interpretation");
    if (!entitlementDecision.allowed) {
      return NextResponse.json(
        { success: false, error: { code: entitlementDecision.reasonCode ?? "AI_NOT_ALLOWED", messageKey: "errors.entitlementDenied" } },
        { status: 403 }
      );
    }
    const retrieved = decision.requiresRag
      ? await localKnowledgeRetriever.retrieve({
          locale: input.locale,
          intent,
          query: input.userMessage ?? input.queryType,
          queryType: input.queryType
        })
      : [];
    const budget = enforceRetrievalBudget(retrieved);
    const tokenEstimate = assertAiInputBudget(JSON.stringify({ input, retrievedKnowledge: budget.chunks }));
    const data = await interpretFortuneResult({ ...input, retrievedKnowledge: budget.chunks });
    writeIntentAudit({
      requestId: input.aggregatedResult.requestId,
      memberId: session.memberId,
      decision,
      ragUsed: budget.chunks.length > 0,
      retrievedDocumentIds: budget.chunks.map((chunk) => chunk.documentId),
      providerId: data.providerId,
      tokenEstimate,
      cacheStatus: "miss"
    });
    await consumeUsage(usageSubject, "ai_interpretation", 1, input.aggregatedResult.requestId);
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_INTERPRETATION_REQUEST", messageKey: "common.error" } },
      { status: 400 }
    );
  }
}
