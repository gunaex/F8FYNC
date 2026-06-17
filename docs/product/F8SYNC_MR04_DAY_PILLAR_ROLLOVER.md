# F8SYNC — MR-04: Day Pillar and Day Rollover

**Package:** MR-04  
**Topic:** Day Pillar and Day Rollover  
**Status:** `RULE_PROPOSED`  
**Confidence:** MEDIUM  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-17  
**Depends On:** MR-01  
**Required By:** MR-05, Gate 1C  

---

## 1. Scope

MR-04 establishes:

- How the day pillar Heavenly Stem and Earthly Branch are calculated
- What time the BaZi day rolls over (midnight vs 23:00 vs solar midnight)
- How the day pillar interacts with timezone
- The reference epoch used for day pillar calculation

---

## 2. Research Questions

| ID | Question |
|---|---|
| Q1 | How is the day pillar Heavenly Stem and Earthly Branch determined? |
| Q2 | At what time does the BaZi day roll over? |
| Q3 | Is the day rollover in local time or UTC? |
| Q4 | What is the reference epoch for the day stem-branch cycle? |
| Q5 | How are births between 23:00 and midnight handled? |

---

## 3. Source Review

### 3.1 Day Pillar Calculation Method

The day pillar uses a 60-day stem-branch cycle (六十甲子) that has been running continuously since a fixed historical reference epoch.

The cycle is:
- 10 Heavenly Stems × 6 = 60 combinations
- 12 Earthly Branches × 5 = 60 combinations
- 60-day cycle repeating continuously

The standard computation method:

```
Day stem-branch index = (Julian Day Number + offset) mod 60
```

The Julian Day Number (JDN) is the continuous count of days since noon, January 1, 4713 BCE (proleptic Julian calendar). This provides a stable, timezone-independent reference.

The offset aligns JDN 0 to the correct position in the 60-day cycle. The commonly used offset maps JDN 0 to stem-branch index such that known historical dates produce the correct day pillar.

Sources confirming JDN-based calculation:
- HikerBaZi — documented JDN-based day calculation
- Multiple BaZi software implementations — consistent day pillar output for test dates
- Joey Yap — day pillar examples consistent with JDN cycle

Confidence: **HIGH** for calculation method.

### 3.2 Day Rollover Time — The Main Variant

This is the most significant disagreement in day pillar methodology.

**Three positions exist:**

| Position | Rollover Time | Rationale | Sources |
|---|---|---|---|
| A | Midnight (00:00 local) | Gregorian day boundary | Most digital tools, modern simplification |
| B | 23:00 local time | Start of Zi hour (子時) | Classical Zi hour split practice |
| C | Solar midnight (true midnight) | Astronomical | Minority classical position |

**Position A — Midnight (00:00 local)**

The majority of modern BaZi software uses civil midnight as the day boundary. This aligns with birth certificate recording practice.

Sources: HikerBaZi, BaziCalculator.net, most widely used digital tools.

**Position B — 23:00 local time (Zi hour split)**

Classical Chinese timekeeping divided the day into 12 double-hours (時辰). The Zi hour (子時, Rat hour) covers 23:00–01:00. Some classical texts treat 23:00 as the start of the new day because it begins the Zi hour, which opens the new day's energy cycle.

Under this position, a birth at 23:30 on January 5 is actually in the day pillar of January 6.

Sources: Some classical Chinese almanac practitioners, minority of modern practitioners.

**Position C — Solar midnight**

Rarely used in modern practice. Not implemented in any major digital tool reviewed.

**F8SYNC Assessment:**

The Zi hour split position (Position B) has classical basis but creates practical complications:
- Birth certificates record civil time, not classical double-hour time
- A birth at 23:30 officially recorded as January 5 would be re-assigned to January 6 silently
- This creates confusion without explicit user disclosure

Position A (civil midnight) is the pragmatic modern standard.

**F8SYNC Decision: Position A (civil midnight) as default, with the Zi hour split flagged as a known variant.**

Confidence: **MEDIUM** — civil midnight is correct for modern practice; the Zi hour split is a documented legitimate variant that some practitioners prefer.

### 3.3 Day Rollover in Local vs UTC

The day rollover (whether at midnight or 23:00) is applied in **local civil time** at the birth location.

A birth at 00:30 local time belongs to the new local day, regardless of what UTC date it is.

Confidence: **HIGH**

### 3.4 Reference Epoch Alignment

The JDN offset must be verified against known historical day pillars. The most commonly used verification anchor:

- January 1, 2000 (Gregorian) = JDN 2451545
- Known day pillar for this date: 甲戌 (Jia Xu) — index 10 in the 60-cycle

Any implementation must verify this anchor before use.

---

## 4. Proposed Rules

### Rule MR-04-A: Day Pillar Calculation

```
The day pillar Heavenly Stem and Earthly Branch are determined using
the Julian Day Number (JDN) modulo 60, with a verified offset that
aligns JDN 2451545 (January 1, 2000) to 甲戌 (Jia Xu, index 10).

The JDN for a given birth date is computed from the local civil date
at the birth location.
```

Confidence: HIGH

### Rule MR-04-B: Day Rollover — Civil Midnight

```
The BaZi day rolls over at civil midnight (00:00) in local time
at the birth location.

A birth at or after 00:00 local time belongs to the new calendar day's
day pillar.
A birth before 00:00 local time belongs to the prior calendar day's
day pillar.
```

Confidence: MEDIUM — civil midnight is the modern standard; the Zi hour split is a documented variant.

### Rule MR-04-C: Zi Hour Split — Disclosed Variant

```
The Zi hour split (23:00 rollover) is a documented classical variant
and is NOT used in F8SYNC V1 by default.

If a birth time falls between 23:00 and 00:00, the result records:
- Day pillar computed using civil midnight (Rule MR-04-B) as the primary result
- A note that some classical practitioners would assign the following day's pillar
- The alternative day pillar for reference
```

Confidence: HIGH — transparent disclosure of the variant is the correct approach.

### Rule MR-04-D: Local Time for Day Assignment

```
Day pillar assignment uses local civil time at the birth location.

The local date (not the UTC date) determines which JDN is used.
```

Confidence: HIGH

---

## 5. Variants and Disagreements

| Topic | Variant | Source | F8SYNC Decision |
|---|---|---|---|
| Day rollover | 23:00 Zi hour split | Classical practice | Disclosed as variant; not used as default |
| Day rollover | Solar midnight | Minority classical | Not implemented |
| Reference epoch | Minor offset differences | Some older tools | Anchored to JDN 2451545 = Jia Xu |

---

## 6. Golden Reference Requirement

Before MR-04 can be LOCKED, at least **three day pillar cases** are required:

| Case | Requirement |
|---|---|
| GR-04-A | Any known birth — verify day pillar against independent tool |
| GR-04-B | Birth between 23:00 and 00:00 — verify civil midnight rule, document variant |
| GR-04-C | Birth at 00:01 — verify new day pillar assigned correctly |

Golden cases are prepared in MR-11.

---

## 7. Acceptance Checklist

- [ ] KT reviews and accepts Rule MR-04-A (Day Pillar Calculation)
- [ ] KT reviews and accepts Rule MR-04-B (Day Rollover — Civil Midnight)
- [ ] KT reviews and accepts Rule MR-04-C (Zi Hour Split Disclosure)
- [ ] KT reviews and accepts Rule MR-04-D (Local Time for Day Assignment)
- [ ] KT confirms MEDIUM confidence on MR-04-B is acceptable for V1
- [ ] Golden cases GR-04-A, GR-04-B, GR-04-C identified
- [ ] Rule versions assigned
- [ ] Document committed and tagged

**Upon full acceptance: Status → `LOCKED`**

---

**End of MR-04**
