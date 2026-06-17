import type { AiAllowedTopic, AiInterpretationInput, AiProhibitedTopic, IntelligenceResultEnvelope } from "../contracts/types";

const DEFAULT_ALLOWED_TOPICS: AiAllowedTopic[] = ["identity", "timing", "confidence", "unknown_fields", "product_support"];
const DEFAULT_PROHIBITED_TOPICS: AiProhibitedTopic[] = [
  "deterministic_calculation",
  "raw_birth_data",
  "professional_advice",
  "unapproved_methodology"
];

export function buildAiInterpretationInput(
  requestId: string,
  result: IntelligenceResultEnvelope,
  narrativeTokens: string[] = [],
  allowedTopics = DEFAULT_ALLOWED_TOPICS
): AiInterpretationInput {
  return {
    requestId,
    resultStatus: result.status,
    classification: result.classification,
    evidence: result.evidence,
    confidence: result.confidence,
    unknownFields: result.unknownFields,
    allowedTopics,
    prohibitedTopics: DEFAULT_PROHIBITED_TOPICS,
    versions: {
      engineVersion: result.versions.engineVersion,
      ruleVersion: result.versions.ruleVersion,
      policyVersion: result.versions.policyVersion
    },
    traceReference: {
      traceId: result.trace.traceId,
      inputFingerprint: result.trace.inputFingerprint
    },
    narrativeTokens
  };
}
