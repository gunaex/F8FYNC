# Milestone 1B.1 — Production Solar-Term Provider Remediation

## Status

Implementation complete locally. No staging, commit, tag, or push has been performed.

## Architecture

Implemented provider split:

- `SolarTermProvider`: stable provider contract for calendar lookup.
- `ProductionSolarTermProvider`: reads the immutable local dataset at runtime.
- `GoldenFixtureSolarTermProvider`: explicit test/regression provider only.

Production does not silently fall back to Golden fixtures. Invalid or missing production data returns structured statuses.

## Dataset Generation

Generation uses `astronomy-engine@2.1.19` at build time through `SearchSunLongitude`. Runtime reads:

```text
data/solar-terms/solar-terms-1899-2101.v1.json
data/solar-terms/manifest.json
```

Coverage:

- Dataset buffer: `1899` through `2101`
- Supported birth years: `1900` through `2100`
- Record count: `4,872`
- Terms per dataset year: `24`

## Runtime Integration

The Gate 1B calendar path now selects `ProductionSolarTermProvider` by default and supports explicit provider injection for tests. Calendar traces include provider identity and dataset version.

Supported structured statuses include:

- `BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE`
- `BLOCKED_CALENDAR_SOURCE_UNAVAILABLE`
- `BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE`
- `BLOCKED_INVALID_TIMEZONE`

## 2026 Verification

`2026-06-20 10:30 Asia/Bangkok` resolves without using a Golden fixture:

- Birth UTC: `2026-06-20T03:30:00.000Z`
- Year pillar: `BING WU`
- Month pillar: `JIA WU`
- Provider trace: `production-solar-term-provider:solar-terms-1899-2101.v1`

## Safety

- Unknown birth time remains partial and is not replaced with `12:00`.
- True Solar Time remains unsupported in V1.
- No commercial calculator was copied or called.
- No external service is required at runtime.
- No Golden fixture production fallback exists.
- No element weighting, identity derivation, archetype, daily timing, AI interpretation, schema, or migration work was included.

## Verification

Commands run:

```text
node scripts/generate-solar-terms.ts
node scripts/verify-solar-terms.ts
pnpm typecheck
pnpm test
```

Result:

- Typecheck: passed
- Unit/contract/integration tests: `81` passed
- Dataset verification: passed
- Dataset canonical payload checksum: `7ee6cceacac7de2c2411171c7f7fc4dc35986e7004a296b4776629072355d90c`
- Dataset checksum algorithm: `sha256(stable-json-canonical-dataset-payload)`
- Dataset file SHA-256: `bd008cc9cdd03ec7192f90bf88273d3fe5f6fae82c07a10f70e7a94debb39a1c`
