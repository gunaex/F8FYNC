# F8SYNC Implementation Readiness Matrix V1

**Milestone:** 0B / 0C - Methodology Lock and Intelligence Contract Baseline
**Date:** 2026-06-17  
**Status:** Updated after Milestone 0C contract implementation

Readiness categories:

- `READY_FOR_CONTRACT_DESIGN`
- `CONTRACT_IMPLEMENTED`
- `BLOCKED_BY_PRODUCT_DECISION`
- `BLOCKED_BY_EXPERT_VALIDATION`
- `DEFERRED`
- `NOT_SUPPORTED_IN_V1`

## Deterministic Component Readiness

| Component | Readiness | Blocking Decisions | Reason | Next Action |
|---|---|---|---|---|
| V1 normalized birth input contract | CONTRACT_IMPLEMENTED | BIRTH-002, BIRTH-003, BIRTH-005 | 0C added explicit unknown/status fields, no fabricated time, confirmed timezone state, and time-sensitive blocked states. | Wire into profile/API flows after schema migration plan is approved. |
| Birth input UI copy | READY_FOR_CONTRACT_DESIGN | BIRTH-002, BIRTH-003, BIRTH-009 | KT approved unknown birth-time product behavior; conflicting input copy still needs detailed UX writing, not product direction. | Draft copy and validation states around known, unknown, approximate, disputed, and conflicting input. |
| IANA timezone validation contract | CONTRACT_IMPLEMENTED | TIME-003 | 0C added IANA validation and confirmed-timezone readiness blocking without selecting a final resolver implementation. | Wire into UI/API normalization later; historical resolver remains expert-blocked. |
| Historical timezone resolver | BLOCKED_BY_EXPERT_VALIDATION | BIRTH-006, TIME-008 | Needs authoritative resolver/source and historical behavior validation. | Select resolver/source and expert review cases. |
| Calendar resolver boundary | BLOCKED_BY_EXPERT_VALIDATION | TIME-002, BAZI-005 | KT approved confirmed IANA timezone and disabled True Solar Time in V1; resolver source and solar-term behavior still need expert validation. | Design boundary contract only; select implementation after expert criteria. |
| Solar-term service | BLOCKED_BY_EXPERT_VALIDATION | BAZI-003, BAZI-004, BAZI-005 | Requires approved solar-term source or algorithm. | Expert validates source and boundary fixtures. |
| Year pillar calculator | BLOCKED_BY_EXPERT_VALIDATION | BAZI-002, BAZI-003 | Year boundary/Li Chun decision pending. | Complete expert validation and Golden cases. |
| Month pillar calculator | BLOCKED_BY_EXPERT_VALIDATION | BAZI-004, BAZI-005 | Month boundary and solar terms pending. | Complete solar-term decision. |
| Day pillar calculator | BLOCKED_BY_EXPERT_VALIDATION | BAZI-006, TIME-005, TIME-006 | Source and rollover rule pending. | Expert approves algorithm/source and boundary rule. |
| Hour pillar calculator | BLOCKED_BY_EXPERT_VALIDATION | BAZI-007, BZ-R014 | Known-time rule and unknown behavior need approval. | Expert validates hour rule; KT approves unknown disclosure. |
| Heavenly Stem / Earthly Branch canonical codes | READY_FOR_CONTRACT_DESIGN | BAZI-008 | Enum contract can be drafted without calculating values. | Define canonical code and label-key shape. |
| Hidden stems | BLOCKED_BY_EXPERT_VALIDATION | BAZI-009 | Mapping and weights pending. | Expert approves mapping or defers. |
| Ten Gods | READY_FOR_CONTRACT_DESIGN | BAZI-010 | KT approved that Ten Gods should not be user-facing in MVP unless expert-required for core derivation. | Keep out of MVP presentation contract; allow optional internal evidence field only if expert later requires it. |
| Day Master | BLOCKED_BY_EXPERT_VALIDATION | BAZI-011 | Depends on day pillar source. | Expert approves day pillar and Day Master treatment. |
| Seasonal strength | BLOCKED_BY_EXPERT_VALIDATION | BAZI-012, ELEM-005 | Requires month/season methodology. | Expert approves weighting. |
| Element canon | READY_FOR_CONTRACT_DESIGN | ELEM-001 | Five-element enum exists and can be formalized. | Add V1 canonical contract later. |
| Element weighting model | BLOCKED_BY_EXPERT_VALIDATION | ELEM-002, ELEM-003, ELEM-004, ELEM-005 | Current identity score mapping is not valid V1 methodology. | Expert validates weights. |
| Element normalization | READY_FOR_CONTRACT_DESIGN | ELEM-006 | Shape can include raw and normalized values with pending model. | Design output schema with empty/unknown support. |
| Evidence model | CONTRACT_IMPLEMENTED | INTEL-009 | 0C added coded evidence structure with source layer, rule ID, input references, description token, and status. | Add approved taxonomy entries after expert validation. |
| Confidence model | CONTRACT_IMPLEMENTED | ELEM-008, VER-001 | 0C added confidence level, reasons, and missing dependency fields independent of positive/negative result meaning. | Add approved confidence thresholds after methodology validation. |
| Calculation trace | CONTRACT_IMPLEMENTED | VER-001 | 0C added trace ID, calculated time, input fingerprint, versions, steps, warnings, assumptions, and unknown fields. | Persist trace references after storage changes are planned. |
| Engine/rule/version registry | CONTRACT_IMPLEMENTED | VER-001 | 0C added required engine, rule, input schema, result schema, and policy version fields. | Expand registry ownership after methodology source selection. |
| F8SYNC Intelligence Layer input contract | CONTRACT_IMPLEMENTED | INTEL-001 | 0C contract requires approved foundation output and supports partial states. | Fill derivation rules only after expert validation. |
| Identity dimensions | BLOCKED_BY_EXPERT_VALIDATION | INTEL-002 | KT approved V1 presentation scope, but derivation rules still require expert validation. | Design output slots for element balance, identity orientation, strength/tension summary, confidence, and unknown disclosure. |
| Strength indicators | BLOCKED_BY_EXPERT_VALIDATION | INTEL-003 | Must derive from approved evidence. | Expert validates source rules. |
| Tension indicators | READY_FOR_CONTRACT_DESIGN | INTEL-004 | Evidence-coded shape can be designed. | Define output shape without unapproved formulas. |
| Primary archetype derivation | BLOCKED_BY_EXPERT_VALIDATION | INTEL-005 | KT approved one primary archetype only when evidence and confidence are sufficient; derivation rules remain unvalidated. | Design primary role, evidence, confidence, and unavailable state contracts. |
| Secondary influence | BLOCKED_BY_EXPERT_VALIDATION | INTEL-006 | KT approved optional secondary influence only above approved confidence threshold; threshold rules remain unvalidated. | Design optional secondary role and threshold metadata. |
| Archetype tie-breaking | READY_FOR_CONTRACT_DESIGN | INTEL-007 | Deterministic tie shape can be designed. | Include tie evidence in contract. |
| Narrative tokens | READY_FOR_CONTRACT_DESIGN | INTEL-010 | Token shape can be defined without final copy. | Draft token contract and unknown tokens. |
| Daily timing engine | BLOCKED_BY_EXPERT_VALIDATION | TIMING-001, TIMING-002 | Current timing plugin is mock; real rules pending. | Expert validates timing methodology. |
| Daily timing UI/calendar | BLOCKED_BY_EXPERT_VALIDATION | TIMING-003, TIMING-004, TIMING-006 | KT approved confirmed timezone and deterministic cache-key behavior; daily timing derivation still requires expert validation. | Design display/cache contract only; do not implement timing calculations yet. |
| Notifications from timing | BLOCKED_BY_PRODUCT_DECISION | TIMING-005 | Eligibility and safety policy pending. | Defer until timing engine passes Golden tests. |
| Compatibility V1 | DEFERRED | COMPAT-001, COMPAT-002, COMPAT-003 | Not required for first deterministic engine. | Keep as later roadmap item. |
| Numerology | DEFERRED | EXP-001 | Outside V1 core. | Preserve as expansion backlog/legacy placeholder. |
| Thai astrology | DEFERRED | EXP-001 | Separate methodology. | Keep catalog-only until future admission review. |
| Western astrology | DEFERRED | EXP-001 | Separate ephemeris model. | Keep catalog-only until future admission review. |
| Tarot/randomized experiences | NOT_SUPPORTED_IN_V1 | EXP-001, EXP-002 | Not equivalent to deterministic BaZi core. | Keep deferred experience module. |
| Palmistry | NOT_SUPPORTED_IN_V1 | EXP-003 | Input quality and confidence model absent. | Research only after V1. |
| Physical products/3D commerce | DEFERRED | EXP-002 | Digital core must be validated first. | Preserve docs as backlog. |
| AI minimized input contract | CONTRACT_IMPLEMENTED | AI-002 | 0C added minimized AI input object with evidence, confidence, unknown fields, allowed/prohibited topics, versions, trace reference, and narrative tokens. | Route production interpretation through this object in a later AI milestone. |
| AI production interpretation | READY_FOR_CONTRACT_DESIGN | AI-002, VER-001 | KT approved minimized AI input and privacy-safe audit boundary with controlled debug-only payload logging. | Implementation remains later; 0C only defined the allowed input object. |

## Implementation Authorization Summary

| Status | Count | Components |
|---|---:|---|
| CONTRACT_IMPLEMENTED | 9 | Birth input contract, IANA validation, evidence, confidence, trace, version set, F8SYNC boundary, generic result envelope, AI minimized input |
| READY_FOR_CONTRACT_DESIGN | 8 | Birth input UX states, canonical codes, Ten Gods presentation boundary, element output shapes, tension/tie/narrative contracts, AI audit contracts |
| BLOCKED_BY_PRODUCT_DECISION | 1 | Notifications from timing |
| BLOCKED_BY_EXPERT_VALIDATION | 17 | Historical timezone, calendar resolver source, solar terms, pillars, hidden stems, Day Master, seasonal strength, element weighting, identity dimensions/archetype derivation, daily timing |
| DEFERRED | 5 | Compatibility, numerology, Thai astrology, Western astrology, physical products |
| NOT_SUPPORTED_IN_V1 | 2 | Tarot/randomized experiences as core, palmistry |

## Recommended Next Milestone

**Expert Methodology Validation / Phase 1A Preparation**

Proceed only with expert validation, approved methodology sources, and Golden Test fixture review before implementing calculation algorithms. The 0C contracts preserve pending methodology as unknown, deferred, unsupported, or expert-required.
