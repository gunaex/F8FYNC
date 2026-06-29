# F8SYNC

F8SYNC is a mobile-first Fortune & Timing Intelligence Platform for Thailand. The current V8 blueprint expands the product into a Sacred Identity, Timing, Digital Card, Collection, and future Physical Card platform while preserving deterministic fortune engines as the source of truth.

The product direction is private banker, wellness coach, and personal timing advisor. It avoids horoscope, tarot, gambling, fear-based, and guaranteed-outcome positioning.

## Product Authority

The V8 implementation authority lives in:

- `docs/product/F8SYNC_V8_MASTER_BLUEPRINT.md`
- `docs/architecture/F8SYNC_V8_DOMAIN_ARCHITECTURE.md`
- `docs/architecture/F8SYNC_V8_DATA_MIGRATION.md`
- `docs/testing/F8SYNC_V8_TEST_PLAN.md`

V8 is additive. Working fortune, coupon, entitlement, RAG, and Premium Reveal modules must be preserved while identity, cards, collection, notifications, art governance, random draw, and physical-product readiness are added behind explicit boundaries and feature flags.

## Current Scope

- Birth profile input
- Daily, timing, compatibility, and comparison analysis types
- Optional target input for phone numbers, vehicle plates, house or room numbers, names, and event dates
- Three deterministic MVP plugins: BaZi, Numerology, and Timing
- Confidence-weighted aggregation, agreement, conflicts, recommendations, warnings, and timing windows
- Thai default UI with English and Simplified Chinese through one i18n system
- Optional AI interpretation through a provider abstraction with a deterministic mock fallback
- Vercel-compatible API routes with memory fallback for preview and Supabase/Postgres migration foundations for production
- V8 Sacred Identity foundation with deterministic archetype resolution from aggregated engine output
- V8 documentation set for naming, art direction, card taxonomy, random draw policy, and physical product readiness

Excluded from current implementation: marketplace, native app, production-grade astrology algorithms, real payment processing, production auth adapters, paid random packs, real physical fulfillment, and unreviewed production AI art.

## Architecture

The implementation uses a compact single Next.js repository while preserving package-like boundaries under `src/`.

```text
src/app                 Next.js App Router pages and route handlers
src/core                Framework-independent domain types, schemas, orchestrator, aggregation, timing, identity
src/plugin-sdk          Plugin contracts, manifest validation, registry, safe executor
src/plugins             BaZi, Numerology, and Timing deterministic MVP plugins
src/ai                  Provider interface, mock provider, guardrails, RAG retrieval, output validation
src/i18n                Locale config, dictionaries, formatters
src/ui                  Tokens, primitives, and shared product components
src/config              Application config, routes, feature flags
docs                    V8 product, architecture, migration, and testing authority
tests                   Unit, contract, integration, and Playwright E2E tests
```

No fortune calculation lives inside React components. Pages render UI and call `/api/fortune` or `/api/interpretation`.

## Local Setup

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The root redirects to `/th`.

If port `3000` is already in use, Next.js will choose the next available port and print it in the terminal, for example `http://localhost:3001`. Use the printed `Local:` URL rather than assuming `3000`.

## Local Test Environment with OrbStack

OrbStack works well for this project because it runs Docker Compose locally with a clean Node and Playwright environment.

Start the app in a container:

```bash
docker compose up web
```

Open `http://localhost:3000`.

Run checks in containers:

```bash
docker compose run --rm --build typecheck
docker compose run --rm --build test
docker compose run --rm --build build
```

Run E2E tests with the containerized browser environment:

```bash
docker compose run --rm --build e2e
```

The `e2e` service uses the Playwright base image, so Chromium is available inside the container.
Use `--build` after source changes so one-off test containers run against the latest files.

## Environment

Copy `.env.example` and adjust values as needed. The app works without AI credentials.

```bash
DATABASE_URL=
AUTH_PROVIDER=mock
AI_PROVIDER=mock
PAYMENT_PROVIDER=mock
RAG_PROVIDER=local
RAG_MAX_CHUNKS=5
RAG_MAX_CONTEXT_TOKENS=1200
AI_MAX_INPUT_TOKENS=6000
AI_MAX_OUTPUT_TOKENS=1200
OFF_TOPIC_MAIN_AI_CALL=false
PLUGIN_TIMEOUT_MS=5000
ENABLE_BAZI_PLUGIN=true
ENABLE_NUMEROLOGY_PLUGIN=true
ENABLE_TIMING_PLUGIN=true
ENABLE_V8_IDENTITY=true
ENABLE_V8_CARDS=false
ENABLE_V8_COLLECTION=false
ENABLE_V8_PACKS=false
ENABLE_V8_PHYSICAL_PRODUCTS=false
ENABLE_V8_NOTIFICATIONS=false
ENABLE_PAID_RANDOM_PACKS=false
ENABLE_REAL_FULFILLMENT=false
```

Never expose provider keys to browser code.

## Database Foundation

MVP v2 expects a free-tier Postgres database such as Supabase. Migration files live in `migrations/`.

For local preview, the app uses an in-memory repository fallback when `DATABASE_URL` is empty. This keeps the app runnable while preserving the production database shape. For production, create a Supabase project, set `DATABASE_URL`, and apply:

```bash
migrations/0001_commercial_foundation.sql
migrations/0002_seed_plans.sql
migrations/0003_coupons.sql
migrations/0004_rag_guardrails.sql
```

V8 data migrations are documented in `docs/architecture/F8SYNC_V8_DATA_MIGRATION.md` and should be added additively after the existing migration baseline.

## V8 Sacred Identity Foundation

The identity domain lives under `src/core/identity`.

- Archetype definitions are product-original seed concepts.
- Identity resolution is deterministic and rule-versioned.
- Symbolic seals use deterministic seed hashes and do not embed raw birth data.
- AI does not select archetypes, alter identity, or generate production card names.
- Card, collection, pack, notification, and physical-product features remain behind feature flags until their domains are implemented and tested.

## Commands

```bash
pnpm dev
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Playwright uses `http://127.0.0.1:3100` by default to avoid conflicts with OrbStack or a manually running app on port `3000`.

## API

- `POST /api/fortune`: validates a fortune request, runs eligible plugins safely, and returns an aggregated result.
- `POST /api/interpretation`: validates an aggregated result and returns structured AI or mock interpretation.
- `GET /api/health`: returns status, plugin count, enabled plugin IDs, AI provider availability, and build version.
- `POST /api/coupons/validate`: validates whether a coupon code is known and active.
- `POST /api/coupons/redeem`: redeems login-only free Premium coupons with idempotency protection.
- `GET /api/coupons/redemptions`: returns the signed-in member's coupon redemption history.

## Domain Guardrail and RAG

MVP V4 adds a deterministic guardrail before the AI interpretation layer.

- Off-topic, coding, medical, legal, investment, gambling, sexual, violent, and prompt-injection requests are blocked before the main AI provider is called.
- Blocked requests return a localized deterministic response and do not consume AI interpretation quota.
- Allowed intents are limited to F8SYNC fortune, timing, compatibility, result explanation, profile, subscription, coupon, and product-support topics.
- Deterministic FAQ answers bypass retrieval and AI when the answer is known.
- Approved local knowledge chunks are retrieved by locale and intent, with draft and retired documents excluded.
- Retrieval and AI input token budgets are enforced before provider execution.
- Intent decisions, retrieval usage, document IDs, provider IDs, token estimates, and cache status are written to the audit log.
- The migration schema includes knowledge documents, knowledge chunks, and intent audit logs for a future Supabase or pgvector adapter.

## Coupons

MVP V3 includes free Premium coupons:

- `FREE_1_WEEK`: unlocks Premium for 7 days.
- `FREE_1_MONTH`: unlocks Premium for 30 days.

Rules:

- Users must sign in or register before redeeming.
- One account can use only one free coupon for the lifetime of the account.
- Using `FREE_1_WEEK` blocks later use of `FREE_1_MONTH`, and vice versa.
- Free coupons create non-recurring Premium access only.
- Expired coupon subscriptions automatically fall back to the correct plan.
- Redemption is protected by idempotency keys and database unique constraints in the production migration.

## Adding a New Plugin

1. Create a new plugin folder under `src/plugins`.
2. Define a manifest.
3. Implement `FortunePlugin`.
4. Use standard domain types from `src/core/domain`.
5. Return translation keys instead of localized text.
6. Add plugin-specific unit tests.
7. Run shared plugin contract tests.
8. Register the plugin through central configuration.
9. Add a feature flag.
10. Verify no existing page requires modification.

Success condition: a new plugin can be added without modifying feature page components.

## Adding a New Language

1. Add the locale to `SupportedLocale`.
2. Add locale configuration.
3. Copy the complete base dictionary structure.
4. Translate every key.
5. Add locale-aware date and number formatting.
6. Add language selector label.
7. Run missing-key validation.
8. Add a locale E2E test.

Thai remains the default locale unless product configuration changes.

## Vercel Deployment

1. Import the repository into Vercel.
2. Use the default Next.js build command: `pnpm build`.
3. Set environment variables from `.env.example`.
4. Leave `AI_PROVIDER=mock` until an external provider is configured.

The app needs no dedicated server. Preview can run with the memory fallback, while production commercial and RAG features should use the supplied database migrations.

## AI Provider Configuration

`src/ai` defines `AIInterpretationProvider`. The MVP includes a mock provider that creates deterministic, safety-bounded explanations. External providers should be added behind the same interface, validate output with `aiInterpretationOutputSchema`, enforce timeouts, and never change calculation results.

## Known MVP Limitations

- BaZi, Numerology, and Timing algorithms are simplified deterministic placeholders.
- Comparison uses the shared analysis flow rather than a full multi-option ranking interface.
- Local storage is limited to last selected analysis metadata.
- Rate limiting is represented as an abstraction point, not production distributed enforcement.
- RAG currently uses an approved local retriever; Supabase or pgvector retrieval is still pending.

## Safety Disclaimer

F8SYNC outputs are guidance and timing support from symbolic systems. They are not guarantees and are not medical, legal, investment, gambling, or safety advice.
