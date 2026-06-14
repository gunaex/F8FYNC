import type { FortuneQueryType } from "@/core/domain";
import { allowedKeywordRules, blockedKeywordRules, ragConfig } from "./config";
import type { IntentDecision } from "./types";

export function sanitizeUserMessage(message: string) {
  return message.replace(/[<>]/g, "").replace(/```[\s\S]*?```/g, "[code_block]").trim();
}

export function classifyIntent(input: { message?: string; queryType?: FortuneQueryType; hasFortuneResult?: boolean }): IntentDecision {
  const message = sanitizeUserMessage(input.message ?? "");
  if (!message && input.hasFortuneResult) {
    return { allowed: true, intent: "result_explanation", confidence: 0.98, reasonCode: "ALLOWED_RESULT_EXPLANATION", requiresRag: true, requiresFortuneResult: true };
  }
  if (!message) {
    return { allowed: false, intent: "other_off_topic", confidence: 1, reasonCode: "EMPTY_INPUT", requiresRag: false, requiresFortuneResult: false };
  }
  if (message.length > ragConfig.maxUserMessageLength) {
    return { allowed: false, intent: "other_off_topic", confidence: 1, reasonCode: "INPUT_TOO_LONG", requiresRag: false, requiresFortuneResult: false };
  }
  for (const rule of blockedKeywordRules) {
    if (rule.patterns.some((pattern) => pattern.test(message))) {
      return { allowed: false, intent: rule.intent, confidence: 0.92, reasonCode: rule.reasonCode, requiresRag: false, requiresFortuneResult: false };
    }
  }
  for (const rule of allowedKeywordRules) {
    if (rule.patterns.some((pattern) => pattern.test(message))) {
      return {
        allowed: true,
        intent: rule.intent,
        confidence: 0.88,
        reasonCode: rule.reasonCode,
        requiresRag: true,
        requiresFortuneResult: ["daily_fortune", "timing_advice", "compatibility", "multi_system_comparison", "result_explanation"].includes(rule.intent)
      };
    }
  }
  if (input.queryType && input.hasFortuneResult) {
    return { allowed: true, intent: "result_explanation", confidence: 0.82, reasonCode: "ALLOWED_RESULT_CONTEXT", requiresRag: true, requiresFortuneResult: true };
  }
  return { allowed: false, intent: "other_off_topic", confidence: 0.78, reasonCode: "NO_DOMAIN_MATCH", requiresRag: false, requiresFortuneResult: false };
}
