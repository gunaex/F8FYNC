# F8SYNC — MR-02: Year Boundary and Li Chun

**Package:** MR-02  
**Topic:** Year Boundary and Li Chun  
**Status:** `RULE_PROPOSED`  
**Confidence:** HIGH  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-17  
**Depends On:** MR-01  
**Required By:** MR-03, MR-06, MR-08, MR-10, Gate 1B, Gate 1C  

---

## 1. Scope

MR-02 establishes:

- What event defines the start of the BaZi year
- How Li Chun (立春) is calculated
- How births that fall exactly on the Li Chun transition moment are handled
- The relationship between the BaZi year and the Gregorian calendar year

---

## 2. Research Questions

| ID | Question |
|---|---|
| Q1 | Does the BaZi year begin at Li Chun or at Chinese New Year? |
| Q2 | How is the exact Li Chun entry time determined? |
| Q3 | What year pillar is assigned to a birth that occurs on Li Chun day but before the exact entry time? |
| Q4 | What year pillar is assigned to a birth exactly at the Li Chun entry moment? |
| Q5 | How does this interact with timezone — is Li Chun time calculated in UTC or local time? |

---

## 3. Source Review

### 3.1 Li Chun vs Chinese New Year

This is one of the most commonly misunderstood points in BaZi.

**The BaZi year begins at Li Chun (立春), not at Chinese New Year.**

| Boundary | Event | Type | Used For |
|---|---|---|---|
| Li Chun | Sun reaches 315° ecliptic longitude | Solar | BaZi year pillar boundary |
| Chinese New Year | First new moon after Sun reaches 300° | Lunisolar | Cultural new year, not BaZi |

Sources confirming Li Chun as BaZi year boundary:
- Joey Yap — *BaZi The Destiny Code* — explicitly states Li Chun opens the new BaZi year
- Raymond Lo — consistent use of Li Chun boundary in published chart readings
- Lillian Too — confirms Li Chun boundary
- HikerBaZi — documented as using Li Chun boundary
- BaziCalculator.net — confirmed Li Chun boundary

No major practitioner reference reviewed uses Chinese New Year as the BaZi year boundary.

Confidence: **HIGH** — consensus is clear and consistent across sources.

### 3.2 Calculating Li Chun Entry Time

Li Chun is defined as the moment the Sun's ecliptic longitude reaches exactly 315°.

This moment:
- Occurs once per Gregorian year, typically February 3–5
- Varies by up to ~48 hours across years due to leap year cycles
- Is computed to second-level precision using Swiss Ephemeris (per MR-01-B)
- Is expressed in UTC and then converted to the birth timezone for comparison

### 3.3 Births on Li Chun Day — Before the Entry Moment

A birth that occurs on Li Chun day but **before** the exact entry time is in the **previous BaZi year**.

Example: Li Chun 2024 occurs on 4 February 2024 at 16:26 UTC+8 (Beijing time).  
A birth at 10:00 on 4 February 2024 in Beijing → **Year of the Rabbit (2023 BaZi year)**, not Dragon.  
A birth at 18:00 on 4 February 2024 in Beijing → **Year of the Dragon (2024 BaZi year)**.

Sources confirming this:
- Joey Yap — explicit on this point; the exact solar term time governs, not the calendar date
- Raymond Lo — consistent in published examples
- HikerBaZi — implements exact-time boundary

Confidence: **HIGH**

### 3.4 Births Exactly at the Li Chun Entry Moment

The exact boundary moment is astronomically defined to sub-second precision. A birth recorded to the minute cannot be exactly on this boundary in practice.

F8SYNC policy: If a birth time resolves to within **one minute** of the exact Li Chun entry time, the year pillar is flagged as `DISPUTED` and both adjacent year pillars are recorded with a note.

This avoids silent false precision at the boundary.

Confidence: **HIGH** — the one-minute window is a practical implementation decision; no source mandates a specific boundary tolerance.

### 3.5 Li Chun in Local vs UTC Time

The Li Chun entry moment is calculated in UTC by Swiss Ephemeris.

For pillar assignment, the birth time must be in the **same reference frame** as the Li Chun time.

Correct approach:
1. Compute Li Chun entry time in UTC
2. Convert both Li Chun time and birth time to UTC
3. Compare in UTC
4. Display the Li Chun moment to the user in their local timezone

Confidence: **HIGH**

---

## 4. Proposed Rules

### Rule MR-02-A: BaZi Year Boundary

```
The BaZi year begins at the exact moment of Li Chun (立春),
defined as the Sun reaching ecliptic longitude 315°.

Chinese New Year (lunar new year) is not the BaZi year boundary
and must not be used for year pillar assignment.
```

Confidence: HIGH

### Rule MR-02-B: Li Chun Calculation

```
Li Chun entry time is computed using Swiss Ephemeris (DE431) in UTC.

The result is accurate to second-level precision.
The Li Chun time used in any calculation must be recorded in the result trace.
```

Confidence: HIGH

### Rule MR-02-C: Year Pillar Assignment at Li Chun

```
A birth before the exact Li Chun entry moment (in UTC) belongs to the
previous BaZi year, regardless of the Gregorian calendar date.

A birth after the exact Li Chun entry moment (in UTC) belongs to the
new BaZi year.

Comparison is performed in UTC. Display is in local timezone.
```

Confidence: HIGH

### Rule MR-02-D: Boundary Tolerance

```
If a birth time (converted to UTC) falls within one minute of the
exact Li Chun entry time, the year pillar is flagged as BOUNDARY_DISPUTED.

Both the prior year pillar and the new year pillar are recorded.
The user is informed that the year pillar cannot be determined with certainty
at this level of birth time precision.
```

Confidence: HIGH

---

## 5. Variants and Disagreements

| Topic | Variant | Source | F8SYNC Decision |
|---|---|---|---|
| Year start | Chinese New Year | Casual / non-practitioner sources | Rejected; Li Chun is correct |
| Boundary tolerance | Some tools use midnight as day boundary | Simplification | Rejected; exact solar term time is used |
| UTC vs local comparison | Some tools compare in local time | Implementation shortcut | Rejected; UTC comparison is correct |

---

## 6. Golden Reference Requirement

Before MR-02 can be LOCKED, at least **two year boundary cases** are required:

| Case | Requirement |
|---|---|
| GR-02-A | A birth before Li Chun entry time on Li Chun day — verify year pillar is prior year |
| GR-02-B | A birth after Li Chun entry time on Li Chun day — verify year pillar is new year |

Golden cases are prepared in MR-11.

---

## 7. Acceptance Checklist

- [ ] KT reviews and accepts Rule MR-02-A (Year Boundary)
- [ ] KT reviews and accepts Rule MR-02-B (Li Chun Calculation)
- [ ] KT reviews and accepts Rule MR-02-C (Year Pillar Assignment)
- [ ] KT reviews and accepts Rule MR-02-D (Boundary Tolerance)
- [ ] Golden cases GR-02-A and GR-02-B identified
- [ ] Rule versions assigned
- [ ] Document committed and tagged

**Upon full acceptance: Status → `LOCKED`**

---

**End of MR-02**
