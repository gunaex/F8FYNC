You are working on the existing F8SYNC repository.

## Milestone

**Milestone 0A — Repository Audit and Revised Roadmap Alignment**

## Primary Goal

Assess the current F8SYNC codebase against the newly approved product direction before making any destructive changes.

Do not rewrite the application yet.

The purpose of this milestone is to determine:

1. What existing implementation can be retained
2. What needs refactoring
3. What should be deferred from V1
4. What should be archived or removed later
5. What architecture changes are required to support the revised F8SYNC roadmap

## Required Source Document

Use the following document as the new strategic baseline:

```text
F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md
```

Locate and read this document in the repository.

If it is not currently inside the repository, report that clearly and stop before making assumptions about its contents.

Also inspect all existing F8SYNC specification, roadmap, tracking, architecture, prompt, domain, database, API, UI, and implementation documents.

Where documents conflict, treat the revised implementation roadmap as the current product direction, but record every conflict rather than silently changing behavior.

---

# Approved Product Direction

F8SYNC V1 is:

> A deterministic identity and timing intelligence platform using a traditional BaZi foundation and a proprietary F8SYNC Intelligence Layer.

The implementation order is:

```text
1. Methodology Lock
2. Deterministic Intelligence Core
3. Product MVP
4. Retention and Daily Timing
5. Controlled AI Advisor
6. Commerce Experiments
7. Expansion Engines
```

V1 should prioritize:

* Birth input normalization
* BaZi foundation
* Element balance
* Identity derivation
* Identity archetype
* Daily timing
* Calendar
* Evidence
* Confidence
* Unknown-input handling
* Calculation versioning
* User accounts
* Session management
* Usage limits
* Subscription foundation
* Coupons
* Personal cards
* Controlled AI interpretation

The following are not immediate V1 core scope:

* Multiple astrology engines
* Tarot
* Runes
* Palmistry
* I Ching
* Western astrology
* Thai astrology
* Community
* Live experts
* AR configurator
* Full 3D-print fulfillment
* Sacred-object marketplace
* B2B API

Do not delete these features during this milestone. Classify them as deferred or archive candidates.

---

# Critical Architecture Principles

## 1. Deterministic Ownership

```text
Engine calculates.
F8SYNC Intelligence Layer derives structured product outputs.
AI explains.
```

AI must not:

* Calculate Four Pillars
* Calculate element balance
* Fill missing birth time
* Invent evidence
* Override engine results
* Create undocumented fortune logic
* Change deterministic output
* Act as the source of truth

## 2. Unknown Means Unknown

The system must never fabricate missing input.

For example:

* Unknown birth time must not produce a fabricated Hour Pillar
* Missing timezone must not be silently guessed unless an explicitly documented fallback exists
* Unsupported methodology decisions must not be hidden inside code

## 3. Versioning

Every deterministic result should eventually be traceable to:

* Engine version
* Rule version
* Input version
* Evidence
* Confidence
* Assumptions
* Unknown fields
* Calculation timestamp
* Calculation trace identifier

## 4. Expansion Isolation

Future divination engines must not be mixed into the BaZi core.

They should eventually integrate through a stable engine contract or plugin boundary.

---

# Scope of Work

## Task 1 — Repository Inventory

Inspect the full repository and identify:

* Applications
* Packages
* Services
* APIs
* Database schemas
* Migrations
* Domain models
* Engine code
* AI integrations
* Authentication
* Session management
* Subscription and payment code
* Coupon code
* User profile code
* Card and collection features
* Notification features
* Commerce features
* 3D or AR features
* Test suites
* Documentation
* Environment configuration
* Deployment configuration
* Tracking and decision documents

Produce a concise repository map.

Do not rely only on filenames. Inspect implementation where necessary.

## Task 2 — Current Architecture Analysis

Document the current runtime flow.

At minimum, identify:

```text
User Input
    ↓
API or Server Action
    ↓
Domain or Calculation Logic
    ↓
Database
    ↓
AI Provider
    ↓
UI Output
```

Determine:

* Where calculation logic currently lives
* Whether calculation logic is deterministic
* Whether AI currently performs calculation
* Whether AI receives raw personal data
* Whether results are versioned
* Whether evidence is stored
* Whether unknown data is handled correctly
* Whether premium access is enforced only in UI or also in backend
* Whether session timeout exists
* Whether usage limits exist
* Whether AI cost control exists

## Task 3 — Feature Classification

Classify every meaningful existing module or feature into one of these categories:

### KEEP

Can remain with minimal or no changes.

### REFACTOR

Useful implementation exists, but responsibilities or boundaries are incorrect.

### DEFER

Potentially useful, but not part of the immediate F8SYNC V1 roadmap.

### ARCHIVE CANDIDATE

Conflicts with the approved direction, duplicates another implementation, or creates unacceptable maintenance risk.

For every classification include:

* Feature or module
* Current location
* Current purpose
* Classification
* Reason
* Dependency impact
* Recommended next action

## Task 4 — Gap Analysis

Compare the existing repository against the revised roadmap.

Identify missing or incomplete capabilities for:

* Methodology rulebook
* Birth input model
* Timezone handling
* Solar-term handling
* Four Pillars calculation
* Element balance
* Identity dimensions
* Identity archetype mapping
* Daily timing
* Calendar
* Evidence model
* Confidence model
* Unknown-input behavior
* Engine versioning
* Rule versioning
* Golden test cases
* Calculation trace
* Session timeout
* Device/session management
* Usage quota
* Entitlement control
* Subscription abstraction
* Coupon rules
* AI prompt versioning
* AI policy versioning
* AI domain guardrails
* AI failure fallback
* Audit logging
* Privacy and data lifecycle

Do not implement missing capabilities in this milestone.

## Task 5 — Data Model Risk Review

Inspect existing database schemas and migrations.

Determine:

* Which tables can remain
* Which columns are overloaded
* Which tables mix deterministic and AI-generated results
* Which records lack version information
* Which fields may require migration
* Which existing user data could be affected by the new architecture
* Whether historical results can be preserved
* Whether a migration can be additive instead of destructive

Prefer additive migrations.

Do not modify or delete production data.

## Task 6 — AI Boundary Review

Inspect every AI integration and classify each use as:

* Allowed interpretation
* Allowed copy generation
* Allowed translation
* Allowed card narrative
* Unsupported calculation
* Unsafe domain expansion
* Data minimization risk
* Cost-control risk
* Prompt-versioning gap
* Policy-versioning gap

Clearly identify any location where AI is currently acting as a fortune calculation engine.

## Task 7 — Test and Quality Review

Inspect existing tests and identify:

* Unit tests
* Integration tests
* End-to-end tests
* Calculation tests
* Snapshot tests
* AI tests
* Policy tests
* Entitlement tests
* Payment tests
* Session tests

Determine what is reusable for the new roadmap.

Propose the minimum Golden Test structure, but do not invent expected Four Pillars or BaZi results without an approved methodology source.

## Task 8 — Migration Strategy

Create a non-destructive migration strategy.

The strategy should prefer:

```text
Existing Application
    ↓
Preserve Stable Platform Components
    ↓
Introduce New Intelligence Contracts
    ↓
Place Existing Logic Behind Adapters
    ↓
Implement Approved Deterministic Core
    ↓
Migrate Features Incrementally
    ↓
Deprecate Old Paths
    ↓
Archive Only After Verification
```

Explicitly state whether a full rewrite is necessary.

A full rewrite should only be recommended if there is clear evidence that incremental migration would be more expensive or unsafe.

## Task 9 — Proposed Milestone Breakdown

Propose the next milestones after 0A.

Recommended structure:

```text
0A — Repository Audit and Roadmap Alignment
0B — Methodology Lock and Decision Documents
0C — Intelligence Contracts and Domain Boundaries
1A — Birth Input and Calendar Foundation
1B — BaZi Foundation Engine
1C — Element Balance and Evidence
1D — Identity and Archetype Layer
1E — Daily Timing and Calendar
1F — Golden Tests and Deterministic Regression
2A — User Profile and Identity Experience
2B — Access, Session, and Entitlement
2C — Subscription and Coupon Foundation
2D — Controlled AI Interpretation
```

Adjust milestone boundaries based on repository reality, but explain any deviation.

---

# Required Deliverables

Create or update the following documents.

Adapt the documentation directory to the existing repository convention. Do not create duplicate documentation trees.

## 1. Repository Audit

```text
F8SYNC_MILESTONE_0A_REPOSITORY_AUDIT.md
```

Include:

* Repository overview
* Current architecture
* Existing feature inventory
* Key findings
* Technical debt
* Security and governance concerns

## 2. Feature Classification Matrix

```text
F8SYNC_CURRENT_FEATURE_CLASSIFICATION.md
```

Include a table with:

```text
Feature
Location
Current Status
KEEP / REFACTOR / DEFER / ARCHIVE CANDIDATE
Reason
Dependency
Recommended Action
```

## 3. Revised Roadmap Gap Analysis

```text
F8SYNC_ROADMAP_GAP_ANALYSIS_V1.md
```

Map current implementation against each revised roadmap requirement.

## 4. Migration Plan

```text
F8SYNC_INCREMENTAL_MIGRATION_PLAN_V1.md
```

Include:

* Proposed target architecture
* Incremental migration stages
* Data migration considerations
* Compatibility plan
* Rollback approach
* Risk register
* Recommended next milestone

## 5. Decision Log Update

Update the existing decision log if one exists.

Do not create a second competing decision-log format.

Record at least:

```text
Decision:
F8SYNC will not perform an immediate full rewrite.

Reason:
The repository must first be audited and existing reusable components identified.

Decision:
Traditional BaZi Foundation + F8SYNC Deterministic Intelligence Layer is the V1 core.

Decision:
Expansion engines and physical commerce remain deferred until the digital core is validated.
```

---

# Implementation Restrictions

For this milestone:

* Do not rewrite application code
* Do not delete files
* Do not delete database migrations
* Do not modify production schemas
* Do not change UI behavior
* Do not replace AI providers
* Do not implement new calculation rules
* Do not invent BaZi methodology
* Do not fabricate Golden Test expected values
* Do not rename major directories without approval
* Do not commit
* Do not tag
* Do not push

Documentation changes only.

If a tiny script is required to inspect the repository, it must not change application behavior and must be removed before completion unless it is generally useful.

---

# Verification Requirements

Before reporting completion:

1. Confirm the revised roadmap document was found and reviewed
2. Confirm the full repository was inspected
3. Confirm no application behavior was changed
4. Confirm no files were deleted
5. Confirm no schema or migration was modified
6. Confirm all major features were classified
7. Confirm AI calculation risks were reviewed
8. Confirm a non-destructive migration path was evaluated
9. Confirm the next milestone recommendation is evidence-based
10. Run relevant documentation or formatting checks if the repository provides them

---

# Final Response Format

Report:

## Milestone

## Status

## Strategic Conclusion

State one of:

* Incremental migration recommended
* Partial subsystem rewrite recommended
* Full rewrite recommended

Provide evidence.

## Key Findings

## KEEP Summary

## REFACTOR Summary

## DEFER Summary

## ARCHIVE CANDIDATE Summary

## Critical Risks

## Documents Created or Updated

## Recommended Next Milestone

## Verification Performed

## Git Status

Do not stage, commit, tag, or push.
