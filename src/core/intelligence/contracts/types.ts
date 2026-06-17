import type { AggregatedFortuneResult, FortuneQueryType } from "@/core/domain";

export type BirthTimeStatus = "KNOWN" | "UNKNOWN" | "APPROXIMATE" | "DISPUTED";
export type TimezoneConfirmationStatus = "CONFIRMED" | "SUGGESTED" | "UNRESOLVED" | "UNKNOWN";
export type TimeAdjustmentPolicy = "LOCAL_CIVIL_TIME_ONLY" | "TRUE_SOLAR_TIME";
export type InputPrecision = "DATE_ONLY" | "MINUTE" | "APPROXIMATE" | "DISPUTED";
export type InputSource = "USER_ENTERED" | "PROFILE" | "LEGACY_IMPORT" | "SYSTEM_ADAPTER";

export type CalculationReadinessStatus =
  | "READY"
  | "PARTIALLY_READY"
  | "BLOCKED_MISSING_TIMEZONE"
  | "BLOCKED_INVALID_INPUT"
  | "BLOCKED_METHODOLOGY_NOT_APPROVED"
  | "UNSUPPORTED_IN_V1";

export type ResultStatus = "COMPLETE" | "PARTIAL" | "INCOMPLETE" | "UNAVAILABLE" | "BLOCKED";
export type ResultClassification = "APPROVED" | "LEGACY" | "PLACEHOLDER" | "PRE_V1";
export type EvidenceSourceLayer = "birth_input" | "calendar_boundary" | "bazi_foundation" | "f8sync_layer" | "legacy_adapter" | "ai_boundary";
export type EvidenceStatus = "ACTIVE" | "MISSING_INPUT" | "PENDING_EXPERT_VALIDATION" | "DEFERRED" | "LEGACY_ONLY";
export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW" | "INSUFFICIENT" | "NOT_APPLICABLE";
export type IntelligenceWarningSeverity = "info" | "caution" | "high";

export type IntelligenceVersionSet = {
  engineVersion: string;
  ruleVersion: string;
  inputSchemaVersion: string;
  resultSchemaVersion: string;
  policyVersion: string;
};

export type BirthInputContract = {
  localDate: string;
  localTime?: string;
  birthTimeStatus: BirthTimeStatus;
  birthLocationText?: string;
  timezoneId?: string;
  timezoneConfirmationStatus: TimezoneConfirmationStatus;
  timeAdjustmentPolicy: TimeAdjustmentPolicy;
  inputPrecision: InputPrecision;
  inputSource: InputSource;
};

export type BirthInputValidationIssue = {
  code: string;
  field: keyof BirthInputContract | "birthInput";
  messageToken: string;
};

export type BirthInputValidationResult =
  | { valid: true; input: BirthInputContract; issues: [] }
  | { valid: false; issues: BirthInputValidationIssue[] };

export type CalculationReadiness = {
  status: CalculationReadinessStatus;
  reasonCodes: string[];
  missingFields: Array<keyof BirthInputContract | string>;
  blocking: boolean;
};

export type IntelligenceEvidence = {
  evidenceCode: string;
  sourceLayer: EvidenceSourceLayer;
  ruleId: string;
  inputReferences: string[];
  derivedValueReference?: string;
  descriptionToken: string;
  status: EvidenceStatus;
};

export type IntelligenceConfidence = {
  level: ConfidenceLevel;
  reasons: string[];
  missingDependencies: string[];
};

export type UnknownFieldDisclosure = {
  field: string;
  reason: string;
  impact: string;
  affectedOutputs: string[];
  userDisclosureToken: string;
};

export type CalculationTraceStep = {
  stepId: string;
  sourceLayer: EvidenceSourceLayer;
  status: EvidenceStatus | CalculationReadinessStatus;
  ruleId?: string;
  inputReferences: string[];
};

export type CalculationTrace = {
  traceId: string;
  calculatedAt: string;
  inputFingerprint: string;
  versions: IntelligenceVersionSet;
  steps: CalculationTraceStep[];
  warnings: string[];
  assumptions: string[];
  unknownFields: UnknownFieldDisclosure[];
};

export type IntelligenceWarning = {
  code: string;
  severity: IntelligenceWarningSeverity;
  messageToken: string;
};

export type IntelligenceResultEnvelope<TData = unknown> = {
  status: ResultStatus;
  classification: ResultClassification;
  data: TData | null;
  evidence: IntelligenceEvidence[];
  confidence: IntelligenceConfidence;
  unknownFields: UnknownFieldDisclosure[];
  warnings: IntelligenceWarning[];
  versions: IntelligenceVersionSet;
  trace: CalculationTrace;
};

export type IntelligenceCapability = {
  queryType: FortuneQueryType | "identity";
  status: CalculationReadinessStatus;
  classification: ResultClassification;
  reasonCodes: string[];
};

export interface IntelligenceEngine<TInput extends BirthInputContract = BirthInputContract, TResult = unknown> {
  validateInput(input: unknown): BirthInputValidationResult;
  assessReadiness(input: TInput): CalculationReadiness;
  calculate(input: TInput): Promise<IntelligenceResultEnvelope<TResult>>;
  explainCapabilities(): IntelligenceCapability[];
}

export type F8SYNCIntelligenceInput = {
  approvedFoundationResult: IntelligenceResultEnvelope | null;
  requestedOutputs: Array<"element_balance" | "identity_orientation" | "strength_tension_summary" | "daily_timing">;
  versions: IntelligenceVersionSet;
};

export type F8SYNCIntelligenceOutput = IntelligenceResultEnvelope<{
  elementBalance?: unknown;
  identityOrientation?: unknown;
  strengthTensionSummary?: unknown;
  dailyTiming?: unknown;
  narrativeTokens: string[];
}>;

export type AiAllowedTopic = "identity" | "timing" | "confidence" | "unknown_fields" | "product_support";
export type AiProhibitedTopic = "deterministic_calculation" | "raw_birth_data" | "professional_advice" | "unapproved_methodology";

export type AiInterpretationInput = {
  requestId: string;
  resultStatus: ResultStatus;
  classification: ResultClassification;
  evidence: IntelligenceEvidence[];
  confidence: IntelligenceConfidence;
  unknownFields: UnknownFieldDisclosure[];
  allowedTopics: AiAllowedTopic[];
  prohibitedTopics: AiProhibitedTopic[];
  versions: Pick<IntelligenceVersionSet, "engineVersion" | "ruleVersion" | "policyVersion"> & {
    promptVersion?: string;
    modelVersion?: string;
  };
  traceReference: Pick<CalculationTrace, "traceId" | "inputFingerprint">;
  narrativeTokens: string[];
};

export type LegacyFortunePlaceholderData = {
  source: "mvp_placeholder";
  legacyMethodologyStatus: "not_v1_approved";
  result: AggregatedFortuneResult;
};
