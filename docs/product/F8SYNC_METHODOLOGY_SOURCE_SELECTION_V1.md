# F8SYNC Methodology Source Selection V1

**Milestone:** 0D - Expert Validation Pack and Methodology Source Gate
**Date:** 2026-06-17
**Status:** Candidate matrix only; no source selected

## Selection Rule

The authoritative methodology source must be selected through expert review and KT acceptance. A library, software product, or AI output must not become the authority merely because it is convenient.

## Candidate Source Matrix

| Candidate source | Source type | Author or institution | Edition/version | Language | Coverage | Boundary rules covered | Calculation examples available | Licensing or usage concern | Expert recommendation | KT approval | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Expert-authored F8SYNC BaZi rulebook | Expert-authored rulebook | To be assigned | Blank until drafted | To be recorded | Can cover exact V1 scope | To be defined by expert | To be supplied as worksheets | Internal ownership; reviewer conflict policy applies |  |  | CANDIDATE |
| Recognized published BaZi reference | Published reference | To be proposed by expert | To be recorded | To be recorded | Depends on source | Must include year/month/day/hour and structural rules or list gaps | To be verified by expert | Usage/citation limits to be checked |  |  | CANDIDATE |
| Validated professional BaZi software as independent reference | Independent reference only | To be proposed by expert | To be recorded | To be recorded | Useful for cross-checking outputs | Boundary support must be verified | Examples can be compared, not treated as sole authority | License may restrict automated use; not methodology authority by itself |  |  | CANDIDATE_REFERENCE_ONLY |
| Approved astronomical/calendar data source | Calendar data source | To be proposed by expert/tech lead | To be recorded | To be recorded | Solar terms, timezone/calendar data, ephemeris where needed | Solar-term instants and historical resolver behavior | Data examples required for boundary cases | License, redistribution, and update policy must be checked |  |  | CANDIDATE_SUPPORTING_SOURCE |
| Combined source set with separated ownership | Combination of sources | To be proposed by expert | To be recorded | To be recorded | BaZi rules plus calendar/time data | Each boundary owner must be explicit | Cross-source examples required | Highest governance burden; conflicts must be documented |  |  | CANDIDATE |

## Required Source Evidence

For any selected source path, record:

- Exact title/name.
- Author, institution, maintainer, or expert owner.
- Edition, version, release date, or revision date.
- Language and translation dependency, if any.
- Which decisions it covers.
- Which decisions it does not cover.
- At least one normal calculation example.
- Boundary examples for year, month, day rollover, 23:00, hour, timezone, and historical timezone behavior.
- Licensing or usage constraints.
- Reviewer statement that generative AI was not used as the evidence source.

## Source Status Values

| Status | Meaning |
|---|---|
| CANDIDATE | May be evaluated by expert and KT. |
| CANDIDATE_REFERENCE_ONLY | May be used only as an independent comparison, not authority. |
| CANDIDATE_SUPPORTING_SOURCE | May provide calendar/astronomical data but not full BaZi methodology. |
| RECOMMENDED_BY_EXPERT | Expert has recommended source, but KT has not accepted. |
| ACCEPTED_BY_KT | KT accepts source after expert recommendation. |
| REJECTED | Source is not acceptable for V1. |
| INSUFFICIENT_EVIDENCE | Source lacks coverage, examples, licensing clarity, or expert confidence. |

## Open Source Questions

| Question | Required Answer |
|---|---|
| Is one source sufficient for BaZi methodology and calendar data? |  |
| If sources conflict, which source has precedence? |  |
| Is translation needed? |  |
| Are boundary examples available for all required Golden cases? |  |
| Can expected values be reproduced by another reviewer? |  |
| Can source references be stored in result evidence without license conflict? |  |
