import type { AggregatedFortuneResult } from "@/core/domain";
import { getMemberEntitlements } from "./entitlement-service";
import type { PremiumRevealMetadata, PremiumRevealSection, ResultRevealLevel } from "./types";

const revealSections: Omit<PremiumRevealSection, "locked">[] = [
  {
    id: "domain_scores",
    titleKey: "premiumReveal.sections.domainScores.title",
    descriptionKey: "premiumReveal.sections.domainScores.description",
    requiredFeatureKey: "premium_plugins"
  },
  {
    id: "full_timeline",
    titleKey: "premiumReveal.sections.fullTimeline.title",
    descriptionKey: "premiumReveal.sections.fullTimeline.description",
    requiredFeatureKey: "full_timeline"
  },
  {
    id: "plugin_evidence",
    titleKey: "premiumReveal.sections.pluginEvidence.title",
    descriptionKey: "premiumReveal.sections.pluginEvidence.description",
    requiredFeatureKey: "premium_plugins"
  },
  {
    id: "premium_methods",
    titleKey: "premiumReveal.sections.premiumMethods.title",
    descriptionKey: "premiumReveal.sections.premiumMethods.description",
    requiredFeatureKey: "premium_plugins"
  },
  {
    id: "ai_interpretation",
    titleKey: "premiumReveal.sections.aiInterpretation.title",
    descriptionKey: "premiumReveal.sections.aiInterpretation.description",
    requiredFeatureKey: "ai_interpretation"
  }
];

export function resolveRevealLevel(planCode: string): ResultRevealLevel {
  if (planCode === "premium" || planCode === "premium_yearly") return "full";
  if (planCode === "free") return "partial";
  return "preview";
}

export function buildPremiumRevealMetadata(planCode: string): PremiumRevealMetadata {
  const level = resolveRevealLevel(planCode);
  return {
    level,
    planCode,
    lockedSections: revealSections.map((section) => ({
      ...section,
      locked: level !== "full" && (section.requiredFeatureKey === "premium_plugins" || section.id === "full_timeline")
    }))
  };
}

export async function filterFortuneResultForEntitlement(
  memberId: string | undefined,
  result: AggregatedFortuneResult
): Promise<AggregatedFortuneResult & { premiumReveal: PremiumRevealMetadata }> {
  const entitlements = await getMemberEntitlements(memberId);
  const reveal = buildPremiumRevealMetadata(entitlements.planCode);
  if (reveal.level === "full") {
    return { ...result, premiumReveal: reveal };
  }

  const previewWindow = result.timing.nextOptimalWindow
    ? {
        ...result.timing.nextOptimalWindow,
        reasonCodes: [],
        sourcePluginIds: []
      }
    : undefined;

  return {
    ...result,
    scores: {
      overall: result.scores.overall
    },
    timing: {
      currentStatus: result.timing.currentStatus,
      currentWindow: undefined,
      nextOptimalWindow: previewWindow,
      cautionWindows: [],
      allWindows: []
    },
    agreement: {
      overall: result.agreement.overall,
      byDomain: {}
    },
    conflicts: [],
    recommendations: result.recommendations.slice(0, 2),
    warnings: result.warnings.filter((warning) => warning.severity !== "info"),
    sources: result.sources.map((source) => ({ ...source, version: "locked" })),
    pluginResults: [],
    premiumReveal: reveal
  };
}
