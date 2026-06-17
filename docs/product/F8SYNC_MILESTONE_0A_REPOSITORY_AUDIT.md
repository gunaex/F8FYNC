# F8SYNC Milestone 0A Repository Audit

**Milestone:** 0A - Repository Audit and Revised Roadmap Alignment  
**Date:** 2026-06-17  
**Roadmap reviewed:** `docs/product/F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md`  
**Roadmap version confirmed:** 1.1  
**Scope:** Documentation-only audit. No application code, schema, migration, UI behavior, staging, commit, tag, or push changes were made for this deliverable.

## Executive Summary

The repository is a working Next.js application with useful platform foundations: localization, API routing, plugin execution, entitlement checks, usage quota, coupons, subscription abstractions, guardrails, RAG support, Premium Reveal filtering, tests, migrations, and documentation discipline.

The repository is not yet aligned with the revised V1.1 roadmap's core product definition:

> A deterministic identity and timing intelligence platform using a traditional BaZi foundation and a proprietary F8SYNC Intelligence Layer.

The largest gap is not the application shell. The largest gap is the deterministic intelligence core. Current BaZi, timing, numerology, and identity outputs are simplified deterministic placeholders or product prototypes. They do not yet implement an approved BaZi methodology, Four Pillars calculation, solar-term handling, unknown-input behavior, evidence model, confidence model, calculation trace, rule versioning, or golden test suite.

**Strategic conclusion:** incremental migration is recommended, with a targeted replacement of the placeholder deterministic calculation subsystem behind versioned contracts. A full rewrite is not supported by repository evidence.

## Roadmap Read Confirmation

The roadmap document was found at:

```text
docs/product/F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md
```

The document identifies itself as:

```text
Version: 1.1
Date: 2026-06-17
Status: Ready for Adoption after Methodology Approval
```

The roadmap's immediate authority is Phase 0: Product and Methodology Lock. It requires methodology approval before filling expected BaZi golden-test values.

## Repository Overview

The repository is organized as a compact Next.js App Router application:

| Area | Location | Current Role |
|---|---|---|
| Web app and API routes | `src/app/*` | Localized pages and server API endpoints |
| Core domain | `src/core/*` | Domain types, aggregation, timing helpers, commercial services, identity prototype |
| Plugins | `src/plugins/*` | BaZi, numerology, timing placeholder engines plus methodology catalog |
| Plugin SDK | `src/plugin-sdk/*` | Plugin manifests, registry, validation, safe execution |
| AI layer | `src/ai/*` | Mock interpretation provider, prompt, guardrails, RAG, audit |
| UI | `src/ui/*` | Primitives, product components, forms, result surfaces |
| Payments | `src/payments/*` | Mock payment provider and provider contracts |
| Configuration | `src/config/*` | App config, routes, feature flags |
| Localization | `src/i18n/*` | Thai, English, Simplified Chinese dictionaries |
| Database migrations | `migrations/*.sql` | Commercial, coupon, and RAG guardrail schema foundations |
| Tests | `tests/*` | Unit, contract, integration, and Playwright E2E tests |
| Documentation | `docs/*`, `PROJECT_TRACKING.md` | Product, architecture, testing, and project tracking records |

## Current Architecture

### Main Analysis Flow

```text
Localized page
  -> analysis workspace
  -> POST /api/fortune
  -> request schema validation
  -> session lookup
  -> entitlement and quota check
  -> runFortuneAnalysis()
  -> plugin registry and safe executor
  -> plugin results
  -> confidence-weighted aggregation
  -> Premium Reveal filtering
  -> optional history save
  -> usage consumption
```

This flow is valuable and can be preserved, but the engine behind it must be changed. The current orchestrator executes generic plugins and produces generic aggregated scores rather than a versioned BaZi foundation output plus a deterministic F8SYNC Intelligence Layer output.

### AI Interpretation Flow

```text
POST /api/interpretation
  -> result parsing
  -> intent guardrail
  -> deterministic FAQ bypass
  -> entitlement and usage check
  -> local RAG retrieval
  -> token budget enforcement
  -> mock AI provider
  -> audit log
```

This boundary is mostly aligned with the revised roadmap because AI is treated as interpretation, not the calculation source. The gap is governance: prompt version, policy version, allowed input minimization, and audit completeness must be formalized.

### Commercial Flow

The repository has mock implementations for registration, session cookies, plans, subscriptions, usage quotas, coupons, and payment provider abstraction. These are appropriate foundations but not production-ready.

### V8 / Expansion Documentation

Earlier V8 documents introduce Sacred Identity, card systems, random draw, physical products, and broad methodology expansion. Under roadmap V1.1, these should be retained as backlog material only. The active V1 direction is narrower: traditional BaZi foundation, deterministic F8SYNC Intelligence Layer, identity, timing, controlled AI, and later commerce experiments.

## Existing Feature Inventory

| Feature | Location | Audit Finding |
|---|---|---|
| Next.js App Router | `src/app` | Keep. Working app foundation with localized routes and API endpoints. |
| i18n | `src/i18n` | Keep. Thai default with English and Simplified Chinese. Needs V1 identity/timing copy later. |
| Plugin SDK | `src/plugin-sdk` | Keep/refactor. Useful isolation and validation pattern, but V1 engine contracts need stricter deterministic outputs. |
| BaZi plugin | `src/plugins/bazi/index.ts` | Refactor/rewrite. Currently placeholder logic, not approved BaZi methodology. |
| Numerology plugin | `src/plugins/numerology/index.ts` | Defer. Useful as future expansion, not V1.1 core. |
| Timing plugin | `src/plugins/timing/index.ts` | Refactor. Timing should derive from approved BaZi/calendar rules, not placeholder scoring. |
| Aggregation | `src/core/aggregation/aggregate.ts` | Refactor. Current generic confidence-weighting mixes multiple placeholder methodologies. |
| Identity prototype | `src/core/identity/*` | Refactor. Deterministic prototype exists but must depend on approved V1 rulebook and BaZi output. |
| Premium Reveal | `src/core/commercial/premium-reveal-service.ts` | Keep. Server-side filtering is aligned with access-control requirements. |
| Entitlements and usage | `src/core/commercial/*` | Keep/refactor. Good central service pattern; needs production persistence and V1 feature mapping. |
| Coupons | `src/core/commercial/coupon-service.ts` | Keep/refactor. Rules are strong; DB transaction behavior still pending. |
| Auth/session mock | `src/core/member/*` | Refactor. Good local foundation but lacks production session/device governance. |
| Payment mock | `src/payments/*` | Keep as abstraction. Requires payment-provider decision before production subscription implementation. |
| AI guardrails/RAG | `src/ai/guardrails/*` | Keep/refactor. Strong boundary, needs policy/prompt versioning and data minimization. |
| Migrations | `migrations/*.sql` | Keep/additive. Commercial and RAG schemas exist; deterministic intelligence schemas are missing. |
| Tests | `tests/*` | Keep/expand. Existing tests are useful but golden deterministic tests are missing. |
| UI shell | `src/ui`, `src/app/[locale]` | Keep/refactor copy and flows. Placeholder timeline/compare pages remain. |

## Key Findings

1. The repository is a viable platform foundation, not a throwaway prototype.
2. Current calculation outputs are placeholders and must not be treated as V1 BaZi truth.
3. The BaZi plugin currently uses a fallback birth time value when birth time is missing. V1.1 requires "Unknown Means Unknown", so missing birth time must never fabricate an hour pillar or equivalent output.
4. There is no approved methodology rulebook, engine contract, evidence model, confidence model, versioning policy, or golden test suite yet.
5. Current identity logic is deterministic, but it is derived from generic aggregated scores rather than approved BaZi and F8SYNC Intelligence Layer rules.
6. Multi-engine roadmap artifacts from earlier V6/V8 work conflict with V1.1 if treated as active scope. They should be preserved as deferred expansion backlog.
7. Commercial services, entitlement checks, coupons, and Premium Reveal are reusable foundations.
8. AI boundaries are directionally correct: the app does not need AI to calculate fortune results. Governance and audit fields still need hardening.
9. Database migrations should be extended additively. Existing user data can be preserved, but legacy/mock result records need version labels and disclosure.
10. A full rewrite would discard working platform capabilities and is not justified.

## Technical Debt

| Debt | Evidence | Impact | Recommended Handling |
|---|---|---|---|
| Placeholder BaZi engine | `src/plugins/bazi/index.ts` | Blocks V1 deterministic credibility | Replace behind new engine contract after methodology lock |
| Fabricated unknown birth time | `birthTime ?? "12:00"` behavior in BaZi plugin | Violates V1 unknown-input policy | Define explicit unknown handling in Phase 0B, then fix in Phase 1A/1B |
| Generic aggregated score model | `src/core/aggregation/aggregate.ts` | Hides source/evidence detail required by V1.1 | Introduce typed deterministic core result and adapter |
| Missing calendar and timezone contract | Current birth input model has limited timezone/calendar semantics | Cannot support solar terms, Li Chun, day rollover, traceability | Add input normalization and calendar-resolution contract |
| Missing golden tests | Tests cover determinism and platform behavior, not approved BaZi cases | Calculation regressions cannot be detected | Add golden test structure without expected values until approval |
| Memory repository fallback | `src/core/repositories/memory-store.ts` | Preview-friendly but not production-safe | Preserve for local dev; add Supabase/Postgres repository adapter |
| Mock auth/payment providers | `src/core/member`, `src/payments` | Not production-grade | Keep abstractions; select providers before production |
| Broad methodology catalog | `src/plugins/catalog.ts` | Can misstate V1 scope if shown as roadmap | Reclassify non-BaZi systems as deferred expansion |
| V8 identity/card scope | `src/core/identity`, `docs/product/F8SYNC_V8_*` | Risk of scope expansion before core is validated | Keep as backlog; only promote after V1 core |

## Security and Governance Concerns

| Concern | Current State | Risk | Roadmap-Aligned Action |
|---|---|---|---|
| Session lifetime and device control | Mock cookie session foundation | No inactivity timeout, device management, or revoke-all control | Add session governance milestone |
| Password handling | Mock auth service | Not production-safe | Replace with production auth provider or Supabase Auth |
| AI audit completeness | Intent audit exists | Missing full prompt/policy version and approved-input object | Add AI policy and prompt version audit |
| Calculation trace | Not present | Deterministic results cannot be independently reviewed | Add trace IDs, rule versions, evidence codes |
| Historical result versioning | Analysis history exists | Mock and future V1 results may be mixed | Preserve with legacy labels and migration metadata |
| Coupon enforcement | Service and migration rules exist | Production depends on DB adapter and transactions | Add repository transaction tests |
| Data lifecycle | Consent models and privacy pages exist | Export/delete flows incomplete | Add data lifecycle plan before production |
| Physical commerce | V8 docs exist | Legal, fulfillment, claim, and platform risks | Keep deferred until digital core is validated |

## Data Model Risk Review

### Tables That Can Remain

- `members`
- `birth_profiles`
- `plans`
- `feature_entitlements`
- `subscriptions`
- `usage_events`
- `analysis_history`
- `consent_records`
- `payment_events`
- `plugin_catalog`
- `plugin_versions`
- Coupon tables from `0003_coupons.sql`
- Knowledge and audit tables from `0004_rag_guardrails.sql`

These are useful foundations if extended with V1-specific version and trace metadata.

### Missing Tables or Domains

- Approved methodology/rule version registry
- Deterministic engine versions
- Golden test cases and reviewed expected values
- Calculation traces
- Normalized birth input records
- Unknown-field and assumption records
- Four Pillars structured output
- Element balance and evidence output
- Identity archetype output tied to rule versions
- Daily timing/calendar output tied to rule versions
- Session/device records and revoke history

### Records Lacking Version Information

Current analysis and plugin records do not yet carry the full V1 set of `input_version`, `rule_version`, `engine_version`, `evidence_model_version`, `confidence_model_version`, `policy_version`, and `trace_id`.

### Additive Migration Feasibility

Additive migration is feasible. Existing tables can remain while new V1 deterministic result tables are introduced. Legacy/mock analyses should be preserved and displayed with clear methodology/version labels. Recalculation should be opt-in or batch-driven after Phase 1 golden tests pass.

## AI Boundary Review

| AI Use | Location | Classification | Finding |
|---|---|---|---|
| Interpretation provider | `src/ai/interpreter`, `src/ai/providers/mock.ts` | Allowed interpretation | AI produces narrative over structured output, not core calculation. |
| Guardrail intent classifier | `src/ai/guardrails/intent-guard.ts` | Allowed policy control | Deterministic guardrail blocks off-topic/prompt-injection before provider call. |
| RAG retriever | `src/ai/guardrails/retriever.ts` | Allowed support knowledge | Local approved documents only; production adapter pending. |
| FAQ bypass | `src/ai/guardrails/faq.ts` | Allowed deterministic support | Good cost and safety control. |
| AI prompt | `src/ai/prompts/system.ts` | Prompt-versioning gap | Needs formal version registry and audit reference. |
| Interpretation API payload | `src/app/api/interpretation/route.ts` | Data minimization risk | Should pass an approved AI interpretation object, not broad raw result state. |

No inspected location currently makes AI the authoritative fortune calculation engine. The primary risk is not AI calculation; it is placeholder deterministic calculation being mistaken for approved BaZi methodology.

## Test and Quality Review

| Test Area | Current Coverage | Reusable? | Gap |
|---|---|---|---|
| Unit tests | Aggregation, registry, entitlement, coupons, guardrails, Premium Reveal, identity, catalog | Yes | Add deterministic core and calendar boundary tests |
| Contract tests | Plugin contract tests | Yes | Add V1 engine contract tests |
| Integration tests | Orchestrator | Yes | Add normalized birth input to deterministic result integration |
| E2E tests | App flows, coupons, guardrail flow | Yes | Add V1 access/leakage and identity/timing flows |
| Calculation tests | Placeholder determinism only | Partially | Missing approved BaZi golden tests |
| AI tests | Guardrail and retrieval behavior | Yes | Add prompt/policy/audit version tests |
| Policy tests | Guardrail domain blocking | Yes | Add AI allowed-input policy tests |
| Entitlement tests | Central entitlement and Premium Reveal | Yes | Add V1 feature map tests |
| Payment tests | Minimal mock foundation | Partially | Add provider contract tests after payment decision |
| Session tests | Minimal | Partially | Add timeout, device, revoke tests |

Minimum golden test structure should follow the V1.1 roadmap. Expected Four Pillars and BaZi outputs must remain blank until methodology approval and independent review.

## Recommended Strategy

**Incremental migration recommended.**

Evidence:

- The app builds on a coherent Next.js structure with working routes, APIs, and tests.
- Plugin isolation, schema validation, entitlement control, Premium Reveal, coupons, i18n, guardrails, and documentation tracking are reusable.
- The main replacement need is concentrated around deterministic methodology, engine contract, calendar handling, output versioning, and golden tests.
- Existing data can be preserved with additive migrations and legacy version labels.
- A full rewrite would remove working foundations without solving the core missing methodology problem.

The deterministic intelligence subsystem should be replaced or heavily refactored, but that is a targeted subsystem change inside an incremental migration, not a full rewrite.

