import type { FeatureEntitlement, FeatureKey, SubscriptionPlan } from "./types";
import type { CouponDefinition } from "./types";

const now = "2026-06-14T00:00:00.000Z";

export const featureKeys: FeatureKey[] = [
  "daily_insight",
  "full_timeline",
  "compatibility_analysis",
  "multi_system_comparison",
  "ai_interpretation",
  "analysis_history",
  "saved_profiles",
  "premium_plugins",
  "export_report",
  "priority_processing",
  "forecast_6h"
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan_guest",
    code: "guest",
    nameKey: "pricing.plans.guest.name",
    descriptionKey: "pricing.plans.guest.description",
    status: "active",
    billingType: "free",
    currency: "THB",
    priceMinor: 0,
    entitlementSetId: "ent_guest",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "plan_free",
    code: "free",
    nameKey: "pricing.plans.free.name",
    descriptionKey: "pricing.plans.free.description",
    status: "active",
    billingType: "free",
    currency: "THB",
    priceMinor: 0,
    entitlementSetId: "ent_free",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "plan_premium",
    code: "premium",
    nameKey: "pricing.plans.premium.name",
    descriptionKey: "pricing.plans.premium.description",
    status: "active",
    billingType: "monthly",
    currency: "THB",
    priceMinor: 4900,
    trialDays: 7,
    entitlementSetId: "ent_premium",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "plan_premium_yearly",
    code: "premium_yearly",
    nameKey: "pricing.plans.premiumYearly.name",
    descriptionKey: "pricing.plans.premiumYearly.description",
    status: "active",
    billingType: "yearly",
    currency: "THB",
    priceMinor: 47000,
    entitlementSetId: "ent_premium",
    createdAt: now,
    updatedAt: now
  }
];

function entitlement(featureKey: FeatureKey, enabled: boolean, limitType: FeatureEntitlement["limitType"], limitValue?: number, retentionDays?: number): FeatureEntitlement {
  return { featureKey, enabled, limitType, limitValue, retentionDays };
}

export const entitlementMatrix: Record<string, Record<FeatureKey, FeatureEntitlement>> = {
  guest: {
    daily_insight: entitlement("daily_insight", true, "per_day", 3),
    full_timeline: entitlement("full_timeline", true, "per_day", 1),
    compatibility_analysis: entitlement("compatibility_analysis", true, "total", 1),
    multi_system_comparison: entitlement("multi_system_comparison", false, "none"),
    ai_interpretation: entitlement("ai_interpretation", true, "per_day", 1),
    analysis_history: entitlement("analysis_history", false, "none"),
    saved_profiles: entitlement("saved_profiles", false, "total", 0),
    premium_plugins: entitlement("premium_plugins", false, "none"),
    export_report: entitlement("export_report", false, "none"),
    priority_processing: entitlement("priority_processing", false, "none"),
    forecast_6h: entitlement("forecast_6h", false, "none")
  },
  free: {
    daily_insight: entitlement("daily_insight", true, "per_day", 10),
    full_timeline: entitlement("full_timeline", true, "per_day", 3),
    compatibility_analysis: entitlement("compatibility_analysis", true, "per_day", 3),
    multi_system_comparison: entitlement("multi_system_comparison", true, "per_day", 2),
    ai_interpretation: entitlement("ai_interpretation", true, "per_day", 3),
    analysis_history: entitlement("analysis_history", true, "none", undefined, 7),
    saved_profiles: entitlement("saved_profiles", true, "total", 1),
    premium_plugins: entitlement("premium_plugins", false, "none"),
    export_report: entitlement("export_report", false, "none"),
    priority_processing: entitlement("priority_processing", false, "none"),
    forecast_6h: entitlement("forecast_6h", false, "none")
  },
  premium: {
    daily_insight: entitlement("daily_insight", true, "per_day", 100),
    full_timeline: entitlement("full_timeline", true, "none"),
    compatibility_analysis: entitlement("compatibility_analysis", true, "per_day", 30),
    multi_system_comparison: entitlement("multi_system_comparison", true, "per_day", 30),
    ai_interpretation: entitlement("ai_interpretation", true, "per_day", 30),
    analysis_history: entitlement("analysis_history", true, "none", undefined, 365),
    saved_profiles: entitlement("saved_profiles", true, "total", 10),
    premium_plugins: entitlement("premium_plugins", true, "none"),
    export_report: entitlement("export_report", false, "none"),
    priority_processing: entitlement("priority_processing", true, "none"),
    forecast_6h: entitlement("forecast_6h", true, "none")
  },
  premium_yearly: {
    daily_insight: entitlement("daily_insight", true, "per_day", 100),
    full_timeline: entitlement("full_timeline", true, "none"),
    compatibility_analysis: entitlement("compatibility_analysis", true, "per_day", 30),
    multi_system_comparison: entitlement("multi_system_comparison", true, "per_day", 30),
    ai_interpretation: entitlement("ai_interpretation", true, "per_day", 30),
    analysis_history: entitlement("analysis_history", true, "none", undefined, 365),
    saved_profiles: entitlement("saved_profiles", true, "total", 10),
    premium_plugins: entitlement("premium_plugins", true, "none"),
    export_report: entitlement("export_report", false, "none"),
    priority_processing: entitlement("priority_processing", true, "none"),
    forecast_6h: entitlement("forecast_6h", true, "none")
  }
};

export const couponDefinitions: CouponDefinition[] = [
  {
    code: "FREE_1_WEEK",
    type: "free_trial",
    planCode: "premium",
    durationDays: 7,
    maxRedemptionsPerAccount: 1,
    recurringBilling: false,
    active: true
  },
  {
    code: "FREE_1_MONTH",
    type: "free_trial",
    planCode: "premium",
    durationDays: 30,
    maxRedemptionsPerAccount: 1,
    recurringBilling: false,
    active: true
  }
];
