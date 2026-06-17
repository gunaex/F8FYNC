import type { AggregatedFortuneResult } from "@/core/domain";
import type {
  CalculationTrace,
  IntelligenceResultEnvelope,
  IntelligenceVersionSet,
  LegacyFortunePlaceholderData
} from "../contracts/types";

export const LEGACY_PLACEHOLDER_VERSIONS: IntelligenceVersionSet = {
  engineVersion: "legacy.mvp-placeholder",
  ruleVersion: "legacy.not-v1-approved",
  inputSchemaVersion: "legacy.fortune-request",
  resultSchemaVersion: "intelligence-result-envelope.v1",
  policyVersion: "f8sync-policy.0c"
};

function stableFingerprint(value: string) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `fp_${(hash >>> 0).toString(16)}`;
}

export function createCalculationTrace(
  versions: IntelligenceVersionSet,
  inputFingerprintSource: string,
  partial: Partial<Omit<CalculationTrace, "traceId" | "calculatedAt" | "inputFingerprint" | "versions">> = {}
): CalculationTrace {
  const randomPart = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return {
    traceId: `trace_${randomPart}`,
    calculatedAt: new Date().toISOString(),
    inputFingerprint: stableFingerprint(inputFingerprintSource),
    versions,
    steps: partial.steps ?? [],
    warnings: partial.warnings ?? [],
    assumptions: partial.assumptions ?? [],
    unknownFields: partial.unknownFields ?? []
  };
}

export function wrapLegacyFortuneResult(result: AggregatedFortuneResult): IntelligenceResultEnvelope<LegacyFortunePlaceholderData> {
  const trace = createCalculationTrace(LEGACY_PLACEHOLDER_VERSIONS, result.requestId, {
    steps: [
      {
        stepId: "legacy-placeholder-wrap",
        sourceLayer: "legacy_adapter",
        status: "LEGACY_ONLY",
        ruleId: "VER-001",
        inputReferences: ["AggregatedFortuneResult.requestId"]
      }
    ],
    warnings: ["LEGACY_RESULT_NOT_V1_APPROVED"],
    assumptions: ["Existing MVP aggregate result is preserved for migration only."]
  });

  return {
    status: result.pluginResults.some((pluginResult) => pluginResult.status === "partial") ? "PARTIAL" : "COMPLETE",
    classification: "PLACEHOLDER",
    data: {
      source: "mvp_placeholder",
      legacyMethodologyStatus: "not_v1_approved",
      result
    },
    evidence: [
      {
        evidenceCode: "LEGACY_MVP_PLACEHOLDER",
        sourceLayer: "legacy_adapter",
        ruleId: "VER-001",
        inputReferences: ["AggregatedFortuneResult"],
        derivedValueReference: "LegacyFortunePlaceholderData.result",
        descriptionToken: "intelligence.evidence.legacyPlaceholder",
        status: "LEGACY_ONLY"
      }
    ],
    confidence: {
      level: "NOT_APPLICABLE",
      reasons: ["LEGACY_PLACEHOLDER_NOT_CONFIDENCE_MODEL"],
      missingDependencies: ["APPROVED_BAZI_FOUNDATION", "APPROVED_F8SYNC_RULES"]
    },
    unknownFields: [],
    warnings: [
      {
        code: "LEGACY_RESULT_NOT_V1_APPROVED",
        severity: "caution",
        messageToken: "intelligence.warning.legacyResultNotApproved"
      }
    ],
    versions: LEGACY_PLACEHOLDER_VERSIONS,
    trace
  };
}
