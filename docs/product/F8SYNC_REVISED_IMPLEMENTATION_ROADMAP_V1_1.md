# F8SYNC — Revised Product Strategy and Implementation Roadmap

**Document Type:** Product Strategy / Implementation Direction  
**Version:** 1.1  
**Date:** 2026-06-17  
**Status:** Ready for Adoption after Methodology Approval  
**Project:** F8SYNC  

### Revision 1.1 Summary

This revision adds:

- Phase 0 timeline, decision owner, and approval method
- A formal definition of the proprietary F8SYNC Intelligence Layer
- Golden test case templates and boundary examples
- Payment provider decision requirements
- A governed engine improvement path
- Continuous QA and evaluation mapping across all phases

---

## 1. Executive Summary

F8SYNC remains a strong and differentiated product concept. However, the current implementation direction needs to be simplified and restructured before further development continues.

The existing plan combines too many product categories into a single roadmap:

1. A multi-system divination platform
2. A subscription-based AI fortune application
3. A collectible card platform
4. A spiritual product marketplace
5. A 3D-print fulfillment business
6. A future community and B2B API platform

Each of these ideas may have business value, but implementing them together from the beginning creates excessive technical, product, governance, and operational risk.

The recommended direction is to return F8SYNC to its strongest original position:

> **F8SYNC is a deterministic identity and timing intelligence platform.**

F8SYNC should use a traditional BaZi foundation, enhanced by a proprietary F8SYNC interpretation layer, and delivered through premium identity, personal cards, timing guidance, calendar, notifications, and controlled AI interpretation.

The recommended implementation sequence is:

```text
Intelligence Core
    ↓
Identity Experience
    ↓
Daily Timing and Retention
    ↓
Controlled AI Advisor
    ↓
Commerce and Physical Product Experiments
```

The current broad implementation plan should not be discarded. It should be retained as an expansion backlog rather than used as the immediate implementation roadmap.

---

## 2. Recommended Product Definition

### 2.1 Core Product Statement

> **F8SYNC is a deterministic identity and timing platform powered by a traditional BaZi foundation and a proprietary F8SYNC intelligence layer.**

The platform transforms structured birth data into:

- Personal identity insights
- Element balance
- Timing guidance
- Calendar-based recommendations
- Compatibility insights
- Personal cards and collectible experiences
- Controlled AI explanations

### 2.2 What F8SYNC Is Not

F8SYNC should not initially position itself as:

- A general fortune-telling application
- An AI fortune teller
- A marketplace for sacred objects
- A 3D-print shop
- A random card application
- A platform combining every divination system
- A supernatural claim engine

These capabilities may later exist as optional modules, experiences, or revenue channels, but they should not define the product core.

### 2.3 Definition of the F8SYNC Intelligence Layer

The **F8SYNC Intelligence Layer** is a deterministic product layer placed above the approved traditional BaZi calculation foundation.

It does not replace BaZi methodology and does not allow AI to invent interpretations. Its purpose is to transform validated BaZi outputs into consistent, versioned, product-ready structures.

```text
Traditional BaZi Foundation
    ↓
Validated Pillars, Elements, Relationships, and Timing Signals
    ↓
F8SYNC Intelligence Layer
    ├── Normalized Element Balance
    ├── Identity Dimensions
    ├── Identity Archetype Mapping
    ├── Strength and Tension Indicators
    ├── Daily Timing Classification
    ├── Compatibility Dimensions
    ├── Evidence References
    ├── Confidence and Unknown Handling
    └── Narrative Tokens for the Experience and AI Layers
```

#### Responsibilities of the F8SYNC Layer

The layer may:

- Normalize approved BaZi outputs into stable product fields
- Derive identity dimensions using documented rules
- Map deterministic dimensions to F8SYNC identity archetypes
- Produce timing categories and product-facing guidance codes
- Generate evidence references and confidence metadata
- Produce controlled narrative tokens for cards, calendar, and AI interpretation

The layer may not:

- Change the approved Four Pillars calculation
- Invent missing birth information
- Override traditional calculation results
- Use generative AI as a calculation dependency
- Add undocumented metaphysical rules
- Produce unversioned outputs

#### Difference from Traditional BaZi

Traditional BaZi remains the calculation foundation. The F8SYNC layer is the platform's proprietary translation and product modeling system.

Its differentiation comes from:

- A consistent identity model
- Versioned archetype derivation
- Structured daily timing outputs
- Evidence and confidence metadata
- Product-ready card and calendar tokens
- Controlled compatibility dimensions
- Reproducible interpretation contracts

#### Identity Archetype Derivation

An identity archetype must be derived from explicit deterministic dimensions. A proposed V1 structure is:

```text
BaZi Structured Output
    ↓
Element Distribution
    + Day Master Context
    + Seasonal Context
    + Approved Relationship Indicators
    + Strength and Tension Rules
    ↓
F8SYNC Identity Dimensions
    ↓
Archetype Rule Matrix
    ↓
Primary Archetype
    + Secondary Influence
    + Evidence
    + Confidence
```

The exact rule matrix must be completed in `F8SYNC_IDENTITY_ARCHETYPE_RULEBOOK_V1.md` and approved during Phase 0.

---

## 3. Assessment of the Existing Plan

The existing plan contains several valuable ideas, but it currently places too many systems into Phase 0 and Phase 1.

The most significant concern is the proposal to implement the following engines almost simultaneously:

- Thai astrology
- BaZi
- Numerology
- Auspicious timing
- Western astrology
- Sacred or spiritual recommendations
- Tarot
- Palmistry
- Runes
- Vedic or KP astrology

These systems do not share the same methodology, evidence model, confidence model, or calculation behavior.

For example:

| System | Classification |
|---|---|
| BaZi | Deterministic birth calculation |
| Numerology | Deterministic formula with methodology variants |
| Western Astrology | Ephemeris-based calculation |
| Tarot | Randomized or user-selected experience |
| Sacred Object Guidance | Knowledge and recommendation module |
| Palmistry | Image or manually collected biometric-like input |
| AI Chat | Interpretation and conversation layer |

These systems should not be merged into a single result without clear boundaries, evidence, source methodology, confidence, and version ownership.

---

## 4. What Should Be Retained

### 4.1 Plugin-Based Architecture

The concept of a modular engine system should be retained.

Recommended high-level structure:

```text
/intelligence
  /core
    engine_contract
    engine_registry
    input_normalizer
    evidence_model
    confidence_model
    version_registry

  /engines
    /bazi
    /element_balance
    /identity
    /daily_timing
    /calendar
    /compatibility

  /future_engines
    /numerology
    /western
    /thai_astrology
    /tarot
    /runes
    /iching
```

Every engine should implement a shared contract, but the platform must not assume that every engine produces the same type of knowledge.

### 4.2 Deterministic Calculation Ownership

The following principle should be enforced at architecture level:

> **The deterministic engine calculates. AI explains.**

AI must not:

- Calculate missing pillars
- Invent element scores
- Replace unknown input
- Change deterministic results
- Create new fortune methodology
- Override engine evidence
- Make unsupported supernatural claims

### 4.3 Sacred Identity and Personal Cards

The strongest differentiators of F8SYNC are:

- Sacred Identity
- Personal Archetype
- Personal Card
- Premium Reveal
- Daily Timing
- Calendar
- Collection
- Notification
- Compatibility
- Future physical card experiences

These experiences should receive higher priority than adding many additional divination engines.

### 4.4 Physical Product Validation

Physical products may be developed later, but only after digital demand is validated.

Recommended validation sequence:

1. Product concept page
2. User interest survey
3. Waitlist
4. Pre-order experiment
5. Limited production
6. Standard fulfillment
7. Custom 3D configurator
8. AR preview

The project should not invest in a complete 3D commerce platform before proving that users want to purchase physical F8SYNC products.

---

## 5. What Should Be Moved Out of the MVP

### 5.1 Multiple Divination Engines

F8SYNC V1 should not implement seven or more divination engines.

The recommended V1 foundation is:

> **Traditional BaZi Core + F8SYNC Deterministic Intelligence Layer**

Initial engine scope:

- Birth Data Normalization
- BaZi Foundation
- Element Balance
- Identity
- Daily Timing
- Calendar
- Compatibility later

Other systems should remain in the expansion backlog.

### 5.2 Sacred and Spiritual Recommendations

“Ghost and sacred object” logic should not be implemented as a divination engine.

It should become a separate module:

> **Cultural and Symbolic Guidance Module**

Recommended language:

- Symbol aligned with your identity
- Cultural archetype
- Reflection symbol
- Optional spiritual inspiration
- Symbolic object recommendation

The platform should avoid making claims that a user must worship a specific entity or that a product guarantees supernatural outcomes.

### 5.3 3D-Printed Sacred Objects

3D printing may become a future commerce track, but it should not be the core MVP revenue dependency.

Risks include:

- Religious and cultural sensitivity
- Product quality
- Fulfillment workload
- Manufacturing consistency
- Delivery and refund handling
- User expectations
- Reputation risk
- Claims regarding spiritual effectiveness

The first physical products should be positioned as:

- Personal symbolic artifacts
- Identity objects
- Collectible designs
- Decorative sacred-inspired art
- Limited personal cards

### 5.4 Palmistry

The proposed palm tracing feature is interesting but not yet reliable enough for a core premium feature.

Potential issues:

- Different users trace lines differently
- Camera angle affects the result
- Hand size and screen size affect coordinates
- Input quality is difficult to validate
- There is no established confidence model

Palmistry should remain an experimental research track until input quality and rule validation are defined.

### 5.5 “More Users Make the Engine More Accurate”

A deterministic engine does not automatically become more accurate because more users join.

Improvement requires:

- Outcome feedback
- Structured labels
- Evaluation methodology
- Benchmark datasets
- Rule revision governance
- Version comparison
- Statistical validation
- Human expert review

User data may improve product experience, but it does not automatically prove that the fortune methodology is more accurate.

---

## 6. Recommended Platform Architecture

```text
F8SYNC PLATFORM
│
├── 1. INTELLIGENCE CORE
│   ├── Birth Input Normalization
│   ├── BaZi Foundation Engine
│   ├── Element Balance Engine
│   ├── Identity Engine
│   ├── Daily Timing Engine
│   ├── Calendar Engine
│   ├── Compatibility Engine
│   ├── Evidence and Confidence
│   └── Calculation Versioning
│
├── 2. EXPERIENCE PLATFORM
│   ├── Sacred Identity
│   ├── Personal Card
│   ├── Premium Reveal
│   ├── Daily Guidance
│   ├── Timing Calendar
│   ├── Notifications
│   ├── AI Interpretation
│   ├── Collection
│   └── Sharing
│
└── 3. COMMERCE AND EXPANSION
    ├── Subscription
    ├── Coupons
    ├── Digital Premium Cards
    ├── Limited Physical Cards
    ├── Symbolic Objects
    ├── 3D-Printed Artifacts
    └── Future Engine Plugins
```

This structure allows F8SYNC to remain a complete product even if physical products, community features, or additional divination systems are delayed or removed.

---

## 7. Revised Implementation Roadmap

## Phase 0 — Product and Methodology Lock

### Governance and Timeline

| Item | Decision |
|---|---|
| Target duration | 2 weeks |
| Decision owner | Product Owner — KT |
| Methodology reviewer | Designated BaZi methodology expert or reviewer |
| Technical owner | Intelligence Core Lead |
| Approval method | Approved rulebook + recorded decision log + golden tests passing |
| Scope-change rule | Any new methodology or engine requires a documented change request |
| Exit deadline | End of Week 2 unless formally extended by the Decision Owner |

Phase 0 must not remain open indefinitely. Any unresolved topic at the deadline must be classified as one of the following:

- Approved for V1
- Deferred after V1
- Implemented as Unknown
- Requires an explicit assumption with evidence
- Blocks implementation and must be escalated to the Decision Owner

### Objective

Stop scope expansion and finalize the deterministic methodology before building additional features.

### Decisions to Lock

- BaZi methodology and source reference
- Year boundary rule
- Solar term handling
- Month pillar calculation
- Day rollover rule
- Timezone behavior
- Local civil time behavior
- Unknown birth time behavior
- True solar time policy
- Element balance methodology
- Identity archetype methodology
- Confidence model
- Evidence model
- Calculation versioning
- Compatibility methodology boundary

### Recommended V1 Rules

The final methodology must be approved, but the specification should explicitly define items such as:

- Whether the year changes at Li Chun
- Whether months change by solar terms
- Use of IANA timezone
- Day boundary behavior
- Whether 23:00 starts a new day
- Whether hour pillar is omitted when birth time is unknown
- Whether true solar time is disabled in V1
- How unknown values are represented
- How conflicting input is handled

### Deliverables

- `F8SYNC_INTELLIGENCE_CORE_SPEC_V1.md`
- `F8SYNC_CALCULATION_RULEBOOK_V1.md`
- `F8SYNC_ENGINE_CONTRACT_V1.md`
- `F8SYNC_GOLDEN_TEST_CASES_V1.md`
- `F8SYNC_EVIDENCE_CONFIDENCE_MODEL_V1.md`
- `F8SYNC_VERSIONING_POLICY_V1.md`
- `F8SYNC_IDENTITY_ARCHETYPE_RULEBOOK_V1.md`
- `F8SYNC_PHASE_0_DECISION_LOG.md`

### Exit Criteria

- Methodology is approved
- Golden cases are documented
- Unknown input behavior is defined
- Every deterministic result has a source and version
- AI ownership boundaries are approved

### Golden Test Case Standard

Golden tests begin in Phase 0 and run continuously in every later phase.

Each test case must use the following structure:

```yaml
case_id: GT-BZ-001
title: Standard known birth time
purpose: Validate normal calculation and reproducibility
input:
  local_date: "1990-05-15"
  local_time: "08:30:00"
  timezone: "Asia/Bangkok"
  birth_time_status: "KNOWN"
rules:
  year_boundary: "LI_CHUN"
  month_boundary: "SOLAR_TERM"
  day_rollover: "APPROVED_V1_RULE"
  true_solar_time: false
expected:
  normalized_input: {}
  four_pillars: {}
  element_balance: {}
  identity_dimensions: {}
  evidence_codes: []
  confidence: {}
version:
  rule_version: "1.0.0"
  engine_version: "1.0.0"
```

The values inside `expected` must be completed only after the calculation rulebook is approved and independently reviewed.

#### Minimum Phase 0 Golden Cases

| Case | Purpose | Required Expected Behavior |
|---|---|---|
| GT-BZ-001 | Standard known date and time | Full deterministic output |
| GT-BZ-002 | Unknown birth time | No fabricated hour pillar; confidence adjusted |
| GT-BZ-003 | Immediately before Li Chun | Uses the approved pre-boundary year rule |
| GT-BZ-004 | Immediately after Li Chun | Uses the approved post-boundary year rule |
| GT-BZ-005 | Solar-term month boundary | Correct month pillar on both sides of boundary |
| GT-BZ-006 | Day rollover boundary | Applies the approved day transition rule |
| GT-BZ-007 | Timezone conversion | Same instant is handled consistently and traceably |
| GT-BZ-008 | Invalid or conflicting input | Calculation blocked with structured validation error |

At least one normal case, one unknown-input case, and three boundary cases must be approved before Phase 1 begins.

---

## Phase 1 — Deterministic Intelligence Core

### Objective

Build the calculation backend without depending on a large user interface.

### Processing Flow

```text
Birth Input
    ↓
Input Normalization
    ↓
Timezone and Calendar Resolution
    ↓
Solar Term Resolution
    ↓
Four Pillars
    ↓
Element Balance
    ↓
Identity Profile
    ↓
Timing Profile
    ↓
Structured Evidence
```

### Required Output Metadata

Every calculation result should include:

- Engine version
- Rule version
- Input version
- Input values used
- Input values ignored
- Unknown fields
- Assumptions applied
- Evidence references
- Confidence level
- Calculation timestamp
- Calculation trace identifier

### Core Modules

- Birth input validation
- Calendar conversion
- Timezone normalization
- Solar term service
- Four pillars calculator
- Element balance calculator
- Identity derivation
- Daily timing calculation
- Evidence generator
- Confidence generator
- Version registry
- Golden test runner
- Regression test suite
- Calculation trace comparison
- Independent reference-result review

### Exit Criteria

- Same input produces the same result
- Versioned results can be reproduced
- Golden tests pass
- Unknown birth time does not produce fabricated data
- No AI dependency exists in deterministic calculation

---

## Phase 2 — Product MVP

### Objective

Launch a usable digital product around the deterministic core.

### Account and Access Management

- Guest mode
- Member registration
- Premium membership
- Email login
- Social login
- Session timeout
- Session settings
- Device and session management
- Logout all devices
- Usage quota
- Entitlement control
- Subscription foundation
- One-time coupon
- Account deletion
- Profile export
- Notification preferences
- Privacy settings
- AI usage logging

### User Experience

- Birth profile setup
- Birth time confidence selection
- Sacred Identity Reveal
- Element balance view
- Identity profile
- Personal identity card
- Daily timing
- Seven-day calendar
- Structured AI explanation
- Reading history
- Saved profile
- Premium result gating
- Backend entitlement enforcement

### Payment and Subscription Provider Decision

The payment architecture must be selected before subscription implementation begins.

V1 must support the following business requirements:

- Thai market payment support
- Recurring subscription where supported
- One-time payment
- Coupon and entitlement activation
- Payment webhook verification
- Refund and cancellation handling
- Reconciliation and audit records
- Sandbox or test environment
- Separation of payment status from application entitlement status

Provider selection remains an explicit Phase 2 architecture decision.

Candidate provider categories to evaluate:

- A local or regional gateway supporting Thai payment methods
- A gateway supporting international cards and recurring billing
- A combined gateway that can support both domestic and international expansion

The project must not hard-code a provider-specific payment model into the domain layer. Payment integration should use a `PaymentProvider` interface so the gateway can be replaced later.

Required decision document:

```text
F8SYNC_PAYMENT_PROVIDER_DECISION_V1.md
```

The document must compare:

- Thai payment method coverage
- Recurring billing support
- Fees
- Settlement
- Refund workflow
- Webhook reliability
- Developer experience
- Sandbox support
- PDPA and data-handling implications
- International expansion support

### AI Scope in MVP

AI may:

- Explain structured results
- Simplify terminology
- Produce approved narrative variations
- Translate approved content
- Create reflection prompts

AI may not:

- Calculate BaZi
- Calculate element balance
- Fill missing birth time
- Invent evidence
- Contradict deterministic output
- Provide medical, legal, or financial advice
- Guarantee future outcomes

### Exit Criteria

- User can register and create a birth profile
- User receives deterministic identity results
- User can view daily timing
- Premium access is enforced on the backend
- Session timeout and usage controls work
- AI output is traceable to structured engine data

---

## Phase 3 — Retention and Daily Engagement

### Objective

Create recurring value and daily return behavior.

### Features

- Daily guidance
- Thirty-day timing calendar
- Timezone-aware notifications
- Notification lead-time settings
- Quiet hours
- Duplicate notification suppression
- Personal card collection
- Special-date cards
- Card history
- Shareable card
- Streaks based on meaningful engagement
- Compatibility V1
- Saved relationships
- Calendar reminders

### Notification Governance

Notifications must:

- Use deterministic timing data
- Respect user timezone
- Respect quiet hours
- Avoid fear-based wording
- Avoid excessive alerts
- Allow granular opt-out
- Avoid claiming that negative events will definitely occur

### Exit Criteria

- Daily content is deterministic or traceable
- Notifications respect settings
- Duplicate messages are prevented
- Users can access historical cards and guidance
- Retention metrics can be measured

---

## Phase 4 — Controlled AI Advisor

### Objective

Provide conversational interpretation without allowing AI to become the calculation engine.

### Approved AI Input

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
  "policy_version": ""
}
```

### AI Guardrails

The advisor must:

- Answer only within approved F8SYNC domains
- Reference deterministic profile data
- Respect unknown values
- Avoid unsupported certainty
- Avoid medical, legal, financial, or crisis advice
- Avoid gambling guarantees
- Avoid supernatural guarantees
- Avoid replacing professional advice
- Use prompt and policy versioning
- Log usage and policy decisions
- Enforce token and cost limits
- Support human-reviewable traces

### RAG Scope

RAG may contain:

- Approved methodology explanations
- Identity definitions
- Timing explanations
- Product help
- Cultural context
- Safety policies
- Approved interpretation patterns

RAG must not be used to overwrite deterministic calculations.

### Exit Criteria

- AI cannot answer outside approved domains
- AI cannot change engine results
- Every answer records prompt and policy version
- Token cost is controlled
- Unsafe or unsupported queries are rejected or redirected

---

## Phase 5 — Commerce Experiments

### Objective

Validate willingness to pay without turning the project into a manufacturing operation too early.

### Recommended Sequence

1. Digital premium card
2. Downloadable personalized artwork
3. Limited physical card
4. Personalized printed card
5. Limited symbolic object
6. Small-batch 3D-printed artifact
7. Product customization
8. Live 3D preview
9. AR preview
10. Full fulfillment integration

### Commerce Principles

- Do not claim guaranteed spiritual results
- Separate symbolic meaning from factual claims
- Clearly disclose materials and production process
- Validate demand before purchasing equipment
- Start with limited production
- Maintain refund and fulfillment policies
- Avoid presenting cultural or religious symbols carelessly

### Exit Criteria

- Product demand is validated
- Fulfillment cost is understood
- Refund and delivery processes are defined
- Product claims are reviewed
- Physical product quality is consistent

---

## Phase 6 — Expansion Engines and Platform Growth

### Possible Future Engines

- Numerology
- Thai astrology
- Western astrology
- Tarot
- Runes
- I Ching
- Vedic or KP astrology
- Palmistry
- Dream journal
- Symbolic guidance
- Cultural archetype library

### Engine Admission Criteria

A new engine should only be added when it has:

- Defined methodology
- Defined input
- Deterministic or controlled random behavior
- Evidence model
- Confidence model
- Version ownership
- Golden test cases
- Clear AI boundary
- Clear user value
- No conflict with the F8SYNC core positioning

### Future Platform Capabilities

- Multi-language
- Community
- Human expert sessions
- B2B API
- Partner integration
- White-label offering
- Research and evaluation program

---

## 8. Keep, Move, Change, or Remove

| Existing Idea | Decision | Reason |
|---|---|---|
| Plugin-based architecture | Keep | Supports future expansion |
| AI does not calculate fortune | Keep and enforce | Core governance requirement |
| BaZi Engine | Keep as V1 core | Strong deterministic foundation |
| Identity and Personal Card | Keep and prioritize | Strongest F8SYNC differentiation |
| Daily Timing and Calendar | Keep | Supports recurring user value |
| Notifications | Keep | Supports retention |
| Subscription | Keep | Primary digital revenue |
| Coupon | Keep | Supports acquisition and promotion |
| User login and session management | Keep | Required platform foundation |
| Thai astrology | Move after V1 | Avoid methodology overload |
| Western astrology | Move after V1 | Requires separate calculation model |
| Numerology | Move after V1 | Separate methodology |
| Tarot | Change to experience module | Not equivalent to birth calculation |
| Sacred object recommendation | Change to symbolic guidance | Reduce cultural and trust risk |
| Palmistry | Move to experimental track | Input quality not yet controlled |
| 3D shop | Move to commerce experiment | Validate demand first |
| AR configurator | Move after commerce validation | High cost and low early priority |
| Community | Long-term backlog | Moderation and operational overhead |
| Live experts | Long-term backlog | Marketplace and compliance complexity |
| B2B API | Future | Requires stable versioning and SLA |
| Engine improves automatically with users | Remove | Not technically valid without evaluation |

---

## 9. AI Governance Model

### 9.1 AI Roles

AI is permitted to act as:

- Interpreter
- Translator
- Narrative formatter
- Reflection assistant
- Card story writer
- Controlled conversational advisor
- Content summarizer

AI is not permitted to act as:

- Calculation engine
- Methodology author
- Source of missing data
- Medical advisor
- Legal advisor
- Financial advisor
- Gambling predictor
- Supernatural guarantee provider
- Replacement for a human professional

### 9.2 Data Minimization

AI should receive only the minimum structured data required for the response.

Avoid sending:

- Authentication credentials
- Payment details
- Full audit logs
- Unnecessary account metadata
- Unnecessary personal identifiers
- Data from other users
- Raw internal configuration
- Proprietary engine rules unless necessary

### 9.3 AI Logging

Recommended audit fields:

- User request identifier
- User entitlement
- Allowed domain
- Engine version
- Prompt version
- Policy version
- Model provider
- Model name
- Token usage
- Guardrail result
- Response status
- Timestamp

### 9.4 AI Failure Behavior

When AI is unavailable:

- Deterministic results remain available
- The application displays approved static explanations
- No result should disappear because AI failed
- The system must never invent replacement content
- The user should be informed that extended interpretation is temporarily unavailable

---

## 10. Engine Improvement and Evaluation Path

The deterministic engine must not silently learn or change production rules from user activity.

Improvement must follow a governed lifecycle:

```text
Structured User Feedback
    ↓
Evaluation Dataset
    ↓
Expert and Product Review
    ↓
Proposed Rule Change
    ↓
Versioned Candidate Engine
    ↓
Golden Test and Regression Comparison
    ↓
Approval Decision
    ↓
Controlled Release
```

### 10.1 Structured User Feedback

The product may collect optional feedback such as:

- Does this identity description feel relevant?
- Which parts feel relevant or irrelevant?
- Was today's timing guidance useful?
- Did the explanation match the deterministic result?
- Was any wording unclear or harmful?

Feedback must be treated as product evidence, not automatic proof that a metaphysical rule is correct.

### 10.2 Expert Review Cycle

- Review methodology at least every six months or before a major engine release
- Record reviewers, evidence, and decisions
- Separate methodology review from AI writing review
- Do not modify production rules without a new rule version

### 10.3 Version Comparison

Every candidate version must be compared against:

- Existing golden cases
- Boundary cases
- Unknown-input cases
- Historical regression cases
- Approved expert reference cases
- User experience metrics where appropriate

### 10.4 Release Rules

A new engine version must include:

- Change summary
- Reason for change
- Impacted rules
- Golden test results
- Regression results
- Compatibility impact
- Migration behavior for existing profiles
- Approval record
- Rollback plan

### 10.5 Prohibited Improvement Behavior

The platform must not:

- Auto-update calculation rules from ratings
- Train directly on private user data without approval
- Change historical results without version disclosure
- Treat popularity as methodological truth
- Allow an LLM to rewrite deterministic rules

---

## 11. User Management and Session Requirements

The revised roadmap must include user and session governance from the beginning.

### Authentication

- Email login
- Social login
- Email verification
- Password reset
- Optional multi-factor authentication later

### Session Management

- Configurable inactivity timeout
- Maximum session lifetime
- Remember-me policy
- Active device list
- Revoke individual session
- Logout all devices
- Suspicious login notification
- Token refresh policy
- Session audit trail

### User Settings

- Language
- Timezone
- Birth data visibility
- AI explanation preference
- Notification preference
- Quiet hours
- Notification lead time
- Marketing consent
- Privacy consent
- Data export
- Account deletion

### Usage Management

- Free quota
- Premium quota
- AI request quota
- Rate limiting
- Abuse prevention
- Coupon entitlement
- Subscription status
- Feature-level access control
- Backend authorization enforcement

---

## 12. Recommended Product Modules

| Module | Name | Primary Phase | Scope |
|---|---|---|---|
| M01 | Product Governance | Phase 0 onward | Scope, decision log, roadmap, release control |
| M02 | Intelligence Methodology | Phase 0 onward | BaZi rules, evidence, confidence, versioning |
| M03 | Intelligence Core | Phase 1 onward | Deterministic calculation services |
| M04 | Identity Experience | Phase 2 onward | Reveal, archetype, element balance, personal card |
| M05 | Timing and Calendar | Phase 1-3 | Daily timing, calendar, notification source |
| M06 | User and Access Management | Phase 2 onward | Login, session, device, settings, entitlement |
| M07 | Subscription and Coupon | Phase 2 onward | Plan, payment, coupon, access control |
| M08 | AI Interpretation | Phase 2-4 | Prompt, policy, RAG, guardrails, usage limits |
| M09 | Card and Collection | Phase 2-3 | Card generation, gallery, unlock rules |
| M10 | Compatibility | Phase 3 onward | Relationship profile and comparison |
| M11 | Commerce Experiment | Phase 5 | Digital products, physical cards, symbolic objects |
| M12 | QA and Evaluation | Phase 0 onward | Golden tests, BCT, policy tests, regression |
| M13 | Security and Privacy | Phase 0 onward | Encryption, consent, audit, data lifecycle |
| M14 | Operations | Phase 1 onward | Monitoring, incident, support, deployment |

### Continuous QA and Evaluation Mapping

| Phase | Required QA Activity |
|---|---|
| Phase 0 | Rule review, golden-case definition, boundary-case approval |
| Phase 1 | Unit tests, deterministic regression, calculation trace comparison |
| Phase 2 | BCT, entitlement tests, session tests, payment contract tests, AI grounding tests |
| Phase 3 | Notification timing tests, timezone tests, duplicate suppression, retention analytics validation |
| Phase 4 | Prompt-policy tests, prohibited-domain tests, hallucination tests, cost and quota tests |
| Phase 5 | Payment, order, refund, fulfillment, product-claim, and reconciliation tests |
| Phase 6 | New-engine admission tests, cross-engine isolation, version compatibility tests |

M12 is therefore not a later standalone activity. It begins in Phase 0 and remains active throughout the product lifecycle.


---

## 13. Recommended Immediate Next Steps

### Step 1 — Freeze Expansion Scope

Move the following items into an expansion backlog:

- Multiple astrology engines
- Tarot
- Runes
- Palmistry
- Community
- Live experts
- AR
- Full 3D configurator
- Full physical fulfillment
- B2B API

### Step 2 — Complete the Intelligence Specification

Finalize:

- Input model
- Calendar rules
- BaZi foundation
- Element balance
- Identity
- Daily timing
- Calendar
- Evidence
- Confidence
- Versioning
- Golden test cases

### Step 3 — Define the Product MVP

Lock the MVP to:

- Account
- Birth profile
- Identity reveal
- Element balance
- Personal card
- Daily timing
- Seven-day calendar
- Controlled AI explanation
- Subscription foundation
- Coupon
- Session management
- Settings
- Usage limits

### Step 4 — Build and Test the Deterministic Core

No additional experience engine should be added until:

- Golden tests pass
- Unknown input behavior is correct
- Versioned calculation is reproducible
- Engine output has structured evidence

### Step 5 — Build the Experience Layer

After the core is stable:

- Premium reveal
- Personal identity card
- Daily guidance
- Timing calendar
- History
- Notifications
- Sharing

### Step 6 — Introduce AI Under Governance

AI must be integrated only after:

- Structured outputs exist
- Allowed and prohibited topics are defined
- Prompt and policy versioning exists
- Usage and cost limits exist
- Failure behavior is defined

### Step 7 — Validate Commerce Separately

Use digital and limited physical products to validate demand before investing in 3D production infrastructure.

---

## 14. Final Recommendation

The existing broad plan should be retained as:

```text
F8SYNC_EXPANSION_IDEA_BACKLOG.md
```

The active implementation plan should be replaced with:

```text
F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md
```

The project should proceed in the following order:

```text
1. Methodology Lock
2. Deterministic Intelligence Core
3. Product MVP
4. Retention and Daily Timing
5. Controlled AI Advisor
6. Commerce Experiments
7. Expansion Engines
```

This direction protects the project from becoming too large, reduces AI governance risk, preserves F8SYNC's unique identity, and creates a realistic path toward a working product.

---

## 15. Revision 1.1 Change Log

| Change | Status |
|---|---|
| Added two-week Phase 0 target | Completed |
| Assigned Product Owner decision authority | Completed |
| Added approval and escalation method | Completed |
| Defined F8SYNC Intelligence Layer | Completed |
| Added Identity Archetype derivation boundary | Completed |
| Added golden test template and minimum cases | Completed |
| Added payment-provider decision requirements | Completed |
| Added engine improvement governance | Completed |
| Mapped QA and evaluation across every phase | Completed |

---

## 16. Decision Statement

> F8SYNC V1 will focus on a traditional BaZi foundation and a proprietary deterministic F8SYNC intelligence layer.  
>  
> Identity, element balance, daily timing, calendar, personal cards, account management, subscription, session governance, and controlled AI interpretation will form the initial product.  
>  
> Additional divination engines, physical sacred products, 3D printing, AR, palmistry, community, and B2B capabilities will remain in the expansion backlog until the digital core is validated.

---

**End of Document**
