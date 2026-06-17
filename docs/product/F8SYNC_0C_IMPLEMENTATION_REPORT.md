# F8SYNC Milestone 0C Implementation Report

**Milestone:** 0C - Intelligence Contracts and Domain Boundaries
**Date:** 2026-06-17
**Status:** Completed as documentation and contract implementation

## Summary

Milestone 0C introduced additive intelligence contracts and structural tests for the future deterministic F8SYNC Intelligence Core. The work preserves the existing platform foundation while creating a versioned boundary for approved methodology to plug into later.

No BaZi calculation methodology, Golden Test expected values, schemas, migrations, application routes, or current plugin behavior were implemented or changed.

## Baseline

Baseline inspected before work:

- Branch: `main`
- HEAD: `9b150ef` / `milestone-0b1-product-owner-decision-lock`
- Existing unrelated dirty paths remained present and were not modified intentionally.
- Milestone 0A, 0B, and 0B.1 tags were present locally.

## Files Added

```text
src/core/intelligence/contracts/types.ts
src/core/intelligence/contracts/index.ts
src/core/intelligence/validation/birth-input.ts
src/core/intelligence/validation/index.ts
src/core/intelligence/adapters/legacy-fortune-adapter.ts
src/core/intelligence/adapters/ai-interpretation-input.ts
src/core/intelligence/adapters/index.ts
src/core/intelligence/index.ts
tests/unit/intelligence-contracts.test.ts
docs/product/F8SYNC_INTELLIGENCE_CONTRACTS_V1.md
docs/product/F8SYNC_0C_IMPLEMENTATION_REPORT.md
```

## Files Modified

```text
docs/product/F8SYNC_IMPLEMENTATION_READINESS_MATRIX_V1.md
```

`PROJECT_TRACKING.md` was not updated because its diff already contains mixed historical, V8, 0A, 0B, and 0B.1 edits. Isolating a clean 0C-only patch in that file would be risky.

## Contracts Implemented

- Birth input contract with explicit birth time status.
- IANA timezone validation helper.
- Calculation readiness contract with structured blocking and partial states.
- Version set contract for engine, rule, input schema, result schema, and policy.
- Evidence contract with source layer, rule ID, input references, and status.
- Confidence contract independent of evidence and result sentiment.
- Unknown-field disclosure contract.
- Calculation trace contract with unique trace ID and input fingerprint.
- Generic result envelope supporting partial and blocked results.
- Generic intelligence engine interface.
- F8SYNC Intelligence Layer input/output boundary.
- Minimized AI interpretation input contract.
- Legacy adapter for current MVP aggregate results.

## Test Coverage Added

The new unit tests cover:

- Unknown time does not become `12:00`.
- `UNKNOWN` time allows absent local time.
- `KNOWN` time requires local time.
- Invalid time-status combinations fail validation.
- IANA timezone validation.
- Unconfirmed timezone blocks time-sensitive readiness.
- True Solar Time is unsupported in V1.
- Result envelope supports partial results.
- Evidence and confidence are independent.
- Legacy adapter marks current output as `PLACEHOLDER`.
- AI contract excludes raw birth data.
- Version fields are mandatory in trace/result contract usage.
- Calculation trace IDs are unique.
- Compatibility is deferred/unsupported for V1.
- Methodology can be explicitly blocked until expert approval.

## Methodology Not Implemented

The following remain intentionally unimplemented:

- BaZi foundation calculations
- calendar boundary behavior
- Li Chun handling
- solar-term resolution
- day/hour pillar calculations
- hidden stems and Ten Gods rules
- Day Master treatment
- seasonal strength
- element weighting and normalization formulas
- identity/archetype derivation
- daily timing derivation
- compatibility methodology
- Golden Test expected values

## Expert-Blocked Areas

Implementation remains blocked for the methodology-dependent work recorded in the decision register and readiness matrix, including:

- authoritative BaZi source selection
- calendar resolver and historical timezone source
- year/month/day/hour rules
- element weighting
- identity and archetype derivation rules
- daily timing methodology
- expert-reviewed Golden Test expected values

## Legacy Handling

Current MVP aggregate results are not promoted to V1. The new adapter labels them as `PLACEHOLDER` with `legacyMethodologyStatus: not_v1_approved`.

## Recommended Next Milestone

Proceed to expert methodology validation and Golden Test fixture approval before implementing deterministic BaZi calculations. The 0C contracts are ready to receive approved methodology once the blocked decisions are resolved.
