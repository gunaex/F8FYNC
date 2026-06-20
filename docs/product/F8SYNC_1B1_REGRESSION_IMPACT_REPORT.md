# F8SYNC 1B.1 Regression Impact Report

## Summary

Milestone 1B.1 replaces fixture-only solar-term lookup with the production local dataset `solar-terms-1899-2101.v1`. Existing Golden fixtures remain locked for regression checks and are not selected automatically.

## Fixture Comparison

Tolerance noted here is review tolerance only. Differences do not automatically rewrite Golden fixtures.

| Term | Fixture instant | Production instant | Difference seconds | Within 60s | Suspected reason |
|---|---:|---:|---:|---|---|
| 1940 LI_CHUN | `1940-02-05T05:00:00.000Z` | `1940-02-04T23:07:05.000Z` | `-21175` | No | Historic fixture was coarse/placeholder-like |
| 1940 LI_DONG | `1940-11-07T12:00:00.000Z` | `1940-11-07T13:26:49.000Z` | `5209` | No | Historic fixture was coarse/placeholder-like |
| 1989 LI_CHUN | `1989-02-04T00:00:00.000Z` | `1989-02-03T20:27:15.000Z` | `-12765` | No | Historic fixture was coarse/placeholder-like |
| 1989 DA_XUE | `1989-12-07T00:00:00.000Z` | `1989-12-07T03:21:05.000Z` | `12065` | No | Historic fixture was coarse/placeholder-like |
| 1990 LI_CHUN | `1990-02-04T00:00:00.000Z` | `1990-02-04T02:13:58.000Z` | `8038` | No | Historic fixture was coarse/placeholder-like |
| 2000 XIAO_HAN | `2000-01-06T07:00:00.000Z` | `2000-01-06T01:00:56.000Z` | `-21544` | No | Historic fixture was coarse/placeholder-like |
| 2000 LI_CHUN | `2000-02-04T12:40:00.000Z` | `2000-02-04T12:40:18.000Z` | `18` | Yes | Seconds precision added |
| 2024 LI_CHUN | `2024-02-04T08:27:00.000Z` | `2024-02-04T08:26:50.000Z` | `-10` | Yes | Seconds precision added |
| 2024 JING_ZHE | `2024-03-05T02:22:00.000Z` | `2024-03-05T02:22:29.000Z` | `29` | Yes | Seconds precision added |
| 2024 QING_MING | `2024-04-04T07:02:00.000Z` | `2024-04-04T07:02:15.000Z` | `15` | Yes | Seconds precision added |

## Downstream Impact

- Existing Four Pillars tests pass.
- Existing element tests pass.
- Existing identity tests pass.
- Existing daily timing tests pass.
- No identity, archetype, daily timing, AI interpretation, schema, or migration behavior was changed.

## Stored Result Risk

No destructive migration was added. If persisted chart results include calendar version metadata, old results should be marked stale or recalculated only through an explicit future migration. A formal stale-result mechanism was not added in this corrective milestone.

