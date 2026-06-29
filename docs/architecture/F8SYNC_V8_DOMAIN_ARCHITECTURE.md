# F8SYNC V8 Domain Architecture

## Current-State Repository Audit

F8SYNC currently has a working Next.js App Router application with deterministic fortune orchestration, plugin SDK contracts, member/session foundations, coupons, usage entitlements, RAG guardrails, Premium Reveal API filtering, and a methodology catalog.

Working modules to preserve:

- `src/core/domain`: Fortune request/result types and runtime validation.
- `src/core/orchestrator`: Plugin execution and aggregation flow.
- `src/plugin-sdk`: Manifest, validation, registry, and safe execution boundaries.
- `src/plugins`: Active BaZi, Numerology, and Timing MVP plugins plus methodology catalog metadata.
- `src/core/commercial`: Member, plan, subscription, coupon, entitlement, usage, history, and Premium Reveal foundations.
- `src/ai`: Guardrails, local RAG, token budgets, deterministic FAQ, mock interpretation provider.
- `src/app/api`: Fortune, interpretation, health, auth, member, subscription, billing, coupon, history, profile, and usage APIs.
- `src/ui`: Shared app shell, form, result, timing, coupon, and commercial components.

Partially implemented modules:

- Production repository adapters are pending; runtime still uses memory fallback.
- Production auth and payment providers are pending.
- Premium Reveal is enforced at `/api/fortune`, but shared locked UI components and enrichment are pending.
- Methodology catalog has foundation metadata, but Thai Astrology, Western Astrology, Tarot, I Ching, Korean Saju, and Japanese systems do not calculate yet.

Not implemented for V8:

- Sacred Identity domain.
- Deterministic archetype resolver.
- Symbolic seal generator.
- Timing calendar and event notices.
- Card composition engine.
- Card collection, ownership, series, editions, and variants.
- Random draw receipts and odds policies in code.
- Art asset provenance workflow.
- Physical product and print readiness models.
- Notification engine.

## V8 Bounded Domains

| Domain | Current status | Boundary |
|---|---|---|
| `fortune-core` | Partial | Deterministic plugin calculations and aggregation only. |
| `identity` | Pending | Semantic traits, archetypes, identity profile, symbolic seal. |
| `timing` | Partial | Timing windows exist; calendar and activity timing pending. |
| `events` | Pending | Methodology, astronomical, seasonal, subscription, and product notices. |
| `cards` | Pending | Definitions, templates, compositions, render payloads. |
| `collection` | Pending | Series, ownership, duplicates, favorites, archive. |
| `random-draw` | Pending | Auditable collectible randomness only, separate from fortune. |
| `art-assets` | Pending | Provenance, review, prompt templates, approved exports. |
| `physical-products` | Pending | Print specs, SKUs, proof workflow, fulfillment boundary. |
| `commerce` | Partial | Mock subscription payment exists; card commerce pending. |

## Mandatory Data Flow

```text
Birth / Target / Event Input
        -> Deterministic Fortune Engines
        -> Normalized Structured Results
        -> Semantic Archetype Layer
        -> Authorized Identity & Timing Output
        -> Card Composition Engine
        -> Digital Card / Calendar / Event Experience
        -> Optional RAG-grounded AI Interpretation
        -> Future Print and Commerce Adapters
```

Rules:

- AI never calculates fortune values, archetypes, scores, timing windows, card ownership, rarity, or draw results.
- Random collectible draws never alter personal identity, fortune, timing, or compatibility results.
- Card ownership and subscription entitlement are separate concepts.
- Physical-product submission requires explicit preview and consent.

## V8 Gap Analysis

High priority:

- Add identity domain types, registry, deterministic resolver, and tests.
- Add V8 database migrations for identity, cards, collection, random draw, art assets, physical products, notifications.
- Add shared authorization builders for identity and card payload filtering.
- Add feature flags for V8 surfaces and future paid/random/physical functions.

Medium priority:

- Build identity, calendar, cards, and collection routes using shared components.
- Add notification preferences, scheduler abstraction, and in-app provider.
- Add missing-key validation across TH / EN / zh-CN dictionaries.

Deferred:

- Real paid packs.
- Real physical fulfillment.
- Production AI art pipeline.
- Marketplace, resale, trading, cash value, or wagering mechanics.

## File-by-File Implementation Plan

Near-term additions:

- `src/core/identity/*`: Traits, archetypes, resolver, symbolic seal.
- `src/core/cards/*`: Card taxonomy, composition engine contracts, privacy-safe render payloads.
- `src/core/collection/*`: Series, ownership, collection state.
- `src/core/random-draw/*`: Pack definitions, odds config, receipt model, secure RNG interface.
- `src/core/events/*`: Timing and product event notice types.
- `src/core/physical-products/*`: Print specs, physical product models, mock provider contracts.
- `src/core/notifications/*`: Preference, job, scheduler, provider contracts.
- `migrations/0005_v8_identity_cards.sql`: V8 persistence foundation.
- `docs/product/*`: Product, naming, art, taxonomy, random draw, and physical product governance.

## Feature-Flag Plan

Use centralized flags from `src/config/feature-flags.ts`.

- `ENABLE_V8_IDENTITY`
- `ENABLE_V8_CARDS`
- `ENABLE_V8_COLLECTION`
- `ENABLE_V8_PACKS`
- `ENABLE_V8_PHYSICAL_PRODUCTS`
- `ENABLE_V8_NOTIFICATIONS`
- `ENABLE_PAID_RANDOM_PACKS` must default to false.
- `ENABLE_REAL_FULFILLMENT` must default to false.

## API Authorization Plan

All V8 APIs must check, in order:

1. Authentication/session where required.
2. Entitlement through the centralized entitlement service.
3. Ownership or analysis ownership for private cards and identity.
4. Reveal filtering before returning payloads.
5. Audit logging for sensitive operations, random draws, sharing, art approvals, and print proof actions.

Unauthorized responses must not include hidden archetypes, premium card art URLs, print-ready assets, pack reward payloads, or premium timing values.

## Security and Privacy Risk List

- Birth data must not be embedded in symbolic seals, public card payloads, or image prompts.
- Public share payloads must exclude full birth date, time, exact location, member ID, email, and hidden premium values.
- Admin art prompts must not bypass approved production prompt templates.
- Print jobs must never be sent automatically from unreviewed AI art.
- Private cards must not be indexed.

## Card Randomness Risk List

- Personal identity and timing must never be random.
- Random draw must use server-side secure randomness, not `Math.random()`.
- Receipts must include immutable pool and odds versions.
- Paid randomized packs remain disabled until review.
- No cash-out, resale, staking, wagering, or financial-value presentation.

## Art and Cultural-Review Risk List

- Avoid copying third-party franchises, living artists, logos, or real people without permission.
- Avoid assigning real religious figures automatically.
- Require review for culturally sensitive motifs.
- Generated art must not contain final text; typography belongs in composition.

## Physical Product Boundary List

- Physical models are future-facing only.
- Real fulfillment defaults disabled.
- User must preview and consent before order creation.
- Print-ready exports require approved art, approved template, and privacy filtering.
