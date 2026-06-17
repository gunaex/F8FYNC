# F8SYNC Roadmap Gap Analysis V1

**Milestone:** 0A - Repository Audit and Revised Roadmap Alignment  
**Date:** 2026-06-17  
**Roadmap:** `F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md`  
**Roadmap version confirmed:** 1.1

## Strategic Alignment

The revised roadmap narrows V1 to:

```text
Traditional BaZi Foundation
  -> F8SYNC deterministic Intelligence Layer
  -> Identity, timing, evidence, confidence, controlled AI interpretation
```

The repository currently implements a broader MVP platform with placeholder fortune plugins, commercial foundations, RAG guardrails, coupons, Premium Reveal, and early V8 identity/card documentation. The platform foundation is reusable. The deterministic methodology core is the primary gap.

## Roadmap Requirement Mapping

| Revised Roadmap Requirement | Current Repository Evidence | Status | Gap | Recommended Milestone |
|---|---|---|---|---|
| Phase 0 methodology lock | Prompt and roadmap docs exist | Partial | Required core methodology docs are not produced | 0B |
| `F8SYNC_INTELLIGENCE_CORE_SPEC_V1.md` | Not present | Missing | No authoritative core spec | 0B |
| `F8SYNC_CALCULATION_RULEBOOK_V1.md` | Not present | Missing | BaZi source/rules not approved | 0B |
| `F8SYNC_ENGINE_CONTRACT_V1.md` | Plugin SDK exists | Partial | SDK is generic; V1 engine output contract missing | 0C |
| `F8SYNC_GOLDEN_TEST_CASES_V1.md` | Tests exist but no approved golden cases | Missing | Golden structure and reviewed expected values absent | 0B/1F |
| `F8SYNC_EVIDENCE_CONFIDENCE_MODEL_V1.md` | Generic plugin confidence exists | Partial | No evidence codes or V1 confidence model | 0B/1C |
| `F8SYNC_VERSIONING_POLICY_V1.md` | Plugin `calculationVersion` exists | Partial | No system-wide rule/engine/input/policy versioning | 0B/0C |
| `F8SYNC_IDENTITY_ARCHETYPE_RULEBOOK_V1.md` | Identity prototype exists | Partial | Archetype mapping is not approved or BaZi-derived | 0B/1D |
| `F8SYNC_PHASE_0_DECISION_LOG.md` | `PROJECT_TRACKING.md` decision log exists | Partial | Decision log exists but no Phase 0 approval record | 0B |
| Product scope freeze | Feature flags and V8 docs exist | Partial | Expansion docs may be confused with active roadmap | 0A/0B |
| BaZi as V1 calculation foundation | Mock BaZi plugin exists | Partial | Not real Four Pillars/BaZi methodology | 1B |
| F8SYNC Intelligence Layer definition | Roadmap defines concept | Partial | No implemented deterministic translation layer contract | 0C/1C/1D |
| Birth input model | `FortuneRequest` and birth profiles exist | Partial | Missing birth-time status, unknown field handling, source metadata | 1A |
| Timezone handling | Timezone string exists in request/profile | Partial | No IANA validation, civil time normalization, or conversion trace | 1A |
| Solar-term handling | None found | Missing | Required for BaZi month boundary decisions | 1A/1B |
| Li Chun/year boundary | None found | Missing | Required decision and golden tests absent | 0B/1B |
| Day rollover rule | None found | Missing | Required decision and boundary tests absent | 0B/1B |
| True solar time policy | None found | Missing | Must be explicitly disabled or defined | 0B |
| Four Pillars calculation | None found | Missing | Current plugin does not calculate pillars | 1B |
| Element balance | Simplified element labels exist | Partial | Not rulebook-derived; no evidence/confidence | 1C |
| Identity dimensions | Identity prototype exists | Partial | Not mapped from approved BaZi outputs | 1D |
| Identity archetype mapping | Seed registry exists | Partial | Needs approved rulebook and cultural/commercial review | 1D |
| Daily timing | Placeholder timing plugin exists | Partial | Not BaZi/calendar-derived | 1E |
| Calendar | Timeline page placeholder | Partial | No deterministic timing calendar engine | 1E |
| Evidence model | Plugin confidence and reasons exist | Partial | No coded evidence hierarchy | 1C |
| Confidence model | Generic confidence-weighted aggregation exists | Partial | Does not reflect unknown time, evidence source, or rule coverage | 1C |
| Unknown-input behavior | Current BaZi fallback risks fabricated time | Failing | Must never invent unknown values | 1A/1B |
| Engine versioning | Plugin manifest versions exist | Partial | No engine contract/version registry or trace | 0C |
| Rule versioning | Not found | Missing | Required for deterministic reproducibility | 0B/0C |
| Calculation trace | Not found | Missing | Required for audit/debug/review | 0C/1B |
| Session timeout | Mock session exists | Partial | No timeout/device/revoke governance | 2B |
| Device/session management | Not found | Missing | Required for production account security | 2B |
| Usage quota | Entitlement service and usage route exist | Partial | Memory fallback/distributed storage pending | 2B |
| Entitlement control | Central service exists | Partial | Needs V1 feature mapping and production persistence | 2B |
| Subscription abstraction | Mock provider exists | Partial | Payment provider decision pending | 2C |
| Coupon rules | Coupon service and migration exist | Mostly aligned | Needs transactional production repository | 2C |
| AI prompt versioning | System prompt exists | Partial | No formal prompt version audit record | 2D |
| AI policy versioning | Guardrails exist | Partial | No policy version registry/audit link | 2D |
| AI domain guardrails | Intent guard exists | Aligned foundation | Production policy needs hardening | 2D |
| AI failure fallback | Mock provider/fallback exists | Aligned foundation | Needs provider contract tests | 2D |
| Audit logging | Intent audit exists | Partial | Needs calculation trace and policy/prompt versions | 0C/2D |
| Privacy and data lifecycle | Consent and privacy pages exist | Partial | Export/delete lifecycle incomplete | 2B |

## Phase-by-Phase Gap Analysis

### Phase 0 - Product and Methodology Lock

**Current strengths**

- Roadmap V1.1 exists and has been reviewed.
- Project tracking and decision log already exist.
- V8 docs provide useful backlog context.
- Plugin SDK and tests show where future contracts can live.

**Gaps**

- No approved BaZi rulebook.
- No approved engine contract.
- No evidence/confidence specification.
- No versioning policy.
- No golden expected values.
- No formal decision owner approval records beyond project tracking.

**Milestone response**

Proceed to 0B before implementation. Do not write calculation code before methodology approval.

### Phase 1 - Deterministic Intelligence Core

**Current strengths**

- API validation, orchestrator, plugin execution, and tests can host the new engine.
- Existing deterministic placeholder tests prove repeatability patterns.

**Gaps**

- Birth input normalization is incomplete.
- Timezone and solar-term handling are absent.
- Four Pillars calculation is absent.
- Element balance and evidence are placeholder-level only.
- Traceability and versioning are absent.

**Milestone response**

Implement new contracts and engine modules behind adapters. Preserve endpoint and app shell where possible.

### Phase 2 - Product MVP

**Current strengths**

- Login/register, member routes, birth profiles, coupons, plan config, Premium Reveal, and history foundations already exist.
- UI primitives and shell can support identity/timing surfaces.

**Gaps**

- Production auth provider and DB adapter are absent.
- Session/device controls are absent.
- Identity UI and V1 identity localization are absent.
- History records need V1 result versioning and legacy labels.

**Milestone response**

Keep commercial and access foundations, but bind them to V1 feature gates after the deterministic core is stable.

### Phase 3 - Retention and Daily Timing

**Current strengths**

- Timing cards and placeholder timeline route exist.
- Notification engine is documented as pending.

**Gaps**

- No BaZi-derived daily timing calendar.
- No activity-specific timing filters.
- No notification scheduler, quiet hours, or duplicate suppression.

**Milestone response**

Build timing after Phase 1E, not before calendar and methodology rules are approved.

### Phase 4 - Controlled AI Advisor

**Current strengths**

- AI provider abstraction, mock provider, guardrails, FAQ bypass, token budgets, and local RAG are implemented.
- Off-topic/prompt-injection blocking exists before main provider calls.

**Gaps**

- AI prompt and policy versioning are incomplete.
- Allowed AI input object is not minimized enough.
- Audit logs should link to calculation trace/version and policy version.

**Milestone response**

Retain AI as interpretation only. Add policy/prompt versioning and approved input schema before production AI.

### Phase 5 - Commerce Experiments

**Current strengths**

- Plans, coupons, mock subscription, payment provider abstraction, and Premium Reveal exist.
- Physical product and random draw policies are documented from V8 work.

**Gaps**

- Payment provider decision is missing.
- Real fulfillment must remain disabled.
- Physical products and paid randomized packs are not V1 core.

**Milestone response**

Keep commerce experiments deferred until digital core and identity/timing product value are validated.

### Phase 6 - Expansion Engines

**Current strengths**

- Catalog metadata exists for future methodologies.
- Feature flags can keep expansion work disabled.

**Gaps**

- Broad systems are not approved for V1.
- Methodology admission tests and isolation policy are missing.

**Milestone response**

Move broad methodologies to expansion backlog. Do not implement additional systems before V1 core.

## Golden Test Gap

Minimum structure should be created in Phase 0B, but expected values must remain empty until methodology approval:

```yaml
case_id: GT-BZ-001
title: Standard known birth time
purpose: Validate normal calculation and reproducibility
input:
  local_date: ""
  local_time: ""
  timezone: ""
  birth_time_status: "KNOWN"
rules:
  year_boundary: ""
  month_boundary: ""
  day_rollover: ""
  true_solar_time: false
expected:
  normalized_input: {}
  four_pillars: {}
  element_balance: {}
  identity_dimensions: {}
  evidence_codes: []
  confidence: {}
version:
  rule_version: ""
  engine_version: ""
```

Do not populate `expected` until the BaZi methodology source and reviewer have approved it.

## AI Calculation Risk Finding

No current AI provider was found acting as the authoritative calculation engine. The AI layer is used for interpretation, FAQ support, and guarded knowledge retrieval. The key risk is that placeholder deterministic plugins can be mistaken for approved methodology. This should be mitigated through version labels, legacy result disclosure, and replacement by the approved deterministic core.

## Data Migration Gap

Existing migrations support commercial and guardrail foundations but not the V1 deterministic intelligence model. Additive migrations are needed for:

- Normalized birth input
- Calculation traces
- Engine and rule versions
- Golden test cases/results
- Four Pillars output
- Element balance output
- Evidence/confidence output
- Identity profile output
- Daily timing output
- Session/device management

Existing historical analysis records can be preserved if labeled as legacy/mock and excluded from V1 golden/regression comparison.

## Recommended Next Milestone

**0B - Methodology Lock and Decision Documents**

Reason:

- Implementation is blocked by missing methodology authority, not missing app infrastructure.
- The repo already has reusable code paths, but replacing placeholder calculation before rule approval would risk encoding unreviewed BaZi assumptions.
- 0B can create the specs required for safe Phase 1 implementation without changing app behavior.

