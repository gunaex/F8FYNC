# F8SYNC Golden Test Specification V1

**Milestone:** 0B - Methodology Lock and Intelligence Decision Pack  
**Date:** 2026-06-17  
**Status:** Fixture structure only; expected BaZi values intentionally blank  

Golden Tests are the approval and regression backbone for deterministic results. This specification defines required case structure and review categories. It does not provide expected Four Pillars, element balance, archetype, or timing values.

## Golden Test Rule

Expected deterministic values must remain empty until all are true:

1. BaZi methodology source is selected.
2. Product Owner KT approves the decision log.
3. Expert reviewer validates the expected reference result.
4. Rule version is assigned.
5. Fixture review metadata is recorded.

## Fixture Shape

```yaml
case_id: GT-BZ-001
title: Standard known birth time
purpose: Validate normal deterministic calculation and reproducibility
status: PENDING_EXPERT_VALIDATION
input:
  local_date: ""
  local_time: ""
  birth_time_status: "KNOWN"
  birth_location: ""
  birth_timezone: ""
  context_timezone: ""
  calendar_system: "GREGORIAN"
required_approved_reference:
  methodology_source: ""
  reviewer: ""
  reviewed_at: ""
expected_behavior_category:
  normalized_input: "required"
  four_pillars: "blank_until_approved"
  element_balance: "blank_until_approved"
  identity_dimensions: "blank_until_approved"
  evidence_codes: "blank_until_approved"
  confidence: "blank_until_approved"
required_metadata:
  input_version: ""
  calendar_resolver_version: ""
  rule_version: ""
  engine_version: ""
  evidence_model_version: ""
  confidence_model_version: ""
  trace_id: "required_at_runtime"
review_owner: "BaZi expert + KT"
notes: "Do not fill expected values from AI or unreviewed sources."
```

## Required Case Categories

| Case ID | Category | Required Input | Required Approved Reference | Expected Behavior Category | Required Metadata | Review Owner | Status |
|---|---|---|---|---|---|---|---|
| GT-BZ-001 | Standard known birth time | Valid date, known local time, location, IANA timezone | Approved BaZi source and reviewer result | Full deterministic output after approval | Input, resolver, rule, engine, evidence, confidence versions | Expert + KT | PENDING_EXPERT_VALIDATION |
| GT-BZ-002 | Unknown birth time | Valid date, `birth_time_status: UNKNOWN`, no local time | Approved unknown-hour policy | No fabricated hour pillar; partial confidence | Unknown fields, confidence reason, rule version | KT + Expert | PROPOSED |
| GT-BZ-003 | Before year boundary | Date/time immediately before approved boundary | Year-boundary reference | Applies pre-boundary year rule after approval | Solar-term/year-boundary evidence | Expert | PENDING_EXPERT_VALIDATION |
| GT-BZ-004 | After year boundary | Date/time immediately after approved boundary | Year-boundary reference | Applies post-boundary year rule after approval | Solar-term/year-boundary evidence | Expert | PENDING_EXPERT_VALIDATION |
| GT-BZ-005 | Solar-term month boundary | Date/time on both sides of month boundary | Solar-term source/reference | Correct month pillar after approval | Solar-term resolver version | Expert | PENDING_EXPERT_VALIDATION |
| GT-BZ-006 | Day rollover boundary | Cases around midnight/23:00 as approved | Day rollover rule reference | Correct day assignment after approval | Day rule version | Expert | PENDING_EXPERT_VALIDATION |
| GT-BZ-007 | Timezone conversion | Same local data resolved through IANA timezone | TZDB/resolver reference | Traceable normalized input and resolved instant | Timezone resolver version | Expert + Tech Lead | PENDING_EXPERT_VALIDATION |
| GT-BZ-008 | Historical timezone case | Historical date/timezone with known offset behavior | TZDB/resolver reference | Reproducible timezone handling | Resolver version and source | Expert + Tech Lead | PENDING_EXPERT_VALIDATION |
| GT-BZ-009 | Invalid input | Invalid date/time/timezone | Input contract | Calculation blocked with structured validation error | Input version, error code | KT + Tech Lead | PROPOSED |
| GT-BZ-010 | Conflicting input | Time value conflicts with status or impossible local time | Input contract and resolver policy | Calculation blocked or ambiguity returned | Error code, unknown/assumption list | KT + Tech Lead | PENDING_PRODUCT_OWNER |
| GT-BZ-011 | Reproducibility | Same valid input repeated | Approved reference from same rule version | Byte-stable deterministic output except trace/timestamp | Engine/rule/input versions | Tech Lead + Expert | PROPOSED |
| GT-BZ-012 | Engine-version comparison | Same input across two engine/rule versions | Versioning policy | Diff report identifies changed fields and reasons | Previous/current versions | Tech Lead + KT | PROPOSED |

## Boundary Fixture Templates

### Unknown Birth Time

```yaml
case_id: GT-BZ-002
title: Unknown birth time
input:
  local_date: ""
  local_time: null
  birth_time_status: "UNKNOWN"
  birth_location: ""
  birth_timezone: ""
expected:
  hour_pillar: "unknown"
  no_fallback_time: true
  confidence_adjustment: "blank_until_confidence_model_approved"
  four_pillars: "blank_until_expert_reference"
```

### Boundary Case Pair

```yaml
case_id: GT-BZ-003
title: Immediately before approved year boundary
input:
  local_date: ""
  local_time: ""
  birth_timezone: ""
required_reference:
  boundary_rule: ""
  boundary_instant: ""
expected:
  year_pillar: "blank_until_expert_reference"
  evidence_codes: []
```

## Required Review Metadata

Every completed Golden Test expected value must record:

- Methodology source
- Reviewer name or role
- Review date
- Rule version
- Engine version
- Resolver version
- Expected-value author
- Independent reviewer
- Change reason if updated

## Prohibited Golden Test Practices

- Do not use current mock plugin outputs as expected BaZi values.
- Do not use AI-generated Four Pillars values.
- Do not fill solar-term or boundary instants without an approved source.
- Do not combine numerology or timing plugin scores into BaZi Golden Tests.
- Do not overwrite historical fixture values without a versioned diff.

## Minimum Exit Criteria Before Phase 1 Implementation

At least these must be approved before implementing the deterministic BaZi engine:

- One normal known-time case.
- One unknown-time case.
- Three boundary cases covering year, month, and day rollover behavior.
- One timezone case.
- A decision record for every expected value source.
