# F8SYNC Methodology Approval Workflow V1

**Milestone:** 0B - Methodology Lock and Intelligence Decision Pack  
**Date:** 2026-06-17  
**Status:** Draft workflow for approval  
**Decision Owner:** Product Owner - KT  

## Required Workflow

```text
Draft Decision
    ↓
Repository Evidence Review
    ↓
Product Owner Review
    ↓
Expert Validation where required
    ↓
Golden Reference Completion
    ↓
Decision Log Approval
    ↓
Rule Version Assigned
    ↓
Implementation Authorized
```

## Roles

| Role | Responsibility |
|---|---|
| Product Owner - KT | Owns product scope, user-facing policy, deferral decisions, and final implementation authorization. |
| BaZi Methodology Expert | Validates BaZi source, boundary rules, pillar calculations, element weighting, and Golden expected values. |
| Intelligence Core Lead | Owns contracts, traceability, versioning, deterministic implementation readiness, and regression process. |
| AI Policy Owner | Owns AI allowed-input policy, prompt/policy versioning, and interpretation boundary. |
| Content/Localization Owner | Owns narrative tokens, localized copy, disclaimers, and non-fear-based language. |

## Decision Routing

| Decision Area | KT Approval | Expert Validation | Notes |
|---|---:|---:|---|
| V1 product scope | Required | Optional | Includes deferring expansion engines and compatibility timing. |
| Birth input UX and unknown statuses | Required | Optional | Expert review needed only where status affects BaZi output. |
| Timezone source and IANA requirement | Required | Recommended | Technical resolver choice also needs engineering review. |
| Year/month/day/hour pillar rules | Required | Required | Do not implement before expert validation. |
| Li Chun and solar-term policy | Required | Required | Requires approved reference source. |
| True solar time policy | Required | Required if enabled | If disabled/deferred, record product decision. |
| Element weighting and seasonal strength | Required | Required | Blocks element balance implementation. |
| Identity dimensions and archetypes | Required | Required for BaZi-dependent derivation | Product naming also needs content review. |
| Daily timing derivation | Required | Required | Placeholder timing must not be promoted. |
| Compatibility | Required | Required when implemented | Deferred for first V1 engine. |
| AI boundary and data minimization | Required | Optional | AI cannot calculate regardless of provider. |
| Golden expected values | Required | Required | Expected values remain blank until reviewed. |

## Approval Artifacts

| Artifact | Required Before | Owner |
|---|---|---|
| Methodology decision register | 0C contract design | KT |
| BaZi calculation rulebook | BaZi engine implementation | KT + Expert |
| Intelligence boundary spec | 0C contract design | KT + Tech Lead |
| Golden test specification | 0C and Phase 1 planning | Tech Lead |
| Expert-reviewed Golden references | BaZi engine implementation | Expert + KT |
| Versioning policy | 0C contract design | Tech Lead + KT |
| Evidence/confidence model | Element balance and identity implementation | Expert + KT |
| AI allowed-input policy | Production AI interpretation | AI Policy Owner + KT |

## Decision Log Practice

`PROJECT_TRACKING.md` remains the active project tracking and decision log. Do not create a competing tracking file. Methodology approval entries should include:

- Date
- Decision ID
- Decision text
- Status
- Approver
- Expert reviewer if required
- Linked document
- Rule/version assigned
- Implementation authorization status

## Rule Version Assignment

Rule versions may be assigned only after:

1. Decision status is no longer pending.
2. Expert-required decisions have reviewer signoff.
3. Golden reference requirements are known.
4. Unknown behavior and failure behavior are documented.
5. The implementation owner confirms the rule can be tested.

## Implementation Authorization Gate

Implementation may begin only for components whose readiness status is `READY_FOR_CONTRACT_DESIGN` or later. Calculation implementation remains blocked when:

- The BaZi source is not selected.
- Boundary rules are pending expert validation.
- Expected Golden values are blank.
- Unknown behavior is not defined.
- Evidence/confidence model is not approved for the fields being implemented.

## Change Control

Any future methodology change must:

1. Create or update a decision record.
2. Identify affected rules and Golden Tests.
3. Assign a new rule or mapping version.
4. Produce a regression diff plan.
5. Preserve old result records with their original versions.
6. Receive KT approval before production rollout.
