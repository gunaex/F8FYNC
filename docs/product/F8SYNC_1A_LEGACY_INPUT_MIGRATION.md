# F8SYNC 1A Legacy Input Migration

**Milestone:** 1A - Birth Input and Timezone Foundation
**Date:** 2026-06-17
**Status:** Additive migration strategy implemented

## Strategy

The 1A migration is additive. Existing legacy fields remain in place and new canonical fields are added beside them.

## Added Persistence Fields

```text
local_date
local_time
birth_time_status
birth_location_text
timezone_id
timezone_confirmation_status
time_adjustment_policy
time_adjustment_policy_version
input_precision
input_source
input_schema_version
input_readiness
timezone_suggestion
```

## Legacy Mapping

| Existing Record Shape | Canonical Mapping |
|---|---|
| Existing date + valid non-noon time | Candidate `KNOWN`, but timezone remains unconfirmed unless explicit confirmation evidence exists. |
| Existing missing time | `UNKNOWN`, `localTime: null`, `DATE_ONLY`. |
| Existing default or ambiguous `12:00` with no proof | `UNKNOWN`, not trusted as known time. |
| Existing timezone string | `timezoneId` candidate with `SUGGESTED` status, not confirmed. |
| Existing missing timezone | `timezoneId: null`, `timezoneConfirmationStatus: UNRESOLVED`. |
| Existing location text | `birthLocationText`, display only, not a trusted timezone resolver. |

## Prohibited Migration Behavior

- Do not drop existing birth data.
- Do not rewrite historical placeholder results.
- Do not convert blank time to `12:00`.
- Do not treat legacy timezone strings as user-confirmed.
- Do not derive timezone from free-text location.
- Do not persist calculation output in the input record.

## Runtime Mapping

Runtime mapping is implemented in `src/core/profile/birth-input.ts`.

Database migration is additive in:

```text
migrations/0005_birth_input_foundation.sql
```

## Review Notes

Legacy ambiguous data remains explicit as unknown, suggested, unresolved, or legacy-imported. Future production migration can add manual review tooling if needed.
