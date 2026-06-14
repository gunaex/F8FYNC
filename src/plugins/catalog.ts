import type { FeatureKey } from "@/core/commercial/types";
import type { FortuneQueryType, SupportedLocale } from "@/core/domain";

export type MethodologyStatus = "active" | "foundation" | "roadmap";

export type MethodologyCatalogItem = {
  id: string;
  family:
    | "bazi"
    | "numerology"
    | "timing"
    | "compatibility"
    | "thai_astrology"
    | "western_astrology"
    | "tarot"
    | "i_ching"
    | "korean_saju"
    | "japanese_systems";
  nameKey: string;
  descriptionKey: string;
  status: MethodologyStatus;
  capabilities: FortuneQueryType[];
  supportedLocales: SupportedLocale[];
  requiredFeatureKey?: FeatureKey;
  auditedRandomness?: boolean;
  calculationImplemented: boolean;
};

export const methodologyCatalog: MethodologyCatalogItem[] = [
  {
    id: "bazi-core",
    family: "bazi",
    nameKey: "methodologies.bazi.name",
    descriptionKey: "methodologies.bazi.description",
    status: "active",
    capabilities: ["daily", "timing", "compatibility", "comparison"],
    supportedLocales: ["th", "en", "zh-CN"],
    calculationImplemented: true
  },
  {
    id: "numerology-core",
    family: "numerology",
    nameKey: "methodologies.numerology.name",
    descriptionKey: "methodologies.numerology.description",
    status: "active",
    capabilities: ["daily", "compatibility", "comparison"],
    supportedLocales: ["th", "en", "zh-CN"],
    calculationImplemented: true
  },
  {
    id: "timing-core",
    family: "timing",
    nameKey: "methodologies.timing.name",
    descriptionKey: "methodologies.timing.description",
    status: "active",
    capabilities: ["daily", "timing"],
    supportedLocales: ["th", "en", "zh-CN"],
    calculationImplemented: true
  },
  {
    id: "thai-astrology-foundation",
    family: "thai_astrology",
    nameKey: "methodologies.thaiAstrology.name",
    descriptionKey: "methodologies.thaiAstrology.description",
    status: "foundation",
    capabilities: ["daily", "timing", "compatibility"],
    supportedLocales: ["th"],
    requiredFeatureKey: "premium_plugins",
    calculationImplemented: false
  },
  {
    id: "western-astrology-foundation",
    family: "western_astrology",
    nameKey: "methodologies.westernAstrology.name",
    descriptionKey: "methodologies.westernAstrology.description",
    status: "foundation",
    capabilities: ["daily", "timing", "compatibility"],
    supportedLocales: ["th", "en", "zh-CN"],
    requiredFeatureKey: "premium_plugins",
    calculationImplemented: false
  },
  {
    id: "tarot-foundation",
    family: "tarot",
    nameKey: "methodologies.tarot.name",
    descriptionKey: "methodologies.tarot.description",
    status: "foundation",
    capabilities: ["daily", "timing", "comparison"],
    supportedLocales: ["th", "en", "zh-CN"],
    requiredFeatureKey: "premium_plugins",
    auditedRandomness: true,
    calculationImplemented: false
  },
  {
    id: "i-ching-roadmap",
    family: "i_ching",
    nameKey: "methodologies.iChing.name",
    descriptionKey: "methodologies.iChing.description",
    status: "roadmap",
    capabilities: ["daily", "timing", "comparison"],
    supportedLocales: ["th", "en", "zh-CN"],
    requiredFeatureKey: "premium_plugins",
    calculationImplemented: false
  },
  {
    id: "korean-saju-roadmap",
    family: "korean_saju",
    nameKey: "methodologies.koreanSaju.name",
    descriptionKey: "methodologies.koreanSaju.description",
    status: "roadmap",
    capabilities: ["daily", "timing", "compatibility"],
    supportedLocales: ["th", "en", "zh-CN"],
    requiredFeatureKey: "premium_plugins",
    calculationImplemented: false
  },
  {
    id: "japanese-systems-roadmap",
    family: "japanese_systems",
    nameKey: "methodologies.japaneseSystems.name",
    descriptionKey: "methodologies.japaneseSystems.description",
    status: "roadmap",
    capabilities: ["daily", "timing", "compatibility"],
    supportedLocales: ["th", "en", "zh-CN"],
    requiredFeatureKey: "premium_plugins",
    calculationImplemented: false
  }
];

export function getMethodologyCatalog() {
  return methodologyCatalog;
}
