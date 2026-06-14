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
  birthLocation: z.string().min(2).max(120),
  birthTimezone: z.string().min(2).max(80),
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
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/).optional().or(z.literal("")),
  birthLocation: z.string().min(2).max(120),
  birthTimezone: z.string().min(2).max(80),
  genderForCalculation: z.string().max(40).optional(),
  isPrimary: z.boolean().optional(),
  consentGranted: z.boolean()
});

export const couponRedeemSchema = z.object({
  code: z.string().min(3).max(40),
  idempotencyKey: z.string().min(8).max(120)
});
