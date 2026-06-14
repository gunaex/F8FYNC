import { subscriptionPlans } from "./config";
import type { MemberSubscription } from "./types";
import { createId, getMemoryStore } from "@/core/repositories/memory-store";

export async function getSubscription(memberId?: string) {
  if (!memberId) return { plan: subscriptionPlans[0], subscription: undefined };
  const store = getMemoryStore();
  const now = new Date();
  for (const item of store.subscriptions.filter((subscription) => subscription.memberId === memberId && subscription.status !== "expired")) {
    if (item.currentPeriodEnd && new Date(item.currentPeriodEnd) <= now) {
      item.status = "expired";
      item.cancelAtPeriodEnd = true;
      item.updatedAt = now.toISOString();
    }
  }
  const subscription = store.subscriptions.find((item) => item.memberId === memberId && ["active", "trialing"].includes(item.status));
  const plan = subscriptionPlans.find((item) => item.id === subscription?.planId) ?? subscriptionPlans[1];
  return { plan, subscription };
}

export async function activateMockSubscription(memberId: string, planCode = "premium"): Promise<MemberSubscription> {
  const plan = subscriptionPlans.find((item) => item.code === planCode) ?? subscriptionPlans[2];
  const store = getMemoryStore();
  const now = new Date();
  for (const item of store.subscriptions.filter((subscription) => subscription.memberId === memberId)) {
    item.status = "canceled";
    item.cancelAtPeriodEnd = true;
    item.updatedAt = now.toISOString();
  }
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + 1);
  const subscription: MemberSubscription = {
    id: createId("subscription"),
    memberId,
    planId: plan.id,
    status: plan.billingType === "free" ? "active" : "trialing",
    provider: "mock",
    source: "mock_payment",
    providerCustomerId: createId("mock_customer"),
    providerSubscriptionId: createId("mock_subscription"),
    currentPeriodStart: now.toISOString(),
    currentPeriodEnd: periodEnd.toISOString(),
    cancelAtPeriodEnd: false,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
  store.subscriptions.push(subscription);
  return subscription;
}

export async function cancelMockSubscription(memberId: string) {
  const subscription = getMemoryStore().subscriptions.find((item) => item.memberId === memberId && ["active", "trialing"].includes(item.status));
  if (!subscription) throw new Error("SUBSCRIPTION_NOT_FOUND");
  subscription.status = "canceled";
  subscription.cancelAtPeriodEnd = true;
  subscription.updatedAt = new Date().toISOString();
  return subscription;
}
