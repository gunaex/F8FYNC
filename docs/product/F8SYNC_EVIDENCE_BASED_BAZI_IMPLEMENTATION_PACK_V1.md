# F8SYNC — Evidence-Based BaZi Calculation Implementation Pack

**Version:** 1.0  
**Status:** Approved for implementation planning  
**Methodology Authority:** F8SYNC Methodology Lead  
**Product Acceptance:** KT  
**Scope:** Calendar, Solar Terms, Year/Month/Day/Hour Pillar Foundation

---

## 1. Decision

F8SYNC will proceed with implementation now.

The implementation will not copy a commercial calculator. It will use versioned astronomical sources, explicit F8SYNC methodology decisions, reproducible algorithms, Golden tests, cross-reference tests, evidence, and calculation traces.

---

## 2. Authority Layers

### Level A — Astronomical and Time Authority

- IANA Time Zone Database
- GB/T 33661-2017 Chinese calendar standard
- JPL ephemerides / Horizons for validation or dataset generation
- VSOP87 as an acceptable reproducible solar-position theory
- Hong Kong Observatory solar-term tables for independent verification

### Level B — Traditional BaZi Calculation Methodology

- Gan-Zhi sexagenary cycle
- Li Chun as F8SYNC BaZi year boundary
- Twelve Jie as month-pillar boundaries
- Official year-stem-to-month-stem mapping
- Official day-stem-to-hour-stem mapping
- Versioned day-boundary policy
- Unknown-time handling

### Level C — F8SYNC Intelligence Layer

- Element normalization
- Identity dimensions
- Archetypes
- Narrative tokens
- Timing guidance
- Confidence and disclosure

Level C must never alter the calculated Four Pillars.

---

## 3. Locked V1 Calendar Rules

### CAL-001 — Timezone

- Input timezone must be a confirmed IANA timezone ID.
- Convert local civil birth date/time to UTC.
- Do not derive timezone from free-text location.
- Do not silently use device timezone.
- Historical offsets come from a versioned IANA TZDB.

### CAL-002 — Time Adjustment

V1 supports only:

```text
LOCAL_CIVIL_TIME
```

True Solar Time remains unsupported in V1.

### CAL-003 — Solar-Term Definition

A solar term occurs when the Sun's apparent geocentric ecliptic longitude reaches an integral multiple of 15 degrees.

### CAL-004 — Coverage

Initial supported range:

```text
1900-01-01 through 2100-12-31
```

Unsupported years return:

```text
BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE
```

### CAL-005 — Runtime Strategy

Use a deterministic local dataset generated from an astronomical source:

```text
Ephemeris
  ↓
Solar-longitude root solver
  ↓
24 UTC term instants per year
  ↓
Independent validation
  ↓
Versioned immutable dataset
  ↓
ProductionSolarTermProvider
```

Golden fixtures remain test-only.

---

## 4. Solar-Term Algorithm

### 4.1 Twelve Jie Boundaries

| Term | Code | Longitude |
|---|---|---:|
| Li Chun | J1 | 315° |
| Jing Zhe | J2 | 345° |
| Qing Ming | J3 | 15° |
| Li Xia | J4 | 45° |
| Mang Zhong | J5 | 75° |
| Xiao Shu | J6 | 105° |
| Li Qiu | J7 | 135° |
| Bai Lu | J8 | 165° |
| Han Lu | J9 | 195° |
| Li Dong | J10 | 225° |
| Da Xue | J11 | 255° |
| Xiao Han | J12 | 285° |

### 4.2 Root Finding

For target longitude `L`:

1. Select an approximate date window.
2. Compute apparent geocentric solar ecliptic longitude `lambda(t)`.
3. Compute `normalizeSignedDegrees(lambda(t) - L)`.
4. Find a bracket crossing zero.
5. Resolve with Brent or bisection.
6. Stop when the time interval is no more than one second.
7. Store the UTC instant and source metadata.

Do not use fixed Gregorian dates, fixed 15-day spacing, or Gregorian month boundaries.

### 4.3 Required Metadata

```typescript
interface SolarTermBoundary {
  termCode: string
  targetLongitudeDegrees: number
  instantUtc: string
  sourceId: string
  sourceVersion: string
  ephemerisId: string
  calculationVersion: string
  generatedAt: string
  checksum?: string
}
```

---

## 5. Provider Architecture

```text
SolarTermProvider
├── GoldenFixtureSolarTermProvider
└── ProductionSolarTermProvider
```

### GoldenFixtureSolarTermProvider

- Explicit test injection only
- Never used as production fallback

### ProductionSolarTermProvider

- Loads versioned production term data
- Supports the declared range
- Returns structured failures
- Does not call AI
- Does not call a commercial BaZi service

Recommended files:

```text
data/solar-terms/manifest.json
data/solar-terms/solar-terms-1900-2100.v1.json
scripts/generate-solar-terms.ts
scripts/verify-solar-terms.ts
```

---

## 6. Locked V1 BaZi Rules

### BZ-YEAR-001 — Year Boundary

The F8SYNC BaZi year changes at the exact Li Chun instant.

```text
birthInstant < LiChun(year)  → previous BaZi year
birthInstant >= LiChun(year) → current BaZi year
```

This is a versioned F8SYNC BaZi methodology choice, separate from the official lunar-calendar year boundary.

### BZ-YEAR-002 — Year Stem and Branch

```text
sexagenaryYearIndex = floorMod(baziYear - 4, 60)
stemIndex = sexagenaryYearIndex % 10
branchIndex = sexagenaryYearIndex % 12
```

Validate the anchor against official published calendars.

### BZ-MONTH-001 — Month Boundaries

| Month | Branch | Starts At |
|---:|---|---|
| 1 | Yin 寅 | Li Chun |
| 2 | Mao 卯 | Jing Zhe |
| 3 | Chen 辰 | Qing Ming |
| 4 | Si 巳 | Li Xia |
| 5 | Wu 午 | Mang Zhong |
| 6 | Wei 未 | Xiao Shu |
| 7 | Shen 申 | Li Qiu |
| 8 | You 酉 | Bai Lu |
| 9 | Xu 戌 | Han Lu |
| 10 | Hai 亥 | Li Dong |
| 11 | Zi 子 | Da Xue |
| 12 | Chou 丑 | Xiao Han |

Qi terms do not change the F8SYNC month pillar.

### BZ-MONTH-002 — Month Stem

| Year Stem | Yin Month Stem |
|---|---|
| Jia / Ji | Bing |
| Yi / Geng | Wu |
| Bing / Xin | Geng |
| Ding / Ren | Ren |
| Wu / Gui | Jia |

Advance sequentially for later months.

### BZ-DAY-001 — Day Cycle

- Continuous 60-day cycle
- Use a Julian-day-based ordinal or equivalent continuous civil-day index
- Store at least two independently verified anchor dates
- Test Gregorian leap days
- Do not use lunar date for day pillar

The exact anchor must be recorded in the rule register before production release.

### BZ-DAY-002 — Day Boundary

F8SYNC V1 uses:

```text
CIVIL_MIDNIGHT
```

The day pillar changes at `00:00:00` in the confirmed local civil timezone.

The Zi hour still begins at 23:00.

### BZ-HOUR-001 — Hour Branch

| Local Time | Branch |
|---|---|
| 23:00–00:59 | Zi |
| 01:00–02:59 | Chou |
| 03:00–04:59 | Yin |
| 05:00–06:59 | Mao |
| 07:00–08:59 | Chen |
| 09:00–10:59 | Si |
| 11:00–12:59 | Wu |
| 13:00–14:59 | Wei |
| 15:00–16:59 | Shen |
| 17:00–18:59 | You |
| 19:00–20:59 | Xu |
| 21:00–22:59 | Hai |

### BZ-HOUR-002 — Hour Stem

| Day Stem | Zi Hour Stem |
|---|---|
| Jia / Ji | Jia |
| Yi / Geng | Bing |
| Bing / Xin | Wu |
| Ding / Ren | Geng |
| Wu / Gui | Ren |

Advance sequentially for later hour branches.

### BZ-HOUR-003 — Unknown Time

For `UNKNOWN`:

- Do not calculate an hour pillar.
- Return a partial result.
- Disclose affected outputs.
- Never substitute `12:00`.

Preserve `APPROXIMATE` and `DISPUTED` states and reduce confidence where appropriate.

---

## 7. Structured Failures

```text
BLOCKED_INVALID_INPUT
BLOCKED_INVALID_TIMEZONE
BLOCKED_MISSING_TIMEZONE
BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE
BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE
BLOCKED_CALENDAR_SOURCE_UNAVAILABLE
BLOCKED_DAY_CYCLE_ANCHOR_NOT_APPROVED
PARTIALLY_READY_UNKNOWN_BIRTH_TIME
```

Do not map every failure to a generic “ข้อมูลยังไม่พอ”.

---

## 8. Verification

### Astronomical Cross-Check

Compare solar-term UTC instants against:

- Hong Kong Observatory published term times
- JPL Horizons / JPL ephemeris
- A second independent implementation

Suggested tolerance:

```text
Minute-resolution official table: within 60 seconds
Ephemeris comparison: documented implementation tolerance
```

### Required Tests

- Supported non-fixture year
- `2026-06-20` in `Asia/Bangkok`
- One second before and after Li Chun
- One second before and after every Jie boundary
- UTC and Asia/Bangkok conversion
- Historical IANA offset case
- Start/end of supported range
- Unsupported range
- Deterministic repeatability
- Production never falls back to Golden fixtures
- Missing time never becomes `12:00`
- Unknown time has no hour pillar
- Civil-midnight day boundary
- Zi hour begins at 23:00
- Mandatory versions and trace ID

Commercial calculators may be used only as independent comparison tools, never as authorities or runtime dependencies.

---

## 9. Implementation Sequence

```text
1. Finalize Milestone 1A
2. Record methodology decisions from this pack
3. Implement ProductionSolarTermProvider
4. Generate/validate 1900–2100 dataset
5. Integrate Li Chun year boundary
6. Integrate Jie month boundaries
7. Implement verified day-cycle anchors
8. Implement hour branch/stem
9. Return partial results for unknown time
10. Add boundary/regression tests
11. Replace fixture-only production gate
12. Preserve legacy engine as PLACEHOLDER until migrated
```

---

## 10. Codex Implementation Instruction

Implement the evidence-based F8SYNC BaZi chart-construction foundation.

### Required Work

1. Audit the current fixture provider and calculation path.
2. Define or formalize `SolarTermProvider`.
3. Keep `GoldenFixtureSolarTermProvider` test-only.
4. Add `ProductionSolarTermProvider`.
5. Add a build-time dataset generator.
6. Generate a versioned 1900–2100 UTC solar-term dataset.
7. Add manifest, source metadata, calculation version, and checksum.
8. Add structured provider failure states.
9. Use exact Li Chun instant for year boundary.
10. Use exact Jie instants for month boundary.
11. Use the approved month-stem mapping.
12. Implement continuous day-cycle infrastructure with documented anchors.
13. Use civil midnight as the V1 day boundary.
14. Implement hour branches and hour stems.
15. Return partial results when birth time is unknown.
16. Update UI messages by failure status.
17. Add targeted and full regression tests.
18. Update methodology, readiness, source, and implementation documents.

### Prohibited

- Do not copy or scrape a commercial calculator.
- Do not call a commercial BaZi service at runtime.
- Do not add production years manually to Golden fixtures.
- Do not use Gregorian month boundaries.
- Do not use fixed dates for solar terms.
- Do not call AI to generate calendar values.
- Do not enable True Solar Time.
- Do not replace missing time with `12:00`.
- Do not implement element weighting, identity, archetype, or daily timing here.
- Do not silently change historical results.
- Do not stage, commit, tag, or push.

### Completion Report

Report:

- Provider architecture
- Astronomical source or theory
- Coverage
- Dataset version/checksum
- Rules implemented
- Day-boundary policy
- Unknown-time behavior
- Structured errors
- Files changed
- Tests and verification
- Cross-reference differences
- Git status

Explicitly confirm:

- `2026-06-20` resolves without a Golden fixture.
- Production does not use Golden fixtures.
- No commercial calculator logic was copied.
- Missing time is never replaced with `12:00`.
- No identity or interpretation methodology was added.

---

## 11. Product Disclosure

The astronomical and calendar computations are deterministic and testable.

BaZi identity, personality, and future-oriented interpretations are traditional cultural-model outputs and must not be presented as scientifically proven facts or guarantees.

---

**End of Implementation Pack**
