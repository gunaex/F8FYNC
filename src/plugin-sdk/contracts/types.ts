import type { FortuneQueryType, FortuneRequest, FortuneTargetType, PluginResult, SupportedLocale } from "@/core/domain";
import type { FeatureKey } from "@/core/commercial";

export type PluginCapability = FortuneQueryType;

export type FortunePluginManifest = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  version: string;
  calculationVersion: string;
  capabilities: PluginCapability[];
  supportedTargetTypes: FortuneTargetType[];
  supportedLocales: SupportedLocale[];
  requiredFeatureKey?: FeatureKey;
  premiumOnly?: boolean;
  enabledByDefault: boolean;
  category: "bazi" | "numerology" | "timing" | "thai_astrology" | "western_astrology" | "tarot" | "custom";
};

export interface FortunePlugin {
  manifest: FortunePluginManifest;
  validateInput(input: FortuneRequest): Promise<{ valid: boolean; errors: string[] }>;
  analyze(input: FortuneRequest): Promise<PluginResult>;
  healthCheck?(): Promise<{ healthy: boolean; message?: string }>;
}
