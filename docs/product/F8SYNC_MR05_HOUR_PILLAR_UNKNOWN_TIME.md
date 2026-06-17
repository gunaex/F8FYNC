# F8SYNC — MR-05: Hour Pillar and Unknown Birth Time

**Package:** MR-05  
**Topic:** Hour Pillar and Unknown Birth Time  
**Status:** `RULE_PROPOSED`  
**Confidence:** HIGH (known time) / HIGH (unknown time policy)  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-17  
**Depends On:** MR-04  
**Required By:** MR-06, Gate 1C  

---

## 1. Scope

MR-05 establishes:

- The 12 double-hour system and how birth time maps to hour branch
- How the hour Heavenly Stem is derived from the day Heavenly Stem
- How unknown, approximate, or disputed birth times are handled
- What partial chart outputs are valid without the hour pillar
- What outputs are blocked when the hour pillar is unknown

---

## 2. Research Questions

| ID | Question |
|---|---|
| Q1 | What are the 12 double-hours and their time ranges? |
| Q2 | How is the hour Heavenly Stem derived? |
| Q3 | What happens when birth time is unknown? |
| Q4 | Can BaZi analysis proceed without the hour pillar? |
| Q5 | Should the system default to any time when birth time is unknown? |

---

## 3. Source Review

### 3.1 The 12 Double-Hours

Classical Chinese timekeeping used 12 double-hours (時辰), each covering 2 civil hours.

| Hour Branch | Civil Time Range | Earthly Branch | Animal |
|---|---|---|---|
| 子 Zi | 23:00 – 01:00 | 子 | Rat |
| 丑 Chou | 01:00 – 03:00 | 丑 | Ox |
| 寅 Yin | 03:00 – 05:00 | 寅 | Tiger |
| 卯 Mao | 05:00 – 07:00 | 卯 | Rabbit |
| 辰 Chen | 07:00 – 09:00 | 辰 | Dragon |
| 巳 Si | 09:00 – 11:00 | 巳 | Snake |
| 午 Wu | 11:00 – 13:00 | 午 | Horse |
| 未 Wei | 13:00 – 15:00 | 未 | Goat |
| 申 Shen | 15:00 – 17:00 | 申 | Monkey |
| 酉 You | 17:00 – 19:00 | 酉 | Rooster |
| 戌 Xu | 19:00 – 21:00 | 戌 | Dog |
| 亥 Hai | 21:00 – 23:00 | 亥 | Pig |

**Note on Zi hour split:** As discussed in MR-04, the Zi hour (23:00–01:00) spans two civil days. F8SYNC V1 uses civil midnight as the day boundary (MR-04-B), which means:

- 23:00–00:00 → Zi hour of the current civil day
- 00:00–01:00 → Zi hour of the next civil day

The hour branch (Zi) is the same in both cases. The day pillar may differ. The result records which day pillar was used and discloses the Zi hour split variant as per MR-04-C.

Sources confirming double-hour ranges:
- Joey Yap — consistent double-hour table
- Raymond Lo — consistent
- Universal agreement across all sources reviewed

Confidence: **HIGH**

### 3.2 Hour Heavenly Stem — The Five Rats Escape Rule (五鼠遁日起時法)

The hour Heavenly Stem is derived from the day Heavenly Stem using the Five Rats Escape Rule (五鼠遁日起時法).

| Day Stem | Zi Hour (23:00) Stem | Cycle |
|---|---|---|
| 甲 Jia or 己 Ji | 甲 Jia | Wood |
| 乙 Yi or 庚 Geng | 丙 Bing | Fire |
| 丙 Bing or 辛 Xin | 戊 Wu | Earth |
| 丁 Ding or 壬 Ren | 庚 Geng | Metal |
| 戊 Wu or 癸 Gui | 壬 Ren | Water |

From Zi, subsequent hour stems follow the standard Heavenly Stem sequence.

Sources confirming Five Rats Escape Rule:
- Joey Yap — explicit table
- Raymond Lo — consistent use
- All major digital calculators — consistent output

Confidence: **HIGH** — universal agreement.

### 3.3 Unknown Birth Time Policy

**This is the most important policy decision in MR-05.**

When birth time is unknown, three approaches exist:

| Approach | Description | Problems |
|---|---|---|
| A | Default to 12:00 (noon) | Silent false precision; noon is not more likely than any other hour |
| B | Default to Zi hour (23:00) | No basis; equally arbitrary |
| C | Omit hour pillar; flag as UNKNOWN | Honest; preserves confidence model |

**F8SYNC Core Principle** (established in Milestone 0A–0B): No implicit birth time. No `12:00` fallback.

This is not a new decision — it was locked in the product direction. MR-05 codifies the downstream consequences:

- Hour pillar = `UNKNOWN` when birth time = `UNKNOWN`
- Hour stem = `UNKNOWN`
- Hour branch = `UNKNOWN`
- Results that depend on the hour pillar are marked `PARTIAL`

Confidence: **HIGH** — this is consistent with the locked product direction.

### 3.4 What Is Valid Without the Hour Pillar

A Three Pillar chart (Year, Month, Day) is a valid partial BaZi reading.

Valid outputs without hour pillar:

| Output | Available Without Hour Pillar |
|---|---|
| Year pillar | Yes |
| Month pillar | Yes |
| Day pillar (Day Master) | Yes |
| Element distribution (partial) | Yes — 3 pillars only |
| Seasonal context | Yes |
| Ten Gods (partial) | Yes — based on 3 pillars |
| Identity dimensions (partial) | Yes — reduced confidence |
| Annual/monthly timing | Yes |

Blocked outputs without hour pillar:

| Output | Blocked Without Hour Pillar |
|---|---|
| Hour pillar element | Yes |
| Full element distribution | Yes — flagged PARTIAL |
| Life palace (命宮) | Yes — requires hour branch |
| Fetal element (胎元) | Yes — requires hour stem |
| Full Ten Gods | Yes — flagged PARTIAL |

The system must clearly communicate to the user which outputs are partial.

### 3.5 Approximate Birth Time

When birth time is `APPROXIMATE` (e.g., "morning", "around 3pm"):

- Map the approximate range to the double-hour(s) it covers
- If the range covers exactly one double-hour → assign that hour pillar with `APPROXIMATE` confidence
- If the range spans two double-hours → flag as `BOUNDARY_DISPUTED` and record both options
- Never silently pick one hour from an ambiguous range

---

## 4. Proposed Rules

### Rule MR-05-A: Hour Branch Assignment

```
The hour Earthly Branch is determined by mapping the birth time (local civil time)
to the corresponding double-hour range as defined in the MR-05 double-hour table.

The Zi hour (23:00–01:00) spans two civil days. Hour branch assignment uses
the civil time only; day pillar handling follows MR-04.
```

Confidence: HIGH

### Rule MR-05-B: Hour Heavenly Stem — Five Rats Escape Rule

```
The hour Heavenly Stem is derived from the day Heavenly Stem using the
Five Rats Escape Rule (五鼠遁日起時法).

The Zi hour stem is determined by the day stem group.
Subsequent hour stems follow the standard Heavenly Stem sequence.
```

Confidence: HIGH

### Rule MR-05-C: Unknown Birth Time

```
When birth time is UNKNOWN, the hour pillar is not calculated or estimated.

Hour stem = UNKNOWN
Hour branch = UNKNOWN
All outputs that require the hour pillar are marked PARTIAL.

No default time (including 12:00 noon) is substituted for an unknown birth time.
No AI inference is used to estimate birth time.
```

Confidence: HIGH

### Rule MR-05-D: Approximate Birth Time

```
When birth time is APPROXIMATE:

- Map the stated range to the double-hour(s) it covers.
- If the range falls entirely within one double-hour, assign that hour pillar
  with APPROXIMATE confidence.
- If the range spans two double-hours, flag as BOUNDARY_DISPUTED and record
  both possible hour pillars.

The user is informed of the uncertainty in either case.
```

Confidence: HIGH

### Rule MR-05-E: Partial Chart Disclosure

```
When the hour pillar is UNKNOWN or APPROXIMATE, the result envelope must:

- Set hour_pillar_state to UNKNOWN or APPROXIMATE
- List all outputs that are affected by the missing hour pillar
- Not present partial outputs as complete outputs
- Clearly distinguish Three Pillar analysis from Four Pillar analysis
  in any user-facing display
```

Confidence: HIGH

---

## 5. Variants and Disagreements

| Topic | Variant | Source | F8SYNC Decision |
|---|---|---|---|
| Unknown time default | 12:00 noon | Many casual tools | Rejected — locked in product direction |
| Unknown time default | Zi hour | Some practitioners | Rejected — arbitrary |
| Approximate time | Pick midpoint | Simplification | Rejected — BOUNDARY_DISPUTED is correct |

---

## 6. Golden Reference Requirement

Before MR-05 can be LOCKED, at least **three hour pillar cases** are required:

| Case | Requirement |
|---|---|
| GR-05-A | Known birth time — verify hour pillar via Five Rats Rule |
| GR-05-B | Unknown birth time — verify PARTIAL output flagging |
| GR-05-C | Birth in Zi hour (23:00–01:00) — verify day and hour interaction |

Golden cases are prepared in MR-11.

---

## 7. Acceptance Checklist

- [ ] KT reviews and accepts Rule MR-05-A (Hour Branch Assignment)
- [ ] KT reviews and accepts Rule MR-05-B (Five Rats Escape Rule)
- [ ] KT reviews and accepts Rule MR-05-C (Unknown Birth Time — no default)
- [ ] KT reviews and accepts Rule MR-05-D (Approximate Birth Time)
- [ ] KT reviews and accepts Rule MR-05-E (Partial Chart Disclosure)
- [ ] Golden cases GR-05-A, GR-05-B, GR-05-C identified
- [ ] Rule versions assigned
- [ ] Document committed and tagged

**Upon full acceptance: Status → `LOCKED`**

---

**End of MR-05**
