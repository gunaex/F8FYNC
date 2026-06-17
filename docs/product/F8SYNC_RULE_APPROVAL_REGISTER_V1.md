# F8SYNC Rule Approval Register V1

**Milestone:** 0D - Expert Validation Pack and Methodology Source Gate
**Date:** 2026-06-17
**Status:** Blank approval register; no expert status recorded

## Expert Status Values

| Expert Status | Meaning |
|---|---|
| APPROVED | Expert accepts proposed rule as written with evidence. |
| APPROVED_WITH_CORRECTION | Expert accepts rule only with recorded correction. |
| REJECTED | Expert rejects rule for V1. |
| INSUFFICIENT_EVIDENCE | Rule cannot be approved with current evidence. |
| DEFERRED | Rule should not be in V1 or should wait for a later phase. |

## Approval Table

| Rule ID | Rule Name | Proposed Rule | Source | Expert Status | Expert Correction | Expert Evidence | Effective Rule Version | KT Acceptance |
|---|---|---|---|---|---|---|---|---|
| BZ-R007 | Historical Timezone Handling | Historical timezone behavior must be resolved by an approved source. | Draft rulebook; BIRTH-006; TIME-008 |  |  |  |  |  |
| BZ-R008 | Year Pillar Boundary | Year pillar boundary must be explicitly approved. | Draft rulebook; BAZI-002 |  |  |  |  |  |
| BZ-R009 | Li Chun Policy | Whether Li Chun controls year transition must be approved. | Draft rulebook; BAZI-003 |  |  |  |  |  |
| BZ-R010 | Month Pillar Boundary | Month pillar boundary method must be approved. | Draft rulebook; BAZI-004 |  |  |  |  |  |
| BZ-R011 | Solar Term Ownership | Solar terms must come from a governed source or algorithm. | Draft rulebook; BAZI-005 |  |  |  |  |  |
| BZ-R012 | Day Pillar Source | Day pillar must use an approved algorithm, table, or library. | Draft rulebook; BAZI-006 |  |  |  |  |  |
| BZ-R013 | Day Rollover Rule | Day transition rule, including 23:00 behavior, must be approved. | Draft rulebook; TIME-005; TIME-006 |  |  |  |  |  |
| BZ-R014 | Hour Pillar Known Time Only | Hour pillar is calculated only when birth time is known enough under the approved rule. | Draft rulebook; BAZI-007 |  |  |  |  |  |
| BZ-R016 | Heavenly Stem Representation | Stems use canonical enum codes with localized display labels. | Draft rulebook; BAZI-008 |  |  |  |  |  |
| BZ-R017 | Earthly Branch Representation | Branches use canonical enum codes with localized display labels. | Draft rulebook; BAZI-008 |  |  |  |  |  |
| BZ-R018 | Hidden Stems Scope | Hidden stems are included only after expert-approved mapping and weights. | Draft rulebook; BAZI-009 |  |  |  |  |  |
| BZ-R019 | Ten Gods Scope | Ten Gods are not automatically V1 unless approved. | Draft rulebook; BAZI-010 |  |  |  |  |  |
| BZ-R020 | Day Master Treatment | Day Master treatment must be defined before identity derivation depends on it. | Draft rulebook; BAZI-011 |  |  |  |  |  |
| BZ-R021 | Seasonal Strength | Seasonal strength is included only with approved weighting and evidence. | Draft rulebook; BAZI-012 |  |  |  |  |  |
| EB-R001 | Five Element Canon | V1 element balance uses Wood, Fire, Earth, Metal, Water canonical codes. | Draft rulebook; ELEM-001 |  |  |  |  |  |
| EB-R002 | Element Weighting | Visible stems, branches, hidden stems, and season weights must be expert approved. | Draft rulebook; ELEM-002 to ELEM-005 |  |  |  |  |  |
| EB-R003 | Element Normalization | Element balance may expose raw weights and normalized percentages after weight approval. | Draft rulebook; ELEM-006 |  |  |  |  |  |
| EB-R004 | Missing Element Interpretation | Missing or low element should not imply guaranteed outcomes. | Draft rulebook; ELEM-007 |  |  |  |  |  |
| IL-R001 | BaZi-to-F8SYNC Boundary | F8SYNC layer consumes approved structured BaZi output, not raw aggregate plugin scores. | Draft rulebook; INTEL-001; 0C contracts |  |  |  |  |  |
| IL-R002 | Identity Dimensions | Identity dimensions require KT-approved names and expert-compatible inputs. | Draft rulebook; INTEL-002 |  |  |  |  |  |
| IL-R003 | Archetype Matrix | Primary archetype must come from a deterministic rule matrix. | Draft rulebook; INTEL-005 |  |  |  |  |  |
| IL-R004 | Tie Breaking | Ties are resolved deterministically and disclosed. | Draft rulebook; INTEL-007 |  |  |  |  |  |
| DT-R001 | Daily Timing Source | Daily timing must be BaZi/calendar-derived, not a hash of current hour. | Draft rulebook; TIMING-001 |  |  |  |  |  |
| DT-R002 | Daily Unit | Daily timing is calculated for the user's local civil day. | Draft rulebook; TIMING-002; TIMING-003 |  |  |  |  |  |
| DT-R003 | Classification | V1 product classes are good, neutral, and caution; internal enum may preserve richer values. | Draft rulebook; TIMING-004 |  |  |  |  |  |
