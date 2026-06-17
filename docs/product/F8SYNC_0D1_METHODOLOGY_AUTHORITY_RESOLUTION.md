# F8SYNC — Milestone 0D.1: Evidence-Based BaZi Methodology Authority Resolution

**Document Type:** Methodology Governance  
**Version:** 1.0  
**Date:** 2026-06-17  
**Milestone:** 0D.1  
**Status:** ACTIVE  
**Author Role:** F8SYNC Methodology Lead  
**Product Owner:** KT  

---

## 1. Purpose

This document resolves the methodology authority gap identified at the close of Milestone 0D.

The previous governance model assumed that an external BaZi expert would validate and approve the F8SYNC calculation methodology before implementation could proceed. No confirmed external expert is currently available, and waiting indefinitely blocks all downstream work.

Milestone 0D.1 establishes a replacement governance model that allows the project to proceed through structured evidence-based research, documented rule proposals, methodology lead decisions, and KT product acceptance — while preserving the option for future external audit.

This milestone contains no calculation code. No BaZi engine work is authorized until the gates defined in this document are satisfied.

---

## 2. Problem Statement

### 2.1 Original Governance Assumption

Milestone 0D assumed:

```text
External BaZi Expert
    ↓
Validates methodology
    ↓
Approves rules
    ↓
Implementation proceeds
```

### 2.2 Identified Blockers

- No identified external expert has been confirmed
- No timeline exists for expert availability
- Eleven methodology research packages (MR-01 through MR-11) are fully blocked
- Milestone 1B, 1C, 1D, 1E, and 1F cannot begin without resolved methodology rules
- The project cannot reach 50% progress without resolving this gap

### 2.3 Risk of No Change

If the original model is retained without modification:

- The project remains blocked indefinitely at 38% progress
- Downstream product work cannot begin
- No Golden reference cases can be established
- The deterministic core cannot be implemented or validated

---

## 3. Resolution: Evidence-Based Methodology Authority Model

### 3.1 Revised Governance Flow

```text
Methodology Research Package (MR-XX)
    ↓
Source Review and Comparison
    ↓
F8SYNC Methodology Lead — Rule Proposal with Evidence
    ↓
KT Product Acceptance
    ↓
Rule Version Assigned
    ↓
LOCKED — Implementation Gate Opens
```

### 3.2 Role Definitions

| Role | Responsibility | Authority |
|---|---|---|
| F8SYNC Methodology Lead | Research sources, compare variants, propose explicit rules, document alternatives, define Golden cases | Proposes rules; cannot self-approve |
| Product Owner — KT | Reviews rule proposals, accepts or rejects for product, provides final acceptance | Final product acceptance authority |
| Codex / Developer | Implements only LOCKED rules | No methodology authority |
| AI Interpretation Layer | Explains approved structured results only | No methodology authority |
| Future External Reviewer | Optional independent audit of LOCKED rules | Advisory; does not block implementation |

### 3.3 Methodology Lead Constraints

The Methodology Lead role is subject to the following hard constraints:

- Must not claim unsupported certainty on disputed rules
- Must document all identified variants and source disagreements
- Must not fabricate quotations, citations, or source content
- Must not invent Golden reference cases without a real birth data basis
- Must record confidence level explicitly for every proposed rule
- Must present alternatives when primary sources disagree
- Must flag DISPUTED status rather than silently choosing a variant

---

## 4. Rule Lifecycle

Every methodology rule must pass through the following states in order. No rule may skip a state.

```text
PENDING_METHODOLOGY_RESEARCH
    ↓
SOURCE_REVIEWED
    ↓
RULE_PROPOSED
    ↓
METHODOLOGY_AUTHORITY_APPROVED
    ↓
PENDING_KT_ACCEPTANCE
    ↓
LOCKED
```

### State Definitions

| State | Meaning | Owner |
|---|---|---|
| `PENDING_METHODOLOGY_RESEARCH` | Research package not yet started | Methodology Lead |
| `SOURCE_REVIEWED` | Primary and secondary sources identified and compared | Methodology Lead |
| `RULE_PROPOSED` | Explicit rule written with evidence, alternatives, and confidence | Methodology Lead |
| `METHODOLOGY_AUTHORITY_APPROVED` | Methodology Lead confirms proposal is complete and evidence-based | Methodology Lead |
| `PENDING_KT_ACCEPTANCE` | Proposal submitted to KT for product acceptance | KT |
| `LOCKED` | Rule accepted by KT, version assigned, implementation gate opens | KT |

A rule must not reach `LOCKED` until all of the following are recorded:

- Primary source reference
- Secondary source comparison
- Identified variants and disagreements
- Selected rule with rationale
- Confidence level
- At least one Golden reference case
- KT acceptance record
- Rule version number

---

## 5. Confidence Classification

Every proposed rule must carry an explicit confidence level.

| Level | Meaning |
|---|---|
| `HIGH` | All major primary sources agree; no significant variant identified |
| `MEDIUM` | Primary sources mostly agree; minor variants exist and are documented |
| `LOW` | Sources disagree on a significant detail; rule is a documented decision, not a consensus |
| `DISPUTED` | Sources contradict directly; rule cannot be proposed without KT scope decision |

A `DISPUTED` rule blocks downstream work until KT resolves the scope question.

---

## 6. Source Quality Hierarchy

When sources conflict, the Methodology Lead applies the following priority order:

1. **Traditional Classical Texts** — original Chinese astronomical and calendar sources where traceable
2. **Modern Authoritative BaZi References** — established practitioners with documented methodology
3. **Cross-validated Digital Tools** — software implementations that document their source methodology
4. **Practitioner Consensus** — where multiple independent practitioners agree on a specific rule
5. **F8SYNC Methodology Lead Decision** — documented, explicit, versioned, and flagged as a lead decision

No source may be used unless it can be cited by title, author, or reference identifier.

---

## 7. Golden Reference Policy

A Golden reference case is a real or well-documented birth data record with a verified BaZi output used to confirm calculation correctness.

### Requirements for a Valid Golden Case

- Birth date, time, and timezone must be explicitly known or documented as UNKNOWN/APPROXIMATE
- Four Pillars output must be independently verifiable from at least one source
- The source used for verification must be recorded
- Cases derived from legacy F8SYNC placeholder code must not be used as Golden references
- Cases using the `12:00` implicit fallback must not be used as Golden references

### Golden Case States

| State | Meaning |
|---|---|
| `CANDIDATE` | Case identified; not yet verified |
| `VERIFIED` | Output confirmed from independent source |
| `APPROVED` | Approved for use in regression suite |
| `REJECTED` | Failed verification or source quality insufficient |

---

## 8. Implementation Gate

No BaZi calculation code may be written or merged until the following gate conditions are met for the relevant milestone:

### Gate: Milestone 1B (Calendar and Solar-Term Foundation)

- MR-01 LOCKED
- MR-02 LOCKED
- MR-03 LOCKED
- At least two APPROVED Golden boundary reference cases

### Gate: Milestone 1C (Four Pillars Foundation)

- MR-01 through MR-05 all LOCKED
- At least five APPROVED Golden Four Pillars cases covering year, month, day, and hour pillars
- KT acceptance of boundary rule set

### Gate: Milestone 1D (BaZi Structure and Element Foundation)

- MR-06, MR-07, MR-08 LOCKED
- At least three APPROVED Golden cases covering hidden stems and Ten Gods
- KT acceptance of element weighting model

### Gate: Milestone 1E (Identity Layer)

- MR-09 LOCKED
- Identity dimension rules accepted by KT
- At least two APPROVED Golden identity derivation cases

### Gate: Milestone 1F (Daily Timing)

- MR-10 LOCKED
- Timing rules accepted by KT
- At least two APPROVED Golden timing cases

---

## 9. Methodology Research Package Status

| Package | Topic | Status | Gate Dependency |
|---|---|---|---|
| MR-01 | Calendar and timezone authority | `RULE_PROPOSED` | None |
| MR-02 | Year boundary and Li Chun | `RULE_PROPOSED` | MR-01 |
| MR-03 | Solar-term month boundary | `RULE_PROPOSED` | MR-01, MR-02 |
| MR-04 | Day pillar and day rollover | `RULE_PROPOSED` | MR-01 |
| MR-05 | Hour pillar and unknown birth time | `RULE_PROPOSED` | MR-04 |
| MR-06 | Hidden stems and Ten Gods | `PENDING_METHODOLOGY_RESEARCH` | MR-02–MR-05 |
| MR-07 | Day Master and seasonal strength | `PENDING_METHODOLOGY_RESEARCH` | MR-03, MR-06 |
| MR-08 | Element weighting and normalization | `PENDING_METHODOLOGY_RESEARCH` | MR-02–MR-07 |
| MR-09 | Identity dimensions and archetype derivation | `PENDING_METHODOLOGY_RESEARCH` | MR-08 |
| MR-10 | Daily timing methodology | `PENDING_METHODOLOGY_RESEARCH` | MR-02–MR-08 |
| MR-11 | Golden references and regression suite | `PENDING_METHODOLOGY_RESEARCH` | MR-01–MR-10 |

MR-01 through MR-05 are proposed research packages only. Their rule text is prepared for review, but none of these packages are `LOCKED`, none have KT acceptance recorded, and none authorize implementation until the full acceptance checklist in the relevant package is completed.

---

## 10. What This Milestone Does Not Authorize

This milestone explicitly does not authorize:

- Any BaZi calculation implementation
- Any Four Pillars engine code
- Any element balance engine code
- Any identity derivation engine code
- Any daily timing engine code
- Any modification to the intelligence contracts beyond what is required for rule versioning
- Any use of legacy `12:00` fallback behavior as an approved result
- Any use of AI to calculate, estimate, or replace deterministic outputs

---

## 11. Relationship to Existing Documents

This milestone supersedes the expert dependency model described in:

```text
docs/product/F8SYNC_0D_VALIDATION_GATE_REPORT.md
```

All other governance documents remain valid. The F8SYNC Methodology Lead role described here is the authority model that replaces the waiting state for an unconfirmed external expert.

The external reviewer option described in `F8SYNC_0D_VALIDATION_GATE_REPORT.md` is preserved as an optional future audit path.

---

## 12. Acceptance Criteria for Milestone 0D.1

This milestone is complete when:

- [ ] This document is reviewed and accepted by KT
- [ ] Role definitions and constraints are confirmed
- [ ] Rule lifecycle states are confirmed
- [ ] Confidence classification is confirmed
- [ ] Source quality hierarchy is confirmed
- [ ] Golden reference policy is confirmed
- [ ] Implementation gate conditions are confirmed
- [ ] Document is committed and tagged

---

## 13. Next Action

Upon KT acceptance of this document:

1. Tag this milestone: `milestone-0d1-methodology-authority-resolution`
2. Review MR-01 through MR-05 in dependency order
3. Record KT acceptance, rejection, or requested revision for each proposed rule
4. No implementation work begins until MR-01 through MR-05 reach `LOCKED`

---

**End of Milestone 0D.1**
