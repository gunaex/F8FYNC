# F8SYNC Project Tracking

This file is the working log for prompts, implementation progress, plans, and functional coverage. Keep it updated as the MVP evolves.

## Tracking Maintenance Rule

- Update this file every time project code, migrations, tests, configuration, UI, API behavior, or documentation changes.
- Each code update should include the relevant prompt log entry, progress change, functional coverage change, verification result, next task update, or decision log entry.
- If a change is intentionally not verified, record the reason in the verification log or known limitations.

## Prompt Log

| Date | Prompt / Request | Outcome | Notes |
|---|---|---|---|
| 2026-06-14 | Build F8SYNC MVP from the Codex Master Specification | Initial MVP scaffold implemented | Next.js app, core engine, plugin SDK, MVP plugins, AI mock provider, i18n, tests, README, and Vercel-ready config created |
| 2026-06-14 | Create Markdown file for prompt logging, progress, plan, and function tracking | Created this tracking document | Use this file as the project progress ledger |
| 2026-06-14 | Create local environment for testing with OrbStack | Added Docker and Docker Compose setup | Supports containerized dev, typecheck, unit tests, build, and E2E |
| 2026-06-14 | Improve UI/UX using a mobile horoscope app reference | Redesigned the main experience into a more app-like dashboard | Adapted score rings, visual timing cards, bottom navigation, and softer mobile visual hierarchy without copying reference assets |
| 2026-06-14 | Apply `F8SYNC_CODEX_MASTER_PROMPT_V2.md` because previous prompt scope was incomplete | Added commercial MVP foundation | Added auth/session mock, member APIs/pages, plans, entitlements, usage quota, mock payments, history, privacy/admin route foundations, database migrations, and V2 tracking |
| 2026-06-14 | Fix MVP v2 verification issues | Isolated guest quota and E2E port | Guest usage now separates member and guest subjects; Playwright uses port 3100 to avoid OrbStack port 3000 reuse |
| 2026-06-14 | Apply Master Prompt V3 coupon requirements | Added coupon system foundation | Added homepage coupon input, redeem API, coupon service, free Premium trials, one-free-coupon lifetime lockout, idempotency, migration, translations, and tests |
| 2026-06-14 | Apply Master Prompt V4 RAG guardrail requirements | Added domain guardrail and approved RAG layer | Added intent filtering, deterministic FAQ bypass, approved local knowledge retrieval, token budgets, audit logs, coupon validate/redemptions APIs, migration, translations, and tests |
| 2026-06-14 | Always update project tracking after code changes | Added tracking maintenance rule | Codifies that `PROJECT_TRACKING.md` must be updated whenever code, migrations, tests, config, UI, API behavior, or documentation changes |
| 2026-06-14 | Make analysis and target form labels sound more human | Updated localized form copy | Replaced technical labels and fixed nested i18n paths so UI no longer shows keys like `form.analysis.*` or `form.target.*` |
| 2026-06-14 | Continue with Master Prompt V6 foundations | Added Premium Reveal filtering and methodology catalog foundation | Added server-side result reveal filtering, locked premium metadata, plugin methodology catalog API, health summary, and unit tests |
| 2026-06-14 | Use GitHub repo `gunaex/F8FYNC.git` | Initialized local git repository and configured `origin` | Added `tsconfig.tsbuildinfo` to `.gitignore` before initial commit |

## Current Progress

### Completed

- Initialized a Next.js App Router project with TypeScript strict mode.
- Added centralized domain types and runtime schemas.
- Added Thai default localization with English and Simplified Chinese support.
- Implemented plugin SDK contracts, manifest validation, registry, and safe execution.
- Implemented three deterministic MVP plugins:
  - BaZi
  - Numerology
  - Timing
- Implemented core orchestrator and confidence-weighted aggregation.
- Added timing windows, agreement levels, conflicts, warnings, and deterministic recommendations.
- Added AI interpretation abstraction with deterministic mock provider.
- Added shared UI tokens, primitives, and product components.
- Added mobile-first analysis page and placeholder result, timeline, and comparison routes.
- Added API routes:
  - `POST /api/fortune`
  - `POST /api/interpretation`
  - `GET /api/health`
- Added unit, contract, integration, and E2E test coverage.
- Added `.env.example` and README documentation.
- Added OrbStack/Docker Compose local test environment.
- Initialized local git repository on `main` and configured GitHub remote `https://github.com/gunaex/F8FYNC.git`.
- Redesigned the main UI into a more mobile-app-like experience with circular score visuals, stronger result hierarchy, visual timing cards, and improved bottom navigation.
- Added MVP v2 commercial foundation:
  - Guest/member/admin user model
  - Mock register/login/logout/reset flows
  - Member session cookie foundation
  - Birth profile CRUD APIs with consent and plan-limit checks
  - Guest/Free/Premium plan catalog
  - Central entitlement service
  - Usage quota and metering service
  - Mock payment provider and subscription APIs
  - Analysis history service and APIs
  - Member/account/pricing/history/privacy/admin route foundations
  - Supabase/Postgres migration files and seed plans
- Added MVP v3 coupon foundation:
  - Homepage coupon input
  - `FREE_1_WEEK` Premium for 7 days
  - `FREE_1_MONTH` Premium for 30 days
  - Login/register required before redeem
  - One free coupon per account lifetime
  - Mutual exclusion between free coupons
  - Idempotency handling for repeated requests
  - Non-recurring coupon subscription source
  - Expired coupon subscriptions fall back to Free plan
  - TH / EN / zh-CN coupon translations
  - Database migration with unique constraints
- Added MVP v4 domain guardrail and RAG foundation:
  - Allowed and blocked intent classification before AI provider calls
  - Off-topic and prompt-injection blocking with localized deterministic responses
  - Deterministic FAQ bypass for coupon and subscription support
  - Approved local knowledge base and locale-aware retrieval
  - Draft and retired knowledge exclusion
  - Retrieval and AI input token budget enforcement
  - Intent audit log memory store and database migration
  - Coupon validate and redemption history APIs
  - Explanation question input on the main analysis flow
  - Guardrail unit tests and off-topic E2E coverage
- Humanized analysis form copy across TH / EN / zh-CN:
  - Replaced technical labels for analysis and target selection
  - Added clearer option names for daily, timing, compatibility, and comparison flows
  - Fixed nested `form.analysis.*` and `form.target.*` i18n paths
- Added MVP v6 foundation pieces:
  - Result reveal levels for Guest, Free, and Premium
  - Server-side Premium result filtering in `/api/fortune`
  - Locked Premium section metadata without hidden Premium values
  - Premium member full-result pass-through
  - Methodology catalog for active, foundation, and roadmap systems
  - Thai Astrology, Western Astrology, Tarot, I Ching, Korean Saju, and Japanese systems represented without fake calculation logic
  - Health API methodology catalog summary
  - Unit tests for Premium filtering and methodology catalog coverage
- Verified:
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - `pnpm test:e2e`

### In Progress

- Manual product review in browser.
- UX refinement for the analysis flow.
- Expansion of timeline and comparison pages beyond placeholder route surfaces.

### Known Limitations

- Fortune algorithms are simplified deterministic placeholders.
- Comparison page does not yet rank multiple target options in a full workflow.
- Timeline page currently has a route surface; the rich timeline is displayed inside the main analysis result view.
- Rate limiting is not production-distributed yet.
- No external AI provider adapter is configured; mock provider is active by default.
- Production database and authentication are now required by MVP v2; migration files and mock abstractions exist, but production adapters are pending.
- Production auth provider and real payment provider are not connected yet; mock abstractions are active.
- Database migrations exist, but runtime currently uses memory fallback until `DATABASE_URL` and a repository adapter are wired.
- MVP v2 full E2E flows for register/profile/history/upgrade/cancel/delete account are not complete yet.
- Coupon production enforcement depends on applying `migrations/0003_coupons.sql`; local preview uses the memory fallback.
- RAG currently uses an approved local retriever; Supabase or pgvector retrieval adapter is pending.
- Premium Reveal UI components are not yet built; `/api/fortune` now returns locked metadata and filtered values for non-Premium sessions.
- Methodology catalog is metadata-only for Thai Astrology, Western Astrology, Tarot, I Ching, Korean Saju, and Japanese systems; no fake calculation logic is implemented.
- Notification engine foundations from MVP v6 are still pending.

## Implementation Plan

### Phase A - Foundation

- [x] Initialize project
- [x] Configure TypeScript strict mode
- [x] Configure repository structure
- [x] Configure localization with Thai default
- [x] Add schemas and domain types
- [x] Add centralized application configuration

### Phase B - Plugin SDK

- [x] Implement plugin manifest
- [x] Implement plugin interface
- [x] Implement plugin registry
- [x] Implement plugin selection
- [x] Implement safe execution wrapper
- [x] Implement contract validation
- [x] Add shared plugin contract tests

### Phase C - MVP Plugins

- [x] BaZi mock plugin
- [x] Numerology deterministic plugin
- [x] Timing deterministic plugin
- [x] Unit or contract tests for each plugin

### Phase D - Core Engine

- [x] Request validation
- [x] Orchestrator
- [x] Weighted aggregator
- [x] Agreement calculation
- [x] Conflict detection
- [x] Timing window aggregation
- [x] Deterministic recommendations
- [x] Core tests

### Phase E - AI Interpretation

- [x] Provider interface
- [x] Mock provider
- [ ] Optional external provider adapter
- [x] Versioned system prompt
- [x] Output validation
- [x] Deterministic fallback explanation
- [ ] Full request rate limiting

### Phase F - Design System

- [x] Design tokens
- [x] UI primitives
- [x] Shared product components
- [x] App shell
- [x] Loading, error, and empty states
- [ ] Deeper accessibility pass with manual browser review

### Phase G - Application Pages

- [x] Home / main analysis experience
- [x] Analysis form
- [x] Result display inside main experience
- [ ] Dedicated result page with persisted or passed result state
- [ ] Dedicated timeline page with full timing windows
- [ ] Dedicated comparison page with multi-target ranking
- [x] Language switching

### Phase H - API and Integration

- [x] `/api/fortune`
- [x] `/api/interpretation`
- [x] `/api/health`
- [x] Integration tests
- [x] E2E tests

### Phase I - Documentation and Deployment

- [x] README
- [x] `.env.example`
- [x] OrbStack/Docker local test environment
- [x] Vercel-compatible configuration
- [x] Build verification
- [x] MVP verification notes

### Phase J - MVP v2 Commercial Foundation

- [x] Member domain types
- [x] Plan and subscription domain types
- [x] Entitlement and usage domain types
- [x] Consent and history domain types
- [x] Runtime schemas for member/auth/profile inputs
- [x] Central entitlement service
- [x] Usage metering service
- [x] Mock payment provider
- [x] Mock auth/session foundation
- [x] Database migration files
- [x] Pricing page foundation
- [x] Account/member route foundation
- [x] History route foundation
- [x] Privacy/terms route foundation
- [x] Admin route foundation
- [ ] Production Supabase repository adapter
- [ ] Production auth provider adapter
- [ ] Full v2 E2E flows

### Phase K - MVP v3 Coupons

- [x] Coupon domain types
- [x] Coupon definitions for `FREE_1_WEEK` and `FREE_1_MONTH`
- [x] Coupon redemption service
- [x] Login-required redeem API
- [x] Idempotency handling
- [x] One free coupon per account lifetime enforcement
- [x] Non-recurring Premium subscription activation
- [x] Coupon expiry fallback through subscription status refresh
- [x] Homepage coupon input UI
- [x] TH / EN / zh-CN coupon translations
- [x] Coupon migration with uniqueness constraints
- [x] Coupon unit tests
- [x] Full coupon E2E flow with register, redeem, duplicate denial

### Phase L - MVP v4 Domain Guardrails and RAG

- [x] Intent domain classification
- [x] Off-topic and prompt-injection blocking
- [x] No main AI call for blocked requests
- [x] No AI quota consumption for blocked requests
- [x] Deterministic FAQ bypass
- [x] Approved local knowledge base
- [x] Locale-aware knowledge retrieval
- [x] Draft and retired document exclusion
- [x] Retrieval token budget enforcement
- [x] AI input token budget enforcement
- [x] Intent audit log model and memory store
- [x] RAG/guardrail database migration
- [x] Coupon validate API
- [x] Coupon redemptions API
- [x] Guardrail unit tests
- [x] Off-topic E2E coverage
- [ ] Supabase or pgvector retriever adapter
- [ ] Admin knowledge management UI

### Phase M - MVP v6 Methodology Catalog Foundations

- [x] Active methodology catalog entries for BaZi, Numerology, and Timing
- [x] Thai Astrology foundation catalog entry
- [x] Western Astrology foundation catalog entry
- [x] Tarot foundation catalog entry with audited-randomness marker
- [x] I Ching roadmap catalog entry
- [x] Korean Saju roadmap catalog entry
- [x] Japanese systems roadmap catalog entry
- [x] Methodology catalog API
- [x] Health API methodology summary
- [ ] Real Thai Astrology plugin implementation
- [ ] Real Western Astrology plugin implementation
- [ ] Auditable Tarot draw engine

### Phase N - MVP v6 Notification Engine

- [ ] Notification domain types and schemas
- [ ] Notification preference service
- [ ] Notification template localization
- [ ] Notification scheduler abstraction
- [ ] Notification API routes
- [ ] Notification UI components
- [ ] Notification entitlement integration
- [ ] Quiet hours and timezone tests

### Phase O - MVP v6 Premium Reveal and Gated Results

- [x] Result reveal level model
- [x] Locked Premium section metadata
- [x] Server-side `/api/fortune` result filtering
- [x] Guest/Free Premium data exclusion tests
- [x] Premium full-result entitlement tests
- [ ] Premium Reveal UI components
- [ ] Premium enrichment service after upgrade
- [ ] Premium AI entitlement gate for richer interpretations
- [ ] History API reveal filtering audit
- [ ] E2E leakage prevention coverage

## Functional Coverage

| Function / Area | Status | File / Module | Notes |
|---|---|---|---|
| Domain types | Done | `src/core/domain/types.ts` | Central source for request, result, score, timing, and plugin result types |
| Runtime validation | Done | `src/core/domain/schemas.ts` | Validates API input, plugin output, and aggregated result shape |
| Plugin contract | Done | `src/plugin-sdk/contracts/types.ts` | Standard `FortunePlugin` interface |
| Manifest validation | Done | `src/plugin-sdk/contracts/validation.ts` | Rejects invalid plugin manifests |
| Plugin registry | Done | `src/plugin-sdk/registry/registry.ts` | Register, enable, disable, list, resolve eligible plugins |
| Safe plugin execution | Done | `src/plugin-sdk/execution/safe-executor.ts` | Validation, timeout, isolation, structured failure result |
| BaZi plugin | Done | `src/plugins/bazi/index.ts` | Simplified deterministic MVP logic |
| Numerology plugin | Done | `src/plugins/numerology/index.ts` | Simplified deterministic target scoring |
| Timing plugin | Done | `src/plugins/timing/index.ts` | Simplified deterministic timing windows |
| Methodology catalog | Done | `src/plugins/catalog.ts`, `src/app/api/plugins/catalog/route.ts` | Active, foundation, and roadmap methodology metadata including Thai Astrology, Western Astrology, Tarot, I Ching, Korean Saju, and Japanese systems |
| Aggregation | Done | `src/core/aggregation/aggregate.ts` | Confidence-weighted scores, agreement, conflicts, recommendations |
| Timing merge/status | Done | `src/core/timing/merge.ts` | Window sorting, compatible merge, current status, next optimal window |
| Orchestrator | Done | `src/core/orchestrator/run-fortune-analysis.ts` | Validates request, resolves plugins, executes, aggregates |
| AI provider abstraction | Done | `src/ai/interpreter/types.ts` | Provider interface and structured input/output |
| Mock AI provider | Done | `src/ai/providers/mock.ts` | Safe deterministic explanation fallback |
| AI output validation | Done | `src/ai/interpreter/schema.ts` | Runtime schema for interpretation output |
| i18n config | Done | `src/i18n/config.ts` | Thai default, supported locale resolution, labels |
| Thai dictionary | Done | `src/i18n/dictionaries/th.json` | Primary locale with human-readable form analysis and target copy |
| English dictionary | Done | `src/i18n/dictionaries/en.json` | Secondary locale with matching nested form paths |
| Simplified Chinese dictionary | Done | `src/i18n/dictionaries/zh-CN.json` | Secondary locale with matching nested form paths |
| Design tokens | Done | `src/app/globals.css`, `src/ui/tokens/index.ts` | Centralized colors, spacing, radius, layout |
| UI primitives | Done | `src/ui/primitives/*` | Button, card, text/select/textarea fields |
| Product components | Done | `src/ui/components/*` | App shell, form, score rings, timing cards, lists, disclaimer |
| Main page | Done | `src/app/[locale]/page.tsx` | Locale-aware main app surface |
| Analysis workspace | Done | `src/app/[locale]/analysis-workspace.tsx` | Client interaction, API calls, result rendering |
| Result route | Partial | `src/app/[locale]/result/page.tsx` | Placeholder page |
| Timeline route | Partial | `src/app/[locale]/timeline/page.tsx` | Placeholder page |
| Compare route | Partial | `src/app/[locale]/compare/page.tsx` | Placeholder page |
| Fortune API | Done | `src/app/api/fortune/route.ts` | Server-side analysis endpoint |
| Interpretation API | Done | `src/app/api/interpretation/route.ts` | Server-side AI/mock interpretation endpoint |
| Health API | Done | `src/app/api/health/route.ts` | Plugin and provider status endpoint |
| Local container dev | Done | `Dockerfile`, `docker-compose.yml`, `.dockerignore` | OrbStack-compatible Docker setup for app, tests, build, and E2E |
| Member domain | Done | `src/core/commercial/types.ts` | Guest/member/admin, member, session, consent, usage, subscription, history models |
| Auth mock service | Partial | `src/core/member/auth-service.ts`, `src/app/api/auth/*` | Register/login/logout/reset API foundations; not a production auth provider |
| Session foundation | Partial | `src/core/member/session.ts` | HTTP-only cookie member session; no external auth provider yet |
| Birth profile management | Partial | `src/core/commercial/birth-profile-service.ts`, `src/app/api/birth-profiles/*` | CRUD API foundation with consent and plan limit; UI is minimal |
| Plans | Done | `src/core/commercial/config.ts` | Guest, Free, Premium plan config |
| Subscription | Partial | `src/core/commercial/subscription-service.ts`, `src/app/api/subscription/*` | Mock upgrade/cancel/status; no real billing |
| Entitlement | Done | `src/core/commercial/entitlement-service.ts` | Central feature decisions and plan matrix |
| Usage quota | Partial | `src/core/commercial/entitlement-service.ts`, `src/app/api/usage/route.ts` | Usage metering exists; guest device persistence and distributed storage pending |
| Premium Reveal filtering | Partial | `src/core/commercial/premium-reveal-service.ts`, `src/app/api/fortune/route.ts` | Guest/Free API responses remove Premium-only result details; UI reveal components and enrichment are pending |
| Payment provider | Partial | `src/payments/*` | Mock payment provider and webhook foundation |
| Billing API aliases | Done | `src/app/api/billing/*` | Compatibility aliases for MVP v2 payment route naming |
| Coupon definitions | Done | `src/core/commercial/config.ts` | `FREE_1_WEEK` and `FREE_1_MONTH` are centralized config |
| Coupon service | Done | `src/core/commercial/coupon-service.ts` | Login-required redeem logic, idempotency, lifetime free coupon lockout, non-recurring Premium activation |
| Coupon API | Done | `src/app/api/coupons/redeem/route.ts` | Server-side redemption endpoint |
| Coupon UI | Done | `src/ui/components/coupon-redeem.tsx`, `src/app/[locale]/analysis-workspace.tsx` | Coupon input on homepage/main experience |
| Coupon database | Partial | `migrations/0003_coupons.sql` | Production tables and unique constraints exist; runtime DB adapter pending |
| Intent guardrail | Done | `src/ai/guardrails/intent-guard.ts` | Blocks off-topic, unsafe, coding, and prompt-injection requests before main AI calls |
| RAG configuration | Done | `src/ai/guardrails/config.ts` | Central allowed intents, blocked intents, collections, and env-backed budgets |
| Local knowledge base | Done | `src/ai/guardrails/knowledge-base.ts` | Approved locale-aware knowledge documents for MVP retrieval |
| Knowledge retriever | Done | `src/ai/guardrails/retriever.ts` | Filters by locale, intent, status, and excludes draft/retired documents |
| Token budgets | Done | `src/ai/guardrails/token-budget.ts` | Enforces retrieval and AI input token limits |
| Deterministic FAQ | Done | `src/ai/guardrails/faq.ts` | Bypasses AI for known coupon and subscription support answers |
| Intent audit log | Done | `src/ai/guardrails/audit.ts`, `src/core/repositories/memory-store.ts` | Records guardrail decisions, RAG usage, documents, provider, token estimate, and cache status |
| RAG database | Partial | `migrations/0004_rag_guardrails.sql` | Knowledge and audit tables exist; runtime DB adapter pending |
| Analysis history | Partial | `src/core/commercial/history-service.ts`, `src/app/api/history/*` | Successful member analyses can be saved in memory; production DB adapter pending |
| Privacy and consent | Partial | `src/core/commercial/types.ts`, `src/app/[locale]/privacy/page.tsx` | Consent records and route foundation exist; full export/delete workflows pending |
| Database foundation | Partial | `migrations/*.sql` | Supabase/Postgres schema and seed plans exist; runtime adapter pending |
| Admin foundation | Partial | `src/app/[locale]/admin/page.tsx` | Minimal role-aware route surface |
| Notification engine | Not started | Pending | MVP v6 notification types, scheduler, preferences, APIs, and UI are pending |

## Verification Log

| Date | Command | Result | Notes |
|---|---|---|---|
| 2026-06-14 | `pnpm install` | Passed | Dependencies installed |
| 2026-06-14 | `pnpm typecheck` | Passed | Strict TypeScript check |
| 2026-06-14 | `pnpm test` | Passed | 8 tests passed |
| 2026-06-14 | `pnpm build` | Passed | Next.js production build succeeded |
| 2026-06-14 | `pnpm exec playwright install chromium` | Passed | Browser binary installed |
| 2026-06-14 | `pnpm test:e2e` | Passed | 4 browser tests passed across mobile and desktop projects |
| 2026-06-14 | `docker compose config` | Passed | Compose file validates |
| 2026-06-14 | `docker compose run --rm --build typecheck` | Passed | OrbStack containerized TypeScript check |
| 2026-06-14 | `docker compose run --rm --build test` | Passed | OrbStack containerized unit, contract, and integration tests |
| 2026-06-14 | `docker compose run --rm --build build` | Passed | OrbStack containerized production build |
| 2026-06-14 | `docker compose run --rm --build e2e` | Passed | OrbStack containerized Playwright E2E tests |
| 2026-06-14 | `pnpm typecheck` | Passed | After UI/UX redesign |
| 2026-06-14 | `pnpm test` | Passed | 8 tests passed after UI/UX redesign |
| 2026-06-14 | `pnpm build` | Passed | Production build passed after UI/UX redesign |
| 2026-06-14 | `pnpm test:e2e` | Passed | 4 browser tests passed after UI/UX redesign |
| 2026-06-14 | `pnpm typecheck` | Passed | After MVP v2 commercial foundation |
| 2026-06-14 | `pnpm test` | Passed | 10 tests passed after MVP v2 commercial foundation |
| 2026-06-14 | `pnpm build` | Passed | Production build passed with 21 app pages and new APIs |
| 2026-06-14 | `pnpm test:e2e` | Passed | Existing 4 browser tests still pass after MVP v2 changes |
| 2026-06-14 | `pnpm typecheck` | Passed | Final verification after billing aliases and guest quota isolation |
| 2026-06-14 | `pnpm test` | Passed | 10 tests passed after billing aliases and guest quota isolation |
| 2026-06-14 | `pnpm test:e2e` | Passed | 4 browser tests passed on isolated port 3100 |
| 2026-06-14 | `pnpm build` | Passed | Final production build passed with 25 app pages/API route groups |
| 2026-06-14 | `pnpm typecheck` | Passed | After MVP v3 coupon implementation |
| 2026-06-14 | `pnpm test` | Passed | 13 tests passed including coupon rules |
| 2026-06-14 | `pnpm test:e2e` | Passed | 6 browser tests passed including register, coupon redeem, and duplicate free coupon denial |
| 2026-06-14 | `pnpm build` | Passed | Production build passed with coupon API route |
| 2026-06-14 | `pnpm typecheck` | Passed | Final typecheck after production build regenerated `.next/types` |
| 2026-06-14 | `pnpm typecheck` | Passed | After MVP v4 RAG guardrail implementation |
| 2026-06-14 | `pnpm test` | Passed | 18 tests passed including guardrail and retrieval budget coverage |
| 2026-06-14 | `pnpm test:e2e` | Passed | 8 browser tests passed including off-topic guardrail flow |
| 2026-06-14 | `pnpm build` | Passed | Production build passed with RAG guardrail and coupon validate/redemptions routes |
| 2026-06-14 | `pnpm typecheck` | Passed | Final post-build typecheck after V4 |
| 2026-06-14 | `pnpm typecheck` | Passed | After humanizing analysis and target form labels |
| 2026-06-14 | `pnpm test` | Passed | 18 tests passed after nested form i18n copy update |
| 2026-06-14 | `pnpm build` | Passed | Production build passed after dictionary structure update |
| 2026-06-14 | `pnpm test:e2e` | Passed | 8 browser tests passed after form copy update |
| 2026-06-14 | `pnpm typecheck` | Passed | After MVP v6 Premium Reveal filtering and methodology catalog foundation |
| 2026-06-14 | `pnpm test` | Passed | 21 tests passed including Premium result filtering and methodology catalog coverage |
| 2026-06-14 | `pnpm build` | Passed | Production build passed with methodology catalog API route |
| 2026-06-14 | `pnpm test:e2e` | Passed | 8 browser tests passed after `/api/fortune` reveal filtering |
| 2026-06-14 | `git remote -v` | Passed | `origin` points to `https://github.com/gunaex/F8FYNC.git` |

## Next Recommended Tasks

1. Build Premium Reveal UI components that consume `premiumReveal.lockedSections`.
2. Add E2E leakage prevention tests proving unauthorized sessions never receive Premium result values.
3. Add the MVP v6 notification domain types, preference service, scheduler abstraction, APIs, and localization.
4. Add Supabase repository adapter for the migration schema, including coupons, coupon redemptions, knowledge documents, and audit logs.
5. Add Supabase or pgvector retriever adapter behind the guardrail retriever interface.
6. Add admin knowledge management APIs and UI.
7. Add real auth provider adapter or Supabase Auth integration.
8. Expand E2E tests for register, session, birth profile, history, usage, pricing, mock upgrade, coupon redeem, duplicate coupon denial, guardrail flows, cancel, and delete account.
9. Build full birth-profile management UI.
10. Expand the dedicated timeline page to load and render saved or query-based results.
11. Build a real multi-target comparison workflow.
12. Add missing-key validation for dictionaries.
13. Add distributed API rate limiting separate from usage quota.
14. Add an external AI provider adapter behind the existing provider interface.
15. Run a visual and accessibility review on mobile and desktop.

## Decision Log

| Date | Decision | Reason |
|---|---|---|
| 2026-06-14 | Keep MVP in a compact single Next.js repo under `src/` | Preserves boundaries without monorepo overhead |
| 2026-06-14 | Use deterministic placeholder fortune plugins | Required by MVP while allowing future replacement |
| 2026-06-14 | Default AI provider to mock | App must work without API keys or paid infrastructure |
| 2026-06-14 | Thai is the default locale | Primary market is Thailand |
| 2026-06-14 | Use Playwright Docker base image for local container tests | Keeps E2E browser dependencies reproducible in OrbStack |
| 2026-06-14 | Adapt reference app patterns without copying horoscope branding | Keeps the product more engaging while preserving F8SYNC's non-mystical positioning |
| 2026-06-14 | Treat MVP v2 as superseding the zero-database MVP | V2 explicitly requires commercial membership, database, entitlement, usage, and payment-ready architecture |
| 2026-06-14 | Use memory repository fallback while adding Postgres migrations | Keeps local/Vercel preview runnable before Supabase credentials are configured |
| 2026-06-14 | Use port 3100 for Playwright local server | Avoids accidentally testing an OrbStack service already listening on port 3000 |
| 2026-06-14 | Treat free coupons as non-recurring subscription source | Matches V3 requirement that coupon trials do not create recurring billing |
| 2026-06-14 | Enforce free coupon reuse in the coupon service and DB constraints | Prevents `FREE_1_WEEK` and `FREE_1_MONTH` from being stacked or reused |
| 2026-06-14 | Block off-topic requests before entitlement, quota, retrieval, or main AI | Matches V4 requirement that domain guardrails run before the expensive or risky path |
| 2026-06-14 | Use approved local knowledge retrieval for MVP RAG | Keeps V4 verifiable before Supabase or vector infrastructure is connected |
| 2026-06-14 | Apply Premium result protection at the API response layer | V6 requires unauthorized clients to never receive hidden Premium values, not just hidden UI |
| 2026-06-14 | Represent future methodologies as catalog metadata until formulas are implemented | Avoids fake Thai Astrology, Western Astrology, Tarot, I Ching, Korean Saju, or Japanese system calculations |
| 2026-06-14 | Keep TypeScript build info out of version control | `tsconfig.tsbuildinfo` is generated cache and should not be committed |
