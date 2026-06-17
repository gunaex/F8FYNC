import type { AggregatedFortuneResult, FortuneQueryType, FortuneRequest, FortuneTarget, SupportedLocale } from "@/core/domain";
import type { AIInterpretationOutput } from "@/ai";
import type { BirthInputReadiness, CanonicalBirthInput, TimezoneSuggestion } from "@/core/profile";

export type UserType = "guest" | "member" | "admin";

export type Member = {
  id: string;
  email: string;
  displayName?: string;
  locale: SupportedLocale;
  timezone: string;
  status: "pending_verification" | "active" | "suspended" | "deleted";
  role: "member" | "admin";
  createdAt: string;
  updatedAt: string;
};

export type ManagedBirthProfile = {
  id: string;
  memberId: string;
  label: string;
  birthDate: string;
  birthTime?: string;
  birthLocation: string;
  birthTimezone: string;
  birthInput: CanonicalBirthInput;
  inputReadiness: BirthInputReadiness;
  timezoneSuggestion?: TimezoneSuggestion;
  genderForCalculation?: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionPlan = {
  id: string;
  code: "guest" | "free" | "premium" | string;
  nameKey: string;
  descriptionKey: string;
  status: "draft" | "active" | "inactive";
  billingType: "free" | "monthly" | "yearly" | "one_time";
  currency: "THB" | "USD" | "CNY";
  priceMinor: number;
  trialDays?: number;
  entitlementSetId: string;
  createdAt: string;
  updatedAt: string;
};

export type SubscriptionStatus = "none" | "trialing" | "active" | "past_due" | "canceled" | "expired";

export type MemberSubscription = {
  id: string;
  memberId: string;
  planId: string;
  status: SubscriptionStatus;
  provider: string;
  source?: "mock_payment" | "coupon" | "manual";
  couponCode?: string;
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FeatureKey =
  | "daily_insight"
  | "full_timeline"
  | "compatibility_analysis"
  | "multi_system_comparison"
  | "ai_interpretation"
  | "analysis_history"
  | "saved_profiles"
  | "premium_plugins"
  | "export_report"
  | "priority_processing";

export type ResultRevealLevel = "preview" | "partial" | "full";

export type PremiumRevealSection = {
  id: "domain_scores" | "full_timeline" | "plugin_evidence" | "premium_methods" | "ai_interpretation";
  titleKey: string;
  descriptionKey: string;
  requiredFeatureKey: FeatureKey;
  locked: boolean;
};

export type PremiumRevealMetadata = {
  level: ResultRevealLevel;
  planCode: string;
  lockedSections: PremiumRevealSection[];
};

export type FeatureEntitlement = {
  featureKey: FeatureKey;
  enabled: boolean;
  limitType: "none" | "per_day" | "per_month" | "total" | "concurrent";
  limitValue?: number;
  retentionDays?: number;
  allowedPluginIds?: string[];
};

export type ResolvedEntitlements = {
  userType: UserType;
  planCode: string;
  features: Record<FeatureKey, FeatureEntitlement>;
};

export type EntitlementDecision = {
  allowed: boolean;
  featureKey: FeatureKey;
  reasonCode?: "FEATURE_DISABLED" | "QUOTA_EXCEEDED" | "PLAN_REQUIRED";
  entitlement?: FeatureEntitlement;
  remaining?: number;
};

export type UsageEvent = {
  id: string;
  memberId?: string;
  guestId?: string;
  featureKey: FeatureKey;
  pluginId?: string;
  quantity: number;
  periodKey: string;
  requestId: string;
  createdAt: string;
};

export type UsageConsumptionResult = {
  consumed: boolean;
  remaining?: number;
  reasonCode?: "FEATURE_DISABLED" | "QUOTA_EXCEEDED";
};

export type ConsentRecord = {
  id: string;
  memberId?: string;
  consentType: "terms" | "privacy" | "birth_profile_storage" | "analytics";
  version: string;
  granted: boolean;
  grantedAt: string;
  revokedAt?: string;
};

export type AnalysisHistoryRecord = {
  id: string;
  memberId: string;
  birthProfileId?: string;
  queryType: FortuneQueryType;
  target?: FortuneTarget;
  requestSnapshot: FortuneRequest;
  resultSnapshot: AggregatedFortuneResult;
  interpretationSnapshot?: AIInterpretationOutput;
  pluginVersions: Array<{
    pluginId: string;
    pluginVersion: string;
    calculationVersion: string;
  }>;
  createdAt: string;
};

export type PaymentEvent = {
  id: string;
  provider: string;
  type: string;
  memberId?: string;
  subscriptionId?: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

export type CouponType = "free_trial";

export type CouponDefinition = {
  code: "FREE_1_WEEK" | "FREE_1_MONTH";
  type: CouponType;
  planCode: "premium";
  durationDays: number;
  maxRedemptionsPerAccount: number;
  recurringBilling: false;
  active: boolean;
};

export type CouponRedemption = {
  id: string;
  memberId: string;
  couponCode: CouponDefinition["code"];
  couponType: CouponType;
  subscriptionId: string;
  idempotencyKey: string;
  redeemedAt: string;
};

export type CouponRedemptionResult = {
  redeemed: boolean;
  couponCode: CouponDefinition["code"];
  subscription: MemberSubscription;
  expiresAt: string;
  reusedIdempotencyResult?: boolean;
};

export type AuthSession = {
  memberId?: string;
  guestId: string;
  userType: UserType;
};

export interface EntitlementService {
  getMemberEntitlements(memberId?: string): Promise<ResolvedEntitlements>;
  canUseFeature(memberId: string | undefined, featureKey: FeatureKey): Promise<EntitlementDecision>;
  consumeUsage(memberId: string | undefined, featureKey: FeatureKey, amount?: number, requestId?: string): Promise<UsageConsumptionResult>;
}
