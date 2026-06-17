# F8SYNC Expert Validation Pack V1

**Milestone:** 0D - Expert Validation Pack and Methodology Source Gate
**Date:** 2026-06-17
**Status:** Ready for expert review; no expert approval recorded

## Purpose

This pack gives a qualified BaZi methodology expert a concise review surface for the methodology decisions that block deterministic implementation. It summarizes the required validation areas and links each area to the source decision register, draft rulebook, Golden reference worksheets, and approval gate.

This pack does not select a methodology source, fill Golden expected values, approve rules, or implement calculation code.

## Review Inputs

| Document | Use in Expert Review |
|---|---|
| `F8SYNC_METHODOLOGY_DECISION_REGISTER_V1.md` | Source decision IDs and current statuses. |
| `F8SYNC_BAZI_CALCULATION_RULEBOOK_DRAFT_V1.md` | Draft rule IDs and proposed rule boundaries. |
| `F8SYNC_INTELLIGENCE_LAYER_BOUNDARY_V1.md` | Layer ownership and AI/formatting boundaries. |
| `F8SYNC_GOLDEN_TEST_SPECIFICATION_V1.md` | Existing Golden Test structure and prohibited practices. |
| `F8SYNC_INTELLIGENCE_CONTRACTS_V1.md` | Implemented 0C contract boundaries. |
| `F8SYNC_METHODOLOGY_SOURCE_SELECTION_V1.md` | Source selection matrix. |
| `F8SYNC_EXPERT_REVIEW_QUESTIONNAIRE_V1.md` | Actionable expert questions. |
| `F8SYNC_RULE_APPROVAL_REGISTER_V1.md` | Blank rule approval table for expert completion. |
| `F8SYNC_GOLDEN_REFERENCE_WORKSHEETS_V1.md` | Blank Golden worksheets for expected values. |
| `F8SYNC_EXPERT_REVIEW_AND_CONFLICT_POLICY_V1.md` | Reviewer qualification and conflict policy. |
| `F8SYNC_0D_VALIDATION_GATE_REPORT.md` | Gate status before implementation. |

## Product Decisions Held Fixed

The following Product Owner decisions are locked unless the expert identifies a direct methodological conflict:

- Unknown birth time is allowed and must not be replaced by noon or any fabricated time.
- Birth time statuses are `KNOWN`, `UNKNOWN`, `APPROXIMATE`, and `DISPUTED`.
- Confirmed IANA timezone is required for time-sensitive calculation.
- Free-text location is not a trusted timezone resolver.
- True Solar Time is disabled in V1, with a versioned policy field preserved.
- Compatibility is deferred from the first deterministic engine.
- AI explains only; it does not calculate deterministic results.
- Legacy and placeholder outputs must not be treated as approved V1 results.
- Golden expected values remain blank until expert-reviewed references exist.

## Expert-Required Decision Inventory

### BaZi Foundation

| Area | Decision IDs | Review Need | Current Status |
|---|---|---|---|
| Authoritative methodology source | BAZI-001 | Select or approve source path, reviewer, boundary rules, and evidence expectations. | PENDING_EXPERT_VALIDATION |
| Historical timezone behavior | BIRTH-006, TIME-008 | Confirm source for historical offsets and daylight-saving behavior. | PENDING_EXPERT_VALIDATION |
| Calendar resolver ownership | TIME-002, BAZI-005 | Confirm resolver/source responsibilities and version evidence. | Product + expert open |
| Year boundary | BAZI-002 | Decide boundary rule and required reference cases. | PENDING_EXPERT_VALIDATION |
| Li Chun handling | BAZI-003 | Decide whether and how Li Chun governs year transition. | PENDING_EXPERT_VALIDATION |
| Month boundary | BAZI-004, BAZI-005 | Decide solar-term or alternate month-boundary rule and source. | PENDING_EXPERT_VALIDATION |
| Day pillar source | BAZI-006 | Approve algorithm, table, or independently validated reference. | PENDING_EXPERT_VALIDATION |
| Day rollover | TIME-005, TIME-006 | Approve day transition rule, including 23:00 behavior. | PENDING_EXPERT_VALIDATION |
| Hour pillar derivation | BAZI-007, BZ-R014 | Approve hour rule, unknown-time omission behavior, and approximate-time handling. | PENDING_EXPERT_VALIDATION |

### BaZi Structure

| Area | Decision IDs | Review Need | Current Status |
|---|---|---|---|
| Heavenly Stems representation | BAZI-008, BZ-R016 | Confirm canonical codes and localized labels. | PROPOSED / ready for expert review |
| Earthly Branches representation | BAZI-008, BZ-R017 | Confirm canonical codes and localized labels. | PROPOSED / ready for expert review |
| Hidden stems | BAZI-009, BZ-R018 | Decide whether required internally, and approve mapping/weights if included. | PENDING_EXPERT_VALIDATION |
| Ten Gods | BAZI-010, BZ-R019 | Decide whether required for approved core derivation, not necessarily user-facing. | PENDING_EXPERT_VALIDATION |
| Day Master | BAZI-011, BZ-R020 | Approve output, dependencies, and treatment. | PENDING_EXPERT_VALIDATION |
| Seasonal context and strength | BAZI-012, BZ-R021 | Approve seasonal source and strength assessment rule. | PENDING_EXPERT_VALIDATION |
| V1 exclusions | BAZI-013, EXP-001, EXP-002, EXP-003 | Confirm no conflict with deferred non-BaZi scope. | LOCKED by KT unless conflict found |

### Element Balance

| Area | Decision IDs | Review Need | Current Status |
|---|---|---|---|
| Five-element canon | ELEM-001, EB-R001 | Confirm canonical element set and relation to BaZi outputs. | PROPOSED |
| Visible stem weighting | ELEM-002, ELEM-003, EB-R002 | Approve or reject weight contribution. | PENDING_EXPERT_VALIDATION |
| Branch weighting | ELEM-002, ELEM-004, EB-R002 | Approve or reject branch contribution. | PENDING_EXPERT_VALIDATION |
| Hidden stem weighting | ELEM-004, BAZI-009, EB-R002 | Approve mapping and weighting if hidden stems are included. | PENDING_EXPERT_VALIDATION |
| Seasonal adjustment | ELEM-005, BAZI-012, EB-R002 | Approve adjustment source and formula. | PENDING_EXPERT_VALIDATION |
| Normalization | ELEM-006, EB-R003 | Approve output shape after weighting model exists. | PENDING_EXPERT_VALIDATION |
| Missing-element interpretation | ELEM-007, EB-R004 | Confirm boundaries for cautious reflection without deterministic overclaiming. | PENDING_EXPERT_VALIDATION |
| Confidence behavior | ELEM-008 | Approve confidence impact of unknown/approximate time and missing dependencies. | PROPOSED / expert review needed |

### F8SYNC Intelligence Layer

| Area | Decision IDs | Review Need | Current Status |
|---|---|---|---|
| Permitted deterministic inputs | INTEL-001, IL-R001 | Confirm F8SYNC layer consumes approved structured BaZi output only. | CONTRACT_IMPLEMENTED boundary; rules pending |
| Identity dimensions | INTEL-002, IL-R002 | Validate whether selected dimensions are compatible with approved inputs. | PENDING_EXPERT_VALIDATION |
| Strength/tension derivation | INTEL-003, INTEL-004 | Approve evidence dependencies and derivation boundaries. | PENDING_EXPERT_VALIDATION / PROPOSED |
| Archetype derivation inputs | INTEL-005, IL-R003 | Approve inputs needed before primary archetype can be emitted. | PENDING_EXPERT_VALIDATION |
| Primary/secondary rules | INTEL-005, INTEL-006 | Approve selection and threshold rules. | PENDING_EXPERT_VALIDATION |
| Tie-breaking | INTEL-007, IL-R004 | Confirm deterministic tie policy does not hide uncertainty. | PROPOSED |
| Incomplete-result behavior | INTEL-008 | Confirm partial, incomplete, and unavailable behavior. | PENDING_EXPERT_VALIDATION |
| Confidence thresholds | INTEL-008, ELEM-008 | Approve thresholds only after evidence model is validated. | PENDING_EXPERT_VALIDATION |

### Daily Timing

| Area | Decision IDs | Review Need | Current Status |
|---|---|---|---|
| Timing source inputs | TIMING-001, DT-R001 | Approve BaZi/calendar-derived source inputs. | PENDING_EXPERT_VALIDATION |
| Daily unit and calendar reproducibility | TIMING-002, TIMING-003, TIMING-006, DT-R002 | Confirm local day, timezone, cache key, and version requirements. | Product partially locked; methodology pending |
| Day interaction rules | TIMING-001, TIMING-002 | Approve daily interaction method. | PENDING_EXPERT_VALIDATION |
| Classification boundary | TIMING-004, DT-R003 | Confirm mapping from methodology signal to product labels. | PROPOSED / copy pending |
| Support/neutral/caution mapping | TIMING-004, DT-R003 | Approve non-fear-based classification thresholds after method exists. | PROPOSED |
| Confidence behavior | TIMING-001, INTEL-008 | Confirm unknown prerequisites and low confidence behavior. | PENDING_EXPERT_VALIDATION |

## Expert Review Outputs Required

The expert should return:

- Completed source-selection recommendation or correction.
- Completed questionnaire answers with evidence/citation.
- Completed rule approval table for blocking rules.
- Golden worksheet expected values for approved cases only.
- Conflict notes where a product decision conflicts with methodology.
- Recommendation on which items are ready for implementation, still blocked, or deferred.

## Non-Goals

- No source is selected by this document.
- No third-party library is accepted as authority by convenience.
- No Golden expected value is filled.
- No expert approval is claimed.
- No calculation code should be written from this pack until the validation gate passes.
