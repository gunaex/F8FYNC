# F8SYNC Incremental Migration Plan V1

**Milestone:** 0A - Repository Audit and Revised Roadmap Alignment  
**Date:** 2026-06-17  
**Roadmap:** `F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md` Version 1.1  
**Recommended strategy:** Incremental migration

## Conclusion

F8SYNC should not perform an immediate full rewrite.

The repository already contains reusable platform components: Next.js app routes, localization, UI primitives, plugin boundaries, validation, entitlement checks, usage quota, coupons, subscription abstraction, Premium Reveal filtering, AI guardrails, RAG, migrations, and tests. The core problem is narrower: the deterministic intelligence subsystem is placeholder-level and must be replaced with an approved Traditional BaZi Foundation plus a deterministic F8SYNC Intelligence Layer.

Therefore the recommended strategy is:

```text
Existing Application
  -> Preserve Stable Platform Components
  -> Introduce New Intelligence Contracts
  -> Place Existing Logic Behind Adapters
  -> Implement Approved Deterministic Core
  -> Migrate Features Incrementally
  -> Deprecate Old Paths
  -> Archive Only After Verification
```

## Proposed Target Architecture

```text
Client UI
  -> API Layer
  -> Access and Usage Gate
  -> V1 Birth Input Normalizer
  -> Calendar and Timezone Resolver
  -> Approved BaZi Foundation Engine
  -> F8SYNC Deterministic Intelligence Layer
  -> Evidence and Confidence Model
  -> Versioned Result Store
  -> Premium Reveal / Entitlement Filter
  -> Controlled AI Interpretation
```

### Target Domains

| Domain | Responsibility | Notes |
|---|---|---|
| Product governance | Roadmap, decisions, methodology approval | Starts in Phase 0 |
| Birth input | Local date/time, timezone, birth-time status, source metadata | Unknown values must remain unknown |
| Calendar resolver | IANA timezone, solar terms, year/month/day boundaries | Must be traceable and golden-tested |
| BaZi foundation engine | Approved Four Pillars and element foundation | No invented methodology |
| F8SYNC Intelligence Layer | Product-original deterministic translation | Rulebook and version required |
| Evidence/confidence | Evidence codes, source weights, unknown-input adjustments | Separate from AI wording |
| Identity | Archetypes and dimensions from approved rules | No AI/random selection |
| Daily timing | Calendar/timing from approved core | Built after calendar foundation |
| Access/commercial | Plans, coupons, usage, subscription, Premium Reveal | Existing foundation can be reused |
| AI interpretation | Explanation only, never authoritative calculation | Prompt/policy versioned |
| Audit and history | Trace, version, consent, lifecycle | Additive schema |

## Incremental Migration Stages

### 0A - Repository Audit and Roadmap Alignment

Status: complete when the four Milestone 0A docs and project tracking updates are present.

Deliverables:

- Repository audit
- Current feature classification
- Roadmap gap analysis
- Incremental migration plan
- Decision log updates

### 0B - Methodology Lock and Decision Documents

Documentation only until approved.

Deliverables:

- `F8SYNC_INTELLIGENCE_CORE_SPEC_V1.md`
- `F8SYNC_CALCULATION_RULEBOOK_V1.md`
- `F8SYNC_ENGINE_CONTRACT_V1.md`
- `F8SYNC_GOLDEN_TEST_CASES_V1.md`
- `F8SYNC_EVIDENCE_CONFIDENCE_MODEL_V1.md`
- `F8SYNC_VERSIONING_POLICY_V1.md`
- `F8SYNC_IDENTITY_ARCHETYPE_RULEBOOK_V1.md`
- Phase 0 approval entries in the existing decision log

Rules:

- Do not fabricate Four Pillars expected values.
- Do not implement BaZi rules before approval.
- Classify unresolved items as approved, deferred, unknown, assumption, or blocker.

### 0C - Intelligence Contracts and Domain Boundaries

Introduce versioned contracts without replacing the whole app.

Work items:

- V1 input schema
- V1 normalized input type
- V1 engine output type
- Evidence/confidence output type
- Calculation trace type
- AI allowed-input type
- Adapter from current route to new contracts

Compatibility:

- Keep `/api/fortune` route stable where possible.
- Mark old aggregate result as legacy when returned from old path.

### 1A - Birth Input and Calendar Foundation

Work items:

- Birth-time status: known, unknown, approximate, disputed
- IANA timezone validation
- Local civil time normalization
- Unknown-field list
- Assumptions list
- Validation errors for conflicting input
- No fabricated unknown values

Testing:

- Unknown birth time
- Invalid timezone
- Missing required local date
- Conflicting input

### 1B - BaZi Foundation Engine

Work items:

- Implement only approved rulebook decisions.
- Calculate structured Four Pillars only where inputs allow.
- Omit or mark unknown outputs where required.
- Produce calculation trace and version metadata.

Testing:

- Golden cases after methodology approval
- Li Chun boundary
- Solar-term month boundary
- Day rollover boundary
- Timezone consistency

### 1C - Element Balance and Evidence

Work items:

- Rulebook-derived element balance
- Evidence code generation
- Confidence model
- Unknown-input confidence adjustments
- Deterministic regression comparison

Compatibility:

- Keep existing score UI behind an adapter until new identity/timing UI is ready.

### 1D - Identity and Archetype Layer

Work items:

- Map approved deterministic outputs to identity dimensions.
- Apply product-original archetype rules.
- Add localized archetype names and disclosures.
- Add Premium Reveal filtering for identity details.

Compatibility:

- Reuse `src/core/identity` as a draft namespace, but replace generic score inputs.

### 1E - Daily Timing and Calendar

Work items:

- Daily timing from approved BaZi/calendar rules.
- Activity-specific timing filters.
- Calendar result model.
- Timeline page upgrade.

Dependencies:

- Calendar resolver
- Evidence/confidence model
- Entitlement feature mapping

### 1F - Golden Tests and Deterministic Regression

Work items:

- Golden test runner
- Versioned fixtures
- Regression comparison report
- Boundary coverage
- Legacy-vs-V1 exclusion rules

Restriction:

- Expected values only after approved methodology review.

### 2A - User Profile and Identity Experience

Work items:

- Identity route and components
- Birth profile selection
- Saved V1 identity results
- Result version disclosures

### 2B - Access, Session, and Entitlement

Work items:

- Session timeout
- Device/session management
- Revoke-all sessions
- Production auth provider adapter
- V1 feature entitlement mapping

### 2C - Subscription and Coupon Foundation

Work items:

- Payment provider decision document
- Provider contract tests
- Transactional coupon persistence
- Subscription lifecycle hardening

### 2D - Controlled AI Interpretation

Work items:

- AI prompt versioning
- AI policy versioning
- Approved minimal AI input object
- Calculation trace reference in AI audit logs
- Provider failure fallback tests

## Data Migration Considerations

### Preserve Existing Data

Existing data should be preserved. No destructive migration is recommended.

Existing analysis records should be treated as:

```text
legacy_result_source: "mvp_placeholder"
legacy_methodology_status: "not_v1_approved"
```

This prevents users and internal systems from confusing placeholder outputs with V1 deterministic outputs.

### Add New Tables Additively

Future migrations should add tables or columns for:

- Normalized birth inputs
- Calculation traces
- Engine versions
- Rule versions
- Golden test cases
- Golden test reviewed expected outputs
- Four Pillars output
- Element balance output
- Evidence/confidence output
- V1 identity profiles
- Daily timing results
- AI prompt/policy versions
- Session/device management

### Avoid Overloading Existing Tables

Do not store V1 deterministic result detail only inside the current generic `analysis_history` payload without versioned references. Use `analysis_history` as a user-facing index or summary if needed, while V1 deterministic details live in versioned records.

### Historical Result Policy

Historical placeholder results can remain viewable if:

- They are clearly labeled as legacy/mock or earlier methodology.
- They are excluded from golden-test regression.
- Recalculation into V1 is explicit and traceable.
- Users are not shown hidden Premium details without entitlement.

## Compatibility Plan

| Compatibility Area | Plan |
|---|---|
| API routes | Keep existing route names while introducing V1 contracts behind them |
| UI | Reuse current shell; introduce identity/timing components gradually |
| Tests | Preserve existing tests; add V1 deterministic test suites |
| Plugins | Keep SDK but restrict active V1 methods to approved core |
| History | Keep old records; add legacy labels and V1 version references |
| AI | Keep interpretation provider; pass minimized approved input |
| Entitlements | Extend current service with V1 feature keys |
| Coupons/subscriptions | Preserve behavior while hardening persistence |

## Rollback Approach

Rollback should be feature-flag and route-adapter based:

1. Keep old placeholder path disabled but available during early V1 development in non-production environments.
2. Introduce V1 engine behind feature flags.
3. Store V1 results separately from legacy records.
4. If V1 output fails validation, return structured error or fallback copy without pretending to calculate.
5. Never overwrite legacy records during migration.
6. Do not roll back by deleting migrations; instead disable V1 features and preserve data.

## Risk Register

| Risk | Severity | Evidence | Mitigation |
|---|---|---|---|
| Unapproved BaZi methodology encoded in code | Critical | Current plugin is placeholder | Complete Phase 0B before implementation |
| Unknown birth time fabricated | Critical | Existing fallback behavior | Add V1 unknown-input contract and tests |
| Legacy results confused with V1 | High | Current history can store generic results | Add version labels and legacy disclosures |
| Broad V8 scope distracts V1 | High | V8 docs include cards, random draw, physical products | Treat as deferred expansion backlog |
| Golden tests fabricated | Critical | Roadmap forbids unreviewed expected values | Create structure only until approval |
| Production auth/session weak | High | Mock auth/session foundation | Add production provider and session governance |
| Payment provider premature | Medium | Mock provider exists | Create provider decision doc before production billing |
| AI overexposure | Medium | Interpretation API sees broad result | Define minimal approved AI input |
| Data model overloading | Medium | Generic analysis history | Add versioned deterministic tables |
| Full rewrite cost | High | Many reusable foundations exist | Use incremental migration |

## Recommended Next Milestone

**0B - Methodology Lock and Decision Documents**

This is the highest-value next milestone because implementation is blocked by methodology authority. The repository can support the new architecture, but code changes to BaZi, identity, timing, and golden tests should wait until Phase 0 decisions are recorded.

## Strategy Statement

**Incremental migration recommended.**

This strategy preserves proven platform work while targeting the real deficiency: the missing approved deterministic intelligence core. A partial subsystem replacement is required inside the deterministic engine area, but the application as a whole does not need a full rewrite.

