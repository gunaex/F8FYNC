import { NextResponse } from "next/server";
import { runFortuneAnalysis } from "@/core";
import { canUseFeature, consumeUsage, queryTypeToFeature } from "@/core/commercial/entitlement-service";
import { filterFortuneResultForEntitlement } from "@/core/commercial/premium-reveal-service";
import { saveAnalysisHistory } from "@/core/commercial/history-service";
import { parseFortuneRequest } from "@/core/domain";
import { getAuthSession } from "@/core/member/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseFortuneRequest(body);
    const session = await getAuthSession();
    const usageSubject = session.memberId ?? `guest:${session.guestId}`;
    const featureKey = queryTypeToFeature(parsed.queryType);
    const decision = await canUseFeature(usageSubject, featureKey);
    if (!decision.allowed) {
      return NextResponse.json(
        { success: false, error: { code: decision.reasonCode ?? "FEATURE_NOT_ALLOWED", messageKey: "errors.entitlementDenied" } },
        { status: 403 }
      );
    }
    const data = await runFortuneAnalysis(parsed);
    const responseData = await filterFortuneResultForEntitlement(session.memberId, data);
    await saveAnalysisHistory(session.memberId, parsed, responseData);
    await consumeUsage(usageSubject, featureKey, 1, parsed.requestId);
    return NextResponse.json({ success: true, data: responseData });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_FORTUNE_REQUEST", messageKey: "common.error" } },
      { status: 400 }
    );
  }
}
