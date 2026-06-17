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
| V1 normalized birth input contract | READY_FOR_CONTRACT_DESIGN | BIRTH-002, BIRTH-003, BIRTH-005 | KT approved unknown birth-time statuses, no fabricated time, and confirmed IANA timezone behavior. | Draft types with explicit unknown/status fields, confirmed timezone, and time-sensitive blocked states in 0C. |
| Birth input UI copy | READY_FOR_CONTRACT_DESIGN | BIRTH-002, BIRTH-003, BIRTH-009 | KT approved unknown birth-time product behavior; conflicting input copy still needs detailed UX writing, not product direction. | Draft copy and validation states around known, unknown, approximate, disputed, and conflicting input. |
| IANA timezone validation contract | READY_FOR_CONTRACT_DESIGN | TIME-003 | Contract can require IANA without selecting final resolver implementation. | Define validator interface in 0C. |
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
| Evidence model | READY_FOR_CONTRACT_DESIGN | INTEL-009 | Coded evidence structure can be defined before formulas. | Draft evidence taxonomy in 0C. |
| Confidence model | READY_FOR_CONTRACT_DESIGN | ELEM-008, VER-001 | Confidence reasons can be structured before numeric policies are final. | Define confidence fields and unknown adjustments. |
| Calculation trace | READY_FOR_CONTRACT_DESIGN | VER-001 | Trace object is methodology-neutral. | Define trace ID and step references in 0C. |
| Engine/rule/version registry | READY_FOR_CONTRACT_DESIGN | VER-001 | Required for all later work. | Define version metadata contract. |
| F8SYNC Intelligence Layer input contract | READY_FOR_CONTRACT_DESIGN | INTEL-001 | Can require approved BaZi output and partial states. | Draft boundary interfaces in 0C. |
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
| AI minimized input contract | READY_FOR_CONTRACT_DESIGN | AI-002 | Can be designed from boundary spec. | Define allowed AI input object in 0C/2D. |
| AI production interpretation | READY_FOR_CONTRACT_DESIGN | AI-002, VER-001 | KT approved minimized AI input and privacy-safe audit boundary with controlled debug-only payload logging. | Define AI allowed-input, prompt/policy/model version, trace reference, and audit metadata contracts. |

## Implementation Authorization Summary

| Status | Count | Components |
|---|---:|---|
| READY_FOR_CONTRACT_DESIGN | 17 | Input/timezone contracts, birth input UX states, canonical codes, Ten Gods presentation boundary, element/evidence/confidence shapes, trace/version registry, F8SYNC boundary, tension/tie/narrative contracts, AI input and audit contracts |
| BLOCKED_BY_PRODUCT_DECISION | 1 | Notifications from timing |
| BLOCKED_BY_EXPERT_VALIDATION | 17 | Historical timezone, calendar resolver source, solar terms, pillars, hidden stems, Day Master, seasonal strength, element weighting, identity dimensions/archetype derivation, daily timing |
| DEFERRED | 5 | Compatibility, numerology, Thai astrology, Western astrology, physical products |
| NOT_SUPPORTED_IN_V1 | 2 | Tarot/randomized experiences as core, palmistry |

## Recommended Next Milestone

**Milestone 0C - Intelligence Contracts and Domain Boundaries**

Proceed only with contract design that preserves pending methodology as unknown, deferred, or expert-required. Do not implement calculation algorithms in 0C.
