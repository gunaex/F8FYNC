import { couponDefinitions, subscriptionPlans } from "./config";
import type { CouponDefinition, CouponRedemptionResult, MemberSubscription } from "./types";
import { createId, getMemoryStore, withMemberLock } from "@/core/repositories/memory-store";

export function normalizeCouponCode(code: string) {
  return code.trim().toUpperCase().replace(/\s+/g, "_");
}

export function findCoupon(code: string): CouponDefinition | undefined {
  return couponDefinitions.find((coupon) => coupon.code === normalizeCouponCode(code) && coupon.active);
}

export async function validateCoupon(input: { code: string; memberId?: string }) {
  const coupon = findCoupon(input.code);
  if (!coupon) return { valid: false, reasonCode: "COUPON_INVALID" };
  const store = getMemoryStore();
  if (input.memberId) {
    const previousFreeCoupon = store.couponRedemptions.find((redemption) => redemption.memberId === input.memberId && redemption.couponType === "free_trial");
    if (previousFreeCoupon) return { valid: false, reasonCode: "COUPON_FREE_ALREADY_USED", coupon };
  }
  return { valid: true, reasonCode: "COUPON_AVAILABLE", coupon };
}

export async function getMemberCouponRedemptions(memberId: string) {
  return getMemoryStore().couponRedemptions.filter((redemption) => redemption.memberId === memberId);
}

function idempotencyStoreKey(memberId: string, idempotencyKey: string) {
  return `${memberId}:${idempotencyKey}`;
}

export async function redeemCoupon(input: {
  memberId?: string;
  code: string;
  idempotencyKey: string;
}): Promise<CouponRedemptionResult> {
  if (!input.memberId) throw new Error("LOGIN_REQUIRED");
  const memberId = input.memberId;
  if (!input.idempotencyKey || input.idempotencyKey.length < 8) throw new Error("IDEMPOTENCY_KEY_REQUIRED");
  const coupon = findCoupon(input.code);
  if (!coupon) throw new Error("COUPON_INVALID");

  return withMemberLock(memberId, async () => {
    const store = getMemoryStore();
    const idemKey = idempotencyStoreKey(memberId, input.idempotencyKey);
    const existingByIdem = store.couponIdempotency[idemKey];
    if (existingByIdem) {
      const subscription = store.subscriptions.find((item) => item.id === existingByIdem.subscriptionId);
      if (!subscription?.currentPeriodEnd) throw new Error("COUPON_IDEMPOTENCY_RESULT_MISSING");
      return {
        redeemed: true,
        couponCode: existingByIdem.couponCode,
        subscription,
        expiresAt: subscription.currentPeriodEnd,
        reusedIdempotencyResult: true
      };
    }

    const previousFreeCoupon = store.couponRedemptions.find(
      (redemption) => redemption.memberId === input.memberId && redemption.couponType === "free_trial"
    );
    if (previousFreeCoupon) throw new Error("COUPON_FREE_ALREADY_USED");

    const premiumPlan = subscriptionPlans.find((plan) => plan.code === coupon.planCode);
    if (!premiumPlan) throw new Error("COUPON_PLAN_NOT_FOUND");

    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + coupon.durationDays);

    for (const item of store.subscriptions.filter((subscription) => subscription.memberId === memberId)) {
      item.status = "canceled";
      item.cancelAtPeriodEnd = true;
      item.updatedAt = now.toISOString();
    }

    const subscription: MemberSubscription = {
      id: createId("subscription"),
      memberId,
      planId: premiumPlan.id,
      status: "trialing",
      provider: "coupon",
      source: "coupon",
      couponCode: coupon.code,
      providerSubscriptionId: createId("coupon_subscription"),
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: expiresAt.toISOString(),
      cancelAtPeriodEnd: true,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
    store.subscriptions.push(subscription);

    const redemption = {
      id: createId("coupon_redemption"),
      memberId,
      couponCode: coupon.code,
      couponType: coupon.type,
      subscriptionId: subscription.id,
      idempotencyKey: input.idempotencyKey,
      redeemedAt: now.toISOString()
    };
    store.couponRedemptions.push(redemption);
    store.couponIdempotency[idemKey] = redemption;

    return {
      redeemed: true,
      couponCode: coupon.code,
      subscription,
      expiresAt: expiresAt.toISOString()
    };
  });
}
