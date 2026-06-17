# F8SYNC — MR-11: Golden References and Regression Suite

**Package:** MR-11  
**Topic:** Golden References and Regression Suite  
**Status:** `RULE_PROPOSED`  
**Confidence:** HIGH for validation policy / PENDING for individual case outputs  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-17  
**Continuation Date:** 2026-06-18  
**Depends On:** MR-01 through MR-05  
**Required By:** All implementation gates (1B through 1F)  

---

## 1. Purpose

MR-11 establishes the Golden Reference case library used to:

- Verify that the F8SYNC calculation engine produces correct deterministic outputs
- Lock regression test cases that cannot be changed without a versioned rule update
- Confirm that boundary rules from MR-02, MR-03, MR-04, and MR-05 behave correctly
- Provide the evidence package required before implementation gates open

This document defines candidate cases, verification workflow, approval states, and regression requirements. It does not approve any expected BaZi value.

---

## 2. Golden Reference Safety Rule

Golden Reference cases must follow the policy in:

```text
docs/product/F8SYNC_GOLDEN_REFERENCE_WORKSHEETS_V1.md
docs/product/F8SYNC_GOLDEN_TEST_SPECIFICATION_V1.md
docs/product/F8SYNC_0D1_METHODOLOGY_AUTHORITY_RESOLUTION.md
```

Expected pillars, intermediate values, element values, confidence values, and derived interpretation fields must remain blank until all required evidence is recorded.

A case may become `APPROVED` only after:

1. The input data source is recorded.
2. The calculation authority is recorded.
3. The exact tool, source, rule, timezone, and ephemeris versions are recorded.
4. The expected result is independently verified.
5. Review metadata is added.
6. KT accepts the verified result set for implementation use.

---

## 3. Source Quality for Golden References

All Golden Reference candidates must use one of the following source tiers.

| Tier | Description | Confidence Before Output Verification |
|---|---|---|
| Rodden AA | Birth data sourced from birth certificate or equivalent documented record | HIGH input confidence |
| Rodden A | Birth data from biography, interview, or reliable secondary source | HIGH input confidence |
| Cross-verified | Birth data and output cross-checked through two or more independent tools or sources | MEDIUM until source metadata is recorded |
| Boundary fixture | Constructed case around a documented boundary instant | MEDIUM until boundary source is recorded |
| Policy fixture | Input case used to verify unknown, approximate, invalid, or partial-output behavior | HIGH for policy behavior; no invented calculation value |

No Golden Reference case may use fabricated birth data, AI-generated expected values, legacy F8SYNC placeholder output, or a `12:00` fallback for unknown time.

---

## 4. Verification Authorities

Each approved case must identify the authority used for verification.

| Authority Type | Required Metadata |
|---|---|
| Ephemeris / solar-term source | Source name, version, calculation mode, timezone conversion, boundary instant |
| BaZi calculation tool | Tool name, version or access date, settings, output screenshot or transcript |
| Published practitioner source | Practitioner name, publication title or URL, access date, quoted output fields |
| Manual methodology derivation | Rule IDs, rule versions, reviewer, derivation worksheet |

Candidate tools or sources may include HikerBaZi, BaziCalculator.net, Astro.com, Swiss Ephemeris output, or a named published practitioner source. A candidate source is not an approved authority until metadata is recorded.

---

## 5. Case States

| State | Meaning |
|---|---|
| `CANDIDATE` | Input case identified; expected outputs intentionally blank |
| `SOURCE_RECORDED` | Input and authority source metadata recorded |
| `OUTPUT_CAPTURED` | Candidate expected output captured from authority |
| `VERIFIED` | Output checked against rule package and reviewer notes |
| `APPROVED` | KT accepts case for regression use |
| `REJECTED` | Case failed source, output, or review quality checks |

Only `APPROVED` cases can be used as Golden Tests or implementation gate evidence.

---

## 6. Candidate Golden Reference Cases

### GR-01: Standard Known Birth Time Case

**Purpose:** Full Four Pillars baseline covering MR-01 through MR-05  
**Worksheet Mapping:** GT-BZ-001  
**Candidate Input Source Tier:** Rodden AA or equivalent documented birth record  
**Status:** `CANDIDATE`

**Candidate Input:**

| Field | Value |
|---|---|
| Person / record | Bruce Lee candidate record |
| Date | 27 November 1940 |
| Time | 07:12 AM |
| Location | San Francisco, California, USA |
| IANA Zone | America/Los_Angeles |
| Birth time status | KNOWN |
| Input source | To be recorded with citation and access date |

**Verification Fields:**

| Field | Value |
|---|---|
| Year pillar |  |
| Month pillar |  |
| Day pillar |  |
| Hour pillar |  |
| Solar-term references |  |
| Timezone offset evidence |  |
| Calculation authority |  |
| Reviewer |  |
| Approval status | PENDING_VERIFICATION |

**Notes:** This case is useful because it has a documented known time and location. No pillar value is approved in this document.

---

### GR-02: Year Boundary Before Li Chun

**Purpose:** MR-02 year boundary behavior before Li Chun  
**Worksheet Mapping:** GT-BZ-004  
**Candidate Input Source Tier:** Boundary fixture  
**Status:** `CANDIDATE`

**Candidate Input:**

| Field | Value |
|---|---|
| Date | 4 February 2000 |
| Time | 10:00 AM |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |
| Boundary under test | Li Chun 2000 |

**Verification Fields:**

| Field | Value |
|---|---|
| Li Chun exact instant |  |
| Boundary source |  |
| Local time conversion |  |
| Expected year pillar |  |
| Boundary flag |  |
| Reviewer |  |
| Approval status | PENDING_VERIFICATION |

**Rule Behavior Under Test:** Birth before the approved Li Chun instant should use the prior BaZi year under MR-02.

---

### GR-03: Year Boundary After Li Chun

**Purpose:** MR-02 year boundary behavior after Li Chun  
**Worksheet Mapping:** GT-BZ-005  
**Candidate Input Source Tier:** Boundary fixture  
**Status:** `CANDIDATE`

**Candidate Input:**

| Field | Value |
|---|---|
| Date | 4 February 2000 |
| Time | 08:00 PM |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |
| Boundary under test | Li Chun 2000 |

**Verification Fields:**

| Field | Value |
|---|---|
| Li Chun exact instant |  |
| Boundary source |  |
| Local time conversion |  |
| Expected year pillar |  |
| Boundary flag |  |
| Reviewer |  |
| Approval status | PENDING_VERIFICATION |

**Rule Behavior Under Test:** Birth after the approved Li Chun instant should use the new BaZi year under MR-02.

---

### GR-04: Month Boundary Before Jié

**Purpose:** MR-03 month boundary behavior before a Jié solar term  
**Worksheet Mapping:** GT-BZ-006  
**Candidate Input Source Tier:** Boundary fixture  
**Status:** `CANDIDATE`

**Candidate Input:**

| Field | Value |
|---|---|
| Date | 4 April 2024 |
| Time | 10:00 AM |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |
| Boundary under test | Qing Ming 2024 |

**Verification Fields:**

| Field | Value |
|---|---|
| Jié exact instant |  |
| Boundary source |  |
| Local time conversion |  |
| Expected month pillar |  |
| Boundary flag |  |
| Reviewer |  |
| Approval status | PENDING_VERIFICATION |

**Rule Behavior Under Test:** Birth before the approved Jié instant should remain in the previous BaZi month under MR-03.

---

### GR-05: Day Pillar Anchor

**Purpose:** MR-04 day pillar calculation and JDN offset verification  
**Worksheet Mapping:** GT-BZ-014  
**Candidate Input Source Tier:** Boundary fixture / mathematical fixture  
**Status:** `CANDIDATE`

**Candidate Input:**

| Field | Value |
|---|---|
| Date | 1 January 2000 |
| Time | 12:00 PM |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |
| Boundary under test | Day-pillar cycle anchor |

**Verification Fields:**

| Field | Value |
|---|---|
| Local civil date used for JDN |  |
| JDN |  |
| JDN offset rule version |  |
| Expected day pillar |  |
| Calculation authority |  |
| Reviewer |  |
| Approval status | PENDING_VERIFICATION |

**Rule Behavior Under Test:** The approved JDN offset must reproduce the verified day pillar for the anchor date.

---

### GR-06: Zi Hour Cross-Day Disclosure

**Purpose:** MR-04 and MR-05 interaction for 23:00-00:00 births  
**Worksheet Mapping:** GT-BZ-008 / GT-BZ-009  
**Candidate Input Source Tier:** Policy fixture  
**Status:** `CANDIDATE`

**Candidate Input:**

| Field | Value |
|---|---|
| Date | 15 March 2024 |
| Time | 23:30 |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |
| Boundary under test | Zi hour and day rollover |

**Verification Fields:**

| Field | Value |
|---|---|
| Primary day pillar under MR-04 |  |
| Alternative day pillar under Zi-hour variant |  |
| Hour branch |  |
| Hour stem |  |
| Disclosure text |  |
| Reviewer |  |
| Approval status | PENDING_VERIFICATION |

**Rule Behavior Under Test:** F8SYNC V1 uses civil midnight as the primary day boundary and discloses the 23:00 Zi-hour variant.

---

### GR-07: Unknown Birth Time Partial Chart

**Purpose:** MR-05 unknown time behavior and partial result disclosure  
**Worksheet Mapping:** GT-BZ-002  
**Candidate Input Source Tier:** Policy fixture  
**Status:** `CANDIDATE`

**Candidate Input:**

| Field | Value |
|---|---|
| Date | 1 January 1990 |
| Time | UNKNOWN |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | UNKNOWN |
| Boundary under test | Unknown hour policy |

**Verification Fields:**

| Field | Value |
|---|---|
| Year pillar |  |
| Month pillar |  |
| Day pillar |  |
| Hour pillar | UNKNOWN |
| Chart type flag | THREE_PILLAR_PARTIAL |
| Affected outputs |  |
| Disclosure text |  |
| Reviewer |  |
| Approval status | PENDING_VERIFICATION |

**Rule Behavior Under Test:** No default time is substituted. The hour pillar remains unknown and dependent outputs are marked partial.

---

## 7. Case Status Summary

| Case | Purpose | Source Tier | Status | Expected Values Filled |
|---|---|---|---|---|
| GR-01 | Standard known birth time | Rodden AA candidate | CANDIDATE | No |
| GR-02 | Pre-Li Chun year boundary | Boundary fixture | CANDIDATE | No |
| GR-03 | Post-Li Chun year boundary | Boundary fixture | CANDIDATE | No |
| GR-04 | Pre-Jié month boundary | Boundary fixture | CANDIDATE | No |
| GR-05 | Day pillar anchor | Mathematical fixture | CANDIDATE | No |
| GR-06 | Zi hour cross-day disclosure | Policy fixture | CANDIDATE | No |
| GR-07 | Unknown birth time partial chart | Policy fixture | CANDIDATE | Policy-only fields populated |

---

## 8. Verification Workflow

Before any case moves from `CANDIDATE` to `APPROVED`:

1. Confirm the input source and record citation metadata.
2. Confirm the timezone source and offset used for the case.
3. Confirm the relevant MR rule version.
4. Capture calculation output from the selected authority.
5. Record exact output fields in the case worksheet.
6. Compare the captured output against the proposed MR rules.
7. Resolve any mismatch as a methodology issue, source issue, or tool setting issue.
8. Mark the case `VERIFIED` only after reviewer evidence is recorded.
9. Submit the verified case set to KT for final product acceptance.
10. Mark the case `APPROVED` only after KT acceptance is recorded.

---

## 9. Gate Requirements

Implementation gates remain closed until enough cases reach `APPROVED`.

| Gate | Required Approved Cases |
|---|---|
| Milestone 1B | At least two approved boundary cases covering Li Chun and Jié behavior |
| Milestone 1C | At least five approved Four Pillars cases covering year, month, day, hour, unknown time, and boundary disclosure |
| Milestone 1D | Additional approved cases covering hidden stems, Ten Gods, and element structure |
| Milestone 1E | Additional approved identity derivation cases |
| Milestone 1F | Additional approved timing cases |

MR-11 does not open any implementation gate by itself.

---

## 10. Prohibited Entries

- No AI-generated expected value.
- No legacy F8SYNC placeholder output.
- No expected pillar value without source metadata.
- No uncited solar-term boundary instant.
- No unversioned timezone or ephemeris source.
- No `12:00` fallback for unknown birth time.
- No KT approval claim without explicit KT acceptance evidence.

---

## 11. Acceptance Checklist

- [ ] GR-01 source metadata recorded
- [ ] GR-02 source metadata recorded
- [ ] GR-03 source metadata recorded
- [ ] GR-04 source metadata recorded
- [ ] GR-05 source metadata recorded
- [ ] GR-06 source metadata recorded
- [ ] GR-07 policy behavior reviewed
- [ ] Expected values recorded only with review metadata
- [ ] Required cases verified
- [ ] KT accepts regression suite
- [ ] Document committed and tagged

**Upon full acceptance: Status -> `LOCKED` only after approved case evidence is recorded.**

---

**End of MR-11**
