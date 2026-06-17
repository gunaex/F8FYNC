import { z } from "zod";

export const featureKeySchema = z.enum([
  "daily_insight",
  "full_timeline",
  "compatibility_analysis",
  "multi_system_comparison",
  "ai_interpretation",
  "analysis_history",
  "saved_profiles",
  "premium_plugins",
  "export_report",
  "priority_processing"
]);

export const memberSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().max(120).optional(),
  locale: z.enum(["th", "en", "zh-CN"]),
  timezone: z.string(),
  status: z.enum(["pending_verification", "active", "suspended", "deleted"]),
  role: z.enum(["member", "admin"]),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const managedBirthProfileSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  label: z.string().min(1).max(80),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/).optional().or(z.literal("")),
  birthLocation: z.string().max(120),
  birthTimezone: z.string().max(80),
  birthInput: z.object({
    localDate: z.string(),
    localTime: z.string().nullable(),
    birthTimeStatus: z.enum(["KNOWN", "UNKNOWN", "APPROXIMATE", "DISPUTED"]),
    birthLocationText: z.string().nullable(),
    timezoneId: z.string().nullable(),
    timezoneConfirmationStatus: z.enum(["CONFIRMED", "SUGGESTED", "UNRESOLVED", "UNKNOWN"]),
    timeAdjustmentPolicy: z.enum(["LOCAL_CIVIL_TIME", "TRUE_SOLAR_TIME"]),
    timeAdjustmentPolicyVersion: z.string(),
    inputPrecision: z.enum(["DATE_ONLY", "MINUTE", "APPROXIMATE", "DISPUTED"]),
    inputSource: z.enum(["USER_ENTERED", "PROFILE", "LEGACY_IMPORT", "SYSTEM_ADAPTER"]),
    inputSchemaVersion: z.literal("birth-input.v1")
  }),
  inputReadiness: z.object({
    status: z.enum(["READY", "PARTIALLY_READY", "BLOCKED_MISSING_TIMEZONE", "BLOCKED_INVALID_INPUT", "BLOCKED_METHODOLOGY_NOT_APPROVED", "UNSUPPORTED_IN_V1"]),
    reasonCodes: z.array(z.string()),
    missingFields: z.array(z.string()),
    blocking: z.boolean(),
    structurallyValid: z.boolean(),
    timezoneConfirmed: z.boolean(),
    timeSpecificCalculationAvailable: z.boolean(),
    unavailableOutputs: z.array(z.string())
  }),
  genderForCalculation: z.string().max(40).optional(),
  isPrimary: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const consentSchema = z.object({
  termsAccepted: z.boolean(),
  privacyAccepted: z.boolean(),
  birthProfileStorageAccepted: z.boolean().optional()
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(120),
  displayName: z.string().max(120).optional(),
  locale: z.enum(["th", "en", "zh-CN"]).default("th"),
  timezone: z.string().default("Asia/Bangkok"),
  consent: consentSchema
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(120)
});

export const birthProfileInputSchema = z.object({
  label: z.string().min(1).max(80),
  birthDate: z.string().optional(),
  birthTime: z.string().optional().or(z.literal("")),
  birthLocation: z.string().max(120).optional().or(z.literal("")),
  birthTimezone: z.string().max(80).optional().or(z.literal("")),
  localDate: z.string().optional(),
  localTime: z.string().nullable().optional(),
  birthTimeStatus: z.enum(["KNOWN", "UNKNOWN", "APPROXIMATE", "DISPUTED"]).optional(),
  birthLocationText: z.string().max(120).nullable().optional(),
  timezoneId: z.string().max(80).nullable().optional(),
  timezoneConfirmationStatus: z.enum(["CONFIRMED", "SUGGESTED", "UNRESOLVED", "UNKNOWN"]).optional(),
  timeAdjustmentPolicy: z.enum(["LOCAL_CIVIL_TIME", "TRUE_SOLAR_TIME"]).optional(),
  timeAdjustmentPolicyVersion: z.string().optional(),
  inputPrecision: z.enum(["DATE_ONLY", "MINUTE", "APPROXIMATE", "DISPUTED"]).optional(),
  inputSource: z.enum(["USER_ENTERED", "PROFILE", "LEGACY_IMPORT", "SYSTEM_ADAPTER"]).optional(),
  suggestedTimezoneId: z.string().max(80).nullable().optional(),
  timezoneSuggestionSource: z.enum(["device", "browser", "account"]).optional(),
  genderForCalculation: z.string().max(40).optional(),
  isPrimary: z.boolean().optional(),
  consentGranted: z.boolean()
});

export const couponRedeemSchema = z.object({
  code: z.string().min(3).max(40),
  idempotencyKey: z.string().min(8).max(120)
});
