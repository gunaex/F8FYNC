# F8SYNC Implementation Readiness Matrix V1

**Milestone:** 0B - Methodology Lock and Intelligence Decision Pack  
**Date:** 2026-06-17  
**Status:** Draft readiness assessment  

Readiness categories:

- `READY_FOR_CONTRACT_DESIGN`
- `BLOCKED_BY_PRODUCT_DECISION`
- `BLOCKED_BY_EXPERT_VALIDATION`
- `DEFERRED`
- `NOT_SUPPORTED_IN_V1`

## Deterministic Component Readiness

| Component | Readiness | Blocking Decisions | Reason | Next Action |
|---|---|---|---|---|
| V1 normalized birth input contract | READY_FOR_CONTRACT_DESIGN | BIRTH-002, BIRTH-003, BIRTH-005 | Structure can be designed while preserving pending policy fields. | Draft types with explicit unknown/status fields in 0C after KT review. |
| Birth input UI copy | BLOCKED_BY_PRODUCT_DECISION | BIRTH-002, BIRTH-003, BIRTH-009 | User-facing unknown/approximate/disputed wording needs KT approval. | KT reviews birth input policy. |
| IANA timezone validation contract | READY_FOR_CONTRACT_DESIGN | TIME-003 | Contract can require IANA without selecting final resolver implementation. | Define validator interface in 0C. |
| Historical timezone resolver | BLOCKED_BY_EXPERT_VALIDATION | BIRTH-006, TIME-008 | Needs authoritative resolver/source and historical behavior validation. | Select resolver/source and expert review cases. |
| Calendar resolver boundary | BLOCKED_BY_PRODUCT_DECISION | TIME-002, BAZI-005 | Ownership/source not approved. | KT selects resolver ownership path. |
| Solar-term service | BLOCKED_BY_EXPERT_VALIDATION | BAZI-003, BAZI-004, BAZI-005 | Requires approved solar-term source or algorithm. | Expert validates source and boundary fixtures. |
| Year pillar calculator | BLOCKED_BY_EXPERT_VALIDATION | BAZI-002, BAZI-003 | Year boundary/Li Chun decision pending. | Complete expert validation and Golden cases. |
| Month pillar calculator | BLOCKED_BY_EXPERT_VALIDATION | BAZI-004, BAZI-005 | Month boundary and solar terms pending. | Complete solar-term decision. |
| Day pillar calculator | BLOCKED_BY_EXPERT_VALIDATION | BAZI-006, TIME-005, TIME-006 | Source and rollover rule pending. | Expert approves algorithm/source and boundary rule. |
| Hour pillar calculator | BLOCKED_BY_EXPERT_VALIDATION | BAZI-007, BZ-R014 | Known-time rule and unknown behavior need approval. | Expert validates hour rule; KT approves unknown disclosure. |
| Heavenly Stem / Earthly Branch canonical codes | READY_FOR_CONTRACT_DESIGN | BAZI-008 | Enum contract can be drafted without calculating values. | Define canonical code and label-key shape. |
| Hidden stems | BLOCKED_BY_EXPERT_VALIDATION | BAZI-009 | Mapping and weights pending. | Expert approves mapping or defers. |
| Ten Gods | BLOCKED_BY_PRODUCT_DECISION | BAZI-010 | V1 inclusion not approved. | KT decides include/defer after expert input. |
| Day Master | BLOCKED_BY_EXPERT_VALIDATION | BAZI-011 | Depends on day pillar source. | Expert approves day pillar and Day Master treatment. |
| Seasonal strength | BLOCKED_BY_EXPERT_VALIDATION | BAZI-012, ELEM-005 | Requires month/season methodology. | Expert approves weighting. |
| Element canon | READY_FOR_CONTRACT_DESIGN | ELEM-001 | Five-element enum exists and can be formalized. | Add V1 canonical contract later. |
| Element weighting model | BLOCKED_BY_EXPERT_VALIDATION | ELEM-002, ELEM-003, ELEM-004, ELEM-005 | Current identity score mapping is not valid V1 methodology. | Expert validates weights. |
| Element normalization | READY_FOR_CONTRACT_DESIGN | ELEM-006 | Shape can include raw and normalized values with pending model. | Design output schema with empty/unknown support. |
| Evidence model | READY_FOR_CONTRACT_DESIGN | INTEL-009 | Coded evidence structure can be defined before formulas. | Draft evidence taxonomy in 0C. |
| Confidence model | READY_FOR_CONTRACT_DESIGN | ELEM-008, VER-001 | Confidence reasons can be structured before numeric policies are final. | Define confidence fields and unknown adjustments. |
| Calculation trace | READY_FOR_CONTRACT_DESIGN | VER-001 | Trace object is methodology-neutral. | Define trace ID and step references in 0C. |
| Engine/rule/version registry | READY_FOR_CONTRACT_DESIGN | VER-001 | Required for all later work. | Define version metadata contract. |
| F8SYNC Intelligence Layer input contract | READY_FOR_CONTRACT_DESIGN | INTEL-001 | Can require approved BaZi output and partial states. | Draft boundary interfaces in 0C. |
| Identity dimensions | BLOCKED_BY_PRODUCT_DECISION | INTEL-002 | KT must approve dimensions and naming. | Review identity dimension proposal. |
| Strength indicators | BLOCKED_BY_EXPERT_VALIDATION | INTEL-003 | Must derive from approved evidence. | Expert validates source rules. |
| Tension indicators | READY_FOR_CONTRACT_DESIGN | INTEL-004 | Evidence-coded shape can be designed. | Define output shape without unapproved formulas. |
| Primary archetype derivation | BLOCKED_BY_PRODUCT_DECISION | INTEL-005 | Rule matrix not approved. | KT and expert review archetype matrix proposal. |
| Secondary influence | BLOCKED_BY_PRODUCT_DECISION | INTEL-006 | Threshold/tie/display policy pending. | KT approves role policy. |
| Archetype tie-breaking | READY_FOR_CONTRACT_DESIGN | INTEL-007 | Deterministic tie shape can be designed. | Include tie evidence in contract. |
| Narrative tokens | READY_FOR_CONTRACT_DESIGN | INTEL-010 | Token shape can be defined without final copy. | Draft token contract and unknown tokens. |
| Daily timing engine | BLOCKED_BY_EXPERT_VALIDATION | TIMING-001, TIMING-002 | Current timing plugin is mock; real rules pending. | Expert validates timing methodology. |
| Daily timing UI/calendar | BLOCKED_BY_PRODUCT_DECISION | TIMING-003, TIMING-004, TIMING-006 | Timezone, labels, cache policy pending. | KT reviews daily timing product policy. |
| Notifications from timing | BLOCKED_BY_PRODUCT_DECISION | TIMING-005 | Eligibility and safety policy pending. | Defer until timing engine passes Golden tests. |
| Compatibility V1 | DEFERRED | COMPAT-001, COMPAT-002, COMPAT-003 | Not required for first deterministic engine. | Keep as later roadmap item. |
| Numerology | DEFERRED | EXP-001 | Outside V1 core. | Preserve as expansion backlog/legacy placeholder. |
| Thai astrology | DEFERRED | EXP-001 | Separate methodology. | Keep catalog-only until future admission review. |
| Western astrology | DEFERRED | EXP-001 | Separate ephemeris model. | Keep catalog-only until future admission review. |
| Tarot/randomized experiences | NOT_SUPPORTED_IN_V1 | EXP-001, EXP-002 | Not equivalent to deterministic BaZi core. | Keep deferred experience module. |
| Palmistry | NOT_SUPPORTED_IN_V1 | EXP-003 | Input quality and confidence model absent. | Research only after V1. |
| Physical products/3D commerce | DEFERRED | EXP-002 | Digital core must be validated first. | Preserve docs as backlog. |
| AI minimized input contract | READY_FOR_CONTRACT_DESIGN | AI-002 | Can be designed from boundary spec. | Define allowed AI input object in 0C/2D. |
| AI production interpretation | BLOCKED_BY_PRODUCT_DECISION | AI-002, VER-001 | Policy/prompt versioning and data minimization pending. | Approve AI policy before production provider. |

## Implementation Authorization Summary

| Status | Count | Components |
|---|---:|---|
| READY_FOR_CONTRACT_DESIGN | 13 | Input/timezone contracts, canonical codes, element/evidence/confidence shapes, trace/version registry, F8SYNC boundary, tension/tie/narrative contracts, AI input contract |
| BLOCKED_BY_PRODUCT_DECISION | 10 | Birth UX, calendar ownership, Ten Gods, identity dimensions/archetype policies, daily UI/cache/notifications, AI production policy |
| BLOCKED_BY_EXPERT_VALIDATION | 15 | Historical timezone, solar terms, pillars, hidden stems, Day Master, seasonal strength, element weighting, daily timing |
| DEFERRED | 5 | Compatibility, numerology, Thai astrology, Western astrology, physical products |
| NOT_SUPPORTED_IN_V1 | 2 | Tarot/randomized experiences as core, palmistry |

## Recommended Next Milestone

**Milestone 0C - Intelligence Contracts and Domain Boundaries**

Proceed only with contract design that preserves pending methodology as unknown, deferred, or expert-required. Do not implement calculation algorithms in 0C.
