import { beforeEach, describe, expect, it } from "vitest";
import { redeemCoupon } from "@/core/commercial";
import { getSubscription } from "@/core/commercial/subscription-service";

beforeEach(() => {
  globalThis.f8syncMemoryStore = undefined;
});

describe("coupon redemption", () => {
  it("redeems FREE_1_WEEK as non-recurring premium", async () => {
    const result = await redeemCoupon({ memberId: "member_coupon_1", code: "FREE_1_WEEK", idempotencyKey: "idem-week-1" });
    expect(result.couponCode).toBe("FREE_1_WEEK");
    expect(result.subscription.source).toBe("coupon");
    expect(result.subscription.cancelAtPeriodEnd).toBe(true);
    expect(result.subscription.provider).toBe("coupon");

    const current = await getSubscription("member_coupon_1");
    expect(current.plan.code).toBe("premium");
  });

  it("returns the same result for repeated idempotency key", async () => {
    const first = await redeemCoupon({ memberId: "member_coupon_2", code: "FREE_1_MONTH", idempotencyKey: "idem-month-1" });
    const second = await redeemCoupon({ memberId: "member_coupon_2", code: "FREE_1_MONTH", idempotencyKey: "idem-month-1" });
    expect(second.reusedIdempotencyResult).toBe(true);
    expect(second.subscription.id).toBe(first.subscription.id);
  });

  it("blocks all free coupons after one free coupon is used", async () => {
    await redeemCoupon({ memberId: "member_coupon_3", code: "FREE_1_WEEK", idempotencyKey: "idem-week-2" });
    await expect(
      redeemCoupon({ memberId: "member_coupon_3", code: "FREE_1_MONTH", idempotencyKey: "idem-month-2" })
    ).rejects.toThrow("COUPON_FREE_ALREADY_USED");
  });
});
