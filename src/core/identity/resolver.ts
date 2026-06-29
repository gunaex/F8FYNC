import type { AggregatedFortuneResult, ScoreDomain } from "@/core/domain";
import { listApprovedArchetypes } from "./archetypes";
import type {
  ArchetypeDefinition,
  ArchetypePlacement,
  ArchetypeResolutionInput,
  ElementalBalanceSummary,
  FiveElement,
  IdentityResolutionResult,
  SacredIdentityProfile,
  SymbolicSealDefinition
} from "./types";

export const IDENTITY_MAPPING_VERSION = "identity.mapping.v8.0.0";
export const IDENTITY_RULE_VERSION = "identity.rules.v1";
export const SYMBOLIC_SEAL_VERSION = "seal.v8.0.0";

const domainElementMap: Record<ScoreDomain, FiveElement> = {
  overall: "earth",
  career: "wood",
  money: "metal",
  relationship: "water",
  wellbeing: "earth",
  communication: "fire",
  travel: "water"
};

function stableHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function scoreByElement(result: AggregatedFortuneResult): Record<FiveElement, number> {
  const totals: Record<FiveElement, number[]> = { wood: [], fire: [], earth: [], metal: [], water: [] };
  for (const [domain, score] of Object.entries(result.scores) as Array<[ScoreDomain, number]>) {
    totals[domainElementMap[domain]].push(score);
  }
  return Object.fromEntries(
    Object.entries(totals).map(([element, values]) => [
      element,
      values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0
    ])
  ) as Record<FiveElement, number>;
}

function elementalBalance(result: AggregatedFortuneResult): ElementalBalanceSummary {
  const elementScores = scoreByElement(result);
  const sorted = Object.entries(elementScores).sort((a, b) => b[1] - a[1]) as Array<[FiveElement, number]>;
  return {
    dominantElement: sorted[0][0],
    secondaryElement: sorted[1]?.[1] > 0 ? sorted[1][0] : undefined,
    elementScores,
    ruleVersion: IDENTITY_RULE_VERSION
  };
}

function archetypeScore(archetype: ArchetypeDefinition, balance: ElementalBalanceSummary, result: AggregatedFortuneResult) {
  const elementFit = archetype.elementAffinities.reduce((sum, element) => sum + balance.elementScores[element], 0);
  const traitFit =
    (archetype.traitKeys.includes("communication") ? result.scores.communication ?? 0 : 0) +
    (archetype.traitKeys.includes("stability") ? result.scores.wellbeing ?? 0 : 0) +
    (archetype.traitKeys.includes("strategy") ? result.scores.career ?? 0 : 0);
  return elementFit + traitFit + result.overallScore;
}

function placeArchetype(archetype: ArchetypeDefinition, role: ArchetypePlacement["role"], score: number, result: AggregatedFortuneResult): ArchetypePlacement {
  return {
    archetypeId: archetype.id,
    role,
    sourceMethodologyId: result.sources[0]?.pluginId ?? "aggregate",
    sourcePath: role === "primary" ? "aggregatedResult.scores" : "aggregatedResult.elementalBalance",
    score,
    confidence: result.confidence,
    ruleVersion: IDENTITY_RULE_VERSION
  };
}

function buildSymbolicSeal(profileBase: {
  analysisId: string;
  primaryArchetypeId: string;
  supportingArchetypeIds: string[];
  balance: ElementalBalanceSummary;
}): SymbolicSealDefinition {
  const elementSignature = Object.entries(profileBase.balance.elementScores)
    .map(([element, score]) => `${element}:${score}`)
    .join("|");
  const seed = stableHash(
    [profileBase.analysisId, profileBase.primaryArchetypeId, profileBase.supportingArchetypeIds.join(","), elementSignature, SYMBOLIC_SEAL_VERSION].join("|")
  );
  return {
    id: `seal_${seed}`,
    sealVersion: SYMBOLIC_SEAL_VERSION,
    analysisId: profileBase.analysisId,
    primaryArchetypeId: profileBase.primaryArchetypeId,
    supportingArchetypeIds: profileBase.supportingArchetypeIds,
    elementSignature,
    geometryTemplateId: `geometry_${profileBase.balance.dominantElement}_v1`,
    deterministicSeedHash: seed,
    visualThemeId: "sacred_atlas_jade",
    accessibleLabelKey: "identity.seal.accessibleLabel"
  };
}

export function resolveSacredIdentity(input: ArchetypeResolutionInput): IdentityResolutionResult {
  const approved = listApprovedArchetypes();
  const hasScores = Object.values(input.aggregatedResult.scores).some((score) => typeof score === "number");
  if (!hasScores) {
    return { status: "incomplete", reasonCode: "INSUFFICIENT_RESULT_DATA", disclosureKeys: ["identity.disclosure.incomplete"] };
  }
  if (!approved.length) {
    return { status: "incomplete", reasonCode: "NO_APPROVED_ARCHETYPES", disclosureKeys: ["identity.disclosure.noApprovedArchetypes"] };
  }

  const balance = elementalBalance(input.aggregatedResult);
  const ranked = approved
    .map((archetype) => ({ archetype, score: archetypeScore(archetype, balance, input.aggregatedResult) }))
    .sort((a, b) => b.score - a.score || a.archetype.code.localeCompare(b.archetype.code));
  const primary = placeArchetype(ranked[0].archetype, "primary", ranked[0].score, input.aggregatedResult);
  const supporting = ranked.slice(1, 3).map((item) => placeArchetype(item.archetype, "supporting", item.score, input.aggregatedResult));
  const hidden = ranked.slice(3, 4).map((item) => placeArchetype(item.archetype, "hidden", item.score, input.aggregatedResult));
  const symbolicSeal = buildSymbolicSeal({
    analysisId: input.analysisId,
    primaryArchetypeId: primary.archetypeId,
    supportingArchetypeIds: supporting.map((item) => item.archetypeId),
    balance
  });

  const profile: SacredIdentityProfile = {
    id: `identity_${stableHash([input.analysisId, primary.archetypeId, IDENTITY_MAPPING_VERSION].join("|"))}`,
    analysisId: input.analysisId,
    primaryArchetype: primary,
    supportingArchetypes: supporting,
    hiddenArchetypes: hidden,
    dominantTraits: ranked[0].archetype.traitKeys,
    elementalBalance: balance,
    symbolicSeal,
    mappingVersion: IDENTITY_MAPPING_VERSION,
    disclosureKeys: ["identity.disclosure.deterministic", "identity.disclosure.noGuarantee"],
    generatedAt: input.aggregatedResult.metadata.generatedAt
  };

  return { status: "complete", profile };
}
