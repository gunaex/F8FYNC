# F8SYNC V8 Card Taxonomy

## Card Origins

| Origin | Meaning | Random? | Private by default? |
|---|---|---:|---:|
| `personalized_deterministic` | Based on a user's authorized analysis or timing result. | No | Yes |
| `editorial_collectible` | Designed catalog content not based on personal data. | No | No |
| `random_collectible` | Awarded from an approved pool with receipt and odds version. | Yes | No |
| `event_generated` | Created from approved timing, seasonal, or product events. | Maybe, only if collectible rules apply | Depends on personalization |

## Card Categories

- `identity`
- `archetype`
- `element`
- `seal`
- `timing`
- `event`
- `reflection`
- `methodology`
- `collector_special`

## Rarity

Rarity applies only to collectible cards and never to personal identity quality.

| Code | Thai label |
|---|---|
| `core` | แก่น |
| `rare` | หายาก |
| `radiant` | เจิดจรัส |
| `mythic` | ตำนาน |
| `relic` | มรดก |

Personalized identity cards and timing cards must use `rarity = null`.

## Privacy Levels

- `private`
- `share_link`
- `public_preview`

Public previews must exclude full birth date, birth time, exact birth location, member ID, email, hidden archetypes, premium timing values, premium AI text, print-ready assets, and full-resolution art.

## Required Source Metadata

Every personalized card must preserve:

- analysis ID
- source plugin versions
- archetype mapping version
- card template version
- render version
- visual theme ID
- generated timestamp
