import { z } from "zod";
import { SUPPORTED_LOCALES } from "@/core/domain";
import type { FortunePluginManifest } from "./types";

export const pluginManifestSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  nameKey: z.string().min(1),
  descriptionKey: z.string().min(1),
  version: z.string().min(1),
  calculationVersion: z.string().min(1),
  capabilities: z.array(z.enum(["daily", "timing", "compatibility", "comparison"])).min(1),
  supportedTargetTypes: z.array(
    z.enum(["general", "phone_number", "vehicle_plate", "house_number", "room_number", "name", "event_datetime"])
  ),
  supportedLocales: z.array(z.enum(SUPPORTED_LOCALES as ["th", "en", "zh-CN"])).min(1),
  requiredFeatureKey: z
    .enum([
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
    ])
    .optional(),
  premiumOnly: z.boolean().optional(),
  enabledByDefault: z.boolean(),
  category: z.enum(["bazi", "numerology", "timing", "thai_astrology", "western_astrology", "tarot", "custom"])
});

export function validatePluginManifest(manifest: FortunePluginManifest): FortunePluginManifest {
  return pluginManifestSchema.parse(manifest);
}
