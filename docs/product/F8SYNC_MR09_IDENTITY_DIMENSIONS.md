# F8SYNC — MR-09: Identity Dimensions and Archetype Derivation

**Package:** MR-09  
**Topic:** Identity Dimensions and Archetype Derivation  
**Status:** `RULE_PROPOSED`  
**Confidence:** MEDIUM (F8SYNC-specific layer)  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-18  
**Depends On:** MR-08  
**Required By:** Gate 1E  

---

## 1. Scope

MR-09 establishes:

- How F8SYNC derives identity dimensions from BaZi structure
- What the identity dimensions are and how they map to chart elements
- How archetypes are derived from dimension combinations
- What is classical BaZi vs F8SYNC product interpretation layer
- What outputs are deterministic vs interpretive

---

## 2. Important Distinction

MR-09 covers **F8SYNC's product interpretation layer** — not classical BaZi methodology.

Classical BaZi does not define "identity dimensions" or "archetypes" in this sense. These are F8SYNC's structured derivation from classical inputs.

This means:
- The classical inputs (Four Pillars, Ten Gods, element distribution) follow MR-01–08
- The identity dimension derivation is F8SYNC's own defined mapping
- KT has full authority to define and revise identity dimensions — no external source needed
- This layer must be clearly distinguished from the calculation engine in all user-facing output

---

## 3. Identity Dimension Framework

F8SYNC derives identity dimensions from the following classical inputs:

| Dimension | Derived From | Classical Basis |
|---|---|---|
| Core Element | Day Master element (MR-07) | Day stem element |
| Dominant Element | Highest weighted element (MR-08) | Element distribution |
| Missing Element | Element(s) with 0 or lowest weight | Element distribution |
| Day Master Strength | Strong / Weak / Balanced (MR-07) | Seasonal + chart support |
| Primary Ten God | Most prominent Ten God in chart | Ten Gods (MR-06) |
| Self vs Resource | Rob Wealth + Friend vs Resource count | Ten Gods pattern |

---

## 4. Archetype Derivation

Archetypes are derived from combinations of identity dimensions.

F8SYNC V1 archetype model:

| Input | Weight in Archetype |
|---|---|
| Day Master element | Primary |
| Day Master strength | Primary |
| Dominant element vs Day Master | Secondary |
| Primary Ten God profile | Secondary |

**Archetype naming and description are KT product decisions — not methodology decisions.**

Methodology Lead role: define the derivation input mapping only.
KT role: define archetype names, descriptions, and product presentation.

Confidence: **MEDIUM** — derivation inputs are grounded in classical BaZi; archetype output is F8SYNC product layer.

---

## 5. What This Layer Does Not Do

- Does not override or reinterpret Four Pillars calculation results
- Does not introduce new calculation variables beyond MR-01–08
- Does not use AI to generate identity descriptions (AI explains approved structured results only)
- Does not claim classical authority for archetype names or descriptions

---

## 6. Proposed Rules

### Rule MR-09-A: Identity Dimension Sources

```
F8SYNC identity dimensions are derived from:
- Day Master element and strength (MR-07)
- Element distribution (MR-08)
- Ten Gods profile (MR-06)

No additional calculation variables are introduced at this layer.
```

Confidence: MEDIUM

### Rule MR-09-B: Archetype Derivation

```
Archetypes are derived from combinations of identity dimensions
as defined in the F8SYNC archetype mapping table (KT product decision).

Archetype names and descriptions are KT product decisions.
Methodology Lead defines the input mapping only.
```

Confidence: MEDIUM

### Rule MR-09-C: Layer Separation

```
Identity dimension output is clearly distinguished from
Four Pillars calculation output in all user-facing display.

Classical BaZi results (pillars, stems, branches, Ten Gods, elements)
are presented separately from F8SYNC identity layer results.
```

Confidence: HIGH

### Rule MR-09-D: Partial Identity

```
When hour pillar is UNKNOWN, identity dimensions derived from
element distribution use ELEMENT_DISTRIBUTION_PARTIAL input.

Identity output is flagged IDENTITY_PARTIAL.
Display note: "ข้อมูลนี้ยังไม่ครบ — ใส่เวลาเกิดเพื่อดูผลที่แม่นขึ้น"
```

Confidence: HIGH

---

## 7. KT Decision Required

Before MR-09 can be LOCKED, KT must define:

- [ ] Identity dimension list (confirm or revise the 6 dimensions above)
- [ ] Archetype mapping table (which dimension combinations → which archetype)
- [ ] Archetype names and count (how many archetypes in V1)
- [ ] Whether archetypes are shown in summary view or detail view

These are product decisions — Methodology Lead cannot make them unilaterally.

---

## 8. Acceptance Checklist

- [ ] KT defines and accepts identity dimension list
- [ ] KT defines and accepts archetype mapping table
- [ ] KT reviews and accepts Rule MR-09-A (Dimension Sources)
- [ ] KT reviews and accepts Rule MR-09-B (Archetype Derivation)
- [ ] KT reviews and accepts Rule MR-09-C (Layer Separation)
- [ ] KT reviews and accepts Rule MR-09-D (Partial Identity)
- [ ] Rule versions assigned
- [ ] Document committed and tagged

**Upon full acceptance: Status → `LOCKED`**

---

**End of MR-09**
