# F8SYNC Project Handover

**Date:** 2026-06-28  
**Branch:** `main`  
**Current committed HEAD:** `77f0f26` — `feat: add tarot core deck and image mapping`  
**Remote status at handover time:** `origin/main` points to `77f0f26`  
**Primary local test URL:** `http://localhost:3001/th`  

This is a single-file handover for continuing the F8SYNC project. It separates the committed baseline from local uncommitted work so the next agent can continue safely without overwriting user changes.

---

## 1. Project Summary

F8SYNC is a multilingual Next.js application for personal timing, BaZi-based structural analysis, subscription packaging, and original tarot-based reflective readings.

The current strategy remains:

- Keep the existing platform foundation.
- Continue incremental migration.
- Treat deterministic methodology as gated and evidence-based.
- Do not fabricate BaZi methodology, Golden Reference values, or expert approvals.
- Keep user-facing language advisory, not absolute prediction or guaranteed outcome language.

Current implemented product areas:

- Birth input and timezone foundation.
- Production solar-term provider and Four Pillars foundation.
- BaZi structure, element distribution, identity archetype, and daily timing.
- F8SYNC dashboard UI with archetype art, detail views, pillar details, element balance, and partial/disputed states.
- Subscription packaging and coupon trial UX.
- Original tarot core deck with image mapping.
- Local tarot meaning integration and UI work are present locally but not yet committed.

---

## 2. Git Baseline

### Current Branch

```text
main
```

### Current HEAD

```text
77f0f26 feat: add tarot core deck and image mapping
```

### Recent Commits

```text
77f0f26 feat: add tarot core deck and image mapping
5a2aa31 feat: refine analysis UI and subscription packaging
27df2b9 feat: remediate production solar-term provider
f6eae6d feat: update archetype descriptions to V2
d6e74da feat: add archetype detail images
9eda603 feat: implement F8SYNC dashboard UI components
afcaa44 docs: add UI brief v2.1 and archetype image prompts
f54ff09 feat: implement gate 1F daily timing
b3b7e2b feat: implement gate 1E identity layer
e703730 feat: implement gate 1D bazi structure and element foundation
adfe618 docs: correct GR-06 day pillar to 戊寅 Wu Yin per MR-04 anchor verification
9bfbe17 feat: implement gate 1C four pillars foundation
```

### Milestone Tags Present

```text
milestone-0a-repository-audit
milestone-0b-methodology-decision-pack
milestone-0b1-product-owner-decision-lock
milestone-0c-intelligence-contracts
milestone-0d-expert-validation-pack
milestone-1a-birth-input-foundation
milestone-0d1-methodology-authority-resolution
milestone-0d2-methodology-rules-mr01-mr05
milestone-0d3-golden-reference-candidates
milestone-0d4-golden-references-evidence-log
milestone-0d5-methodology-rules-mr06-mr10
milestone-1b-calendar-foundation
milestone-1c-four-pillars-foundation
milestone-1d-bazi-structure-elements
milestone-1e-identity-layer
milestone-1f-daily-timing
milestone-ui-brief-v2
milestone-ui-dashboard
milestone-ui-archetype-images
milestone-archetype-v2
milestone-1b1-production-solar-term-remediation
```

### Most Recent Tagged Methodology Milestone

```text
milestone-1b1-production-solar-term-remediation
```

This tag targets commit:

```text
27df2b9 feat: remediate production solar-term provider
```

---

## 3. Working Tree Warning

The working tree is not clean. Some changes are known product work, some are pre-existing or unrelated. Do not use:

```text
git add .
git add -A
git reset --hard
git checkout -- .
git stash
```

Always stage exact paths only after reviewing diffs.

### Current Modified Paths

```text
.env.example
PROJECT_TRACKING.md
README.md
src/app/[locale]/analysis-workspace.tsx
src/app/globals.css
src/config/feature-flags.ts
src/core/index.ts
src/core/tarot/draw.ts
src/core/tarot/index.ts
src/core/tarot/types.ts
src/i18n/dictionaries/en.json
src/i18n/dictionaries/th.json
src/i18n/dictionaries/zh-CN.json
src/ui/components/index.ts
tests/unit/tarot-core.test.ts
```

### Current Untracked Paths

```text
.DS_Store
docs/architecture/
docs/product/F8SYNC_EVIDENCE_BASED_BAZI_IMPLEMENTATION_PACK_V1.md
docs/product/F8SYNC_V8_ART_DIRECTION_BIBLE.md
docs/product/F8SYNC_V8_CARD_TAXONOMY.md
docs/product/F8SYNC_V8_MASTER_BLUEPRINT.md
docs/product/F8SYNC_V8_NAMING_BIBLE.md
docs/product/F8SYNC_V8_PHYSICAL_PRODUCT_GUIDE.md
docs/product/F8SYNC_V8_RANDOM_DRAW_POLICY.md
docs/testing/
public/.DS_Store
public/tarot/tarot_full_meaning.pdf
src/app/api/tarot/
src/core/identity/
src/core/tarot/meanings.json
src/core/tarot/meanings.ts
src/ui/components/tarot-draw-panel.tsx
tests/unit/identity.test.ts
```

### Known Unrelated / Pre-Existing Dirty Paths

Treat these as unrelated unless the user explicitly asks otherwise:

```text
.env.example
PROJECT_TRACKING.md
README.md
src/config/feature-flags.ts
src/core/index.ts
docs/architecture/
docs/product/F8SYNC_V8_*
docs/testing/
src/core/identity/
tests/unit/identity.test.ts
.DS_Store
public/.DS_Store
```

---

## 4. Current Local Uncommitted Product Work

The following local changes are present and should be preserved.

### 4.1 Tarot API and UI Work

Uncommitted files include:

```text
src/app/api/tarot/draw/route.ts
src/ui/components/tarot-draw-panel.tsx
src/ui/components/index.ts
src/app/[locale]/analysis-workspace.tsx
src/app/globals.css
src/i18n/dictionaries/th.json
src/i18n/dictionaries/en.json
src/i18n/dictionaries/zh-CN.json
```

Implemented locally:

- `POST /api/tarot/draw`.
- Tarot draw panel with one-card and three-card spreads.
- Optional reversed cards.
- Audit receipt display.
- Thai, English, and Simplified Chinese labels.
- A `BaZi | Tarot` mode switch.
- In BaZi mode, after pressing `เริ่มวิเคราะห์`, the app automatically draws one tarot card as a companion bento card.
- The companion card shows image, visual title, standard name, orientation, and general meaning.
- Tarot failures are isolated and should not break BaZi results.

### 4.2 Tarot Meaning Work

Uncommitted files include:

```text
src/core/tarot/meanings.json
src/core/tarot/meanings.ts
src/core/tarot/types.ts
src/core/tarot/draw.ts
src/core/tarot/index.ts
tests/unit/tarot-core.test.ts
```

Implemented locally:

- Complete 78-card Thai tarot meanings.
- Each card has:
  - `upright.general`
  - `upright.love`
  - `upright.work`
  - `upright.money`
  - `reversed.general`
  - `reversed.love`
  - `reversed.work`
  - `reversed.money`
- Drawn cards now include a `meaning` object.
- Tests verify deck completeness, meaning completeness, no citation residue, and draw output meaning presence.

### 4.3 Latest Local Verification

After adding the BaZi companion tarot card, the following checks passed locally:

```text
node JSON parse check for dictionaries and tarot meanings: passed
pnpm typecheck: passed
pnpm test tests/unit/tarot-core.test.ts: 7 passed
pnpm test: 111 passed
pnpm build: passed
git diff --check: passed
```

### 4.4 Dev Server Cache Incident

After `pnpm build`, the Next.js dev server hit missing chunk errors such as:

```text
Cannot find module './3047.js'
Cannot find module './vendor-chunks/zod@3.25.76.js'
ENOENT .next/server/pages/_document.js
```

The fix was:

```text
Stop dev server
rm -rf .next
pnpm dev --port 3001
```

The server then responded:

```text
GET /th 200
```

Current recommended local URL:

```text
http://localhost:3001/th
```

---

## 5. Core Architecture Map

### 5.1 Next.js App

Important app routes:

```text
src/app/[locale]/page.tsx
src/app/[locale]/analysis-workspace.tsx
src/app/[locale]/analysis/page.tsx
src/app/[locale]/boost/page.tsx
src/app/[locale]/pricing/page.tsx
src/app/[locale]/account/
src/app/[locale]/history/
src/app/[locale]/timeline/
```

Important API routes:

```text
src/app/api/fortune/route.ts
src/app/api/interpretation/route.ts
src/app/api/tarot/draw/route.ts
src/app/api/auth/
src/app/api/birth-profiles/
src/app/api/coupons/
src/app/api/subscription/
src/app/api/history/
src/app/api/usage/
```

### 5.2 Deterministic Engine

Core BaZi and timing engine files:

```text
src/core/engine/calendar.ts
src/core/engine/solar-term-provider.ts
src/core/engine/solar-term-types.ts
src/core/engine/ephemeris.ts
src/core/engine/stems-branches.ts
src/core/engine/pillars.ts
src/core/engine/hidden-stems.ts
src/core/engine/ten-gods.ts
src/core/engine/elements.ts
src/core/engine/identity.ts
src/core/engine/daily-timing.ts
```

Important constraints:

- Unknown birth time must remain unknown.
- Never replace unknown time with `12:00`.
- True Solar Time is unsupported in V1 unless a future approved rule changes this.
- Production calendar must not fall back silently to Golden fixtures.
- Commercial calculators must not be copied, scraped, or called.

### 5.3 Production Solar-Term Provider

Milestone 1B.1 implemented:

- `SolarTermProvider` interface.
- `ProductionSolarTermProvider`.
- `GoldenFixtureSolarTermProvider` only for test/regression isolation.
- Versioned local dataset.

Dataset runtime paths:

```text
data/solar-terms/solar-terms-1899-2101.v1.json
data/solar-terms/manifest.json
```

Dataset details:

```text
Coverage buffer: 1899 through 2101
Supported birth years: 1900 through 2100
Records: 4,872
Terms per year: 24
Generation dependency: astronomy-engine@2.1.19
Runtime external service dependency: none
```

Checksum semantics:

```text
Manifest checksum:
7ee6cceacac7de2c2411171c7f7fc4dc35986e7004a296b4776629072355d90c

Meaning:
sha256(stable-json-canonical-dataset-payload)

Complete dataset file SHA-256:
bd008cc9cdd03ec7192f90bf88273d3fe5f6fae82c07a10f70e7a94debb39a1c
```

### 5.4 Intelligence Contracts

Important contract files:

```text
src/core/intelligence/contracts/types.ts
src/core/intelligence/contracts/index.ts
src/core/intelligence/adapters/ai-interpretation-input.ts
src/core/intelligence/adapters/legacy-fortune-adapter.ts
src/core/intelligence/validation/birth-input.ts
```

Safety boundary:

- AI interpretation input must exclude raw birth data by contract.
- AI may explain approved outputs, not calculate BaZi.
- Unknown or partial states must be disclosed.

### 5.5 Tarot Core

Committed tarot core at `77f0f26` includes:

```text
src/core/tarot/deck.ts
src/core/tarot/draw.ts
src/core/tarot/random.ts
src/core/tarot/types.ts
src/core/tarot/index.ts
public/tarot/
```

Local uncommitted additions include:

```text
src/core/tarot/meanings.json
src/core/tarot/meanings.ts
src/app/api/tarot/draw/route.ts
src/ui/components/tarot-draw-panel.tsx
```

Tarot engine behavior:

- Standard 78-card deck.
- Original visual theme: galactic wuxia.
- Secure random source uses `node:crypto` by default.
- Deterministic test random source is available for tests.
- Draw receipt includes audit hash.
- Tarot is random reflection only and does not modify deterministic fortune output.

---

## 6. UI State

Main workspace:

```text
src/app/[locale]/analysis-workspace.tsx
```

Important UI components:

```text
src/ui/components/birth-profile-form.tsx
src/ui/components/archetype-card.tsx
src/ui/components/archetype-detail-view.tsx
src/ui/components/four-pillars-row.tsx
src/ui/components/pillar-detail-sheet.tsx
src/ui/components/element-balance.tsx
src/ui/components/daily-timing-card.tsx
src/ui/components/partial-banner.tsx
src/ui/components/tarot-draw-panel.tsx
src/ui/components/commercial.tsx
src/ui/components/coupon-redeem.tsx
```

Current user-visible structure:

- Top-level nav:
  - ดูดวง
  - เสริมดวง
  - ไทม์ไลน์
  - บัญชี
- Fortune page:
  - `BaZi` mode.
  - `Tarot` mode.
- BaZi form:
  - Calendar-based date input.
  - Time input optional; blank means unknown birth time.
  - Birth timezone confirmation.
  - Current timezone.
  - Query type and target metadata.
- BaZi result:
  - Archetype card.
  - Four pillars.
  - Element balance.
  - Daily timing card.
  - Score and system source cards.
  - Recommendations, warnings, conflicts, timeline, disclaimer.
  - Local uncommitted companion tarot card after analysis.

UI caution:

- The user previously reported uneven bento layout.
- The companion tarot card was added to fill part of this gap.
- Continue refining layout visually in browser, not only by tests.

---

## 7. Product and Subscription Notes

Current monetization direction from user:

- Monthly subscription: `49 THB/month`.
- Cancel any time.
- Yearly package: 20 percent discount.
- Free trial coupons:
  - `FREE_1_WEEK`
  - `FREE_1_MONTH`
- Locked premium functions should appear disabled/gray, with localized subscription message.

Current navigation product buckets:

- `ดูดวง` — fortune tools, BaZi, tarot, and future deterministic systems.
- `เสริมดวง` — premium add-ons and products for sale.
- `ไทม์ไลน์` — user history/reference timeline. User has concerns that this may expose calculation quality too directly; treat carefully.
- `บัญชี` — subscription, user management, password/account linkage.

Suggested future product buckets:

- Reports or PDF readings.
- Saved readings.
- Personal profiles.
- Tarot spreads and daily card.
- Approved remedial/boost products only after product policy is clear.

---

## 8. Methodology and Product Documents

Important documents under `docs/product/`:

```text
F8SYNC_REVISED_IMPLEMENTATION_ROADMAP_V1_1.md
F8SYNC_MILESTONE_0A_REPOSITORY_AUDIT.md
F8SYNC_CURRENT_FEATURE_CLASSIFICATION.md
F8SYNC_ROADMAP_GAP_ANALYSIS_V1.md
F8SYNC_INCREMENTAL_MIGRATION_PLAN_V1.md
F8SYNC_METHODOLOGY_DECISION_REGISTER_V1.md
F8SYNC_IMPLEMENTATION_READINESS_MATRIX_V1.md
F8SYNC_INTELLIGENCE_CONTRACTS_V1.md
F8SYNC_CODEX_IMPLEMENTATION_BRIEF_V1.md
F8SYNC_CODEX_UI_BRIEF_V2.md
F8SYNC_ARCHETYPE_DESCRIPTIONS_V2.md
F8SYNC_EVIDENCE_BASED_BAZI_IMPLEMENTATION_PACK_V1.md
F8SYNC_1B1_PRODUCTION_SOLAR_TERM_REMEDIATION.md
F8SYNC_1B1_REGRESSION_IMPACT_REPORT.md
```

Methodology rule packages:

```text
F8SYNC_MR01_CALENDAR_TIMEZONE_AUTHORITY.md
F8SYNC_MR02_YEAR_BOUNDARY_LI_CHUN.md
F8SYNC_MR03_SOLAR_TERM_MONTH_BOUNDARY.md
F8SYNC_MR04_DAY_PILLAR_ROLLOVER.md
F8SYNC_MR05_HOUR_PILLAR_UNKNOWN_TIME.md
F8SYNC_MR06_HIDDEN_STEMS_TEN_GODS.md
F8SYNC_MR07_DAY_MASTER_SEASONAL_STRENGTH.md
F8SYNC_MR08_ELEMENT_WEIGHTING.md
F8SYNC_MR09_IDENTITY_DIMENSIONS.md
F8SYNC_MR10_DAILY_TIMING.md
F8SYNC_MR11_GOLDEN_REFERENCES.md
```

Important note:

`docs/product/F8SYNC_EVIDENCE_BASED_BAZI_IMPLEMENTATION_PACK_V1.md` is untracked locally at handover time but user identified it as an approved methodology and implementation baseline for calendar, solar-term, and foundational Four Pillars work.

---

## 9. Testing and Development Commands

Use pnpm:

```text
pnpm dev --port 3001
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Useful focused tests:

```text
pnpm test tests/unit/solar-term-provider.test.ts
pnpm test tests/unit/calendar.test.ts
pnpm test tests/unit/pillars.test.ts
pnpm test tests/unit/elements.test.ts
pnpm test tests/unit/identity-engine.test.ts
pnpm test tests/unit/daily-timing.test.ts
pnpm test tests/unit/tarot-core.test.ts
```

If the dev server shows missing chunk errors:

```text
Stop dev server
rm -rf .next
pnpm dev --port 3001
```

Do not treat `.next` as source. It is generated.

---

## 10. Last Known Verification Results

Committed baseline plus current local work verified most recently with:

```text
pnpm typecheck
pnpm test
pnpm build
git diff --check
```

Observed results:

```text
Typecheck: passed
Full tests: 111 passed
Build: passed
Diff check: passed
```

The dev server was confirmed responding:

```text
GET http://localhost:3001/th -> 200
```

---

## 11. Immediate Recommended Next Actions

### A. Retest Current UI in Browser

Use:

```text
http://localhost:3001/th
```

Manual checks:

- BaZi mode still shows the original BaZi result.
- Date picker works.
- Leaving birth time blank results in partial output, not a fake default time.
- Entering birth time produces full Four Pillars where supported.
- Pressing `เริ่มวิเคราะห์` draws one tarot companion card.
- Tarot companion card has image and Thai meaning.
- Tarot tab allows one-card and three-card draws.
- Navigation routes do not show stale `.next` runtime errors.

### B. Decide Whether to Commit Current Tarot UI and Meaning Work

Before committing, review and stage exact paths only. Candidate product-work paths:

```text
src/app/api/tarot/draw/route.ts
src/app/[locale]/analysis-workspace.tsx
src/app/globals.css
src/core/tarot/draw.ts
src/core/tarot/index.ts
src/core/tarot/types.ts
src/core/tarot/meanings.json
src/core/tarot/meanings.ts
src/i18n/dictionaries/en.json
src/i18n/dictionaries/th.json
src/i18n/dictionaries/zh-CN.json
src/ui/components/index.ts
src/ui/components/tarot-draw-panel.tsx
tests/unit/tarot-core.test.ts
```

Do not include unrelated paths unless reviewed and intended.

Suggested commit message if the diff is clean and scoped:

```text
feat: add tarot draw UI and companion card meanings
```

Suggested tag only after user approval:

```text
milestone-tarot-ui-meanings
```

### C. Product Design Follow-up

Refine bento layout after seeing real UI:

- Reduce empty cards.
- Balance card heights in the center/right columns.
- Make premium locked state visually disabled and localized.
- Consider moving long score/timeline cards below the primary dashboard.
- Keep BaZi and Tarot as parallel reading modes, with companion tarot as a small add-on card.

### D. Fortune Logic Follow-up

Current future-oriented output is still mostly advisory timing and deterministic structure. To build stronger future-teller logic, create a separate approved methodology pack for:

- Forecast horizon.
- Luck cycle or transit model, if any.
- What inputs are allowed.
- What outputs are safe.
- What language is prohibited.
- Golden references and regression tests.

Do not improvise future prediction logic directly in UI.

---

## 12. Safety Rules for Next Agent

Follow these rules unless the user explicitly changes direction:

- Do not overwrite unrelated dirty files.
- Do not stage everything.
- Do not modify `src/core/engine/` unless the active task explicitly authorizes engine work.
- Do not copy, scrape, or call commercial calculators.
- Do not use FateMaster or similar tools as implementation sources.
- Commercial calculators may only be used manually as independent cross-check references.
- Do not invent BaZi methodology or Golden expected values.
- Do not claim expert approval unless documented.
- Do not treat Product Owner approval as expert methodology validation.
- Do not expose raw birth data to AI interpretation.
- Do not use absolute prediction language.
- Do not make medical, legal, investment, gambling, or safety advice claims.
- Do not push unless the user explicitly asks.

---

## 13. Quick Start for Continuation

Recommended first commands:

```text
git branch --show-current
git log --oneline --decorate -12
git status --short
pnpm typecheck
pnpm test
pnpm dev --port 3001
```

Recommended first reads:

```text
docs/product/F8SYNC_PROJECT_HANDOVER_2026-06-28.md
docs/product/F8SYNC_EVIDENCE_BASED_BAZI_IMPLEMENTATION_PACK_V1.md
docs/product/F8SYNC_CODEX_UI_BRIEF_V2.md
src/app/[locale]/analysis-workspace.tsx
src/core/tarot/types.ts
src/core/tarot/draw.ts
src/ui/components/tarot-draw-panel.tsx
```

Current best next implementation task:

```text
Review and finalize the uncommitted Tarot UI + meaning work, then decide whether to commit it as a separate scoped milestone.
```

---

## 14. Human Context

The user is actively testing the frontend and gives rapid product feedback in Thai and English. They prefer practical continuation, not long theoretical discussion. When UI is broken, fix it first. When committing, use exact staging paths and report verification.

Recent user preference:

- Keep BaZi display as-is.
- Add one random tarot card with meaning after pressing `เริ่มวิเคราะห์`.
- Use the user's original tarot images.
- Keep the UI bento layout balanced.
- Push only when requested.

