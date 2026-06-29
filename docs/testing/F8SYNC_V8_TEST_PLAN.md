# F8SYNC V8 Test Plan

## Existing Verification Baseline

Current checks:

- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm test:e2e`

## Required V8 Test Groups

Domain determinism:

- Identity resolver produces the same archetype profile for the same input and versions.
- Symbolic seal generator produces the same seed hash and SVG data for the same profile.
- Timing calendar values come only from deterministic sources.
- Card composition does not calculate fortune.

Authorization and leakage:

- Guest and Free responses do not include hidden premium result values.
- Identity/card APIs do not expose hidden archetypes, premium art, print exports, or private source data.
- Public share payloads exclude birth date, birth time, exact location, member ID, email, and hidden premium values.

Random draw:

- Random collectible draw uses server-side secure RNG.
- Pack draw receipt includes pool version, odds version, request ID, and audit hash.
- Idempotency prevents duplicate awards.
- Paid randomized packs are disabled by default.
- Published odds match configured odds.

Art and review:

- Unapproved art assets cannot be returned by production card APIs.
- Production art prompts are assembled from approved template fields.
- AI art prompt payloads never include personal birth data.

Physical product:

- Real fulfillment is disabled by default.
- Print jobs cannot be created from unapproved art.
- Proof preview requires explicit user consent before order creation.

Notifications:

- Preferences persist.
- Quiet hours suppress scheduled delivery.
- Duplicate jobs are suppressed.
- Premium-only notifications are not scheduled without entitlement.
- Coupon and subscription expiration templates localize in TH / EN / zh-CN.

Localization:

- Thai is complete first.
- English and Simplified Chinese match Thai dictionary shape.
- Card names and compact labels fit mobile cards.

## E2E Flow Targets

1. Guest opens app, runs preview analysis, sees locked premium identity/card sections.
2. Member registers, redeems coupon, Premium unlocks identity/card detail.
3. Member opens identity route and gets deterministic primary archetype.
4. Member views calendar and event detail without AI-generated timing values.
5. Member receives free non-paid card reward with receipt.
6. Public card share excludes sensitive fields.
7. Physical product preview remains disabled unless feature flag is on.

## Completion Gate

V8 is not complete until the completion evidence in `docs/product/F8SYNC_V8_MASTER_BLUEPRINT.md` section 39.4 is satisfied and recorded in `PROJECT_TRACKING.md`.
