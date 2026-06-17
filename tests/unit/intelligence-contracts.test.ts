import { describe, expect, it } from "vitest";
import type { AggregatedFortuneResult, BirthProfile } from "@/core/domain";
import {
  assessBirthInputReadiness,
  buildAiInterpretationInput,
  createCalculationTrace,
  validateBirthInput,
  wrapLegacyFortuneResult,
  type BirthInputContract,
  type IntelligenceConfidence,
  type IntelligenceEvidence,
  type IntelligenceResultEnvelope,
  type IntelligenceVersionSet
} from "@/core/intelligence";

const versions: IntelligenceVersionSet = {
  engineVersion: "contract-test-engine",
  ruleVersion: "rules.pending-expert-validation",
  inputSchemaVersion: "birth-input.v1",
  resultSchemaVersion: "result-envelope.v1",
  policyVersion: "policy.0c"
};

const knownBirthInput: BirthInputContract = {
  localDate: "1990-01-01",
  localTime: "10:30",
  birthTimeStatus: "KNOWN",
  birthLocationText: "Bangkok",
  timezoneId: "Asia/Bangkok",
  timezoneConfirmationStatus: "CONFIRMED",
  timeAdjustmentPolicy: "LOCAL_CIVIL_TIME_ONLY",
  inputPrecision: "MINUTE",
  inputSource: "USER_ENTERED"
};

function legacyAggregate(birthProfile?: BirthProfile): AggregatedFortuneResult {
  return {
    requestId: "legacy-request",
    overallScore: 60,
    scores: { overall: 60 },
    timing: {
      currentStatus: "neutral",
      cautionWindows: [],
      allWindows: []
    },
    agreement: {
      overall: "medium",
      byDomain: { overall: "medium" }
    },
    confidence: 0.5,
    conflicts: [],
    recommendations: [],
    warnings: [],
    sources: [{ pluginId: "bazi", version: "0.1.0", status: "success" }],
    pluginResults: [],
    metadata: {
      generatedAt: "2026-06-17T00:00:00.000Z",
      locale: "en",
      contextTimezone: "Asia/Bangkok"
    },
    ...(birthProfile ? { birthProfile } : {})
  } as AggregatedFortuneResult;
}

describe("F8SYNC intelligence contracts", () => {
  it("allows UNKNOWN birth time without substituting 12:00", () => {
    const input: BirthInputContract = {
      ...knownBirthInput,
      localTime: undefined,
      birthTimeStatus: "UNKNOWN",
      inputPrecision: "DATE_ONLY"
    };

    expect(validateBirthInput(input)).toMatchObject({ valid: true });
    expect(JSON.stringify(input)).not.toContain("12:00");
  });

  it("requires local time when birth time status is KNOWN", () => {
    const validation = validateBirthInput({ ...knownBirthInput, localTime: undefined });

    expect(validation.valid).toBe(false);
    expect(validation.issues.map((issue) => issue.code)).toContain("KNOWN_TIME_REQUIRES_LOCAL_TIME");
  });

  it("rejects invalid time-status combinations", () => {
    const validation = validateBirthInput({ ...knownBirthInput, birthTimeStatus: "UNKNOWN" });

    expect(validation.valid).toBe(false);
    expect(validation.issues.map((issue) => issue.code)).toContain("UNKNOWN_TIME_MUST_NOT_INCLUDE_LOCAL_TIME");
  });

  it("validates IANA timezone identifiers", () => {
    expect(validateBirthInput({ ...knownBirthInput, timezoneId: "Asia/Bangkok" })).toMatchObject({ valid: true });
    expect(validateBirthInput({ ...knownBirthInput, timezoneId: "Bangkok Local Time" })).toMatchObject({ valid: false });
  });

  it("blocks time-sensitive readiness when timezone is not confirmed", () => {
    const readiness = assessBirthInputReadiness({
      ...knownBirthInput,
      timezoneConfirmationStatus: "SUGGESTED"
    });

    expect(readiness.status).toBe("BLOCKED_MISSING_TIMEZONE");
    expect(readiness.blocking).toBe(true);
  });

  it("treats True Solar Time as unsupported in V1", () => {
    const readiness = assessBirthInputReadiness({
      ...knownBirthInput,
      timeAdjustmentPolicy: "TRUE_SOLAR_TIME"
    });

    expect(readiness.status).toBe("UNSUPPORTED_IN_V1");
    expect(readiness.reasonCodes).toContain("TRUE_SOLAR_TIME_UNSUPPORTED_IN_V1");
  });

  it("supports partial result envelopes", () => {
    const envelope: IntelligenceResultEnvelope<{ identity: null }> = {
      status: "PARTIAL",
      classification: "APPROVED",
      data: { identity: null },
      evidence: [],
      confidence: {
        level: "INSUFFICIENT",
        reasons: ["BIRTH_TIME_UNKNOWN"],
        missingDependencies: ["localTime"]
      },
      unknownFields: [
        {
          field: "localTime",
          reason: "BIRTH_TIME_UNKNOWN",
          impact: "Hour-dependent outputs unavailable.",
          affectedOutputs: ["hour_dependent_outputs"],
          userDisclosureToken: "intelligence.disclosure.birthTimeUnknown"
        }
      ],
      warnings: [],
      versions,
      trace: createCalculationTrace(versions, "partial-result")
    };

    expect(envelope.status).toBe("PARTIAL");
    expect(envelope.unknownFields[0]?.affectedOutputs).toContain("hour_dependent_outputs");
  });

  it("keeps evidence and confidence as independent contract fields", () => {
    const evidence: IntelligenceEvidence = {
      evidenceCode: "BIRTH_TIME_UNKNOWN",
      sourceLayer: "birth_input",
      ruleId: "BIRTH-003",
      inputReferences: ["birthTimeStatus"],
      descriptionToken: "intelligence.evidence.birthTimeUnknown",
      status: "MISSING_INPUT"
    };
    const confidence: IntelligenceConfidence = {
      level: "INSUFFICIENT",
      reasons: ["MISSING_HOUR_DEPENDENCY"],
      missingDependencies: ["localTime"]
    };

    expect(evidence.status).toBe("MISSING_INPUT");
    expect(confidence.level).toBe("INSUFFICIENT");
  });

  it("marks current MVP aggregate results as PLACEHOLDER through the legacy adapter", () => {
    const wrapped = wrapLegacyFortuneResult(legacyAggregate());

    expect(wrapped.classification).toBe("PLACEHOLDER");
    expect(wrapped.data?.legacyMethodologyStatus).toBe("not_v1_approved");
  });

  it("builds AI input without raw birth data", () => {
    const wrapped = wrapLegacyFortuneResult(
      legacyAggregate({ birthDate: "1990-01-01", birthTime: "10:30", birthLocation: "Bangkok", birthTimezone: "Asia/Bangkok" })
    );
    const aiInput = buildAiInterpretationInput("ai-request", wrapped, ["identity.unavailable"]);

    expect(aiInput.traceReference.traceId).toBe(wrapped.trace.traceId);
    expect(aiInput.prohibitedTopics).toContain("raw_birth_data");
    expect(JSON.stringify(aiInput)).not.toContain("1990-01-01");
    expect(JSON.stringify(aiInput)).not.toContain("10:30");
    expect(JSON.stringify(aiInput)).not.toContain("Bangkok");
  });

  it("requires version fields and a unique trace ID", () => {
    const first = createCalculationTrace(versions, "same-input");
    const second = createCalculationTrace(versions, "same-input");

    expect(first.traceId).not.toBe(second.traceId);
    expect(first.versions.engineVersion).toBeTruthy();
    expect(first.versions.ruleVersion).toBeTruthy();
    expect(first.versions.inputSchemaVersion).toBeTruthy();
    expect(first.versions.resultSchemaVersion).toBeTruthy();
    expect(first.versions.policyVersion).toBeTruthy();
  });

  it("reports compatibility as deferred and unsupported for V1 readiness", () => {
    const readiness = assessBirthInputReadiness(knownBirthInput, { compatibilityRequested: true });

    expect(readiness.status).toBe("UNSUPPORTED_IN_V1");
    expect(readiness.reasonCodes).toContain("COMPATIBILITY_DEFERRED_IN_V1");
  });

  it("can explicitly block calculation when methodology is not approved", () => {
    const readiness = assessBirthInputReadiness(knownBirthInput, { methodologyApproved: false });

    expect(readiness.status).toBe("BLOCKED_METHODOLOGY_NOT_APPROVED");
  });
});
