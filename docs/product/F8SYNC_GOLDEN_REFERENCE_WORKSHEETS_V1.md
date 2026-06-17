# F8SYNC Golden Reference Worksheets V1

**Milestone:** 0D - Expert Validation Pack and Methodology Source Gate
**Date:** 2026-06-17
**Status:** Worksheet templates only; expected calculation fields intentionally blank

Expected pillars, intermediate values, element values, unknowns, and confidence must remain blank until a qualified expert records evidence and review metadata.

## Worksheet Fields

Each case uses:

```text
Case ID
Purpose
Input
Timezone
Input status
Boundary under test
Authoritative reference
Expected pillars
Expected intermediate values
Expected element values
Expected unknowns
Expected confidence
Expert reviewer
Review date
Approval status
Notes
```

## Worksheets

| Case ID | Purpose | Input | Timezone | Input status | Boundary under test | Authoritative reference | Expected pillars | Expected intermediate values | Expected element values | Expected unknowns | Expected confidence | Expert reviewer | Review date | Approval status | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| GT-BZ-001 | Normal known birth time | Local date/time to be supplied by expert | IANA timezone to be supplied | KNOWN | Standard calculation |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Must include full reproducibility metadata. |
| GT-BZ-002 | Unknown birth time | Local date, no local time | IANA timezone to be supplied | UNKNOWN | Unknown hour behavior |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Must confirm no fabricated hour or `12:00` fallback. |
| GT-BZ-003 | Approximate birth time | Local date and approximate local time | IANA timezone to be supplied | APPROXIMATE | Approximate-time confidence |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Must define which outputs are lowered or unavailable. |
| GT-BZ-004 | Before Li Chun | Date/time immediately before approved boundary | IANA timezone to be supplied | KNOWN | Year boundary before Li Chun if applicable |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Boundary instant must come from approved source. |
| GT-BZ-005 | After Li Chun | Date/time immediately after approved boundary | IANA timezone to be supplied | KNOWN | Year boundary after Li Chun if applicable |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Pair with GT-BZ-004. |
| GT-BZ-006 | Before solar-term month boundary | Date/time immediately before approved month boundary | IANA timezone to be supplied | KNOWN | Month boundary before solar term |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Solar-term source must be recorded. |
| GT-BZ-007 | After solar-term month boundary | Date/time immediately after approved month boundary | IANA timezone to be supplied | KNOWN | Month boundary after solar term |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Pair with GT-BZ-006. |
| GT-BZ-008 | Day rollover boundary | Case around approved day transition | IANA timezone to be supplied | KNOWN | Day rollover |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Must identify whether midnight, 23:00, or other rule applies. |
| GT-BZ-009 | 23:00 boundary | Case immediately before/after 23:00 | IANA timezone to be supplied | KNOWN | 23:00 behavior |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Must settle TIME-006. |
| GT-BZ-010 | Hour boundary | Case on both sides of an hour-pillar boundary | IANA timezone to be supplied | KNOWN | Hour pillar transition |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Must record hour derivation rule. |
| GT-BZ-011 | Timezone conversion | Same local data with resolver output | IANA timezone to be supplied | KNOWN | Timezone conversion |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Must record resolver version. |
| GT-BZ-012 | Historical timezone case | Historical local date/time | IANA timezone to be supplied | KNOWN | Historical offset/DST |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Must use approved timezone source. |
| GT-BZ-013 | Invalid input | Invalid date/time/timezone shape | Not applicable or invalid | INVALID | Input validation |  |  |  |  |  |  |  |  | PENDING_TECH_REVIEW | Expected behavior is structured blocking, not calculation. |
| GT-BZ-014 | Reproducibility | Same valid input repeated | IANA timezone to be supplied | KNOWN | Deterministic repeatability |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Runtime trace IDs may differ; deterministic payload must match. |
| GT-BZ-015 | Version comparison | Same input under two approved versions | IANA timezone to be supplied | KNOWN | Rule/version change |  |  |  |  |  |  |  |  | PENDING_EXPERT_VALIDATION | Diff must identify changed fields and reason. |

## Completion Rule

A worksheet is complete only when:

- Authoritative reference is recorded.
- Expected calculation fields are filled by or under direction of the expert.
- Reviewer, review date, and approval status are recorded.
- Rule, engine, resolver, evidence, and confidence versions are assigned.
- KT accepts the reviewed result set for implementation use.

## Prohibited Entries

- No current mock plugin output.
- No AI-generated expected value.
- No uncited boundary instant.
- No unversioned source.
- No filled expected field without review metadata.
