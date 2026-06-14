import { z } from "zod";
import { DEFAULT_LOCALE, SCORE_DOMAINS, SUPPORTED_LOCALES, type AgreementLevel, type FortuneRequest, type PluginResult, type ScoreDomain } from "./types";

export const supportedLocaleSchema = z.enum(SUPPORTED_LOCALES as ["th", "en", "zh-CN"]).catch(DEFAULT_LOCALE);
export const queryTypeSchema = z.enum(["daily", "timing", "compatibility", "comparison"]);
export const targetTypeSchema = z.enum([
  "general",
  "phone_number",
  "vehicle_plate",
  "house_number",
  "room_number",
  "name",
  "event_datetime"
]);
export const scoreDomainSchema = z.enum(SCORE_DOMAINS as [typeof SCORE_DOMAINS[number], ...typeof SCORE_DOMAINS[number][]]);
export const timingWindowTypeSchema = z.enum(["optimal", "supportive", "neutral", "caution", "avoid"]);

const cleanString = (max = 160, min = 0) => z.string().trim().min(min).max(max).transform((value) => value.replace(/[<>]/g, ""));
const scoreShape = Object.fromEntries(SCORE_DOMAINS.map((domain) => [domain, z.number().min(0).max(100)])) as Record<ScoreDomain, z.ZodNumber>;
const agreementShape = Object.fromEntries(
  SCORE_DOMAINS.map((domain) => [domain, z.enum(["high", "medium", "low", "insufficient_data"])])
) as Record<ScoreDomain, z.ZodEnum<[AgreementLevel, AgreementLevel, AgreementLevel, AgreementLevel]>>;
const scoresSchema = z.object(scoreShape).partial();
const agreementByDomainSchema = z.object(agreementShape).partial();

export const fortuneRequestSchema = z.object({
  requestId: z.string().min(6).max(80),
  locale: supportedLocaleSchema,
  queryType: queryTypeSchema,
  birthProfile: z.object({
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    birthTime: z.string().regex(/^\d{2}:\d{2}$/).optional().or(z.literal("")),
    birthLocation: cleanString(120, 2),
    birthTimezone: cleanString(80, 2)
  }),
  contextTime: z.string().datetime({ offset: true }),
  contextTimezone: cleanString(80, 2),
  target: z
    .object({
      type: targetTypeSchema,
      value: cleanString(120),
      label: cleanString(80).optional()
    })
    .optional(),
  selectedPluginIds: z.array(z.string().max(80)).optional(),
  objective: cleanString(240).optional()
});

export const timingWindowSchema = z.object({
  id: z.string().min(1),
  start: z.string().datetime({ offset: true }),
  end: z.string().datetime({ offset: true }),
  type: timingWindowTypeSchema,
  strength: z.number().min(0).max(1),
  domainTags: z.array(scoreDomainSchema),
  reasonCodes: z.array(z.string()),
  sourcePluginIds: z.array(z.string())
});

export const pluginWarningSchema = z.object({
  code: z.string(),
  severity: z.enum(["info", "caution", "high"]),
  messageKey: z.string(),
  parameters: z.record(z.union([z.string(), z.number()])).optional()
});

export const pluginResultSchema = z.object({
  pluginId: z.string(),
  pluginVersion: z.string(),
  calculationVersion: z.string(),
  status: z.enum(["success", "partial", "failed"]),
  scores: scoresSchema,
  timingWindows: z.array(timingWindowSchema),
  warnings: z.array(pluginWarningSchema),
  confidence: z.number().min(0).max(1),
  evidence: z.array(
    z.object({
      code: z.string(),
      value: z.union([z.string(), z.number()]).optional(),
      descriptionKey: z.string()
    })
  ),
  metadata: z.object({
    calculatedAt: z.string().datetime({ offset: true }),
    durationMs: z.number().optional(),
    inputHash: z.string().optional()
  }),
  error: z.object({ code: z.string(), retryable: z.boolean() }).optional()
});

export const aggregatedResultSchema = z.object({
  requestId: z.string(),
  overallScore: z.number().min(0).max(100),
  scores: scoresSchema,
  timing: z.object({
    currentStatus: timingWindowTypeSchema,
    currentWindow: timingWindowSchema.optional(),
    nextOptimalWindow: timingWindowSchema.optional(),
    cautionWindows: z.array(timingWindowSchema),
    allWindows: z.array(timingWindowSchema)
  }),
  agreement: z.object({
    overall: z.enum(["high", "medium", "low", "insufficient_data"]),
    byDomain: agreementByDomainSchema
  }),
  confidence: z.number().min(0).max(1),
  conflicts: z.array(z.object({ domain: scoreDomainSchema, pluginIds: z.array(z.string()), descriptionKey: z.string() })),
  recommendations: z.array(
    z.object({
      code: z.string(),
      priority: z.number(),
      messageKey: z.string(),
      parameters: z.record(z.union([z.string(), z.number()])).optional()
    })
  ),
  warnings: z.array(pluginWarningSchema),
  sources: z.array(z.object({ pluginId: z.string(), version: z.string(), status: z.enum(["success", "partial", "failed"]) })),
  pluginResults: z.array(pluginResultSchema),
  metadata: z.object({
    generatedAt: z.string().datetime({ offset: true }),
    locale: supportedLocaleSchema,
    contextTimezone: z.string()
  })
});

export type FortuneRequestInput = z.infer<typeof fortuneRequestSchema>;

export function parseFortuneRequest(input: unknown): FortuneRequest {
  return fortuneRequestSchema.parse(input) as FortuneRequest;
}

export function parsePluginResult(input: unknown): PluginResult {
  return pluginResultSchema.parse(input) as PluginResult;
}
