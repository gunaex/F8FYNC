# F8SYNC Current Feature Classification

**Milestone:** 0A - Repository Audit and Revised Roadmap Alignment  
**Date:** 2026-06-17  
**Roadmap basis:** `F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md` Version 1.1  
**Classification values:** KEEP, REFACTOR, DEFER, ARCHIVE CANDIDATE

## Classification Matrix

| Feature | Location | Current Status | Classification | Reason | Dependency | Recommended Action |
|---|---|---|---|---|---|---|
| Next.js application shell | `src/app`, `src/app/[locale]` | Working | KEEP | Provides stable web/API foundation | None | Preserve and migrate product flows incrementally |
| Localized route structure | `src/app/[locale]`, `src/i18n` | Working | KEEP | Thai default and multilingual support match product needs | New V1 copy | Add identity/timing localization later |
| UI primitives and app shell | `src/ui/primitives`, `src/ui/components` | Working | KEEP | Reusable design system foundation | V1 product copy | Reuse for V1 identity and timing screens |
| Analysis workspace | `src/app/[locale]/analysis-workspace.tsx` | Working MVP flow | REFACTOR | Form and result model are generic fortune-oriented | V1 input contract | Adapt after birth input and deterministic result contracts |
| `/api/fortune` endpoint | `src/app/api/fortune/route.ts` | Working | REFACTOR | Valuable access checks and filtering, but calls placeholder engine | V1 engine contract | Keep route shape where possible; replace core calculation path |
| Fortune request schema | `src/core/domain/schemas.ts` | Partial | REFACTOR | Lacks V1 birth-time status, unknown fields, assumptions, trace fields | Phase 0 methodology lock | Introduce V1 normalized birth input contract |
| Domain result model | `src/core/domain/types.ts` | Partial | REFACTOR | Generic aggregate result does not represent Four Pillars, evidence, confidence, or trace | V1 engine contract | Add typed deterministic core outputs |
| Plugin SDK | `src/plugin-sdk/*` | Working | KEEP | Provides manifest validation and safe execution | V1 engine boundary | Preserve as optional engine/plugin isolation pattern |
| Plugin registry | `src/plugin-sdk/registry/registry.ts` | Working | KEEP | Useful enable/disable resolution | Methodology scope | Restrict active V1 engines to approved core |
| Safe plugin executor | `src/plugin-sdk/execution/safe-executor.ts` | Working | KEEP | Useful validation and isolation | V1 schemas | Reuse for versioned deterministic engines |
| BaZi plugin | `src/plugins/bazi/index.ts` | Placeholder | REFACTOR | Not real BaZi; uses simplified deterministic scoring | Approved rulebook | Replace with approved BaZi foundation engine |
| Unknown birth time handling | `src/plugins/bazi/index.ts` | Incorrect for V1 | REFACTOR | Current fallback behavior risks fabricated time-derived output | Unknown-input policy | Enforce "Unknown Means Unknown" |
| Numerology plugin | `src/plugins/numerology/index.ts` | Placeholder active plugin | DEFER | Roadmap V1.1 de-prioritizes expansion engines | V1 core validation | Move to expansion backlog |
| Timing plugin | `src/plugins/timing/index.ts` | Placeholder | REFACTOR | Timing should derive from approved BaZi/calendar rules | Calendar and daily timing spec | Rebuild as V1 daily timing service |
| Methodology catalog API | `src/plugins/catalog.ts`, `src/app/api/plugins/catalog/route.ts` | Working metadata | REFACTOR | Lists broad systems that are no longer V1 scope | Product scope freeze | Reclassify expansion methods as deferred |
| Aggregation | `src/core/aggregation/aggregate.ts` | Working generic aggregator | REFACTOR | Multi-plugin weighted score conflicts with BaZi-first V1 | V1 evidence/confidence model | Replace or adapt to V1 evidence model |
| Timing merge helper | `src/core/timing/merge.ts` | Working utility | REFACTOR | Useful patterns but not V1 methodology-backed | Daily timing spec | Reuse only after rule alignment |
| Sacred Identity types | `src/core/identity/types.ts` | Prototype | REFACTOR | Useful bounded domain, but not V1 rulebook-derived yet | Identity archetype rulebook | Keep types as draft, align to approved rules |
| Sacred Identity resolver | `src/core/identity/resolver.ts` | Prototype | REFACTOR | Deterministic but based on generic aggregate scores | BaZi output and archetype rules | Rebuild input mapping after Phase 0B |
| Archetype registry | `src/core/identity/archetypes.ts` | Seed content | REFACTOR | Product-original seed is useful but unapproved | Naming/cultural review | Review and localize after rulebook approval |
| Premium Reveal filtering | `src/core/commercial/premium-reveal-service.ts` | Working | KEEP | Server-side filtering supports access control and leakage prevention | V1 result fields | Extend to identity/timing/card payloads |
| Entitlement service | `src/core/commercial/entitlement-service.ts` | Working foundation | KEEP | Central plan/feature decisions are reusable | V1 feature map | Add V1 identity/timing feature gates |
| Usage metering | `src/core/commercial/entitlement-service.ts`, `src/app/api/usage/route.ts` | Partial | REFACTOR | Memory fallback and guest persistence are not production-grade | Repository adapter | Keep service, add distributed persistence |
| Plan config | `src/core/commercial/config.ts` | Working | REFACTOR | Useful, but roadmap requires payment-provider decision before production | Payment decision doc | Preserve config but avoid premature production promises |
| Coupon service | `src/core/commercial/coupon-service.ts` | Working | KEEP | Good login, idempotency, and free-coupon lockout rules | DB transaction adapter | Preserve; harden persistence |
| Coupon APIs | `src/app/api/coupons/*` | Working | KEEP | Useful support surface | Session/auth hardening | Preserve and test with production repository |
| Mock auth service | `src/core/member/auth-service.ts` | Local foundation | REFACTOR | Not production auth; session/device governance missing | Auth provider decision | Replace or wrap with production provider |
| Session cookie foundation | `src/core/member/session.ts` | Partial | REFACTOR | HTTP-only cookie exists, but no timeout/device/revoke model | Session governance spec | Add session/device management |
| Birth profile APIs | `src/app/api/birth-profiles/*`, `src/core/commercial/birth-profile-service.ts` | Partial | REFACTOR | CRUD foundation exists but input model needs V1 normalization | Birth input spec | Extend with birth-time status, timezone, consent, traceability |
| Subscription service | `src/core/commercial/subscription-service.ts` | Mock | REFACTOR | Good abstraction but not production billing | Payment decision doc | Keep abstraction; defer provider binding |
| Payment provider contracts | `src/payments/*` | Mock/provider shape | KEEP | Useful test seam for future provider | Payment decision doc | Preserve and formalize provider contract tests |
| Analysis history | `src/core/commercial/history-service.ts`, `src/app/api/history/*` | Partial | REFACTOR | Memory-backed; result versions and legacy labels missing | V1 result schema | Add versioned history records additively |
| RAG guardrails | `src/ai/guardrails/*` | Working | KEEP | Strong domain-blocking and local retrieval foundation | Policy versioning | Preserve; add audit fields |
| Deterministic FAQ | `src/ai/guardrails/faq.ts` | Working | KEEP | Reduces AI cost and risk | Support copy governance | Preserve |
| AI provider abstraction | `src/ai/interpreter/*`, `src/ai/providers/*` | Working mock | KEEP | AI is separated from calculation | AI policy/prompt spec | Keep mock default; formalize allowed inputs |
| AI prompt | `src/ai/prompts/system.ts` | Partial | REFACTOR | Needs formal prompt version and policy reference | AI policy versioning | Add prompt/policy version registry |
| Intent audit log | `src/ai/guardrails/audit.ts` | Working foundation | REFACTOR | Needs more version and input-minimization fields | Audit schema extension | Extend additively |
| Commercial migrations | `migrations/0001_commercial_foundation.sql`, `0002_seed_plans.sql` | Foundation | KEEP | Useful tables for members, plans, subscriptions, usage, history | Additive V1 migrations | Preserve and extend |
| Coupon migration | `migrations/0003_coupons.sql` | Foundation | KEEP | Supports unique/free coupon controls | Repository adapter | Preserve |
| RAG migration | `migrations/0004_rag_guardrails.sql` | Foundation | KEEP | Supports knowledge and audit tables | Retriever adapter | Preserve |
| Deterministic core schema | Pending | Missing | REFACTOR | Needed for V1 rule versions, traces, golden cases, results | Phase 0B/0C | Add new migrations only after contract approval |
| Unit tests | `tests/unit/*` | Working | KEEP | Useful safety net | V1 test additions | Preserve and expand |
| Plugin contract tests | `tests/contract/plugins.test.ts` | Working | KEEP | Useful engine boundary test model | V1 engine contract | Extend for deterministic core |
| Orchestrator integration tests | `tests/integration/orchestrator.test.ts` | Working | REFACTOR | Tests placeholder flow | V1 engine contract | Adapt after new core path |
| Playwright E2E tests | `tests/e2e/app.spec.ts` | Working | KEEP | Useful browser safety checks | V1 UI flows | Add identity/timing/access tests |
| Golden tests | Pending | Missing | REFACTOR | Required by roadmap before deterministic core implementation | Methodology approval | Define structure now; leave expected values blank |
| Timeline page | `src/app/[locale]/timeline/page.tsx` | Placeholder | REFACTOR | V1 daily timing/calendar is a core product surface | Daily timing spec | Build after Phase 1E |
| Compare page | `src/app/[locale]/compare/page.tsx` | Placeholder | DEFER | Compatibility is Phase 3 onward in V1.1 | V1 core validation | Keep placeholder or hide until later |
| Admin page | `src/app/[locale]/admin/page.tsx` | Minimal | REFACTOR | Needs content/methodology governance eventually | Admin scope | Add only after core governance docs |
| V8 card system docs | `docs/product/F8SYNC_V8_CARD_TAXONOMY.md`, related docs | Documented | DEFER | Cards/collection are later modules, not Phase 0 core | V1 identity validation | Keep as backlog reference |
| Random draw policy | `docs/product/F8SYNC_V8_RANDOM_DRAW_POLICY.md` | Documented | DEFER | Paid/random packs disabled by default | Legal/platform review | Keep deferred |
| Physical product docs | `docs/product/F8SYNC_V8_PHYSICAL_PRODUCT_GUIDE.md` | Documented | DEFER | Physical commerce is Phase 5 experiment | Digital core validation | Keep deferred |
| Legacy V8 broad roadmap authority | `docs/product/F8SYNC_V8_MASTER_BLUEPRINT.md` | Existing document | ARCHIVE CANDIDATE | Conflicts with V1.1 if treated as active implementation authority | Product owner decision | Preserve as expansion archive/backlog; do not delete |

## Classification Summary

| Classification | Meaning in Milestone 0A |
|---|---|
| KEEP | Reusable with minor alignment or configuration work |
| REFACTOR | Valuable foundation, but must change to satisfy V1.1 |
| DEFER | Potential future value, but outside V1.1 near-term scope |
| ARCHIVE CANDIDATE | Preserve for record/backlog, but do not use as active implementation authority |

## Highest Priority Refactors

1. Replace placeholder BaZi with an approved deterministic BaZi foundation engine.
2. Add V1 input normalization with explicit unknown birth-time behavior.
3. Add engine/rule/evidence/confidence versioning and trace IDs.
4. Convert identity and daily timing from generic score-derived prototypes into deterministic rulebook-derived outputs.
5. Reclassify non-V1 engines and physical/randomized commerce as deferred expansion.

