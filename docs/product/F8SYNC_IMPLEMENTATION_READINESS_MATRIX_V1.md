# F8SYNC Implementation Readiness Matrix V1

**Milestone:** 0B / 0C / 0D - Methodology Lock, Contracts, and Expert Validation Gate
**Date:** 2026-06-17
**Status:** Updated after Milestone 0D expert validation package

Readiness categories:

- `READY_FOR_CONTRACT_DESIGN`
- `CONTRACT_IMPLEMENTED`
- `READY_FOR_EXPERT_REVIEW`
- `BLOCKED_BY_PRODUCT_DECISION`
- `BLOCKED_BY_EXPERT_VALIDATION`
- `DEFERRED`
- `NOT_SUPPORTED_IN_V1`

## Deterministic Component Readiness

| Component | Readiness | Blocking Decisions | Reason | Next Action |
|---|---|---|---|---|
| V1 normalized birth input contract | CONTRACT_IMPLEMENTED | BIRTH-002, BIRTH-003, BIRTH-005 | 1A wires explicit unknown/status fields, no fabricated time, confirmed timezone state, and time-sensitive blocked states into profile persistence/API. | Future engine can consume canonical input after methodology approval. |
| Birth input UI copy | READY_FOR_CONTRACT_DESIGN | BIRTH-002, BIRTH-003, BIRTH-009 | KT approved unknown birth-time product behavior; conflicting input copy still needs detailed UX writing, not product direction. | Draft copy and validation states around known, unknown, approximate, disputed, and conflicting input. |
| IANA timezone validation and confirmation boundary | CONTRACT_IMPLEMENTED | TIME-003 | 1A validates IANA timezone IDs, stores confirmation status, and keeps suggestions unconfirmed until user confirmation. | Historical resolver remains expert-blocked. |
| Timezone suggestion boundary | CONTRACT_IMPLEMENTED | BIRTH-005, TIME-003 | 1A adds an isolated suggestion provider shape with source, confidence, and required user confirmation. | Add richer providers only after approval; no geocoding in V1 foundation. |
| Birth profile persistence/API foundation | CONTRACT_IMPLEMENTED | BIRTH-002, BIRTH-003, BIRTH-004, BIRTH-005, TIME-003, TIME-007 | 1A stores canonical birth input and readiness while preserving legacy fields. | Add production database adapter if repository moves beyond memory-store persistence. |
| Historical timezone resolver | READY_FOR_EXPERT_REVIEW | BIRTH-006, TIME-008 | 0D package provides source-selection matrix, questionnaire, and Golden worksheet for historical timezone behavior. | Expert selects/validates resolver source; implementation remains blocked until approved. |
| Calendar resolver boundary | READY_FOR_EXPERT_REVIEW | TIME-002, BAZI-005 | 0D package captures resolver ownership, solar-term source, and conflict policy. | Expert validates source and boundary fixtures before implementation. |
| Solar-term service | READY_FOR_EXPERT_REVIEW | BAZI-003, BAZI-004, BAZI-005 | 0D package provides source matrix and boundary worksheets; no source selected yet. | Expert validates solar-term source and Golden cases. |
| Year pillar calculator | READY_FOR_EXPERT_REVIEW | BAZI-002, BAZI-003 | 0D questionnaire covers year boundary and Li Chun policy. | Expert approves rule and Golden before/after cases before implementation. |
| Month pillar calculator | READY_FOR_EXPERT_REVIEW | BAZI-004, BAZI-005 | 0D questionnaire covers month boundary and solar-term source. | Expert approves rule and solar-term month worksheets. |
| Day pillar calculator | READY_FOR_EXPERT_REVIEW | BAZI-006, TIME-005, TIME-006 | 0D questionnaire covers day source, rollover, and 23:00 behavior. | Expert approves algorithm/source and boundary rule before implementation. |
| Hour pillar calculator | READY_FOR_EXPERT_REVIEW | BAZI-007, BZ-R014 | 0D package covers hour derivation, unknown time, and approximate time worksheets. | Expert validates hour rule; no implementation until approved. |
| Heavenly Stem / Earthly Branch canonical codes | READY_FOR_CONTRACT_DESIGN | BAZI-008 | Enum contract can be drafted without calculating values. | Define canonical code and label-key shape. |
| Hidden stems | READY_FOR_EXPERT_REVIEW | BAZI-009 | 0D package asks whether hidden stems are required internally and what mapping applies. | Expert approves mapping/weights or defers. |
| Ten Gods | READY_FOR_CONTRACT_DESIGN | BAZI-010 | KT approved that Ten Gods should not be user-facing in MVP unless expert-required for core derivation. | Keep out of MVP presentation contract; allow optional internal evidence field only if expert later requires it. |
| Day Master | READY_FOR_EXPERT_REVIEW | BAZI-011 | 0D package asks how Day Master should be treated and what evidence is required. | Expert approves treatment after day pillar source is approved. |
| Seasonal strength | READY_FOR_EXPERT_REVIEW | BAZI-012, ELEM-005 | 0D package covers seasonal context, strength, and source evidence. | Expert approves strength method or defers. |
| Element canon | READY_FOR_CONTRACT_DESIGN | ELEM-001 | Five-element enum exists and can be formalized. | Add V1 canonical contract later. |
| Element weighting model | READY_FOR_EXPERT_REVIEW | ELEM-002, ELEM-003, ELEM-004, ELEM-005 | 0D package separates visible stem, branch, hidden stem, and seasonal weighting questions. | Expert validates weights; implementation remains blocked until approved. |
| Element normalization | READY_FOR_CONTRACT_DESIGN | ELEM-006 | Shape can include raw and normalized values with pending model. | Design output schema with empty/unknown support. |
| Evidence model | CONTRACT_IMPLEMENTED | INTEL-009 | 0C added coded evidence structure with source layer, rule ID, input references, description token, and status. | Add approved taxonomy entries after expert validation. |
| Confidence model | CONTRACT_IMPLEMENTED | ELEM-008, VER-001 | 0C added confidence level, reasons, and missing dependency fields independent of positive/negative result meaning. | Add approved confidence thresholds after methodology validation. |
| Calculation trace | CONTRACT_IMPLEMENTED | VER-001 | 0C added trace ID, calculated time, input fingerprint, versions, steps, warnings, assumptions, and unknown fields. | Persist trace references after storage changes are planned. |
| Engine/rule/version registry | CONTRACT_IMPLEMENTED | VER-001 | 0C added required engine, rule, input schema, result schema, and policy version fields. | Expand registry ownership after methodology source selection. |
| F8SYNC Intelligence Layer input contract | CONTRACT_IMPLEMENTED | INTEL-001 | 0C contract requires approved foundation output and supports partial states. | Fill derivation rules only after expert validation. |
| Identity dimensions | READY_FOR_EXPERT_REVIEW | INTEL-002 | 0D package asks which dimensions can validly derive from approved BaZi/element evidence. | Expert validates compatible dimensions before derivation rules are implemented. |
| Strength indicators | READY_FOR_EXPERT_REVIEW | INTEL-003 | 0D package asks for evidence dependencies and derivation boundaries. | Expert validates source rules. |
| Tension indicators | READY_FOR_CONTRACT_DESIGN | INTEL-004 | Evidence-coded shape can be designed. | Define output shape without unapproved formulas. |
| Primary archetype derivation | READY_FOR_EXPERT_REVIEW | INTEL-005 | 0D package asks what inputs and thresholds allow archetype output. | Expert validates matrix inputs before implementation. |
| Secondary influence | READY_FOR_EXPERT_REVIEW | INTEL-006 | 0D package covers secondary threshold and confidence behavior. | Expert validates threshold rules before implementation. |
| Archetype tie-breaking | READY_FOR_CONTRACT_DESIGN | INTEL-007 | Deterministic tie shape can be designed. | Include tie evidence in contract. |
| Narrative tokens | READY_FOR_CONTRACT_DESIGN | INTEL-010 | Token shape can be defined without final copy. | Draft token contract and unknown tokens. |
| Daily timing engine | READY_FOR_EXPERT_REVIEW | TIMING-001, TIMING-002 | 0D package asks what approved inputs drive daily timing and daily interaction rules. | Expert validates timing methodology; do not implement calculations yet. |
| Daily timing UI/calendar | READY_FOR_EXPERT_REVIEW | TIMING-003, TIMING-004, TIMING-006 | 0D package distinguishes timezone/cache product constraints from timing derivation rules. | Expert validates timing rules; KT handles remaining copy/product items. |
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
| CONTRACT_IMPLEMENTED | 11 | Birth input contract, IANA validation/confirmation, timezone suggestion boundary, birth profile persistence/API foundation, evidence, confidence, trace, version set, F8SYNC boundary, generic result envelope, AI minimized input |
| READY_FOR_CONTRACT_DESIGN | 8 | Birth input UX states, canonical codes, Ten Gods presentation boundary, element output shapes, tension/tie/narrative contracts, AI audit contracts |
| READY_FOR_EXPERT_REVIEW | 17 | Historical timezone, calendar resolver source, solar terms, pillars, hidden stems, Day Master, seasonal strength, element weighting, identity dimensions/archetype derivation, daily timing |
| BLOCKED_BY_PRODUCT_DECISION | 1 | Notifications from timing |
| BLOCKED_BY_EXPERT_VALIDATION | 17 | Same components listed as ready for expert review remain blocked for implementation until expert evidence, Golden references, rule versions, and KT acceptance are recorded |
| DEFERRED | 5 | Compatibility, numerology, Thai astrology, Western astrology, physical products |
| NOT_SUPPORTED_IN_V1 | 2 | Tarot/randomized experiences as core, palmistry |

## Recommended Next Milestone

**Expert Methodology Validation / Phase 1A Preparation**

Use the 0D expert validation package to select sources, answer review questions, approve or correct rules, complete Golden worksheets, and satisfy the validation gate. Do not implement calculation algorithms until the gate report marks calculation implementation ready.
