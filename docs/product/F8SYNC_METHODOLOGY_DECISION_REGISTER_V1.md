# F8SYNC Methodology Decision Register V1

**Milestone:** 0B / 0D - Methodology Lock and Expert Validation Package
**Date:** 2026-06-17
**Status:** Product decisions recorded; expert validation package prepared
**Decision Owner:** Product Owner - KT
**Methodology Reviewer:** Designated BaZi methodology expert or reviewer

This register separates current repository behavior from approved methodology. Existing code is evidence of implementation only. It is not automatically approved methodology.

## Decision Register Summary

```text
Total Decisions: 52
Locked: 16
Proposed: 10
Pending Product Owner: 5
Pending Expert Validation: 20
Deferred: 1
Rejected: 0
Unknown: 0
Blocking Milestone 0C: 28
```

## Top Decisions KT Must Make

1. Approve the Phase 0 rule that AI explains only and never calculates deterministic results.
2. Approve the V1 birth input policy, including required fields, optional birth time, and explicit unknown representation.
3. Select the authoritative BaZi methodology source and designated expert reviewer.
4. Decide whether true solar time is disabled in V1 or deferred behind a later methodology review.
5. Approve which F8SYNC Intelligence Layer outputs are V1 core: element balance, identity dimensions, archetype, evidence, confidence, daily timing, and compatibility deferral.
6. Approve that Golden Test expected BaZi values remain blank until expert-reviewed references are completed.

## Milestone 0B.1 Product Owner Approval Records

KT recorded 15 Product Owner approval records in `F8SYNC_KT_PRODUCT_DECISION_PACK_V1.md`.

| PO Approval Record | Source Decision ID | KT Decision | Register Status Handling |
|---|---|---|---|
| PO-0B1-001 | BIRTH-002 / BIRTH-003 | APPROVE RECOMMENDED | `LOCKED` |
| PO-0B1-002 | BIRTH-004 | SELECT ALTERNATIVE | `LOCKED` |
| PO-0B1-003 | BIRTH-005 / TIME-003 | APPROVE RECOMMENDED | `LOCKED` |
| PO-0B1-004 | TIME-007 | APPROVE RECOMMENDED | `LOCKED` |
| PO-0B1-005 | INTEL-002 | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | `PENDING_EXPERT_VALIDATION` |
| PO-0B1-006 | INTEL-005 / INTEL-006 / INTEL-008 | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | `PENDING_EXPERT_VALIDATION` |
| PO-0B1-007 | COMPAT-001 / COMPAT-003 | APPROVE RECOMMENDED | `LOCKED` |
| PO-0B1-008 | AI-002 | APPROVE RECOMMENDED | `LOCKED` |
| PO-0B1-009 | AI-002 / VER-001 | APPROVE RECOMMENDED WITH CLARIFICATION | `LOCKED` |
| PO-0B1-010 | EXP-001 / EXP-002 / EXP-003 | APPROVE RECOMMENDED | `LOCKED` |
| PO-0B1-011 | VER-001 | APPROVE RECOMMENDED | `LOCKED` |
| PO-0B1-012 | BAZI-001 | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | `PENDING_EXPERT_VALIDATION` |
| PO-0B1-013 | BAZI-010 / BAZI-009 | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | `PENDING_EXPERT_VALIDATION` |
| PO-0B1-014 | ELEM-006 / ELEM-007 | APPROVE RECOMMENDED, PENDING EXPERT VALIDATION | `PENDING_EXPERT_VALIDATION` |
| PO-0B1-015 | TIMING-006 | APPROVE RECOMMENDED | `LOCKED` |

Product Owner approval does not lock calculation methodology. Any item marked `PENDING_EXPERT_VALIDATION` still requires expert evidence before implementation.

## Milestone 0D Expert Validation Package

Milestone 0D prepares the expert-review package for methodology decisions. It does not approve methodology, select an authoritative source, assign a reviewer, or fill Golden expected values.

| 0D Artifact | Purpose |
|---|---|
| `F8SYNC_EXPERT_VALIDATION_PACK_V1.md` | Consolidated expert-required decision inventory and review inputs. |
| `F8SYNC_METHODOLOGY_SOURCE_SELECTION_V1.md` | Matrix for choosing the authoritative source path. |
| `F8SYNC_EXPERT_REVIEW_QUESTIONNAIRE_V1.md` | Actionable questions tied to decision IDs. |
| `F8SYNC_RULE_APPROVAL_REGISTER_V1.md` | Blank expert approval table for draft rules. |
| `F8SYNC_GOLDEN_REFERENCE_WORKSHEETS_V1.md` | Blank Golden worksheets; expected values intentionally empty. |
| `F8SYNC_EXPERT_REVIEW_AND_CONFLICT_POLICY_V1.md` | Reviewer qualification and conflict handling policy. |
| `F8SYNC_0D_VALIDATION_GATE_REPORT.md` | Gate status before Milestone 1A or calculation implementation. |

Decisions marked `PENDING_EXPERT_VALIDATION` are now ready to be reviewed using the 0D package, but their status remains unchanged until expert evidence is recorded.

## Status Definitions

| Status | Meaning |
|---|---|
| LOCKED | Explicitly approved by repository evidence or current milestone directive. |
| PROPOSED | Recommended for V1 but still needs approval. |
| PENDING_PRODUCT_OWNER | Product/business decision needed from KT. |
| PENDING_EXPERT_VALIDATION | BaZi or calendar-methodology validation required. |
| DEFERRED_AFTER_V1 | Not required for first V1 deterministic implementation. |
| REJECTED | Explicitly not allowed. |
| UNKNOWN | No reliable repository evidence or recommendation yet. |

## Existing Methodology Extract

| Area | Current Repository Behavior | Classification |
|---|---|---|
| Birth input | `birthDate`, optional `birthTime`, `birthLocation`, and `birthTimezone` strings exist in `src/core/domain/types.ts` and schemas. | Partial implementation, not approved V1 methodology. |
| Unknown birth time | `src/plugins/bazi/index.ts` uses `birthTime ?? "12:00"` in its seed. | Placeholder behavior; violates Unknown Means Unknown if treated as real BaZi. |
| Calendar conversion | No solar-term, Li Chun, day-boundary, or true-solar-time resolver found. | Missing. |
| Timezone handling | Timezone strings are accepted; IANA validation and historical resolution are not present. | Partial implementation. |
| BaZi | `baziPlugin` returns stable hash scores and `DAY_STEM_MOCK` evidence. | Placeholder; no Four Pillars calculation. |
| Numerology | Active plugin uses digit sums and stable numbers. | Deferred expansion logic, not V1 BaZi core. |
| Timing | Active plugin uses `contextTime`, UTC hour, stable hash, and synthetic windows. | Placeholder; not BaZi/calendar-derived. |
| Aggregation | Confidence-weighted generic plugin score aggregation. | Useful foundation, not V1 evidence model. |
| Identity | V8 resolver maps generic score domains to five elements and archetypes. | Prototype; not approved BaZi-derived identity. |
| Archetypes | Four seed archetypes marked `approved` in code but commercial use is false and V1 rulebook is absent. | Product seed content; needs KT/cultural review before V1 authority. |
| AI interpretation | Guarded interpretation over aggregated result; no inspected AI path is calculation authority. | Directionally aligned; needs minimized V1 input and prompt/policy versioning. |
| Golden tests | No approved BaZi golden expected values found. | Missing; must not be fabricated. |
| Versioning | Plugin version and `calculationVersion` exist; no rule/input/evidence/confidence/trace version registry. | Partial. |

## Decision Records

| ID | Domain | Question | Current Repository Behavior | Existing Evidence | Options | Recommended V1 Option | Reason | Product Impact | Technical Impact | Data Migration Impact | Required Approver | Status | Blocking Level |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BIRTH-001 | Birth Input | Which birth date fields are required? | Requires `YYYY-MM-DD`. | `fortuneRequestSchema`, 0A docs. | Required date; optional date; fuzzy date. | Required Gregorian local date. | Needed for deterministic foundation. | Clear onboarding. | Input normalizer contract. | Add normalized input record later. | KT | PROPOSED | Blocks 0C |
| BIRTH-002 | Birth Input | Is birth time required? | Optional string or blank. | Schemas, UI form, PO-0B1-001. | Required; optional; unknown status. | Optional with explicit status. Supported statuses: `KNOWN`, `UNKNOWN`, `APPROXIMATE`, `DISPUTED`. | Supports users without known time. | Less form friction. | Add `birth_time_status`, unknown fields, confidence reasons, and partial output support. | Add status field later. | KT | LOCKED | Blocks 0C |
| BIRTH-003 | Birth Input | How is unknown birth time represented? | Blank or undefined; BaZi plugin falls back to noon. | `birthTime ?? "12:00"`, PO-0B1-001. | Blank; null; enum status. | Enum: `KNOWN`, `UNKNOWN`, `APPROXIMATE`, `DISPUTED`; never substitute `12:00` or fabricated time; no hour-dependent output unless time is sufficiently reliable. | Prevents fabricated hour output. | Better trust and disclosure. | Normalizer, validation, partial output, and hour-output suppression required. | Store unknown fields and assumptions. | KT | LOCKED | Blocks 0C |
| BIRTH-004 | Birth Input | Is birth location required? | Required free text. | Schemas, PO-0B1-002. | Required text; optional; structured place ID. | Birth location is optional but recommended in V1; confirmed IANA timezone is required; free-text location is not a trusted timezone resolver. | Reduces onboarding friction while preserving timezone reliability. | Clearer profile. | Contract must not depend on free-text location for trusted timezone resolution. | Add place metadata later only if needed. | KT | LOCKED | Blocks 0C |
| BIRTH-005 | Birth Input | What is the timezone source? | User-entered timezone string. | Schemas, form, PO-0B1-003. | User selected; location-derived; admin-entered. | User-confirmed IANA timezone. App may suggest, but must not silently guess; unresolved timezone blocks time-sensitive calculation with structured status. | Avoids silent guessing. | User must choose/confirm timezone. | IANA validation, source, confirmation, and unresolved status required. | Store source and version. | KT | LOCKED | Blocks 0C |
| BIRTH-006 | Birth Input | Are historical timezone changes supported? | Not implemented. | Gap analysis. | Ignore; use modern offset; use TZDB. | Require IANA/TZDB-backed historical handling. | Boundary cases need reproducibility. | More accurate trust story. | Calendar resolver required. | Store resolver version. | Expert + KT | PENDING_EXPERT_VALIDATION | Blocks 1A |
| BIRTH-007 | Birth Input | What precision is accepted? | Date and minute-level time. | `HH:mm` schemas. | Minute; second; approximate range. | Minute precision plus status. | Matches browser time input. | Simple UX. | Normalize to local civil minute. | Add precision metadata. | KT | PROPOSED | Blocks 0C |
| BIRTH-008 | Birth Input | How are invalid dates/times handled? | Schema rejects basic format. | Zod schemas. | Reject; coerce; warn. | Reject with structured validation errors. | Avoids hidden corrections. | Clear correction UI. | Error taxonomy required. | None. | KT | PROPOSED | Blocks 0C |
| BIRTH-009 | Birth Input | How are conflicting inputs handled? | No explicit conflict model. | Missing from code. | Reject; choose priority; ask user. | Block calculation until conflict resolved. | Prevents invisible assumptions. | User sees fix prompt. | Conflict validation required. | Store rejected trace optional. | KT | PENDING_PRODUCT_OWNER | Blocks 0C |
| TIME-001 | Calendar and Time | Is Gregorian calendar supported? | Uses ISO date strings. | Schemas. | Gregorian only; multi-calendar. | Gregorian local date in V1. | Keeps scope controlled. | Simple UX. | Calendar adapter can expand later. | Record calendar system. | KT | PROPOSED | Blocks 0C |
| TIME-002 | Calendar and Time | Who owns calendar conversion? | No owner. | Gap analysis. | App code; third-party lib; expert table. | V1 calendar resolver service behind versioned contract. | Traceable and replaceable. | Better support transparency. | Contract in 0C. | Store resolver version. | KT | PENDING_PRODUCT_OWNER | Blocks 0C |
| TIME-003 | Calendar and Time | Is IANA timezone required? | Free string accepted. | Schemas, PO-0B1-003. | Required; optional; inferred. | Required confirmed IANA timezone. | Needed for historical resolution. | Users choose timezone. | Validator plus confirmation state needed. | Store timezone ID. | KT | LOCKED | Blocks 0C |
| TIME-004 | Calendar and Time | Is local civil time the input basis? | Form collects local birth data. | UI and schemas. | Local civil; UTC instant; true solar. | Local civil time first, then resolver. | Matches user memory and documents. | Natural UX. | Normalization trace required. | Store local and resolved instant. | KT | PROPOSED | Blocks 0C |
| TIME-005 | Calendar and Time | What is the day rollover rule? | JavaScript date only; no BaZi day rule. | Missing. | Midnight; 23:00; other school. | Must be expert-validated before implementation. | Avoids wrong day pillar. | Boundary disclosure. | Rule registry required. | Store rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1B |
| TIME-006 | Calendar and Time | What happens at 23:00? | Not modeled. | Roadmap calls it out. | Same day; next day; methodology-specific. | Pending expert decision. | Important boundary cases. | Golden tests needed. | Rule branch in engine. | Store decision. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1B |
| TIME-007 | Calendar and Time | Is true solar time used? | Not implemented. | Gap analysis, PO-0B1-004. | Enabled; disabled; deferred. | Disabled in V1; use approved local civil time behavior; preserve versioned policy field for future support. | Reduces early complexity. | Simpler UX disclosure. | Contract records `true_solar_time_policy`; no correction logic in V1. | Store policy version. | KT | LOCKED | Blocks 0C |
| TIME-008 | Calendar and Time | How is daylight saving handled? | Not modeled. | Gap analysis. | Ignore; TZDB; user offset. | Use timezone database behavior. | Avoids manual offset errors. | Better trust. | Resolver dependency decision. | Store resolver version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1A |
| TIME-009 | Calendar and Time | How are timezone boundary cases tested? | Not present. | Golden test gap. | Unit only; golden fixtures; manual review. | Golden fixtures reviewed by expert. | Prevents regressions. | Visible QA. | Fixture format in 0B. | Store reviewed cases later. | Expert + KT | PENDING_EXPERT_VALIDATION | Blocks 1F |
| BAZI-001 | BaZi Foundation | What is the authoritative BaZi source? | None. | 0A audit, PO-0B1-012. | Named text/source; expert-owned rules; library. | Traditional BaZi is the V1 calculation foundation; F8SYNC Intelligence Layer is a deterministic product derivation above approved BaZi output. Source path, reviewer, boundary rules, and Golden references still require approval. | Foundation must be governed. | Trust anchor. | Product direction approved; calculation implementation remains blocked pending expert validation. | Store source references. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks 0C |
| BAZI-002 | BaZi Foundation | What is the year pillar boundary? | Not calculated. | Roadmap. | Lunar new year; Li Chun; other. | Pending expert validation. | Major output difference. | Boundary explanation needed. | Engine rule required. | Rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1B |
| BAZI-003 | BaZi Foundation | Is Li Chun used? | Not implemented. | Roadmap asks explicitly. | Yes; no; configurable. | Pending expert validation. | Affects year boundary. | Golden cases. | Solar-term service if yes. | Rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1B |
| BAZI-004 | BaZi Foundation | What is the month pillar boundary? | Not calculated. | Gap analysis. | Solar terms; lunar month; other. | Pending expert validation. | Core BaZi output. | Month-boundary disclosures. | Solar-term resolver likely. | Rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1B |
| BAZI-005 | BaZi Foundation | Who owns solar terms? | None. | Gap analysis. | Static table; algorithm; external ephemeris. | Versioned resolver with expert-reviewed reference. | Reproducible. | Boundary confidence. | Dependency decision needed. | Store resolver/version. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks 1A |
| BAZI-006 | BaZi Foundation | What day pillar algorithm/source is used? | Not implemented. | Code has only hash seed. | Formula; table; library. | Expert-approved source only. | Prevents fake results. | Trust-critical. | Engine blocked. | Store rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1B |
| BAZI-007 | BaZi Foundation | How is hour pillar calculated? | Not implemented; mock seed uses time. | BaZi plugin. | Known time only; approximate; omitted if unknown. | Known time only; unknown omits hour pillar. | Aligns Unknown Means Unknown. | Transparent incomplete result. | Partial output model. | Store unknown fields. | Expert + KT | PENDING_EXPERT_VALIDATION | Blocks 1B |
| BAZI-008 | BaZi Foundation | Are Heavenly Stems/Earthly Branches canonicalized? | No structured model. | Domain types missing. | English keys; Chinese chars; enum codes. | Stable enum codes plus localized labels. | Product and tests stay stable. | Types in 0C. | Store canonical codes. | KT + Expert | PROPOSED | Blocks 0C |
| BAZI-009 | BaZi Foundation | Are hidden stems in V1? | Not implemented. | Gap analysis, PO-0B1-013. | Include; defer; partial. | Do not expose hidden stems as user-facing MVP concepts unless an expert determines they are required for approved core derivation. | Affects balance and Ten Gods. | Keeps MVP understandable while preserving internal evidence path. | Contract may allow internal evidence later without committing UI exposure. | Store coverage. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks 1C |
| BAZI-010 | BaZi Foundation | Are Ten Gods in V1? | Not implemented. | Roadmap mentions relationships broadly, PO-0B1-013. | Include; defer; minimal. | Do not expose Ten Gods as user-facing MVP concepts unless an expert determines they are required for approved core derivation. | Reduces scope. | Avoids premature advanced terminology. | Keep optional internal contract only if expert requires it. | None now. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks identity depth |
| BAZI-011 | BaZi Foundation | How is Day Master treated? | Not implemented. | Roadmap. | Core; deferred; hidden. | Core BaZi output after expert validation. | Needed for identity. | Deeper profile. | Engine output required. | Store output version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1D |
| BAZI-012 | BaZi Foundation | How is seasonal strength treated? | Not implemented. | Roadmap. | Include; defer; simplified. | Include only after expert-reviewed rule. | Avoids invented weights. | Better confidence. | Evidence model needed. | Rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1C |
| BAZI-013 | BaZi Foundation | What is excluded from V1? | Expansion systems documented. | Roadmap, 0A, PO-0B1-010. | Include all; defer expansion. | Exclude non-BaZi engines from V1 core. | Scope control. | Clear roadmap. | Feature flags/catalog update later. | None. | KT | LOCKED | None |
| ELEM-001 | Element Balance | Which elements are included? | Five elements exist in identity types. | `FiveElement` type. | Five elements; add yin/yang; branches only. | Five elements as V1 base. | Familiar and product-ready. | Element UI possible. | Contract needs canonical codes. | Store output. | KT + Expert | PROPOSED | Blocks 0C |
| ELEM-002 | Element Balance | What weighting model is used? | Generic score-domain average. | Identity resolver. | Equal; visible-weighted; hidden/seasonal weighted. | Pending expert validation. | Prevents misleading balance. | Insight quality. | Calculation blocked. | Store rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1C |
| ELEM-003 | Element Balance | Are visible stems weighted? | Not modeled. | Missing. | Yes/no/weighted. | Pending expert validation. | Affects balance. | Explainable evidence. | Engine rule. | Rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1C |
| ELEM-004 | Element Balance | Are branches and hidden stems weighted? | Not modeled. | Missing. | Include; defer; no. | Pending expert validation. | Affects balance. | Confidence disclosure. | Engine rule. | Rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1C |
| ELEM-005 | Element Balance | Is seasonal adjustment included? | Not modeled. | Roadmap. | Include; defer. | Pending expert validation. | Core methodology difference. | Better trust if reviewed. | Resolver and evidence needed. | Rule version. | Expert | PENDING_EXPERT_VALIDATION | Blocks 1C |
| ELEM-006 | Element Balance | How are scores normalized? | Generic 0-100 scores. | Current types, PO-0B1-014. | Percent; raw weights; rank only. | Present normalized five-element balance with confidence after expert-approved weighting exists. | Product-friendly and auditable. | UI can show balance. | Output shape can be designed; numeric method still waits for expert validation. | Store raw and normalized. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks 0C |
| ELEM-007 | Element Balance | How is missing element interpreted? | Not modeled. | Missing, PO-0B1-014. | Narrative; caution; no claim. | Plain-language reflection only; avoid deterministic claims about missing elements. | Avoids overclaiming. | Safer copy. | Narrative token contract can be designed; final content follows approved model. | None. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks V1 copy |
| ELEM-008 | Element Balance | How does unknown time affect confidence? | Current confidence static. | Plugins. | No effect; lower confidence; partial unavailable. | Lower confidence and mark hour-derived fields unknown. | Honest incomplete results. | User trust. | Confidence model. | Store unknown cause. | KT + Expert | PROPOSED | Blocks 0C |
| INTEL-001 | F8SYNC Layer | What is the input contract from BaZi? | None. | Roadmap only. | Raw plugin result; Four Pillars object; aggregate score. | Approved structured BaZi output only. | Separates foundation from product layer. | Stable product. | 0C contract. | Store references. | KT | PROPOSED | Blocks 0C |
| INTEL-002 | F8SYNC Layer | Which identity dimensions are V1? | V8 traits exist. | Identity types, PO-0B1-005. | Current traits; BaZi-derived dimensions; defer. | V1 may expose element balance, identity orientation, strength/tension summary, confidence, and unknown-field disclosure; advanced methodology terminology is not user-facing in MVP unless later approved. | Avoids code-driven identity. | Gives V1 a focused identity experience. | Dimension slots can be designed; derivation rules still require expert validation. | Store version. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks 1D |
| INTEL-003 | F8SYNC Layer | How are strength indicators derived? | Generic scores. | Aggregator. | BaZi strength; product score; omit. | Pending expert-backed evidence model. | Avoids fake precision. | Insight quality. | Rules required. | Store evidence. | Expert + KT | PENDING_EXPERT_VALIDATION | Blocks 1C |
| INTEL-004 | F8SYNC Layer | How are tension indicators derived? | Conflicts from score spread/timing overlap. | Aggregator. | Keep generic; BaZi relationships; defer. | Proposed: V1 tension must reference approved evidence codes. | Traceable cautions. | More specific guidance. | Evidence codes. | Store codes. | KT + Expert | PROPOSED | Blocks 0C |
| INTEL-005 | F8SYNC Layer | How is primary archetype derived? | Ranked from aggregate scores and seed archetypes. | Identity resolver, PO-0B1-006. | Keep; BaZi-derived matrix; manual. | Show one primary archetype only when approved evidence and confidence are sufficient; never force an archetype. | Core differentiator. | Main identity reveal. | Contract needs primary role, confidence, evidence, and unavailable states; derivation rules still require validation. | Store mapping version. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks 1D |
| INTEL-006 | F8SYNC Layer | How is secondary influence derived? | Next two ranked archetypes. | Identity resolver, PO-0B1-006. | Next rank; threshold; no secondary. | Show optional secondary influence only when approved confidence threshold is met. | Better clarity. | Contract + tests. | Contract needs secondary role and threshold metadata; threshold belongs in deterministic rules. | Store ranking evidence. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks 1D |
| INTEL-007 | F8SYNC Layer | What is tie-breaking policy? | Sort by score then code. | Identity resolver. | Lexical; confidence; no tie. | Deterministic stable tie-break with disclosure. | Reproducible. | Testable. | Rule version. | Store tie evidence. | KT | PROPOSED | Blocks 0C |
| INTEL-008 | F8SYNC Layer | What happens at low confidence? | Identity returns incomplete only if no scores. | Identity resolver, PO-0B1-006. | Hide; show partial; ask for data. | Support `PARTIAL`, `INCOMPLETE`, and `UNAVAILABLE`; never force output when evidence or input is insufficient. | Honest UX. | Honest incomplete states. | Result-state contract required; confidence thresholds belong in deterministic rules, not UI logic. | Store confidence. | KT + Expert | PENDING_EXPERT_VALIDATION | Blocks 1D |
| INTEL-009 | F8SYNC Layer | What evidence codes are required? | Mock codes exist. | Plugins. | Free text; coded hierarchy; none. | Versioned coded evidence hierarchy. | Auditability. | Evidence model. | Store evidence version. | KT + Expert | PROPOSED | Blocks 0C |
| INTEL-010 | F8SYNC Layer | Are narrative tokens deterministic? | Current AI uses raw aggregate. | AI types. | AI free text; deterministic tokens; copy keys. | Deterministic narrative tokens before AI. | Keeps AI bounded. | Product copy control. | Token contract. | Store token version. | KT | PROPOSED | Blocks 0C |
| TIMING-001 | Daily Timing | What input drives daily timing? | Current context time and timezone hash. | Timing plugin. | BaZi output; calendar only; aggregate. | BaZi/calendar-derived only after methodology approval. | Daily value should be core product. | Timing UI credibility. | Engine blocked. | Store timing version. | Expert + KT | PENDING_EXPERT_VALIDATION | Blocks 1E |
| TIMING-002 | Daily Timing | What is the daily calculation unit? | Synthetic windows relative to now. | Timing plugin. | Local day; rolling 24h; hourly windows. | User-local civil day with approved transition rule. | Matches calendar UX. | Calendar generation. | Store local date. | KT + Expert | PROPOSED | Blocks 0C |
| TIMING-003 | Daily Timing | Which timezone is used for daily timing? | `contextTimezone` string. | Domain types. | User profile; device; birth timezone. | User current IANA timezone for daily timing. | Practical notifications. | Timezone validation. | Store calculation timezone. | KT | PENDING_PRODUCT_OWNER | Blocks 0C |
| TIMING-004 | Daily Timing | Classification labels? | `optimal`, `supportive`, `neutral`, `caution`, `avoid`. | Types and UI. | Keep; simplify; rename. | V1 product labels: good, neutral, caution mapped to internal enum. | Reduces fear-based language. | UI copy update later. | None. | KT | PROPOSED | Blocks copy |
| TIMING-005 | Daily Timing | Notification eligibility? | Notification engine pending. | Tracking. | All timings; high confidence only; none. | High-confidence, non-fear-based only after timing engine. | Safer retention. | Scheduler rules later. | Store eligibility. | KT | PENDING_PRODUCT_OWNER | Blocks notifications |
| TIMING-006 | Daily Timing | Cached result behavior? | Not modeled. | Missing, PO-0B1-015. | Recalculate; cache by day/version; no cache. | Use deterministic cache keys including profile, local date, timezone, engine version, and rule version; refresh when any key changes. | Consistent day view. | Storage and invalidation. | Contract preserves key fields; physical cache implementation is later technical work. | Add table later. | KT | LOCKED | Blocks 1E |
| COMPAT-001 | Compatibility | Is compatibility required for first engine? | Query type exists; roadmap says later. | Roadmap and code. | Build now; defer; remove. | Defer first V1 engine implementation. | Protects scope. | Keep feature gated/legacy. | Label legacy if returned. | KT | LOCKED | None |
| COMPAT-002 | Compatibility | What inputs are required later? | Target text only. | Domain types. | Two profiles; target text; event. | Two normalized profiles for person compatibility; target text not V1 BaZi compatibility. | Avoids fake matching. | Future UX change. | New model later. | KT + Expert | DEFERRED_AFTER_V1 | None |
| COMPAT-003 | Compatibility | What must not be implemented yet? | Placeholder plugins support it. | Catalog and plugins. | Real compatibility now; placeholder only. | No new compatibility methodology until core is approved. | Scope control. | Feature flag later. | None. | KT | LOCKED | None |
| AI-001 | AI Boundary | May AI calculate deterministic results? | No inspected path uses AI for calculation. | Roadmap, 0A, PO-0B1-012. | Yes; no. | No. AI explains only and F8SYNC Intelligence Layer remains deterministic above approved BaZi output. | Trust-critical. | AI remains downstream. | Audit links later. | KT | LOCKED | None |
| AI-002 | AI Boundary | What input may AI receive? | Full aggregate result. | Interpretation API, PO-0B1-008, PO-0B1-009. | Raw result; minimized object; narrative tokens. | Minimized structured outputs: evidence, confidence, unknown fields, allowed topics, engine version, rule version, and policy version. Avoid raw birth date, time, and location wherever possible. | Data minimization. | Privacy and consistency. | New approved AI input object and audit boundary required in 0C/2D. | Store policy version. | KT | LOCKED | Blocks 0C |
| VER-001 | Versioning | What versions are required? | Plugin/calculation versions only. | Types, PO-0B1-009, PO-0B1-011. | Plugin only; full registry. | Use input/rule/engine/evidence/confidence/policy/prompt/model/trace versions; log privacy-safe AI audit metadata; label old results as `LEGACY`, `PLACEHOLDER`, or `PRE_V1`. | Reproducibility. | Historical disclosure and auditability. | Contract requires version references, legacy status, trace reference, and privacy-safe audit fields. | Additive schema later. | KT | LOCKED | Blocks 0C |
| GOLD-001 | Golden Tests | Can expected BaZi values be filled now? | None found. | Roadmap, PO-0B1-012. | Fill manually; leave blank; use AI. | Leave blank until expert-approved reference exists. | Avoids fabrication. | Fixture skeleton only. | Store review metadata later. | KT + Expert | LOCKED | None |
| EXP-001 | Expansion | Are numerology/Thai/Western/Tarot in V1 core? | Catalog includes them, some active. | Catalog, roadmap, PO-0B1-010. | Include; defer. | Defer numerology expansion, Thai astrology, Western astrology, Tarot/random draw from V1 core; retain in expansion backlog. | Avoids methodology overload. | Catalog reclassification later. | 0C should not design active contracts for these as V1 core engines. | None. | KT | LOCKED | None |
| EXP-002 | Expansion | Are random draw and physical products part of 0B/0C? | V8 docs only. | V8 docs, roadmap, PO-0B1-010. | Build now; defer. | Defer physical products, 3D/AR, and broad sacred-object commerce from V1 core; retain in expansion backlog. | Scope control. | No code changes. | No active 0C core contracts. | None. | KT | LOCKED | None |
| EXP-003 | Expansion | Is palmistry in V1? | Docs only. | Roadmap, PO-0B1-010. | Include; research. | Defer palmistry from V1 core; retain as later research/expansion. | Input quality risk. | None now. | No active 0C core contract. | None. | KT | LOCKED | None |

## Blocking Milestone 0C Decisions

Milestone 0C contract design has completed. The remaining blockers below now apply to expert validation, Milestone 1A preparation, and future deterministic calculation implementation:

- V1 normalized birth input fields and unknown representation.
- IANA timezone requirement and calendar resolver ownership.
- V1 version metadata set.
- BaZi input and output contract boundaries.
- Evidence/confidence model scope.
- F8SYNC Intelligence Layer outputs authorized for contract design.
- AI allowed-input boundary.

Expert validation can continue using the 0D package only if the contracts preserve unknown and pending fields without encoding unapproved calculations.
