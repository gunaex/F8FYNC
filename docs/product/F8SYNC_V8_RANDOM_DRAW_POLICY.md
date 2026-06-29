# F8SYNC V8 Random Draw Policy

## Scope

Random draw exists only for collectibles. It never changes deterministic fortune, timing, identity, compatibility, archetype assignment, subscription entitlement, or personal quality.

## MVP-Safe Draws

- One free onboarding collectible.
- Daily or weekly non-paid reward.
- Premium monthly card reward.
- Event participation reward.
- Coupon-based pack.
- Admin test pack.

Paid randomized packs are disabled by default.

## Hard Rules

- Use server-side secure randomness only.
- Never use `Math.random()` for server awards.
- Use idempotency keys.
- Create draw receipt and ownership records atomically.
- Store immutable pool version and odds version.
- Published odds must match configured odds.
- No cash-out.
- No staking, wagering, resale market, or peer-to-peer trading in MVP.
- No fortune advantage from collectible rarity.
- Do not target pack offers based on fear, caution scores, or vulnerable timing windows.

## Required Receipt Fields

- receipt ID
- member ID
- pack definition ID
- pool version
- odds version
- request ID
- RNG provider
- audit hash
- awarded card definition IDs
- created timestamp

## Review Gate for Paid Packs

Paid packs require product, consumer-protection, age, platform-policy, regional, and legal review before enablement.
