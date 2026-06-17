# F8SYNC Intelligence Layer Boundary V1

**Milestone:** 0B - Methodology Lock and Intelligence Decision Pack  
**Date:** 2026-06-17  
**Status:** Draft boundary specification  

## Principle

```text
Traditional BaZi Calculation
    -> F8SYNC Deterministic Derivation
    -> Experience Formatting
    -> AI Interpretation
```

Each layer has a separate owner, version, input, output, failure mode, and test responsibility.

## Boundary Matrix

| Layer | Inputs | Outputs | Owner | Version | Permitted Logic | Prohibited Logic | Failure Behavior | Test Ownership |
|---|---|---|---|---|---|---|---|---|
| Traditional BaZi Calculation | Normalized birth input, timezone/calendar resolver output, approved BaZi rules | Four Pillars, Day Master, approved relationships, trace, unknown fields | BaZi methodology owner + Intelligence Core Lead | Engine, rule, input, resolver versions | Approved BaZi calculations only | Product archetype invention, AI decisions, fallback birth time, unreviewed formulas | Return structured partial/blocked result with error and unknown fields | Golden BaZi tests, boundary tests, expert-reviewed fixtures |
| F8SYNC Deterministic Derivation | Approved BaZi output, element balance, evidence, confidence | Identity dimensions, strength/tension indicators, archetype mapping, daily timing codes, narrative tokens | Product Owner KT + Intelligence Core Lead | F8SYNC mapping/rule/evidence/confidence versions | Product-original deterministic translation with evidence | Changing BaZi results, undocumented metaphysical rules, AI-generated scoring | Return incomplete/low-confidence output with disclosure tokens | Contract tests, deterministic regression, rule matrix tests |
| Experience Formatting | F8SYNC output, locale, entitlement context | UI copy keys, locked/unlocked sections, calendar rows, card payloads | Product/design owner | Copy/token/reveal-policy versions | Localization, formatting, entitlement filtering | Calculating missing methodology, exposing locked values, changing confidence | Hide unavailable fields, show safe disclosure, preserve backend filtering | UI/access tests, localization checks, leakage tests |
| AI Interpretation | Minimized approved AI input object, narrative tokens, evidence/confidence summary, allowed topics | Explanation, reflection prompts, support text | AI policy owner + Product Owner KT | Prompt/policy/provider versions | Explain, simplify, translate approved content, answer product support | Calculate Four Pillars, fill unknown birth time, invent evidence, override deterministic result, professional advice | Refuse or redirect off-domain requests; log policy decision | Guardrail tests, prompt/policy audit tests, data minimization tests |

## Traditional BaZi Calculation Boundary

### Inputs

- `normalized_birth_input`
- `calendar_resolution`
- `timezone_resolution`
- Approved BaZi methodology source
- Rule version

### Outputs

- Structured Four Pillars fields where available
- Unknown markers for missing or blocked fields
- Evidence codes
- Confidence metadata
- Calculation trace ID
- Engine/rule/input/resolver versions

### Failure Behavior

- Missing required date/timezone blocks calculation.
- Unknown birth time produces no fabricated hour pillar.
- Unapproved year/month/day/hour rules block affected outputs.
- Resolver ambiguity returns structured error or ambiguity metadata.

## F8SYNC Deterministic Derivation Boundary

### Inputs

- Approved Traditional BaZi output
- Approved element balance output
- Evidence and confidence metadata
- Unknown-field list

### Outputs

- Normalized element balance presentation fields
- Identity dimensions
- Strength and tension indicators
- Primary archetype and secondary influence
- Evidence references
- Narrative tokens
- Daily timing classification after timing rules are approved

### Prohibited Logic

- It must not alter Four Pillars.
- It must not fill missing hour-derived data.
- It must not use current placeholder aggregate scores as V1 source of truth.
- It must not silently convert low-confidence outputs into definitive archetypes.

## Experience Formatting Boundary

Experience formatting may transform structured output into product surfaces:

- Identity reveal
- Element balance view
- Daily timing calendar
- Personal card
- Premium Reveal locks
- Localized copy

Formatting must not become calculation. Copy keys and narrative tokens must reference deterministic fields and confidence metadata.

## AI Interpretation Boundary

AI receives a minimized object, not the whole raw runtime state. The target V1 shape is:

```json
{
  "identity": {},
  "element_balance": {},
  "timing": {},
  "calendar": {},
  "compatibility": {},
  "evidence": {},
  "confidence": {},
  "unknown_fields": [],
  "allowed_topics": [],
  "prohibited_topics": [],
  "engine_version": "",
  "rule_version": "",
  "policy_version": ""
}
```

Current repository behavior passes a full `AggregatedFortuneResult` into interpretation. This is acceptable for the placeholder MVP but should be replaced by the minimized V1 AI input contract before production AI.

## Version Ownership

| Version | Owner | Required Before |
|---|---|---|
| `input_version` | Intelligence Core Lead | Milestone 0C |
| `calendar_resolver_version` | Intelligence Core Lead + expert reviewer | Phase 1A |
| `bazi_rule_version` | BaZi expert + KT approval | Phase 1B |
| `engine_version` | Intelligence Core Lead | Phase 1B |
| `evidence_model_version` | KT + expert reviewer | Milestone 0C/Phase 1C |
| `confidence_model_version` | KT + expert reviewer | Milestone 0C/Phase 1C |
| `f8sync_mapping_version` | KT | Phase 1D |
| `narrative_token_version` | KT + content owner | Phase 1D/2A |
| `ai_policy_version` | AI policy owner + KT | Phase 2D |
| `ai_prompt_version` | AI policy owner | Phase 2D |

## Current Repository Boundary Findings

| Finding | Boundary Risk | Required Handling |
|---|---|---|
| `baziPlugin` uses stable hashes and `DAY_STEM_MOCK`. | Placeholder can be mistaken for BaZi. | Label legacy and replace after methodology approval. |
| Unknown birth time falls back to `"12:00"` in mock seed. | Violates Unknown Means Unknown if promoted. | Ban fallback in V1 contracts. |
| Aggregator mixes BaZi, numerology, and timing scores. | V1 core requires BaZi-first evidence. | Replace with V1 evidence/confidence model. |
| Identity resolver maps aggregate score domains to elements. | Not approved BaZi-derived identity. | Treat as prototype only. |
| AI interpretation receives full aggregate result. | Data minimization and policy version gap. | Introduce approved AI input object. |

## Contract Design Guidance for Milestone 0C

Milestone 0C may define types and interfaces, but it must leave unapproved calculations as unknown, pending, or deferred fields. Contract design should explicitly support:

- Partial results
- Unknown fields
- Assumptions
- Rule status
- Evidence codes
- Confidence reasons
- Trace IDs
- Legacy placeholder labels
