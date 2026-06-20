# F8SYNC Calendar Data Manifest V1

## Dataset

- Dataset ID: `f8sync-solar-terms`
- Dataset version: `solar-terms-1899-2101.v1`
- File: `data/solar-terms/solar-terms-1899-2101.v1.json`
- Manifest: `data/solar-terms/manifest.json`
- Coverage buffer: `1899-01-01` through `2101-12-31`
- Advertised birth-year support: `1900` through `2100`
- Record count: `4,872`
- Terms per year: `24`
- Term definition version: `F8SYNC-SOLAR-TERM-V1`

## Source

- Library: `astronomy-engine`
- Library version: `2.1.19`
- License: MIT
- Calculation method: `SearchSunLongitude`
- Generator version: `f8sync-solar-term-generator.v1`
- Generated at: `2026-06-20T00:00:00.000Z`

## Checksum Semantics

Canonical dataset-payload checksum:

```text
7ee6cceacac7de2c2411171c7f7fc4dc35986e7004a296b4776629072355d90c
```

Algorithm:

```text
sha256(stable-json-canonical-dataset-payload)
```

This checksum is calculated over a deterministic canonical serialization of the dataset payload. It is not the SHA-256 of the pretty-printed JSON file bytes.

Dataset file SHA-256:

```text
bd008cc9cdd03ec7192f90bf88273d3fe5f6fae82c07a10f70e7a94debb39a1c
```

The manifest records both values as `datasetChecksum` and `datasetFileSha256`.

## Runtime Rule

Runtime must read the local versioned dataset. Runtime must not call Astronomy Engine, JPL, HKO, FateMaster, or another external calculator.
