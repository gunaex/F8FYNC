# F8SYNC Expert Review and Conflict Policy V1

**Milestone:** 0D - Expert Validation Pack and Methodology Source Gate
**Date:** 2026-06-17
**Status:** Draft policy for 0D review package

## Minimum Reviewer Expectations

A reviewer should have:

- Demonstrated BaZi methodology competence.
- Ability to explain calculation sources and school/variation.
- Ability to validate year, month, day, 23:00, hour, timezone, and historical boundary cases.
- Ability to distinguish BaZi methodology from F8SYNC product interpretation.
- Willingness to record corrections, source evidence, and rule versions.
- No reliance solely on generative AI for methodology evidence.
- Disclosure of conflicts between sources.
- Disclosure of personal, commercial, or source-affiliation conflicts.

## Evidence Requirements

Expert answers should include:

- Source title/name and owner.
- Edition/version/date where available.
- Page, section, table, software version, data version, or equivalent reference.
- Whether the answer is from a primary source, expert synthesis, or independent reference comparison.
- Known disagreement among schools or sources.
- Reproducible example or boundary case where possible.

## Disagreement Between Experts

If two experts disagree:

1. Record both answers in the rule approval register.
2. Identify the exact rule, boundary case, or source conflict.
3. Require each expert to provide evidence/citation.
4. Run or prepare the affected Golden worksheets without filling final expected values.
5. KT may choose a product direction only after methodology risk is documented.
6. If the conflict affects core correctness, defer the rule from V1 or appoint a tie-break reviewer.

## Source Conflict With Product Direction

If a source conflicts with a locked Product Owner decision:

1. Do not silently override the Product Owner decision.
2. Record the conflict in the rule approval register.
3. Mark the affected rule `INSUFFICIENT_EVIDENCE`, `APPROVED_WITH_CORRECTION`, or `DEFERRED`.
4. Ask KT whether to revise product direction, select another source, or defer the feature.
5. Do not implement the affected calculation until both methodology and product direction align.

## Insufficient Evidence

If a rule has insufficient evidence:

- Leave expert answer fields blank or mark the rule `INSUFFICIENT_EVIDENCE`.
- Keep implementation status blocked.
- Do not infer missing values from current code, AI, or convenience libraries.
- Add a required evidence item to the validation gate report.

## Non-Reproducible Calculation

If a calculation cannot be reproduced:

- Do not approve the rule or Golden case.
- Record source, input, timezone, resolver version, and observed mismatch.
- Require an independent reference or corrected source path.
- Keep the affected Golden worksheet pending.

## Deferred From V1

A decision may be deferred from V1 when:

- It is not required for the first deterministic engine.
- It cannot be validated with available evidence.
- It creates source conflict or user-experience risk.
- KT accepts the reduced V1 scope.

Deferred items must remain explicit in the decision register and must not be hidden behind placeholder outputs.
