# F8SYNC — MR-03: Solar-Term Month Boundary

**Package:** MR-03  
**Topic:** Solar-Term Month Boundary  
**Status:** `RULE_PROPOSED`  
**Confidence:** HIGH  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-17  
**Depends On:** MR-01, MR-02  
**Required By:** MR-06, MR-07, MR-08, Gate 1B, Gate 1C  

---

## 1. Scope

MR-03 establishes:

- Which solar term events define the BaZi month boundary
- The 12 BaZi months and their corresponding solar terms
- How the exact entry time governs month pillar assignment
- How births at month boundaries are handled
- The relationship between BaZi months and Gregorian calendar months

---

## 2. Research Questions

| ID | Question |
|---|---|
| Q1 | Which 12 of the 24 solar terms define BaZi month boundaries? |
| Q2 | What is the correct Heavenly Stem and Earthly Branch for each month pillar? |
| Q3 | How does the month stem vary depending on the year stem? |
| Q4 | How are births on the exact boundary day handled? |
| Q5 | Is the month boundary the same as the solar term, or offset? |

---

## 3. Source Review

### 3.1 The 24 Solar Terms and the 12 BaZi Months

The Chinese solar calendar divides the year into 24 solar terms, each 15° of ecliptic longitude. BaZi uses every other term — the 12 **Jié (節)** terms — as month pillar boundaries.

The 12 Jié terms and their corresponding BaZi months:

| BaZi Month | Solar Term (Jié) | Approx Gregorian Date | Ecliptic Longitude | Earthly Branch |
|---|---|---|---|---|
| Month 1 | Li Chun 立春 | Feb 3–5 | 315° | 寅 Yin (Tiger) |
| Month 2 | Jing Zhe 驚蟄 | Mar 5–7 | 345° | 卯 Mao (Rabbit) |
| Month 3 | Qing Ming 清明 | Apr 4–6 | 15° | 辰 Chen (Dragon) |
| Month 4 | Li Xia 立夏 | May 5–7 | 45° | 巳 Si (Snake) |
| Month 5 | Mang Zhong 芒種 | Jun 5–7 | 75° | 午 Wu (Horse) |
| Month 6 | Xiao Shu 小暑 | Jul 6–8 | 105° | 未 Wei (Goat) |
| Month 7 | Li Qiu 立秋 | Aug 7–9 | 135° | 申 Shen (Monkey) |
| Month 8 | Bai Lu 白露 | Sep 7–9 | 165° | 酉 You (Rooster) |
| Month 9 | Han Lu 寒露 | Oct 7–9 | 195° | 戌 Xu (Dog) |
| Month 10 | Li Dong 立冬 | Nov 6–8 | 225° | 亥 Hai (Pig) |
| Month 11 | Da Xue 大雪 | Dec 6–8 | 255° | 子 Zi (Rat) |
| Month 12 | Xiao Han 小寒 | Jan 5–7 | 285° | 丑 Chou (Ox) |

The 12 **Zhōngqì (中氣)** terms (midpoints between Jié terms) are not used as BaZi month boundaries.

Sources confirming this structure:
- Joey Yap — *BaZi The Destiny Code* — month pillar table matches above
- Raymond Lo — consistent use of Jié terms as boundaries
- HikerBaZi — implements exact Jié boundary times

Confidence: **HIGH** — no source reviewed uses Zhōngqì as month boundaries.

### 3.2 Month Heavenly Stems — The Five Tigers Escape Rule (五虎遁年起月法)

The Earthly Branch of each BaZi month is fixed (as shown above). The Heavenly Stem of the month pillar varies based on the **Heavenly Stem of the year pillar**.

This is calculated using the Five Tigers Escape Rule (五虎遁年起月法):

| Year Stem | Month 1 (Yin 寅) Stem | Cycle |
|---|---|---|
| 甲 Jia or 己 Ji | 丙 Bing | Fire cycle |
| 乙 Yi or 庚 Geng | 戊 Wu | Earth cycle |
| 丙 Bing or 辛 Xin | 庚 Geng | Metal cycle |
| 丁 Ding or 壬 Ren | 壬 Ren | Water cycle |
| 戊 Wu or 癸 Gui | 甲 Jia | Wood cycle |

From Month 1, subsequent month stems follow the standard Heavenly Stem sequence (Jia → Yi → Bing → Ding → Wu → Ji → Geng → Xin → Ren → Gui → back to Jia).

Sources confirming Five Tigers Escape Rule:
- Joey Yap — explicit table provided
- Raymond Lo — consistent use
- Multiple digital BaZi calculators — consistent output

Confidence: **HIGH** — universal agreement across sources.

### 3.3 Boundary Day Assignment

Identical logic to MR-02: the exact solar term entry time governs.

A birth before the Jié entry moment → previous month pillar  
A birth after the Jié entry moment → new month pillar  
Comparison in UTC, display in local timezone  
Within one minute of boundary → `BOUNDARY_DISPUTED`

Confidence: **HIGH**

### 3.4 Boundary Tolerance

Same policy as MR-02-D:

If birth time (UTC) falls within one minute of the exact Jié entry time, month pillar is flagged `BOUNDARY_DISPUTED` and both adjacent month pillars are recorded.

---

## 4. Proposed Rules

### Rule MR-03-A: Month Boundary Events

```
BaZi month boundaries are defined by the 12 Jié (節) solar terms.

The 12 Zhōngqì (中氣) terms are not used as BaZi month boundaries.
The Gregorian calendar month is not used as the BaZi month boundary.
```

Confidence: HIGH

### Rule MR-03-B: Month Earthly Branch Assignment

```
The Earthly Branch of the month pillar is determined by which Jié interval
the birth moment falls within, as defined in the MR-03 branch table.

The branch sequence begins with Yin (Tiger) at Li Chun and follows the
standard branch cycle through the year.
```

Confidence: HIGH

### Rule MR-03-C: Month Heavenly Stem — Five Tigers Escape Rule

```
The Heavenly Stem of the month pillar is derived from the year Heavenly Stem
using the Five Tigers Escape Rule (五虎遁年起月法).

The month stem for Month 1 (Yin) is determined by the year stem group.
Subsequent month stems follow the standard Heavenly Stem sequence.

The year stem used is the BaZi year stem (Li Chun boundary per MR-02),
not the Gregorian year.
```

Confidence: HIGH

### Rule MR-03-D: Boundary Assignment

```
Month pillar assignment uses exact Jié entry time in UTC.

A birth before the Jié entry moment belongs to the prior BaZi month.
A birth after the Jié entry moment belongs to the new BaZi month.

If birth time (UTC) falls within one minute of the exact Jié entry time,
the month pillar is flagged BOUNDARY_DISPUTED and both adjacent month
pillars are recorded.
```

Confidence: HIGH

---

## 5. Variants and Disagreements

| Topic | Variant | Source | F8SYNC Decision |
|---|---|---|---|
| Boundary event | Some casual sources use Gregorian month | Simplification | Rejected |
| Zhōngqì as boundary | Not used in Four Pillars | N/A — confirmed non-issue | N/A |
| Five Tigers vs fixed stems | No variant found | N/A | Rule as proposed |

---

## 6. Golden Reference Requirement

Before MR-03 can be LOCKED, at least **three month boundary cases** are required:

| Case | Requirement |
|---|---|
| GR-03-A | Birth before Jié entry on boundary day — verify prior month pillar |
| GR-03-B | Birth after Jié entry on boundary day — verify new month pillar |
| GR-03-C | Any birth mid-month — verify month stem via Five Tigers Escape Rule |

Golden cases are prepared in MR-11.

---

## 7. Acceptance Checklist

- [ ] KT reviews and accepts Rule MR-03-A (Month Boundary Events)
- [ ] KT reviews and accepts Rule MR-03-B (Month Branch Assignment)
- [ ] KT reviews and accepts Rule MR-03-C (Five Tigers Escape Rule)
- [ ] KT reviews and accepts Rule MR-03-D (Boundary Assignment)
- [ ] Golden cases GR-03-A, GR-03-B, GR-03-C identified
- [ ] Rule versions assigned
- [ ] Document committed and tagged

**Upon full acceptance: Status → `LOCKED`**

---

**End of MR-03**
