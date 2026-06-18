# F8SYNC — Codex Implementation Brief V1

**Version:** 1.1  
**Date:** 2026-06-18  
**Status:** `IMPLEMENTATION_BRIEF_DRAFT_GATE_CLOSED`  
**Audience:** Codex / implementation agent  
**Scope:** Deterministic BaZi engine planning after methodology gates are locked  

---

## 0. Read This First

This document is a handoff brief for future implementation work. It does not authorize implementation by itself.

Before writing calculation code, Codex must verify that the relevant methodology rules are `LOCKED` and the relevant Golden Reference cases are `APPROVED`.

Hard stop:

- Do not implement BaZi calculations from this brief alone.
- Do not treat captured candidate outputs as approved Golden values.
- Do not use AI to calculate or estimate BaZi values.
- Do not use `12:00` as a default for unknown birth time.
- Do not skip gates.
- Do not implement MR-06 through MR-10 until those rule packages exist and are accepted.

---

## 1. Current Repository Baseline

The local repository currently contains these relevant milestone tags:

| Tag | Meaning |
|---|---|
| `milestone-0d1-methodology-authority-resolution` | Evidence-based methodology authority model |
| `milestone-0d2-methodology-rules-mr01-mr05` | MR-01 through MR-05 proposed rule packages |
| `milestone-0d3-golden-reference-candidates` | MR-11 candidate Golden Reference package |
| `milestone-0d4-golden-references-evidence-log` | MR-11 captured-output evidence log |
| `milestone-1a-birth-input-foundation` | Birth input and timezone foundation |

Milestone 1A is complete. It does not implement BaZi calculation methodology.

Known 1A foundation:

- `src/core/profile/birth-input.ts`
- `src/core/profile/timezone-suggestions.ts`
- `src/core/profile/index.ts`
- `src/core/commercial/schemas.ts`
- `src/core/commercial/types.ts`
- `src/core/commercial/birth-profile-service.ts`
- `migrations/0005_birth_input_foundation.sql`
- `tests/unit/birth-input-foundation.test.ts`
- `docs/product/F8SYNC_1A_BIRTH_INPUT_FOUNDATION.md`
- `docs/product/F8SYNC_1A_LEGACY_INPUT_MIGRATION.md`
- `docs/product/F8SYNC_1A_IMPLEMENTATION_REPORT.md`

Do not modify 1A files unless the active gate task explicitly requires it.

---

## 2. Methodology Status

| Package | Topic | Current Implementation Status |
|---|---|---|
| MR-01 | Calendar and timezone authority | Proposed; must be locked before Gate 1B |
| MR-02 | Year boundary and Li Chun | Proposed; must be locked before Gate 1B |
| MR-03 | Solar-term month boundary | Proposed; must be locked before Gate 1B |
| MR-04 | Day pillar and day rollover | Proposed; must be locked before Gate 1C |
| MR-05 | Hour pillar and unknown birth time | Proposed; must be locked before Gate 1C |
| MR-06 | Hidden stems and Ten Gods | Not yet present in repo |
| MR-07 | Day Master and seasonal strength | Not yet present in repo |
| MR-08 | Element weighting | Not yet present in repo |
| MR-09 | Identity dimensions | Not yet present in repo |
| MR-10 | Daily timing | Not yet present in repo |
| MR-11 | Golden references and regression suite | Candidate/evidence log only; approved Golden values pending |

No package listed above should be treated as an implementation approval unless its file explicitly records `LOCKED` status and KT acceptance.

---

## 3. Required Read Order Before Any Code

Before implementing any gate, read these files in order:

```text
docs/product/F8SYNC_0D1_METHODOLOGY_AUTHORITY_RESOLUTION.md
docs/product/F8SYNC_MR01_CALENDAR_TIMEZONE_AUTHORITY.md
docs/product/F8SYNC_MR02_YEAR_BOUNDARY_LI_CHUN.md
docs/product/F8SYNC_MR03_SOLAR_TERM_MONTH_BOUNDARY.md
docs/product/F8SYNC_MR04_DAY_PILLAR_ROLLOVER.md
docs/product/F8SYNC_MR05_HOUR_PILLAR_UNKNOWN_TIME.md
docs/product/F8SYNC_MR11_GOLDEN_REFERENCES.md
docs/product/F8SYNC_MR11_GOLDEN_REFERENCES_VERIFIED.md
docs/product/F8SYNC_1A_IMPLEMENTATION_REPORT.md
```

For Gate 1D and later, also read the future MR files when they exist:

```text
docs/product/F8SYNC_MR06_HIDDEN_STEMS_TEN_GODS.md
docs/product/F8SYNC_MR07_DAY_MASTER_SEASONAL_STRENGTH.md
docs/product/F8SYNC_MR08_ELEMENT_WEIGHTING.md
docs/product/F8SYNC_MR09_IDENTITY_DIMENSIONS.md
docs/product/F8SYNC_MR10_DAILY_TIMING.md
```

If any required file is missing, stop and report the blocker.

---

## 4. Gate Sequence

Implement gates in strict order only after prerequisites are satisfied.

```text
Gate 1B -> Gate 1C -> Gate 1D -> Gate 1E -> Gate 1F
```

### Gate 1B: Calendar and Solar-Term Foundation

**Preconditions:**

- MR-01 is `LOCKED`
- MR-02 is `LOCKED`
- MR-03 is `LOCKED`
- At least two relevant Golden boundary cases are `APPROVED`
- Ephemeris/timezone dependency choice is versioned

**Allowed implementation scope after unlock:**

- Calendar and solar-term resolver boundary
- Li Chun year boundary support
- Jié month boundary support
- IANA timezone normalization for boundary comparison
- Boundary disputed flag within the approved tolerance
- Year and month pillar output only

**Do not implement in Gate 1B:**

- Day pillar
- Hour pillar
- Hidden stems
- Ten Gods
- Element weighting
- Identity dimensions
- Daily timing

**Likely files, subject to local architecture review:**

```text
src/core/engine/calendar.ts
src/core/engine/ephemeris.ts
tests/unit/calendar.test.ts
```

Create migrations only if a schema change is truly required.

### Gate 1C: Four Pillars Foundation

**Preconditions:**

- Gate 1B is complete and tested
- MR-01 through MR-05 are all `LOCKED`
- Required Four Pillars Golden cases are `APPROVED`

**Allowed implementation scope after unlock:**

- Day pillar calculation from the approved day-cycle rule
- Approved day rollover behavior
- Zi-hour variant disclosure
- Hour branch assignment
- Hour stem derivation from approved rule
- Unknown birth time behavior
- Approximate birth time behavior
- `THREE_PILLAR_PARTIAL` result when hour is unknown

**Hard rule:** unknown birth time must remain unknown. Never substitute `12:00`, noon, Zi hour, midpoint, or AI-estimated time.

**Likely files, subject to local architecture review:**

```text
src/core/engine/pillars.ts
src/core/engine/stems-branches.ts
tests/unit/pillars.test.ts
```

### Gate 1D: BaZi Structure and Element Foundation

**Current status:** blocked because MR-06, MR-07, and MR-08 are not yet present in the repo.

Do not implement this gate until:

- MR-06 is created and `LOCKED`
- MR-07 is created and `LOCKED`
- MR-08 is created and `LOCKED`
- Gate 1C is complete and tested
- Relevant Golden cases are `APPROVED`

### Gate 1E: Identity Layer

**Current status:** blocked because MR-09 is not yet present in the repo.

Do not implement identity dimensions or archetypes until:

- MR-09 is created and `LOCKED`
- Gate 1D is complete and tested
- Relevant Golden identity cases are `APPROVED`

### Gate 1F: Daily Timing

**Current status:** blocked because MR-10 is not yet present in the repo.

Do not implement daily timing until:

- MR-10 is created and `LOCKED`
- Gate 1E is complete and tested
- Relevant Golden timing cases are `APPROVED`

---

## 5. Golden Reference Handling

Golden references are not ready for implementation use until they are `APPROVED`.

Current files:

```text
docs/product/F8SYNC_MR11_GOLDEN_REFERENCES.md
docs/product/F8SYNC_MR11_GOLDEN_REFERENCES_VERIFIED.md
```

`F8SYNC_MR11_GOLDEN_REFERENCES.md` defines candidate cases.

`F8SYNC_MR11_GOLDEN_REFERENCES_VERIFIED.md` is an evidence log. Despite the filename, it currently records captured candidate outputs pending evidence. It does not open implementation gates.

Implementation tests must not hard-code captured candidate values unless those values have been promoted to `APPROVED` with evidence and KT acceptance.

---

## 6. Engine Output Contract Draft

The engine output contract below is a draft shape for implementation planning. Final field names must align with the existing 0C intelligence contracts and local TypeScript conventions.

```typescript
type BirthTimeConfidence = "KNOWN" | "APPROXIMATE" | "UNKNOWN" | "DISPUTED";
type ChartType = "FOUR_PILLAR" | "THREE_PILLAR_PARTIAL";
type BoundaryFlag = "BOUNDARY_DISPUTED" | "PRE_BOUNDARY" | "POST_BOUNDARY";

interface StemBranch {
  stem: string;
  branch: string;
  source_rule_id: string;
  confidence: "HIGH" | "MEDIUM" | "LOW" | "DISPUTED";
}

interface BaziCalculationResult {
  calendar_engine: string;
  calendar_engine_version: string;
  ephemeris_data: string;
  iana_version: string;
  rule_version: string;
  calculated_at: string;

  birth_date: string;
  birth_time: string | "UNKNOWN";
  birth_timezone: string;
  birth_time_confidence: BirthTimeConfidence;

  year_pillar?: StemBranch;
  month_pillar?: StemBranch;
  day_pillar?: StemBranch;
  hour_pillar?: StemBranch | "UNKNOWN";

  chart_type: ChartType;
  boundary_flags: BoundaryFlag[];
  affected_outputs: string[];
  trace: string[];
}
```

Do not add derived fields for element weighting, identity, or daily timing before their gates are unlocked.

---

## 7. Test Requirements

Every gate must include tests that prove:

- The gate refuses to run if required input is missing.
- Unknown birth time does not produce a fabricated hour pillar.
- The result includes rule/version metadata.
- Boundary behavior matches approved Golden cases only.
- Partial outputs are explicitly flagged.
- Existing 1A tests continue to pass.

Use the package manager already established by the repo. If the repo uses `pnpm`, prefer:

```text
pnpm test
pnpm typecheck
```

Do not switch package managers for a gate.

---

## 8. Commit Convention

Use one implementation commit per gate after tests pass.

Suggested commit format:

```text
feat: implement gate 1B calendar and solar-term foundation
```

Suggested tag format:

```text
milestone-1b-calendar-foundation
milestone-1c-four-pillars-foundation
milestone-1d-bazi-structure-elements
milestone-1e-identity-layer
milestone-1f-daily-timing
```

Do not tag a gate until its prerequisite rules are locked, approved Golden cases exist, and tests pass.

---

## 9. Report Back Format

After each gate, report:

1. Current branch and previous HEAD.
2. Files created or modified.
3. Methodology rules used, with status and version.
4. Golden cases used, with approval status.
5. Test commands and results.
6. Any unresolved rule ambiguity.
7. Remaining dirty working tree paths.

Do not proceed to the next gate until the current gate is reviewed.

---

## 10. Non-Negotiable Safety Rules

```text
NEVER use 12:00 as default for unknown birth time
NEVER use Chinese New Year as the BaZi year boundary unless a locked rule says so
NEVER use Gregorian month as the BaZi month boundary unless a locked rule says so
NEVER calculate BaZi using AI inference
NEVER treat captured candidate outputs as Golden values
NEVER skip a gate
NEVER modify unrelated dirty files
NEVER implement MR-06 through MR-10 before those files exist and are locked
NEVER implement V2-deferred features during V1 gates
NEVER use legacy placeholder outputs as Golden references
```

---

**End of Codex Implementation Brief V1.1**
