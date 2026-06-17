# F8SYNC KT Product Decision Pack V1

**Milestone:** 0B.1 - Product Owner Decision Lock  
**Date:** 2026-06-17  
**Status:** Product Owner decisions recorded  
**Decision Owner:** Product Owner - KT  
**Purpose:** Record the product decisions KT can make before Milestone 0C. This pack does not approve BaZi methodology, calculation correctness, or Golden Test expected values.

```text
Total KT Decisions: 15
Must Decide Before 0C: 12
Can Defer Until After 0C: 3
Requires Expert Confirmation: 5
```

## Recorded Product Owner Decisions

| PO Approval Record | Source Decision ID | Category | KT Decision | Product Direction Recorded | Expert Required | Blocking 0C | KT Notes |
|---|---|---|---|---|---|---|---|
| PO-0B1-001 | BIRTH-002 / BIRTH-003 | KT can approve now | APPROVE RECOMMENDED | Unknown birth time is allowed. Supported statuses are `KNOWN`, `UNKNOWN`, `APPROXIMATE`, and `DISPUTED`. Never substitute `12:00` or any fabricated time. Do not produce an Hour Pillar or hour-dependent output unless the time is sufficiently reliable. | No | Yes | Recorded from KT 0B.1 approval. |
| PO-0B1-002 | BIRTH-004 | KT can approve now | SELECT ALTERNATIVE | Birth location is optional but recommended in V1. Confirmed IANA timezone is required. Free-text birth location is not a trusted timezone resolver. Birth location may become required later if True Solar Time or location-dependent methodology is approved. | No | Yes | Replaces prior recommendation that birth location be required in V1. |
| PO-0B1-003 | BIRTH-005 / TIME-003 | KT can approve now | APPROVE RECOMMENDED | Use IANA timezone identifiers. The app may suggest a timezone, but the user must confirm it. Do not silently guess. Unresolved timezone blocks time-sensitive calculation with a structured status. | No | Yes | Recorded from KT 0B.1 approval. |
| PO-0B1-004 | TIME-007 | KT can approve now | APPROVE RECOMMENDED | Disable True Solar Time in V1. Use approved local civil time behavior. Preserve a versioned policy field for future support. | No | Yes | Expert validation is required only if True Solar Time is enabled in a future version. |
| PO-0B1-005 | INTEL-002 | KT direction approved, expert must validate | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | V1 may expose element balance, identity orientation, strength/tension summary, confidence, and unknown-field disclosure. Advanced methodology terminology should not be user-facing in MVP unless later approved. | Yes | Yes | Product scope approved; derivation rules still require expert validation. |
| PO-0B1-006 | INTEL-005 / INTEL-006 / INTEL-008 | KT direction approved, expert must validate | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | Show one primary archetype. Show optional secondary influence only when the approved confidence threshold is met. Support `PARTIAL`, `INCOMPLETE`, and `UNAVAILABLE` result states. Never force an archetype when evidence or input is insufficient. Confidence thresholds belong in versioned deterministic rules, not UI logic. | Yes | Yes | Product presentation approved; thresholds and derivation rules still require validation. |
| PO-0B1-007 | COMPAT-001 / COMPAT-003 | KT can approve now | APPROVE RECOMMENDED | Defer compatibility from the first deterministic engine implementation. Keep existing placeholder routes disabled, legacy-labelled, or feature-gated. Do not present placeholder compatibility results as approved V1 results. | No | Yes | Recorded from KT 0B.1 approval. |
| PO-0B1-008 | AI-002 | KT can approve now | APPROVE RECOMMENDED | AI may receive minimized structured outputs: evidence, confidence, unknown fields, allowed topics, engine version, rule version, and policy version. Avoid raw birth date, time, and location wherever possible. | No | Yes | AI input boundary approved. |
| PO-0B1-009 | AI-002 / VER-001 | KT can approve now | APPROVE RECOMMENDED WITH CLARIFICATION | Log request ID, pseudonymous member/session reference, prompt/policy/provider/model versions, token usage, retrieved document IDs, calculation trace reference, and guardrail outcome. Do not log raw birth data, full birth profile, authentication/payment data, or full prompt/response payloads by default. Full payload logging requires controlled, time-limited debug policy. | No | Yes | AI audit boundary approved with privacy clarification. |
| PO-0B1-010 | EXP-001 / EXP-002 / EXP-003 | KT can approve now | APPROVE RECOMMENDED | Defer numerology expansion, Thai astrology, Western astrology, Tarot/random draw, palmistry, physical products, 3D/AR, and broad sacred-object commerce from V1 core. Retain them in the expansion backlog. | No | Yes | Expansion scope locked out of V1 core. |
| PO-0B1-011 | VER-001 | KT can approve now | APPROVE RECOMMENDED | Label old results as `LEGACY`, `PLACEHOLDER`, or `PRE_V1`. Do not mix them with approved V1 deterministic results, use them as Golden Test references, silently overwrite them, or recalculate in place. Recalculation creates a new versioned result while preserving historical disclosure. | No | Yes | Legacy result policy approved. |
| PO-0B1-012 | BAZI-001 | KT direction approved, expert must validate | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | Use Traditional BaZi as the V1 calculation foundation. Use the F8SYNC Intelligence Layer only as a deterministic product derivation layer above approved BaZi output. Do not implement methodology calculations until the source path, reviewer, boundary rules, and Golden references are approved. | Yes | Yes | Product direction approved; methodology remains unvalidated. |
| PO-0B1-013 | BAZI-010 / BAZI-009 | KT direction approved, expert must validate | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | Ten Gods and hidden stems should not be user-facing MVP concepts unless an expert determines they are required for the approved core derivation. | Yes | No | Product-facing scope recorded for post-0C/detail design. |
| PO-0B1-014 | ELEM-006 / ELEM-007 | KT direction approved, expert must validate | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | Present normalized five-element balance with confidence and plain-language reflection only after expert-approved weighting exists. Avoid deterministic claims about missing elements. | Yes | No | Presentation direction recorded; numeric model still requires validation. |
| PO-0B1-015 | TIMING-006 | KT can approve now | APPROVE RECOMMENDED | Use deterministic cache keys including profile, local date, timezone, engine version, and rule version. Refresh when any key changes. Physical cache implementation is a later technical decision. | No | No | Product cache behavior recorded for later implementation planning. |

## Status Mapping

| Mapping | Source Decision IDs |
|---|---|
| Updated to `LOCKED` because KT approval does not require expert validation | BIRTH-002, BIRTH-003, BIRTH-004, BIRTH-005, TIME-003, TIME-007, COMPAT-001, COMPAT-003, AI-002, VER-001, EXP-001, EXP-002, EXP-003, TIMING-006 |
| Updated or retained as `PENDING_EXPERT_VALIDATION` because KT approved direction but expert validation is still required | BAZI-001, BAZI-009, BAZI-010, INTEL-002, INTEL-005, INTEL-006, INTEL-008, ELEM-006, ELEM-007 |
| Not locked by KT because methodology correctness still requires expert evidence | Year boundary, Li Chun policy, solar-term month calculation, day pillar source, day rollover, hour derivation, hidden stem mapping, Day Master strength, seasonal adjustment, element weighting, Golden expected results |

## Remaining 0C Gate

Milestone 0C may proceed into contract design for the product decisions now locked by KT. Contract design must still preserve pending methodology as unknown, partial, unavailable, or expert-required where BaZi correctness has not been validated.
