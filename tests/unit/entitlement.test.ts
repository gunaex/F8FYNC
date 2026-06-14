import { describe, expect, it } from "vitest";
import { canUseFeature, getMemberEntitlements } from "@/core/commercial/entitlement-service";

describe("entitlement service", () => {
  it("resolves guest entitlements", async () => {
    const entitlements = await getMemberEntitlements(undefined);
    expect(entitlements.planCode).toBe("guest");
    expect(entitlements.features.daily_insight.enabled).toBe(true);
    expect(entitlements.features.multi_system_comparison.enabled).toBe(false);
  });

  it("denies guest premium comparison", async () => {
    const decision = await canUseFeature(undefined, "multi_system_comparison");
    expect(decision.allowed).toBe(false);
    expect(decision.reasonCode).toBe("FEATURE_DISABLED");
  });
});
