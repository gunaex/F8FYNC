# F8SYNC — MR-11: Golden References Evidence Log

**Package:** MR-11  
**Topic:** Golden References and Regression Suite  
**Status:** `OUTPUT_CAPTURED_PENDING_EVIDENCE`  
**Confidence:** PENDING until source artifacts and reviewer metadata are recorded  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-18  
**Depends On:** MR-01 through MR-05  
**Required By:** Implementation gates 1B through 1F  

---

## 1. Purpose

This file records candidate Golden Reference outputs that have been captured for review.

It is an evidence log, not an approval document. The values below must not be treated as Golden expected values until all evidence requirements are satisfied.

This document continues:

```text
docs/product/F8SYNC_MR11_GOLDEN_REFERENCES.md
docs/product/F8SYNC_GOLDEN_REFERENCE_WORKSHEETS_V1.md
docs/product/F8SYNC_GOLDEN_TEST_SPECIFICATION_V1.md
docs/product/F8SYNC_0D1_METHODOLOGY_AUTHORITY_RESOLUTION.md
```

---

## 2. Safety Position

The previous draft of this file used verified-style language. That language is intentionally removed here because the file does not yet contain enough evidence to support `VERIFIED`, `APPROVED`, `LOCKED`, or gate-ready status.

Required evidence before any case becomes `VERIFIED`:

- Input source citation and access date
- Tool name, tool URL, tool version if available, and access date
- Tool settings used for timezone, true solar time, calendar, and day rollover
- Screenshot, transcript, export, or reproducible worksheet
- Reviewer name or role
- Review date
- Rule versions used
- KT acceptance record if the case is promoted to `APPROVED`

No implementation gate opens from this document alone.

---

## 3. Status Definitions

| State | Meaning |
|---|---|
| `OUTPUT_CAPTURED_PENDING_EVIDENCE` | A value was copied into the log, but evidence artifacts are incomplete |
| `EVIDENCE_RECORDED` | Source/tool settings and reproducible evidence are attached or referenced |
| `REVIEWED` | Methodology reviewer confirms the case matches approved rule versions |
| `VERIFIED` | Evidence and review are complete |
| `APPROVED` | KT accepts the verified case for regression use |
| `REJECTED` | Source quality, tool settings, or output consistency is insufficient |

Only `APPROVED` cases may become Golden Tests.

---

## 4. Tool Claims Pending Evidence

The following tools were named in the prior draft. They are not approved authorities until evidence is recorded.

| Tool | URL | Claimed Engine | Evidence Status |
|---|---|---|---|
| BaziCalculator.net | bazicalculator.net | Swiss Ephemeris | PENDING_EVIDENCE |
| FateMaster.ai | fatemaster.ai/en/workspace/bazi-calculate | Swiss Ephemeris | PENDING_EVIDENCE |

Required tool evidence:

- Access date
- Output screenshot or transcript
- Settings screenshot or settings transcript
- Any visible rule option for true solar time, day rollover, calendar system, and timezone
- Confirmation that no unknown-time fallback was applied

---

## 5. Captured Candidate Outputs

### GR-01: Bruce Lee — Full Four Pillars Baseline

**Purpose:** MR-01 through MR-05 full Four Pillars baseline  
**Input Source Tier:** Rodden AA candidate  
**Calculation Tool Claimed:** BaziCalculator.net  
**Status:** `OUTPUT_CAPTURED_PENDING_EVIDENCE`

**Input:**

| Field | Value |
|---|---|
| Name | Bruce Lee |
| Date | 27 November 1940 |
| Time | 07:12 AM |
| Location | San Francisco, California, USA |
| IANA Zone | America/Los_Angeles |
| Birth time status | KNOWN |
| Input source citation | PENDING |

**Captured Candidate Output:**

| Pillar | Captured Value |
|---|---|
| Year | 庚辰 Geng Chen |
| Month | 丁亥 Ding Hai |
| Day | 甲戌 Jia Xu |
| Hour | 戊辰 Wu Chen |

**Evidence Fields:**

| Field | Value |
|---|---|
| Tool settings evidence | PENDING |
| Output artifact | PENDING |
| Reviewer | PENDING |
| KT approval | PENDING |

---

### GR-02: Year Boundary Before Li Chun 2000

**Purpose:** MR-02 before-Li-Chun behavior  
**Input Source Tier:** Boundary fixture  
**Calculation Tool Claimed:** BaziCalculator.net  
**Status:** `OUTPUT_CAPTURED_PENDING_EVIDENCE`

**Input:**

| Field | Value |
|---|---|
| Date | 4 February 2000 |
| Time | 10:00 AM |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |

**Captured Candidate Output:**

| Pillar | Captured Value |
|---|---|
| Year | 己卯 Ji Mao |
| Month | 丁丑 Ding Chou |
| Day | 壬辰 Ren Chen |
| Hour | 乙巳 Yi Si |

**Evidence Fields:**

| Field | Value |
|---|---|
| Li Chun exact instant | PENDING |
| Boundary source | PENDING |
| Tool settings evidence | PENDING |
| Output artifact | PENDING |
| Reviewer | PENDING |
| KT approval | PENDING |

---

### GR-03: Year Boundary After Li Chun 2000

**Purpose:** MR-02 after-Li-Chun behavior  
**Input Source Tier:** Boundary fixture  
**Calculation Tool Claimed:** BaziCalculator.net  
**Status:** `OUTPUT_CAPTURED_PENDING_EVIDENCE`

**Input:**

| Field | Value |
|---|---|
| Date | 4 February 2000 |
| Time | 09:00 PM |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |

**Captured Candidate Output:**

| Pillar | Captured Value |
|---|---|
| Year | 庚辰 Geng Chen |
| Month | 戊寅 Wu Yin |
| Day | 壬辰 Ren Chen |
| Hour | 辛亥 Xin Hai |

**Evidence Fields:**

| Field | Value |
|---|---|
| Li Chun exact instant | PENDING |
| Boundary source | PENDING |
| Tool settings evidence | PENDING |
| Output artifact | PENDING |
| Reviewer | PENDING |
| KT approval | PENDING |

---

### GR-04: Month Boundary Before Qing Ming 2024

**Purpose:** MR-03 before-Jié behavior  
**Input Source Tier:** Boundary fixture  
**Calculation Tool Claimed:** FateMaster.ai  
**Status:** `OUTPUT_CAPTURED_PENDING_EVIDENCE`

**Input:**

| Field | Value |
|---|---|
| Date | 4 April 2024 |
| Time | 10:00 AM |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |

**Captured Candidate Output:**

| Pillar | Captured Value |
|---|---|
| Year | 甲辰 Jia Chen |
| Month | 丁卯 Ding Mao |
| Day | 戊戌 Wu Xu |
| Hour | 丁巳 Ding Si |

**Evidence Fields:**

| Field | Value |
|---|---|
| Qing Ming exact instant | PENDING |
| Boundary source | PENDING |
| Tool settings evidence | PENDING |
| Output artifact | PENDING |
| Reviewer | PENDING |
| KT approval | PENDING |

---

### GR-05: Day Pillar Baseline — JDN Anchor

**Purpose:** MR-04 day pillar and JDN offset review  
**Input Source Tier:** Mathematical fixture  
**Calculation Tool Claimed:** BaziCalculator.net  
**Status:** `OUTPUT_CAPTURED_PENDING_EVIDENCE`

**Input:**

| Field | Value |
|---|---|
| Date | 1 January 2000 |
| Time | 00:00 |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |

**Captured Candidate Output:**

| Pillar | Captured Value |
|---|---|
| Year | 己卯 Ji Mao |
| Month | 丙子 Bing Zi |
| Day | 戊午 Wu Wu |
| Hour | 壬子 Ren Zi |

**Evidence Fields:**

| Field | Value |
|---|---|
| JDN | PENDING |
| JDN offset rule version | PENDING |
| Tool settings evidence | PENDING |
| Output artifact | PENDING |
| Reviewer | PENDING |
| KT approval | PENDING |

---

### GR-06: Zi Hour Cross-Day Case

**Purpose:** MR-04 and MR-05 interaction for 23:00-00:00 births  
**Input Source Tier:** Policy fixture  
**Calculation Tool Claimed:** BaziCalculator.net  
**Status:** `OUTPUT_CAPTURED_PENDING_EVIDENCE`

**Input:**

| Field | Value |
|---|---|
| Date | 15 March 2024 |
| Time | 23:30 |
| Location | Bangkok, Thailand |
| IANA Zone | Asia/Bangkok |
| Birth time status | KNOWN |

**Captured Candidate Output:**

| Pillar | Captured Value |
|---|---|
| Year | 甲辰 Jia Chen |
| Month | 丁卯 Ding Mao |
| Day | 戊寅 Wu Yin |
| Hour | 壬子 Ren Zi |

**Evidence Fields:**

| Field | Value |
|---|---|
| Day rollover setting | PENDING |
| Zi-hour variant comparison | Primary civil-midnight day: 戊寅 Wu Yin. Zi-hour split alternative day: 己卯 Ji Mao. |
| Tool settings evidence | PENDING |
| Output artifact | PENDING |
| Reviewer | PENDING |
| KT approval | PENDING |

---

### GR-07: Unknown Birth Time Partial Chart Policy

**Purpose:** MR-05 unknown birth time behavior  
**Input Source Tier:** Policy fixture  
**Status:** `OUTPUT_CAPTURED_PENDING_EVIDENCE`

**Policy Candidate:**

| Field | Captured Policy Value |
|---|---|
| Birth time | UNKNOWN |
| Hour pillar | UNKNOWN |
| Chart type flag | THREE_PILLAR_PARTIAL |
| Prohibited fallback | No `12:00` default |
| Dependent outputs | Must be marked partial or unavailable |

**Evidence Fields:**

| Field | Value |
|---|---|
| KT policy acceptance record | PENDING |
| Rule version | PENDING |
| Reviewer | PENDING |
| Approval status | PENDING |

---

## 6. Case Status Summary

| Case | Purpose | Status | Can Be Used As Golden Test |
|---|---|---|---|
| GR-01 | Full Four Pillars baseline | OUTPUT_CAPTURED_PENDING_EVIDENCE | No |
| GR-02 | Year boundary before Li Chun | OUTPUT_CAPTURED_PENDING_EVIDENCE | No |
| GR-03 | Year boundary after Li Chun | OUTPUT_CAPTURED_PENDING_EVIDENCE | No |
| GR-04 | Month boundary before Jié | OUTPUT_CAPTURED_PENDING_EVIDENCE | No |
| GR-05 | Day pillar anchor | OUTPUT_CAPTURED_PENDING_EVIDENCE | No |
| GR-06 | Zi hour cross-day disclosure | OUTPUT_CAPTURED_PENDING_EVIDENCE | No |
| GR-07 | Unknown birth time partial chart | OUTPUT_CAPTURED_PENDING_EVIDENCE | No |

---

## 7. Implementation Gate Status

| Gate | Requirement | Current Status |
|---|---|---|
| Gate 1B | MR-01, MR-02, MR-03 LOCKED + approved boundary cases | CLOSED |
| Gate 1C | MR-01 through MR-05 LOCKED + approved Four Pillars cases | CLOSED |
| Gate 1D | MR-06, MR-07, MR-08 LOCKED + approved structure cases | CLOSED |
| Gate 1E | MR-09 LOCKED + approved identity cases | CLOSED |
| Gate 1F | MR-10 LOCKED + approved timing cases | CLOSED |

No gate is ready until the required MR rules are `LOCKED` and the relevant Golden cases are `APPROVED`.

---

## 8. Acceptance Checklist

- [ ] GR-01 evidence artifact recorded
- [ ] GR-02 evidence artifact recorded
- [ ] GR-03 evidence artifact recorded
- [ ] GR-04 evidence artifact recorded
- [ ] GR-05 evidence artifact recorded
- [ ] GR-06 evidence artifact recorded
- [ ] GR-07 KT policy acceptance record attached
- [ ] Tool settings recorded for all calculation cases
- [ ] Rule versions recorded for all cases
- [ ] Reviewer metadata recorded
- [ ] Cases promoted from `OUTPUT_CAPTURED_PENDING_EVIDENCE` to `VERIFIED`
- [ ] KT accepts verified regression suite
- [ ] Approved cases copied into Golden Test fixtures
- [ ] Document committed and tagged

**Upon KT acceptance:** cases may move to `APPROVED`; implementation gates open only when their MR rule and approved-case requirements are also satisfied.

---

**End of MR-11 Evidence Log**
