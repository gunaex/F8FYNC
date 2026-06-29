import type { AggregatedFortuneResult, ScoreDomain, SupportedLocale } from "@/core/domain";

export type FiveElement = "wood" | "fire" | "earth" | "metal" | "water";

export type ArchetypeTrait =
  | "growth"
  | "renewal"
  | "clarity"
  | "discipline"
  | "adaptability"
  | "intuition"
  | "authority"
  | "communication"
  | "harmony"
  | "strategy"
  | "stability"
  | "transformation"
  | "craft"
  | "protection"
  | "reflection";

export type ArchetypeStatus = "draft" | "review" | "approved" | "retired";

export type ArchetypeDefinition = {
  id: string;
  code: string;
  nameKey: string;
  shortNameKey: string;
  descriptionKey: string;
  traitKeys: ArchetypeTrait[];
  elementAffinities: FiveElement[];
  visualThemeIds: string[];
  loreVersion: string;
  ruleVersion: string;
  status: ArchetypeStatus;
  commercialUseApproved: boolean;
  culturalReviewStatus: "not_required" | "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
};

export type ElementalBalanceSummary = {
  dominantElement: FiveElement;
  secondaryElement?: FiveElement;
  elementScores: Record<FiveElement, number>;
  ruleVersion: string;
};

export type SymbolicSealDefinition = {
  id: string;
  sealVersion: string;
  analysisId: string;
  primaryArchetypeId: string;
  supportingArchetypeIds: string[];
  elementSignature: string;
  geometryTemplateId: string;
  deterministicSeedHash: string;
  visualThemeId: string;
  accessibleLabelKey: string;
};

export type ArchetypeResolutionInput = {
  memberId?: string;
  analysisId: string;
  aggregatedResult: AggregatedFortuneResult;
  objective?: ScoreDomain;
  locale: SupportedLocale;
};

export type ArchetypePlacement = {
  archetypeId: string;
  role: "primary" | "supporting" | "hidden" | "timing";
  sourceMethodologyId: string;
  sourcePath: string;
  score: number;
  confidence: number;
  ruleVersion: string;
};

export type SacredIdentityProfile = {
  id: string;
  analysisId: string;
  primaryArchetype: ArchetypePlacement;
  supportingArchetypes: ArchetypePlacement[];
  hiddenArchetypes: ArchetypePlacement[];
  dominantTraits: ArchetypeTrait[];
  elementalBalance: ElementalBalanceSummary;
  symbolicSeal: SymbolicSealDefinition;
  mappingVersion: string;
  disclosureKeys: string[];
  generatedAt: string;
};

export type IdentityResolutionResult =
  | { status: "complete"; profile: SacredIdentityProfile }
  | { status: "incomplete"; reasonCode: "INSUFFICIENT_RESULT_DATA" | "NO_APPROVED_ARCHETYPES"; disclosureKeys: string[] };
