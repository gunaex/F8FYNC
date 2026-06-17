# F8SYNC 1A Birth Input Foundation

**Milestone:** 1A - Birth Input and Timezone Foundation
**Date:** 2026-06-17
**Status:** Implemented as normalized input foundation; calculation remains blocked

## Purpose

Milestone 1A implements the normalized birth-input foundation that future deterministic engines can consume after methodology approval. It does not implement BaZi calculation methodology.

## Current Flow Inspected

```text
BirthProfileForm / account profile API input
    -> birth profile request validation
    -> /api/birth-profiles POST/PATCH
    -> birth-profile service
    -> memory-store birthProfiles
    -> existing fortune route only when user explicitly runs analysis
```

## Risks Found

| Risk | Location | 1A Handling |
|---|---|---|
| Missing birth time became `12:00` in placeholder BaZi seed | `src/plugins/bazi/index.ts` | Not modified in 1A; profile save no longer uses calculation and canonical input never creates `12:00`. |
| Timezone accepted as free string | Legacy profile schema/service | Canonical input validates IANA and tracks confirmation state. |
| Birth location required and could be confused with timezone | Legacy profile schema/service | Canonical location text is optional and never resolves timezone. |
| Placeholder calculation could run without readiness | `/api/fortune` explicit analysis path | Profile save returns readiness and does not call calculation. Fortune path remains legacy/placeholder and isolated. |
| AI interpretation receives aggregate result | `/api/interpretation` explicit AI path | Profile save does not call AI. AI boundary remains a later production integration item. |

## Canonical Persisted Input

The profile save boundary now stores:

```text
localDate
localTime
birthTimeStatus
birthLocationText
timezoneId
timezoneConfirmationStatus
timeAdjustmentPolicy
timeAdjustmentPolicyVersion
inputPrecision
inputSource
inputSchemaVersion
```

Legacy fields are preserved for compatibility:

```text
birthDate
birthTime
birthLocation
birthTimezone
```

The canonical object lives on `ManagedBirthProfile.birthInput`, with readiness on `ManagedBirthProfile.inputReadiness`.

## Birth Time Status Rules

Supported statuses:

```text
KNOWN
UNKNOWN
APPROXIMATE
DISPUTED
```

Rules implemented:

- `KNOWN` requires valid local time.
- `UNKNOWN` rejects trusted local time.
- Missing legacy time maps to `UNKNOWN`.
- Ambiguous legacy `12:00` maps to `UNKNOWN` unless a future explicit status proves it is known.
- `APPROXIMATE` and `DISPUTED` preserve their status and mark hour-dependent outputs unavailable.

## Timezone Boundary

Implemented behavior:

- IANA timezone validation.
- Confirmation states: `CONFIRMED`, `SUGGESTED`, `UNRESOLVED`, `UNKNOWN`.
- Suggested timezone requires user confirmation.
- Unconfirmed timezone blocks time-sensitive readiness.
- Free-text location is not used for timezone resolution.
- No geocoding or historical timezone resolution is implemented.

## Readiness

Readiness returns structured states:

```text
READY
PARTIALLY_READY
BLOCKED_MISSING_TIMEZONE
BLOCKED_INVALID_INPUT
BLOCKED_METHODOLOGY_NOT_APPROVED
UNSUPPORTED_IN_V1
```

Because methodology approval has not passed, structurally valid confirmed inputs currently stop at `BLOCKED_METHODOLOGY_NOT_APPROVED`.

## Time Adjustment Policy

V1 profile persistence supports:

```text
LOCAL_CIVIL_TIME
```

`TRUE_SOLAR_TIME` remains unsupported in V1 and returns `UNSUPPORTED_IN_V1`.

## Non-Implementation

1A does not implement Four Pillars, Li Chun, solar terms, day/hour pillar logic, element weighting, identity derivation, daily timing, compatibility, AI interpretation, or Golden expected values.
