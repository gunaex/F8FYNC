import { entitlementMatrix, subscriptionPlans } from "./config";
import type { EntitlementDecision, FeatureKey, ResolvedEntitlements, UsageConsumptionResult } from "./types";
import { createId, getMemoryStore, periodKey } from "@/core/repositories/memory-store";

export function queryTypeToFeature(queryType: string): FeatureKey {
  if (queryType === "compatibility") return "compatibility_analysis";
  if (queryType === "comparison") return "multi_system_comparison";
  if (queryType === "timing") return "full_timeline";
  return "daily_insight";
}

export async function getMemberPlanCode(memberId?: string) {
  if (!memberId || memberId.startsWith("guest:")) return "guest";
  const store = getMemoryStore();
  const active = store.subscriptions.find((subscription) => subscription.memberId === memberId && ["active", "trialing"].includes(subscription.status));
  if (!active) return "free";
  return subscriptionPlans.find((plan) => plan.id === active.planId)?.code ?? "free";
}

export async function getMemberEntitlements(memberId?: string): Promise<ResolvedEntitlements> {
  const planCode = await getMemberPlanCode(memberId);
  return {
    userType: memberId && !memberId.startsWith("guest:") ? "member" : "guest",
    planCode,
    features: entitlementMatrix[planCode] ?? entitlementMatrix.guest
  };
}

export async function canUseFeature(memberId: string | undefined, featureKey: FeatureKey): Promise<EntitlementDecision> {
  const resolved = await getMemberEntitlements(memberId);
  const entitlement = resolved.features[featureKey];
  if (!entitlement?.enabled) return { allowed: false, featureKey, reasonCode: "FEATURE_DISABLED", entitlement };
  if (entitlement.limitType !== "none" && entitlement.limitValue !== undefined) {
    const period = periodKey(entitlement.limitType);
    const used = getMemoryStore().usageEvents
      .filter((event) => {
        const key = memberId?.startsWith("guest:") ? event.guestId : event.memberId;
        return key === memberId && event.featureKey === featureKey && event.periodKey === period;
      })
      .reduce((sum, event) => sum + event.quantity, 0);
    const remaining = Math.max(0, entitlement.limitValue - used);
    if (remaining <= 0) return { allowed: false, featureKey, reasonCode: "QUOTA_EXCEEDED", entitlement, remaining };
    return { allowed: true, featureKey, entitlement, remaining };
  }
  return { allowed: true, featureKey, entitlement };
}

export async function consumeUsage(memberId: string | undefined, featureKey: FeatureKey, amount = 1, requestId = createId("request")): Promise<UsageConsumptionResult> {
  const decision = await canUseFeature(memberId, featureKey);
  if (!decision.allowed) return { consumed: false, remaining: decision.remaining, reasonCode: decision.reasonCode === "FEATURE_DISABLED" ? "FEATURE_DISABLED" : "QUOTA_EXCEEDED" };
  getMemoryStore().usageEvents.push({
    id: createId("usage"),
    memberId: memberId?.startsWith("guest:") ? undefined : memberId,
    guestId: memberId?.startsWith("guest:") ? memberId : undefined,
    featureKey,
    quantity: amount,
    periodKey: periodKey(decision.entitlement?.limitType ?? "none"),
    requestId,
    createdAt: new Date().toISOString()
  });
  return { consumed: true, remaining: decision.remaining === undefined ? undefined : Math.max(0, decision.remaining - amount) };
}

export async function getUsageSummary(memberId?: string) {
  const entitlements = await getMemberEntitlements(memberId);
  return Object.values(entitlements.features).map((entitlement) => {
    const period = periodKey(entitlement.limitType);
    const used = getMemoryStore().usageEvents
      .filter((event) => {
        const key = memberId?.startsWith("guest:") ? event.guestId : event.memberId;
        return key === memberId && event.featureKey === entitlement.featureKey && event.periodKey === period;
      })
      .reduce((sum, event) => sum + event.quantity, 0);
    return {
      featureKey: entitlement.featureKey,
      enabled: entitlement.enabled,
      limitType: entitlement.limitType,
      limitValue: entitlement.limitValue,
      used,
      remaining: entitlement.limitValue === undefined ? undefined : Math.max(0, entitlement.limitValue - used)
    };
  });
}
