# F8SYNC V8 Data Migration Plan

## Strategy

V8 is additive. Existing MVP tables and memory fallback models remain valid while new identity, card, collection, random-draw, notification, art, and physical-product tables are introduced behind feature flags.

## Existing Migration Baseline

- `0001_commercial_foundation.sql`: member, profile, subscription, usage, payment, consent, history foundation.
- `0002_seed_plans.sql`: Guest, Free, Premium seed plans.
- `0003_coupons.sql`: coupon and coupon redemption constraints.
- `0004_rag_guardrails.sql`: knowledge documents, chunks, and intent audit logs.

## Proposed V8 Migration Order

1. `0005_v8_identity_cards.sql`
   - archetype definitions
   - sacred identity profiles
   - symbolic seals
   - card series
   - card definitions
   - personalized card instances
   - card ownership

2. `0006_v8_random_draw_art.sql`
   - pack definitions
   - odds versions
   - draw receipts
   - art assets
   - art prompt templates
   - review states

3. `0007_v8_events_notifications.sql`
   - timing events
   - notification preferences
   - notification jobs
   - notification deliveries

4. `0008_v8_physical_products.sql`
   - print specifications
   - physical products
   - proof records
   - mock order and fulfillment records

## Ownership Controls

- Identity profiles belong to a member or to an analysis owned by a member.
- Personalized cards are private by default and must link to authorized source records.
- Card ownership is separate from subscription status.
- Pack draw receipts must be immutable after creation.
- Print proof and order records must never expose raw birth data in public payloads.

## Repository Layer Plan

Keep memory fallback for preview, then introduce a repository interface per bounded domain:

- `IdentityRepository`
- `CardRepository`
- `CollectionRepository`
- `RandomDrawRepository`
- `ArtAssetRepository`
- `PhysicalProductRepository`
- `NotificationRepository`

Production adapters should target Supabase PostgreSQL first, with pgvector reserved for RAG.

## Backfill Plan

No destructive backfill is needed for the current MVP. Existing analysis history can be enriched later with identity profiles and personalized cards when a member opens or unlocks the record.

## Rollback Plan

All V8 features must be guarded by feature flags. If a V8 table or service is unavailable, existing fortune analysis, coupons, auth, and RAG guardrails must continue to operate.
