import { z } from "zod";

export const aiInterpretationOutputSchema = z.object({
  locale: z.enum(["th", "en", "zh-CN"]),
  headline: z.string().max(140),
  summary: z.string().max(1200),
  keyInsights: z.array(z.string().max(220)).max(5),
  recommendedActions: z.array(z.string().max(220)).max(5),
  cautionNotes: z.array(z.string().max(220)).max(5),
  conflictExplanation: z.string().max(500).optional(),
  disclaimer: z.string().max(400),
  providerId: z.string(),
  generatedAt: z.string().datetime({ offset: true })
});
