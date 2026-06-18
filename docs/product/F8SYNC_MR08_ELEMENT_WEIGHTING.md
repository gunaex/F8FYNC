# F8SYNC — MR-08: Element Weighting and Normalization

**Package:** MR-08  
**Topic:** Element Weighting and Normalization  
**Status:** `RULE_PROPOSED`  
**Confidence:** MEDIUM  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-18  
**Depends On:** MR-02 through MR-07  
**Required By:** MR-09, Gate 1D  

---

## 1. Scope

MR-08 establishes:

- How elements are counted across the Four Pillars
- How stem elements and branch elements are weighted differently
- How hidden stems contribute to element totals
- How the final element distribution is normalized for display
- What F8SYNC V1 does and does not calculate

---

## 2. Element Sources in a BaZi Chart

A complete Four Pillars chart contains the following element sources:

| Source | Count | Notes |
|---|---|---|
| Heavenly Stems | 4 (Year, Month, Day, Hour) | Direct element |
| Earthly Branches | 4 (Year, Month, Day, Hour) | Via main hidden stem |
| Hidden stems (mid) | Up to 4 | Secondary contribution |
| Hidden stems (residual) | Up to 4 | Tertiary contribution |

Total stem positions: 4 visible stems + up to 12 hidden stems = up to 16 element sources.

---

## 3. Weighting Models

This is the area of greatest variance between practitioners and systems.

### 3.1 Equal Weight Model

Every stem (visible and hidden) counts as 1 unit regardless of position.

- Simple and transparent
- Used by some digital tools
- Does not reflect classical emphasis on main stems

### 3.2 Weighted Model (Common Practitioner Approach)

| Stem Type | Weight |
|---|---|
| Visible Heavenly Stem | 1.0 |
| Branch Main Hidden Stem | 0.75 |
| Branch Mid Hidden Stem | 0.5 |
| Branch Residual Hidden Stem | 0.25 |

This is the most commonly used weighting model among modern practitioners.

Sources: Joey Yap methodology, Raymond Lo published readings, HikerBaZi implementation.

### 3.3 Seasonal Adjustment Model

Applies a seasonal multiplier to the Day Master's element based on 旺相休囚死 (per MR-07).

Adds complexity and practitioner variance — deferred to V2.

**F8SYNC V1 Decision: Weighted Model (3.2)** — transparent, widely used, no seasonal adjustment for V1.

Confidence: **MEDIUM** — weighted model is the most common; exact weights vary slightly between sources; F8SYNC uses the most widely documented set.

---

## 4. Normalization

Element totals are normalized to percentages for display:

```
Element % = (Element weighted total / Sum of all weighted totals) × 100
```

Display rounded to 1 decimal place.

Five elements must sum to 100%.

---

## 5. Three Pillar Partial Mode

When hour pillar is UNKNOWN (per MR-05):

- Element calculation uses only Year, Month, Day pillars + their hidden stems
- Result is flagged `ELEMENT_DISTRIBUTION_PARTIAL`
- Display note: "การกระจายธาตุนี้ไม่ครบ — ยังขาดเสาชั่วโมง"

---

## 6. Proposed Rules

### Rule MR-08-A: Element Sources

```
Element distribution is calculated from all Heavenly Stems
(visible and hidden) across all available pillars.

Visible stems, main hidden stems, mid hidden stems, and residual hidden stems
are all included with their respective weights.
```

Confidence: MEDIUM

### Rule MR-08-B: Weighting

```
F8SYNC V1 uses the following element weights:

Visible Heavenly Stem:        1.00
Branch Main Hidden Stem:      0.75
Branch Mid Hidden Stem:       0.50
Branch Residual Hidden Stem:  0.25

Seasonal adjustment is not applied in V1.
```

Confidence: MEDIUM

### Rule MR-08-C: Normalization

```
Element totals are normalized to percentages summing to 100%.
Display is rounded to 1 decimal place.
```

Confidence: HIGH

### Rule MR-08-D: Partial Distribution

```
When the hour pillar is UNKNOWN, element distribution is calculated
from 3 pillars only and flagged ELEMENT_DISTRIBUTION_PARTIAL.

Display note: "การกระจายธาตุนี้ไม่ครบ — ยังขาดเสาชั่วโมง"
```

Confidence: HIGH

---

## 7. Acceptance Checklist

- [ ] KT reviews and accepts Rule MR-08-A (Element Sources)
- [ ] KT reviews and accepts Rule MR-08-B (Weighting model)
- [ ] KT confirms MEDIUM confidence on weighting is acceptable for V1
- [ ] KT reviews and accepts Rule MR-08-C (Normalization)
- [ ] KT reviews and accepts Rule MR-08-D (Partial Distribution)
- [ ] Rule versions assigned
- [ ] Document committed and tagged

**Upon full acceptance: Status → `LOCKED`**

---

**End of MR-08**
