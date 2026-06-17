# F8SYNC — MR-01: Calendar and Timezone Authority

**Package:** MR-01  
**Topic:** Calendar and Timezone Authority  
**Status:** `RULE_PROPOSED`  
**Confidence:** HIGH  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-17  
**Depends On:** None  
**Required By:** MR-02, MR-03, MR-04  

---

## 1. Scope

MR-01 establishes the authoritative sources for:

- The solar calendar used to determine solar terms and pillar boundaries
- The timezone model used to normalize birth input
- The handling of historical timezone data before IANA records exist
- The astronomical source used to derive solar term entry times
- The versioning and reproducibility requirements for calendar data

These decisions are foundational. All downstream MR packages depend on what is decided here.

---

## 2. Research Questions

| ID | Question |
|---|---|
| Q1 | Which solar calendar system is authoritative for BaZi? |
| Q2 | Which astronomical source defines solar term entry times? |
| Q3 | Which timezone model is used for birth time normalization? |
| Q4 | How are historical births handled when IANA data does not cover the period? |
| Q5 | How is calendar data versioned for reproducibility? |

---

## 3. Source Review

### 3.1 Calendar System

BaZi uses the **Chinese Solar Calendar (農曆陽曆)** — specifically the solar term cycle derived from the Sun's ecliptic longitude, not the lunisolar calendar used for Chinese New Year dates.

The key distinction:

| Calendar | Used For | Basis |
|---|---|---|
| Chinese Solar Calendar | BaZi pillars | Sun's ecliptic longitude |
| Lunisolar Calendar | Chinese New Year, lunar months | Moon phase + solar correction |
| Gregorian Calendar | Birth input and output display | International civil standard |

**All major BaZi practitioners and references agree on this.** The solar calendar governs pillar assignment. The lunisolar calendar is not used in Four Pillars calculation.

Sources confirming this:
- Joey Yap — *BaZi The Destiny Code* — explicitly uses solar terms for month pillar boundaries
- Lillian Too — *Fortune and Feng Shui* — confirms solar term month boundaries
- Raymond Lo — published chart readings consistently use solar term month boundaries
- HikerBaZi, BaziCalculator.net — digital tools documented as using ecliptic longitude for solar terms

Confidence: **HIGH** — no source reviewed disagrees on this point.

### 3.2 Astronomical Source for Solar Terms

Solar term entry times are defined by the Sun reaching specific ecliptic longitudes (every 15 degrees, 24 terms per year).

| Solar Term | Ecliptic Longitude | Relevance to BaZi |
|---|---|---|
| Li Chun (立春) | 315° | Year boundary |
| Each month term | Every 30° from 315° | Month pillar boundary |

The most widely used computational standard for solar term times is **Swiss Ephemeris (SE)**, which is:

- Based on NASA JPL DE431 planetary data
- Accurate to sub-second precision for dates from 5400 BCE to 5400 CE
- Used by HikerBaZi, multiple BaZi software implementations
- Open source and versioned

Alternative: **Hong Kong Observatory / Chinese National Standard GB/T 33661-2017** — official Chinese government solar term standard, but not publicly available as a programmable data source.

**Proposed authority: Swiss Ephemeris** with version lock per calculation engine release.

Confidence: **HIGH**

### 3.3 Timezone Model

Birth time in BaZi must be interpreted as **local solar time** or **local civil time**, then normalized to derive the correct pillar.

The two models:

| Model | Meaning | Usage |
|---|---|---|
| Local Civil Time (LCT) | Official clock time at birth location | Modern births (post ~1900) |
| Local Mean Solar Time (LMST) | True solar time based on longitude | Classical practice, pre-standardized zones |

**Modern consensus** among digital BaZi tools and contemporary practitioners is to use **Local Civil Time** (as recorded on birth certificates) for births after timezone standardization began (~1900 for most regions).

For the F8SYNC V1 scope (modern births with known timezones), **IANA timezone database** is the authoritative source for civil time offsets and DST rules.

Confidence: **HIGH** for modern births.

### 3.4 Historical Timezone Handling

For births before IANA records are reliable (pre-1970 in many regions, pre-1900 in most), civil timezone data is incomplete or absent.

Options:

| Approach | Pros | Cons |
|---|---|---|
| Use IANA best-effort | Simple, consistent | May be inaccurate for old records |
| Flag as APPROXIMATE | Honest, preserves confidence model | Reduces precision claim |
| Use LMST from longitude | Classical accuracy | Requires birth coordinates |

**F8SYNC V1 decision boundary:**

- Births with reliable IANA coverage → use IANA civil time → `KNOWN`
- Births where IANA coverage is uncertain → flag timezone confidence as `APPROXIMATE`
- F8SYNC V1 does not implement LMST calculation (deferred to future research)
- No birth time is silently adjusted without user confirmation

Confidence: **MEDIUM** — the APPROXIMATE path is conservative and correct; LMST is deferred.

### 3.5 Calendar Data Versioning

For reproducibility, the calendar computation source must be version-locked.

Requirement: Every BaZi result must record:

```text
calendar_engine: swiss-ephemeris
calendar_engine_version: <semver>
ephemeris_data: DE431
calculation_date: <ISO8601>
```

This allows results to be reproduced exactly and audited if the ephemeris is updated.

---

## 4. Proposed Rules

### Rule MR-01-A: Calendar System

```
F8SYNC uses the Chinese Solar Calendar based on the Sun's ecliptic longitude
for all pillar boundary determinations.

The lunisolar calendar is not used in Four Pillars calculation.
Gregorian dates are used for input and display only.
```

Confidence: HIGH

### Rule MR-01-B: Solar Term Astronomical Source

```
F8SYNC uses Swiss Ephemeris (SE) as the authoritative source
for solar term entry times.

The ephemeris data set is DE431.
The Swiss Ephemeris version is locked per engine release.
Solar term times are computed in UTC and converted to local civil time for display.
```

Confidence: HIGH

### Rule MR-01-C: Timezone Authority

```
F8SYNC uses the IANA timezone database as the authoritative source
for civil time offsets and DST rules.

The IANA database version is locked per engine release.
Birth time is interpreted as local civil time unless the user has flagged
the timezone as APPROXIMATE or UNKNOWN.
```

Confidence: HIGH

### Rule MR-01-D: Historical Timezone Policy

```
For births where IANA coverage is uncertain or absent, the birth timezone
confidence is set to APPROXIMATE.

F8SYNC V1 does not implement Local Mean Solar Time calculation.
No birth time is silently adjusted without explicit user confirmation.
```

Confidence: MEDIUM — conservative and safe; LMST deferred.

### Rule MR-01-E: Reproducibility

```
Every BaZi calculation result must record:
- calendar_engine name and version
- ephemeris data set identifier
- IANA database version
- calculation timestamp in UTC

Results computed with different engine versions are not assumed to be identical.
```

Confidence: HIGH

---

## 5. Variants and Disagreements

| Topic | Variant | Used By | F8SYNC Decision |
|---|---|---|---|
| Solar time vs civil time | Some classical texts use LMST | Classical practitioners | Deferred to V2; V1 uses civil time |
| Ephemeris source | Some tools use USNO instead of SE | Minor tools | SE selected; broader adoption and open source |
| Historical timezone | Silent IANA best-effort | Most digital tools | F8SYNC flags as APPROXIMATE instead |

---

## 6. Golden Reference Requirement

Before MR-01 can be LOCKED, at least **two boundary verification cases** are required:

| Case | Requirement |
|---|---|
| GR-01-A | A birth date/time near a solar term boundary verified against SE output |
| GR-01-B | A birth with a historical timezone edge case documented as APPROXIMATE |

Golden cases are prepared in MR-11.

---

## 7. Acceptance Checklist

- [ ] KT reviews and accepts Rule MR-01-A (Calendar System)
- [ ] KT reviews and accepts Rule MR-01-B (Solar Term Source)
- [ ] KT reviews and accepts Rule MR-01-C (Timezone Authority)
- [ ] KT reviews and accepts Rule MR-01-D (Historical Timezone Policy)
- [ ] KT reviews and accepts Rule MR-01-E (Reproducibility)
- [ ] Golden cases GR-01-A and GR-01-B identified (full verification in MR-11)
- [ ] Rule versions assigned
- [ ] Document committed and tagged

**Upon full acceptance: Status → `LOCKED`**

---

**End of MR-01**
