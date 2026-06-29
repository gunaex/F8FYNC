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
| 2026-06-14 | Continue from `F8SYNC_V8_MASTER_BLUEPRINT.md` | Started V8 additive migration | Added required V8 docs, repository audit/gap analysis, feature-flag plan, Sacred Identity domain foundation, deterministic archetype resolver, and tests |
| 2026-06-14 | Review inaccessible local application | Confirmed app builds and runs on fallback port | OrbStack was listening on port 3000, so Next.js served the app on port 3001; README now notes to use the printed Local URL |
| 2026-06-17 | Save Milestone 0A markdown prompt into project | Added `docs/product/F8SYNC_MILESTONE_0A_PROMPT.md` | Stored the supplied audit/roadmap-alignment prompt as a source directive; Milestone 0A execution is still pending |
| 2026-06-17 | Execute Milestone 0A repository audit and roadmap alignment | Added required Milestone 0A audit deliverables | Confirmed revised roadmap Version 1.1, classified current features, mapped V1.1 gaps, recommended incremental migration, and updated this decision log |
| 2026-06-17 | Execute Milestone 0B methodology lock and intelligence decision pack | Added required methodology decision and specification deliverables | Created decision register, draft rulebook, intelligence boundary, Golden Test specification, approval workflow, readiness matrix, and recorded that implementation remains blocked by product and expert decisions |
| 2026-06-17 | Execute Milestone 0B.1 Product Owner decision lock | Added KT-facing product decision pack | Created `docs/product/F8SYNC_KT_PRODUCT_DECISION_PACK_V1.md` with 15 KT decisions, 11 decisions blocking 0C, and 5 decisions requiring expert confirmation |
| 2026-06-17 | Record KT Product Owner decisions for Milestone 0B.1 | Updated decision pack, decision register, and readiness matrix | Recorded 15 PO approval records, corrected the 0C-blocking count to 12, locked non-expert product decisions, and kept expert-dependent methodology as pending expert validation |

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
- Documented local dev port fallback behavior when OrbStack or another process already uses port 3000.
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
- Added V8 additive migration foundation:
  - Copied V8 blueprint into `docs/product/F8SYNC_V8_MASTER_BLUEPRINT.md`
  - Added required V8 architecture, migration, test, naming, art direction, card taxonomy, random draw, and physical product docs
  - Recorded repository audit, V8 gap analysis, data migration plan, feature-flag plan, API authorization plan, and risk lists
  - Added V8 feature flags with paid randomized packs and real fulfillment disabled by default
  - Added Sacred Identity bounded domain types, seed archetype registry, deterministic identity resolver, elemental balance summary, and symbolic seal seed hash
  - Added identity determinism and incomplete-state unit tests
- Saved the supplied Milestone 0A audit and revised roadmap alignment prompt under `docs/product/F8SYNC_MILESTONE_0A_PROMPT.md`.
- Completed Milestone 0A documentation-only audit against `F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md`:
  - Confirmed the roadmap document is readable and Version 1.1
  - Added `docs/product/F8SYNC_MILESTONE_0A_REPOSITORY_AUDIT.md`
  - Added `docs/product/F8SYNC_CURRENT_FEATURE_CLASSIFICATION.md`
  - Added `docs/product/F8SYNC_ROADMAP_GAP_ANALYSIS_V1.md`
  - Added `docs/product/F8SYNC_INCREMENTAL_MIGRATION_PLAN_V1.md`
  - Recorded incremental migration as the recommended strategy
- Completed Milestone 0B documentation-only methodology lock and intelligence decision pack:
  - Added `docs/product/F8SYNC_METHODOLOGY_DECISION_REGISTER_V1.md`
  - Added `docs/product/F8SYNC_BAZI_CALCULATION_RULEBOOK_DRAFT_V1.md`
  - Added `docs/product/F8SYNC_INTELLIGENCE_LAYER_BOUNDARY_V1.md`
  - Added `docs/product/F8SYNC_GOLDEN_TEST_SPECIFICATION_V1.md`
  - Added `docs/product/F8SYNC_METHODOLOGY_APPROVAL_WORKFLOW_V1.md`
  - Added `docs/product/F8SYNC_IMPLEMENTATION_READINESS_MATRIX_V1.md`
  - Classified current BaZi, timing, aggregation, and identity behavior as placeholder/prototype evidence only
  - Separated KT product decisions from BaZi expert validation requirements
  - Confirmed Golden Test expected values remain blank until methodology approval and expert review
  - Recommended Milestone 0C as contract design only, preserving pending methodology as unknown/deferred rather than implementing calculations
- Completed Milestone 0B.1 documentation-only Product Owner decision lock:
  - Added `docs/product/F8SYNC_KT_PRODUCT_DECISION_PACK_V1.md`
  - Prepared 15 KT-facing decisions for review
  - Identified 12 decisions that must be decided before Milestone 0C
  - Identified 5 decisions requiring expert confirmation
  - Separated KT-approvable product defaults from expert-only methodology validation
- Recorded KT Product Owner decisions for Milestone 0B.1:
  - Recorded 15 unique PO approval records (`PO-0B1-001` through `PO-0B1-015`)
  - Corrected the 0C-blocking decision count from 11 to 12
  - Locked non-expert Product Owner decisions in the methodology decision register
  - Recorded Traditional BaZi, identity, archetype, Ten Gods/hidden stems, and element-balance product directions as pending expert validation
  - Updated implementation readiness so approved product defaults can proceed to contract design while calculation methodology remains blocked by expert validation
- Verified:
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - `pnpm test:e2e`

### In Progress

- Manual product review in browser.
- UX refinement for the analysis flow.
- Expansion of timeline and comparison pages beyond placeholder route surfaces.
- KT and expert review of Milestone 0B methodology decisions before Milestone 0C contract design.
- KT review of Milestone 0B.1 product decision pack before Milestone 0C contract design.

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
- V8 identity foundation is domain-only; identity pages, APIs, repository persistence, localized archetype copy, and card composition are pending.
- V8 card, collection, random draw, art asset, physical product, and notification domains are documented but not implemented in code yet.
- Paid randomized packs and real physical fulfillment are intentionally disabled by default.
- Milestone 0A was documentation-only and did not change app behavior, migrations, schemas, UI behavior, staging, commits, tags, or remote state.
- V1.1 roadmap alignment identifies the current BaZi, timing, aggregation, and identity logic as placeholder/prototype foundations that must be refactored after methodology lock.
- V1.1 roadmap alignment treats V8 multi-engine, card, random draw, and physical-product work as deferred expansion backlog rather than active V1 implementation authority.
- Milestone 0B was documentation-only and did not approve BaZi methodology, Golden Test expected values, application code, tests, schemas, migrations, commits, tags, or remote state.
- Milestone 0B keeps BaZi source, Li Chun/year boundary, solar-term month boundary, day rollover, hour pillar, element weighting, seasonal strength, identity dimensions, archetype matrix, daily timing rules, and AI minimized-input policy pending until KT and/or expert review.
- Milestone 0B.1 was documentation-only and does not approve decisions on behalf of KT or validate BaZi methodology.
- KT decisions for Milestone 0B.1 do not authorize BaZi calculation implementation; source path, reviewer, boundary rules, and Golden references remain pending expert validation.

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

### Phase P - V8 Audit and Documentation

- [x] Copy V8 blueprint into `docs/product/F8SYNC_V8_MASTER_BLUEPRINT.md`
- [x] Current-state repository audit
- [x] Working module inventory
- [x] V8 gap analysis
- [x] Data migration plan
- [x] File-by-file implementation plan
- [x] Feature-flag plan
- [x] API authorization plan
- [x] Test plan
- [x] Security and privacy risk list
- [x] Card randomness risk list
- [x] Art and cultural-review risk list
- [x] Physical product boundary list
- [x] Naming bible
- [x] Art direction bible
- [x] Card taxonomy
- [x] Random draw policy
- [x] Physical product guide

### Phase Q - V8 Sacred Identity Foundation

- [x] Semantic trait model
- [x] Archetype registry types
- [x] Product-original archetype seed registry
- [x] Deterministic identity resolver
- [x] Elemental balance summary
- [x] Symbolic seal deterministic seed hash
- [x] Identity foundation unit tests
- [ ] Identity API routes
- [ ] Identity pages and shared components
- [ ] Identity persistence migration
- [ ] TH / EN / zh-CN archetype localization
- [ ] Authorized identity result filtering
- [ ] SVG symbolic seal renderer

### Phase R - V8 Cards, Collection, Random Draw, Art, Physical Readiness

- [ ] Card domain types and composition engine
- [ ] Collection and ownership domain
- [ ] Random draw secure RNG and receipt foundation
- [ ] Art asset provenance model
- [ ] Physical product and print specification models
- [ ] Mock commerce and fulfillment providers
- [ ] V8 database migrations
- [ ] Shared UI components and routes

### Phase S - Milestone 0A Repository Audit and V1.1 Alignment

- [x] Confirm `F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md` is readable and Version 1.1
- [x] Review `F8SYNC_MILESTONE_0A_PROMPT.md`
- [x] Produce repository audit deliverable
- [x] Produce current feature classification matrix
- [x] Produce revised roadmap gap analysis
- [x] Produce incremental migration plan
- [x] Update existing decision log
- [x] Preserve documentation-only boundary with no code, schema, migration, staging, commit, tag, or push changes
- [x] Execute Milestone 0B methodology lock and decision documents

### Phase T - Milestone 0B Methodology Lock and Intelligence Decision Pack

- [x] Read Milestone 0A deliverables and revised roadmap source documents
- [x] Inspect current birth input, timezone, BaZi, timing, aggregation, identity, AI interpretation, versioning, and Golden Test evidence
- [x] Create methodology decision register with status model and top KT decisions
- [x] Create draft BaZi calculation rulebook without formulas or fabricated expected values
- [x] Define Traditional BaZi, F8SYNC deterministic derivation, experience formatting, and AI interpretation boundaries
- [x] Define Golden Test fixture structure and categories with blank expected values
- [x] Define methodology approval workflow and approver routing
- [x] Create implementation readiness matrix
- [x] Update this project tracking document
- [x] Preserve documentation-only boundary with no application code, test, schema, migration, staging, commit, tag, or push changes
- [ ] KT product review of pending decisions
- [ ] BaZi expert validation of methodology decisions and Golden references
- [ ] Milestone 0C intelligence contract design after review

### Phase U - Milestone 0B.1 Product Owner Decision Lock

- [x] Read Milestone 0B decision register, draft rulebook, boundary spec, Golden Test spec, approval workflow, readiness matrix, revised roadmap, and project tracking
- [x] Create KT-facing decision pack at `docs/product/F8SYNC_KT_PRODUCT_DECISION_PACK_V1.md`
- [x] Separate KT-approvable product decisions from expert validation and technical post-methodology decisions
- [x] Provide recommended V1 defaults for Product Owner decisions
- [x] Record 15 Product Owner decisions
- [x] Identify 12 decisions blocking Milestone 0C
- [x] Identify 5 decisions requiring expert confirmation
- [x] Record KT Product Owner decisions in the decision pack
- [x] Update methodology decision register status mapping from KT decisions
- [x] Update implementation readiness based on locked product decisions and remaining expert-validation blockers
- [x] Preserve documentation-only boundary with no application code, test, schema, migration, staging, commit, tag, or push changes
- [ ] BaZi expert validates Category C methodology items

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
| V8 documentation authority | Done | `docs/product/*`, `docs/architecture/*`, `docs/testing/*` | V8 blueprint copied locally with required audit, migration, test, naming, art, card, random draw, and physical-product docs |
| Milestone 0A prompt | Done | `docs/product/F8SYNC_MILESTONE_0A_PROMPT.md` | Supplied repository audit and roadmap alignment directive saved |
| Milestone 0A repository audit | Done | `docs/product/F8SYNC_MILESTONE_0A_REPOSITORY_AUDIT.md` | Confirms V1.1 roadmap read, audits architecture, data, AI boundaries, testing, governance, and recommends incremental migration |
| Milestone 0A feature classification | Done | `docs/product/F8SYNC_CURRENT_FEATURE_CLASSIFICATION.md` | Classifies current features as KEEP, REFACTOR, DEFER, or ARCHIVE CANDIDATE |
| Milestone 0A gap analysis | Done | `docs/product/F8SYNC_ROADMAP_GAP_ANALYSIS_V1.md` | Maps current implementation to V1.1 roadmap requirements and identifies Phase 0/1 blockers |
| Milestone 0A migration plan | Done | `docs/product/F8SYNC_INCREMENTAL_MIGRATION_PLAN_V1.md` | Defines non-destructive migration stages, data compatibility, rollback, risk register, and next milestone |
| Milestone 0B decision register | Done | `docs/product/F8SYNC_METHODOLOGY_DECISION_REGISTER_V1.md` | Records 52 methodology decisions with statuses, approvers, impacts, and blocking levels |
| Milestone 0B draft rulebook | Done | `docs/product/F8SYNC_BAZI_CALCULATION_RULEBOOK_DRAFT_V1.md` | Defines rule structure and pending approval gates without implementing formulas or expected values |
| Milestone 0B boundary spec | Done | `docs/product/F8SYNC_INTELLIGENCE_LAYER_BOUNDARY_V1.md` | Separates Traditional BaZi calculation, F8SYNC derivation, experience formatting, and AI interpretation |
| Milestone 0B Golden Test spec | Done | `docs/product/F8SYNC_GOLDEN_TEST_SPECIFICATION_V1.md` | Defines required Golden Test categories and fixture metadata while keeping expected values blank |
| Milestone 0B approval workflow | Done | `docs/product/F8SYNC_METHODOLOGY_APPROVAL_WORKFLOW_V1.md` | Defines KT and expert review workflow, decision routing, and rule-version authorization |
| Milestone 0B readiness matrix | Done | `docs/product/F8SYNC_IMPLEMENTATION_READINESS_MATRIX_V1.md` | Classifies deterministic components as ready for contract design, blocked, deferred, or not supported in V1 |
| Milestone 0B.1 KT decision pack | Done | `docs/product/F8SYNC_KT_PRODUCT_DECISION_PACK_V1.md` | Records 15 KT Product Owner approval records, including 12 blocking 0C and 5 requiring expert confirmation |
| V8 feature flags | Done | `src/config/feature-flags.ts`, `.env.example` | Identity enabled by default; cards, collection, packs, physical products, notifications, paid packs, and real fulfillment default disabled |
| Sacred Identity types | Partial | `src/core/identity/types.ts` | V8 trait, archetype, elemental balance, symbolic seal, placement, and profile models |
| Sacred Identity resolver | Partial | `src/core/identity/resolver.ts` | Deterministic archetype placement and symbolic seal seed hash from aggregated result; API/UI/persistence pending |
| Archetype registry | Partial | `src/core/identity/archetypes.ts` | Product-original approved seed registry; final naming/cultural/commercial review pending |
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
| V8 card system | Not started | Pending | Card composition, collection, random draw, art approval, and physical product code are pending |

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
| 2026-06-14 | `pnpm typecheck` | Passed | After V8 docs, feature flags, and Sacred Identity foundation |
| 2026-06-14 | `pnpm test` | Passed | 23 tests passed including identity determinism and incomplete-state coverage |
| 2026-06-14 | `pnpm build` | Passed | Production build passed after V8 docs and identity foundation |
| 2026-06-14 | `pnpm test:e2e` | Passed | 8 browser tests passed after V8 foundation changes |
| 2026-06-14 | `pnpm build` | Passed | Rechecked after local access report; build still passes |
| 2026-06-14 | `pnpm dev` | Passed | Next.js started on `http://localhost:3001` because OrbStack was using port 3000 |
| 2026-06-14 | `curl -I http://127.0.0.1:3001/th` | Passed | Returned `200 OK` from the running dev server |
| 2026-06-14 | `curl -s http://127.0.0.1:3001/api/health` | Passed | Health API returned `status: ok` with 3 enabled plugins |
| 2026-06-17 | `wc -l docs/product/F8SYNC_MILESTONE_0A_PROMPT.md` | Passed | Saved prompt has 562 lines |
| 2026-06-17 | `rg -n "Version:" docs/product/F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md` | Passed | Confirmed revised roadmap document is Version 1.1 |
| 2026-06-17 | `rg --files src tests docs migrations` | Passed | Repository structure inspected for Milestone 0A documentation audit |
| 2026-06-17 | Documentation-only review | Passed | No application code, schemas, migrations, staged files, commits, tags, or pushes were intentionally changed for Milestone 0A |
| 2026-06-17 | `git status --short --branch` | Passed | Confirmed dirty tree before Milestone 0B; changes were treated as existing work and not reverted |
| 2026-06-17 | Milestone 0B source review | Passed | Read required 0A deliverables, revised roadmap, gap analysis, migration plan, and project tracking |
| 2026-06-17 | Milestone 0B deterministic logic inspection | Passed | Inspected birth input schemas, mock BaZi/timing/numerology plugins, aggregation, identity resolver, AI interpretation, catalog, and related tests/docs |
| 2026-06-17 | Documentation-only 0B update | Passed | Added required product docs and updated tracking only; no application code, tests, schemas, migrations, commits, tags, or pushes were performed |
| 2026-06-17 | Milestone 0B.1 source review | Passed | Read required 0B docs, revised roadmap, and project tracking before creating KT decision pack |
| 2026-06-17 | Documentation-only 0B.1 update | Passed | Added KT decision pack and updated tracking only; no application code, tests, schemas, migrations, commits, tags, or pushes were performed |
| 2026-06-17 | Milestone 0B.1 KT decision recording | Passed | Updated KT decision pack, decision register, readiness matrix, and tracking only; no application code, tests, schemas, migrations, commits, tags, or pushes were performed |

## Next Recommended Tasks

1. Assign or confirm the BaZi methodology source path and expert reviewer.
2. Expert reviewer validates BaZi source, year/Li Chun policy, month solar-term boundary, day rollover, hour pillar, element weighting, seasonal strength, and Golden references.
3. Keep Golden Test expected values empty until the BaZi methodology source and reviewer have approved them.
4. Execute Milestone 0C as contract design only: V1 birth input, unknown-input, timezone, calendar, trace, evidence, confidence, version, engine, and AI allowed-input contracts.
5. Do not implement BaZi calculations until the rulebook, Golden references, and blocking expert decisions are approved.
6. Add additive V1 database migrations only after contract approval.
7. Add E2E leakage prevention tests proving unauthorized sessions never receive Premium result, identity, timing, or card values.
8. Preserve V8 cards, random draw, broad methodology, and physical commerce as deferred expansion backlog until the V1 digital core is validated.

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
| 2026-06-14 | Treat V8 as an additive migration authority | Preserves working MVP modules while expanding into identity, cards, collection, notifications, art governance, random draw, and physical readiness |
| 2026-06-14 | Keep paid randomized packs and real fulfillment disabled by default | Matches V8 safety boundary until product, legal, platform, and fulfillment reviews are complete |
| 2026-06-14 | Resolve Sacred Identity deterministically from aggregated results | V8 requires archetypes and symbolic seals to be rule-based, versioned, and not AI-selected or random |
| 2026-06-17 | F8SYNC will not perform an immediate full rewrite | Milestone 0A found reusable app, API, entitlement, coupon, Premium Reveal, guardrail, i18n, test, and migration foundations; the main gap is the deterministic intelligence subsystem |
| 2026-06-17 | Traditional BaZi Foundation plus F8SYNC Deterministic Intelligence Layer is the V1 core | `F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md` defines V1 around an approved BaZi foundation and product-original deterministic translation layer |
| 2026-06-17 | Expansion engines and physical commerce remain deferred until the digital core is validated | V1.1 explicitly narrows Phase 0/1 scope and moves multiple engines, random draw, physical fulfillment, community, and broad commerce into later expansion |
| 2026-06-17 | Use incremental migration with targeted deterministic-core replacement | Existing platform components are valuable, but placeholder BaZi, timing, aggregation, and identity logic must be refactored after methodology lock |
| 2026-06-17 | Do not fabricate Golden Test expected values before methodology approval | V1.1 requires golden expected outputs only after approved BaZi rulebook and independent review |
| 2026-06-17 | Milestone 0B does not approve methodology implementation | The decision pack separates locked principles, proposed contracts, KT decisions, expert-validation blockers, and deferred scope without encoding BaZi formulas |
| 2026-06-17 | Milestone 0C should be contract design only unless approvals are completed first | Many deterministic components are ready for contract design but blocked for calculation implementation by KT and expert decisions |
| 2026-06-17 | Milestone 0B.1 narrows KT review to product decisions only | KT can approve product defaults and scope before 0C, but BaZi correctness, Golden expected values, and calculation methodology still require expert validation |
| 2026-06-17 | KT approved 0B.1 product defaults but not calculation methodology | Non-expert product decisions are locked for contract design; Traditional BaZi direction, identity/archetype derivation, advanced BaZi concepts, element presentation, and Golden references remain pending expert validation |
