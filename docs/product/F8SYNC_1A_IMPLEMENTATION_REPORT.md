# F8SYNC 1A Implementation Report

**Milestone:** 1A - Birth Input and Timezone Foundation
**Date:** 2026-06-17
**Status:** Implemented and verified

## Summary

Milestone 1A adds canonical birth-input normalization, timezone suggestion boundaries, readiness assessment, additive persistence fields, profile API/service integration, minimal UI controls, and targeted tests.

No BaZi calculation methodology was implemented.

## Files Created

```text
src/core/profile/birth-input.ts
src/core/profile/timezone-suggestions.ts
src/core/profile/index.ts
migrations/0005_birth_input_foundation.sql
tests/unit/birth-input-foundation.test.ts
docs/product/F8SYNC_1A_BIRTH_INPUT_FOUNDATION.md
docs/product/F8SYNC_1A_LEGACY_INPUT_MIGRATION.md
docs/product/F8SYNC_1A_IMPLEMENTATION_REPORT.md
```

## Files Modified

```text
src/core/commercial/types.ts
src/core/commercial/schemas.ts
src/core/commercial/birth-profile-service.ts
src/app/api/birth-profiles/[id]/route.ts
src/ui/components/birth-profile-form.tsx
src/app/[locale]/analysis-workspace.tsx
docs/product/F8SYNC_IMPLEMENTATION_READINESS_MATRIX_V1.md
```

## Implementation Notes

- `birthInput` stores canonical input on saved birth profiles.
- `inputReadiness` stores structured readiness.
- `timezoneSuggestion` preserves a suggestion without confirming it.
- Existing legacy fields remain populated for backward compatibility.
- Profile save does not call fortune analysis, plugins, AI, usage consumption, or history creation.
- `src/core/index.ts` was not touched because it is already dirty; 1A uses `@/core/profile` directly.

## Verification Scope

Targeted tests cover:

- Known/unknown time validation.
- No `12:00` fallback.
- Approximate/disputed preservation.
- Optional location.
- IANA timezone validation.
- Suggested timezone remains unconfirmed.
- Confirmed timezone moves readiness to methodology block.
- True Solar Time unsupported.
- Ownership enforcement.
- No profile-save side effects for AI/calculation/history/usage.

## Verification Results

```text
pnpm test tests/unit/birth-input-foundation.test.ts
pnpm typecheck
pnpm test
```

All passed. `pnpm lint` did not complete because `next lint` opened an interactive ESLint configuration prompt in this Next.js version.

## Blocked After 1A

Calculation implementation remains blocked by Milestone 0D gate items:

- authoritative methodology source
- expert reviewer
- boundary rule approval
- Golden references
- rule version
- KT acceptance
