# F8SYNC Intelligence Contracts V1

**Milestone:** 0C - Intelligence Contracts and Domain Boundaries
**Date:** 2026-06-17
**Status:** Contract baseline implemented, methodology calculations not implemented

## Purpose

This document defines the V1 contract boundary for the future deterministic F8SYNC Intelligence Core.

Milestone 0C creates stable input, readiness, versioning, evidence, confidence, trace, AI-boundary, and legacy-adapter contracts. It does not implement BaZi calculations, Four Pillars, element weighting, archetype derivation, daily timing methodology, compatibility methodology, or Golden Test expected values.

## Source Authority

The implemented contracts encode Product Owner decisions locked in Milestone 0B.1:

- Unknown birth time is allowed and is never replaced with `12:00` or any fabricated time.
- Birth time status is explicit: `KNOWN`, `UNKNOWN`, `APPROXIMATE`, or `DISPUTED`.
- Birth location text is optional, but confirmed IANA timezone is required for time-sensitive calculation.
- The app may suggest a timezone, but user confirmation is required.
- Free-text birth location is not a trusted timezone resolver.
- True Solar Time is disabled in V1; V1 uses local civil time only.
- Compatibility is deferred from the first deterministic engine.
- AI receives minimized structured output and should not receive raw birth date, time, or location wherever avoidable.
- Legacy/prototype results must be labelled as `LEGACY`, `PLACEHOLDER`, or `PRE_V1`; they must not be treated as approved V1 results.

## Implemented Code Boundary

The 0C contract module is additive:

```text
src/core/intelligence/
  adapters/
  contracts/
  validation/
```

It is exported from `src/core/intelligence/index.ts`. The existing MVP routes, plugins, schemas, migrations, and `src/core/index.ts` were not rewired in 0C.

## Birth Input Contract

The canonical birth input contract is:

```ts
type BirthInputContract = {
  localDate: string;
  localTime?: string;
  birthTimeStatus: "KNOWN" | "UNKNOWN" | "APPROXIMATE" | "DISPUTED";
  birthLocationText?: string;
  timezoneId?: string;
  timezoneConfirmationStatus: "CONFIRMED" | "SUGGESTED" | "UNRESOLVED" | "UNKNOWN";
  timeAdjustmentPolicy: "LOCAL_CIVIL_TIME_ONLY" | "TRUE_SOLAR_TIME";
  inputPrecision: "DATE_ONLY" | "MINUTE" | "APPROXIMATE" | "DISPUTED";
  inputSource: "USER_ENTERED" | "PROFILE" | "LEGACY_IMPORT" | "SYSTEM_ADAPTER";
};
```

Validation rules:

- `KNOWN` requires `localTime`.
- `UNKNOWN` requires `localTime` to be absent.
- `APPROXIMATE` and `DISPUTED` require a declared local time and must be disclosed as uncertain by downstream output.
- `timezoneId`, when present, must be a valid IANA timezone identifier.
- `TRUE_SOLAR_TIME` returns an unsupported V1 validation/readiness state.
- No contract path resolves free-text location into timezone.

## Readiness Contract

Readiness is not boolean. It must return one of:

```text
READY
PARTIALLY_READY
BLOCKED_MISSING_TIMEZONE
BLOCKED_INVALID_INPUT
BLOCKED_METHODOLOGY_NOT_APPROVED
UNSUPPORTED_IN_V1
```

V1 contracts currently support:

- `PARTIALLY_READY` for valid but uncertain/unknown birth-time inputs.
- `BLOCKED_MISSING_TIMEZONE` when time-sensitive calculation lacks confirmed IANA timezone.
- `BLOCKED_METHODOLOGY_NOT_APPROVED` for deterministic calculation paths that still require expert validation.
- `UNSUPPORTED_IN_V1` for True Solar Time and compatibility requests.

## Result Envelope

All future deterministic outputs should use:

```text
status
classification
data
evidence
confidence
unknownFields
warnings
versions
trace
```

`classification` distinguishes approved and non-approved results:

```text
APPROVED
LEGACY
PLACEHOLDER
PRE_V1
```

Partial results are valid. Missing or uncertain inputs must be represented in `unknownFields` and confidence reasons rather than hidden by fallback values.

## Evidence and Confidence

Evidence and confidence are separate.

Evidence records:

- evidence code
- source layer
- rule ID
- input references
- derived value reference
- description token
- status

Confidence records:

- level: `HIGH`, `MEDIUM`, `LOW`, `INSUFFICIENT`, or `NOT_APPLICABLE`
- reasons
- missing dependencies

Confidence is not a positivity score. A low-confidence positive-looking result is still low confidence.

## Version and Trace Contract

Required version fields:

```text
engineVersion
ruleVersion
inputSchemaVersion
resultSchemaVersion
policyVersion
```

Every result envelope requires a calculation trace with:

```text
traceId
calculatedAt
inputFingerprint
versions
steps
warnings
assumptions
unknownFields
```

Trace IDs must be unique. The input fingerprint is for reference and audit correlation, not for reconstructing raw private birth data.

## Engine Interface

The future engine interface is:

```ts
interface IntelligenceEngine {
  validateInput(input: unknown): BirthInputValidationResult;
  assessReadiness(input: BirthInputContract): CalculationReadiness;
  calculate(input: BirthInputContract): Promise<IntelligenceResultEnvelope>;
  explainCapabilities(): IntelligenceCapability[];
}
```

The interface allows an engine to refuse calculation through readiness states. It is not BaZi-specific and does not require every request to proceed.

## F8SYNC Intelligence Layer Boundary

The F8SYNC layer consumes approved structured foundation output only. In 0C, the contract defines output slots for future approved data:

- element balance
- identity orientation
- strength/tension summary
- daily timing
- narrative tokens

No element weights, archetype formulas, timing formulas, or identity thresholds are defined in 0C.

## AI Interpretation Input

The AI input contract is minimized:

```text
requestId
resultStatus
classification
evidence
confidence
unknownFields
allowedTopics
prohibitedTopics
engine/rule/policy versions
traceReference
narrativeTokens
```

The contract does not require raw birth date, raw birth time, raw birth location, full birth profile, full deterministic payload, or full prompt/response logging.

AI prohibited topics include deterministic calculation, raw birth data, professional advice, and unapproved methodology.

## Legacy Adapter

The 0C legacy adapter wraps current MVP aggregate results as:

```text
classification: PLACEHOLDER
source: mvp_placeholder
legacyMethodologyStatus: not_v1_approved
```

This preserves existing prototype output for migration without approving it as V1 deterministic intelligence.

## Explicit Non-Implementation

Milestone 0C does not implement:

- Four Pillars calculation
- Li Chun or year-boundary behavior
- solar terms
- day or hour pillar rules
- hidden stems
- Ten Gods
- Day Master
- seasonal strength
- element weighting
- archetype derivation
- daily timing derivation
- compatibility methodology
- Golden Test expected values
- AI calculation behavior

These remain blocked until methodology approval and expert-reviewed Golden references exist.
