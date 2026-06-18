# F8SYNC — MR-07: Day Master and Seasonal Strength

**Package:** MR-07  
**Topic:** Day Master and Seasonal Strength  
**Status:** `RULE_PROPOSED`  
**Confidence:** HIGH (Day Master identity) / MEDIUM (strength scoring)  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-18  
**Depends On:** MR-03, MR-06  
**Required By:** MR-08, Gate 1D  

---

## 1. Scope

MR-07 establishes:

- What the Day Master is and how it is identified
- How seasonal strength (旺相休囚死) is determined
- How the Day Master's strength is assessed relative to the chart
- What "strong" and "weak" Day Master means in F8SYNC context

---

## 2. Day Master Identity

The Day Master (日主) is the Heavenly Stem of the Day Pillar. It represents the self — the central reference point for all Ten God relationships and element analysis.

Every stem in the chart is interpreted relative to the Day Master.

Confidence: **HIGH** — universal agreement.

---

## 3. Seasonal Strength — Five Phases

Each element has a seasonal strength cycle based on the BaZi month (solar term season):

| Season (Month Branch) | Strong Element | Secondary | Inactive | Weak | Dead |
|---|---|---|---|---|---|
| Spring (寅卯辰) | Wood | Fire | Water | Metal | Earth |
| Summer (巳午未) | Fire | Earth | Wood | Water | Metal |
| Late Summer (辰戌丑未) | Earth | Metal | Fire | Wood | Water |
| Autumn (申酉戌) | Metal | Water | Earth | Fire | Wood |
| Winter (亥子丑) | Water | Wood | Metal | Earth | Fire |

This cycle is called 旺相休囚死 (Wang Xiang Xiu Qiu Si).

Confidence: **HIGH** — universal agreement across sources.

---

## 4. Strength Assessment

Day Master strength is assessed by combining:

1. **Seasonal support** — is the Day Master element in season?
2. **Stem and branch support** — how many other stems/branches share or produce the Day Master element?
3. **Hidden stem support** — do hidden stems reinforce the Day Master?

### Strength Classification

| Classification | Meaning |
|---|---|
| 身強 Strong | Day Master well-supported by season and chart |
| 身弱 Weak | Day Master lacks seasonal and chart support |
| 中和 Balanced | Neither strongly supported nor strongly opposed |

F8SYNC V1 uses a simplified 3-tier classification: Strong / Weak / Balanced.

Full numeric scoring systems (point-based) are deferred to a future research package.

Confidence: **MEDIUM** — the 3-tier classification is widely accepted; numeric scoring systems vary significantly between practitioners and are explicitly deferred.

---

## 5. Proposed Rules

### Rule MR-07-A: Day Master Identity

```
The Day Master is the Heavenly Stem of the Day Pillar.
All Ten God relationships and element analysis are relative to the Day Master.
```

Confidence: HIGH

### Rule MR-07-B: Seasonal Strength Cycle

```
Seasonal element strength follows the 旺相休囚死 cycle as defined
in the MR-07 seasonal strength table.

The season is determined by the Month Branch (BaZi month per MR-03).
```

Confidence: HIGH

### Rule MR-07-C: Strength Classification

```
F8SYNC V1 classifies Day Master strength as Strong / Weak / Balanced.

Classification considers:
- Seasonal support (month branch element vs Day Master element)
- Stem and branch support count
- Hidden stem support

Numeric point-based scoring is deferred to a future research package.
```

Confidence: MEDIUM — simplified 3-tier is correct for V1; numeric scoring deferred.

---

## 6. Acceptance Checklist

- [ ] KT reviews and accepts Rule MR-07-A (Day Master Identity)
- [ ] KT reviews and accepts Rule MR-07-B (Seasonal Strength Cycle)
- [ ] KT reviews and accepts Rule MR-07-C (Strength Classification — 3-tier V1)
- [ ] KT confirms numeric scoring deferral is acceptable for V1
- [ ] Rule versions assigned
- [ ] Document committed and tagged

**Upon full acceptance: Status → `LOCKED`**

---

**End of MR-07**
