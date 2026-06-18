# F8SYNC — Codex UI Implementation Brief
# Version: 2.0 | Date: 2026-06-18
# Changes from V1: Added detail view, archetype artwork SVG, AI background handling

---

## 0. Read This First

คุณกำลัง implement UI layer ของ F8SYNC
Engine (Gates 1B–1F) implement เสร็จแล้ว — อย่า touch engine files
V2 เพิ่ม: detail view, archetype artwork SVG, AI background image handling

---

## 1. Stack และ Files ที่มีอยู่แล้ว

```
src/app/[locale]/analysis-workspace.tsx   ← main workspace
src/ui/components/birth-profile-form.tsx  ← birth input form
src/core/engine/                          ← DO NOT TOUCH
```

---

## 2. Design System

### CSS Variables
```css
--color-background-primary
--color-background-secondary
--color-text-primary
--color-text-secondary
--color-border-tertiary       /* 0.5px default */
--color-border-secondary      /* hover */
--border-radius-md            /* 8px */
--border-radius-lg            /* 12px */
```

### Accent Colors

| ส่วน | Background | Text |
|---|---|---|
| Archetype card | `#EEEDFE` | `#26215C` / `#3C3489` |
| Element ไม้ | `#EAF3DE` | `#27500A` / `#3B6D11` |
| Element ไฟ | `#FAECE7` | `#712B13` / `#993C1D` |
| Element ดิน | `#FAEEDA` | `#633806` / `#854F0B` |
| Element ทอง | `#F1EFE8` | `#444441` / `#5F5E5A` |
| Element น้ำ | `#E6F1FB` | `#0C447C` / `#185FA5` |
| Daily card | `#E1F5EE` | `#085041` / `#0F6E56` |
| Daily pill | `#9FE1CB` | `#04342C` |
| Daily tag | `#5DCAA5` | `#04342C` |

### Typography
- Weight: 400 body, 500 heading — ห้าม 600, 700
- Sentence case เสมอ
- Icons: Tabler outline `<i class="ti ti-NAME">`

---

## 3. Dashboard View (หน้าหลัก)

### 3.1 Archetype Card

```
[ ต้นแบบของคุณ ]              11px #534AB7 eyebrow
[ มหาสมุทร ]                  28px/500 #26215C
[ พลังหลัก: ธาตุน้ำ · พลังเด่น ] 12px #3C3489
───────────────────────────────  0.5px #AFA9EC
[ note อธิบาย identity ≠ element ] 11px #534AB7
[ ดูตัวตนแบบเต็ม → ]          12px #534AB7
[ SVG artwork ขวา ]            88x88px absolute right
```

Background: `#EEEDFE`, border-radius: 16px
กด card → เปิด Detail View

### 3.2 Four Pillars Row

Grid `repeat(4, minmax(0, 1fr))` gap 6px

Known pillar:
```
[ ปี ]         10px secondary
[ ฟ้า · ดิน ]  9px secondary
[ 庚 ]         20px/500 primary (Heavenly Stem)
[ 辰 ]         20px secondary (Earthly Branch)
[ มังกร ]      10px secondary
```

Unknown pillar:
```
[ ชั่วโมง ]
[ ti-clock-question icon ]
[ ไม่ทราบเวลาเกิด ]
border: 0.5px dashed
```

BOUNDARY_DISPUTED pillar:
```
[ label ]
[ ? ]
[ 2 ตัวเลือก ]
background: var(--color-background-warning)
```

กดแต่ละ pillar → เปิด Pillar Detail Sheet

### 3.3 Element Balance

Grid `repeat(5, minmax(0, 1fr))` gap 4px

```
[ ชื่อธาตุ ]  11px/500
[ XX% ]       15px/500
[ สถานะ ]     9px
```

Status mapping:
```
>= 28% → เด่นมาก
>= 22% → เด่น
>= 15% → สมดุล
<  15% → ควรเสริม
```

### 3.4 Partial Banner

แสดงเมื่อ `chart_type === 'THREE_PILLAR_PARTIAL'`

```
[ ℹ icon ] ผลบางส่วน — ยังไม่ทราบเวลาเกิด ดูได้แค่ 3 เสาก่อนนะ 🙂
           ใส่เวลาเกิดเพื่อดูผลครบ →
```

### 3.5 Daily Timing Card

```
[ 📅 วันนี้ · 18 มิ.ย. 2026 · กรุงเทพฯ ]
[ พลังไม้สนับสนุนคุณวันนี้ ]  [ จังหวะสนับสนุน ]
[ เหมาะกับการเติบโต การเรียนรู้... ]
[ แนะนำวันนี้ ]
[ วางแผน ] [ เรียนรู้ ] [ เริ่มต้นใหม่ ]
[ ดูช่วงเวลาที่เหมาะ → ]
```

Tag mapping:
```
favorable strong  → จังหวะสนับสนุน
neutral           → พลังเป็นกลาง
unfavorable       → ใช้ความระมัดระวัง
```

Timezone display:
```
Asia/Bangkok     → กรุงเทพฯ
Asia/Tokyo       → โตเกียว
America/New_York → นิวยอร์ก
default          → UTC+X
```

---

## 4. Detail View (กด archetype card)

Full screen modal/sheet แสดงรายละเอียด archetype

### Layout

```
┌─────────────────────────────┐
│  [ AI Background Image ]    │  full bleed, object-fit: cover
│  [ gradient overlay bottom ]│  linear-gradient transparent→#26215C
│                             │
│  [ ชื่อ archetype ใหญ่ ]    │  36px/500 white
│  [ ธาตุ · ความเด่น ]        │  14px white/80%
└─────────────────────────────┘
│  [ SVG artwork เล็ก + ชื่อ ]│  summary row
│  [ คำอธิบาย archetype ]     │  body text
│  [ จุดเด่น ]                │  list
│  [ จุดที่ควรระวัง ]         │  list
│  [ ธาตุที่เสริม ]           │  pill
│  [ ปิด ]                    │  bottom CTA
```

### AI Background Image

```typescript
// Image path pattern
const imagePath = `/archetypes/arch-${archetypeId.padStart(2,'0')}-${archetypeSlug}.jpg`

// Fallback เมื่อยังไม่มีภาพ
// ใช้ SVG gradient background แทน ไม่ใช่ broken image
const fallbackGradient = archetypeGradients[archetypeId]
```

Fallback gradients (ใช้เมื่อยังไม่มีภาพ AI):

| Archetype | Gradient |
|---|---|
| ไม้ | `linear-gradient(160deg, #173404, #3B6D11)` |
| ไฟ | `linear-gradient(160deg, #4A1B0C, #993C1D)` |
| ดิน | `linear-gradient(160deg, #412402, #854F0B)` |
| ทอง | `linear-gradient(160deg, #2C2C2A, #5F5E5A)` |
| น้ำ | `linear-gradient(160deg, #042C53, #185FA5)` |

**Image placement:**
```
public/archetypes/
  arch-01-wood-strong.jpg
  arch-02-wood-weak.jpg
  arch-03-fire-strong.jpg
  arch-04-fire-weak.jpg
  arch-05-earth-strong.jpg
  arch-06-earth-weak.jpg
  arch-07-metal-strong.jpg
  arch-08-metal-weak.jpg
  arch-09-water-strong.jpg
  arch-10-water-weak.jpg
```

ถ้าไฟล์ยังไม่มี → ใช้ fallback gradient อัตโนมัติ
ห้ามแสดง broken image หรือ empty space

---

## 5. Archetype SVG Artwork (Dashboard Card)

88x88px SVG ประจำแต่ละ archetype — วางใน card ด้านขวา

### น้ำ (ARCH-09, ARCH-10)
```svg
วงกลมซ้อน + คลื่น 3 เส้น + จุด 8 ทิศ
สี: #7F77DD, #534AB7, #AFA9EC
```

### ไม้ (ARCH-01, ARCH-02)
```svg
กิ่งก้านแตกจากจุดศูนย์กลาง + ใบเล็กๆ ปลายกิ่ง
สี: #639922, #3B6D11, #C0DD97
```

### ไฟ (ARCH-03, ARCH-04)
```svg
เปลวไฟ 3 ชั้น + อนุภาคลอย
สี: #D85A30, #993C1D, #FAC775
```

### ดิน (ARCH-05, ARCH-06)
```svg
สามเหลี่ยมซ้อน 3 ชั้น + เส้นแนวนอน
สี: #BA7517, #854F0B, #FAC775
```

### ทอง (ARCH-07, ARCH-08)
```svg
รูปหกเหลี่ยมซ้อน + เส้นแฉก
สี: #888780, #5F5E5A, #D3D1C7
```

Strong variant: artwork เข้มและซับซ้อนกว่า
Weak variant: artwork บางและเบากว่า

---

## 6. Pillar Detail Sheet

กด pillar card → bottom sheet แสดง:

```
[ ปีเกิด ]
──────────
ฟ้า (Heavenly Stem)
庚 — โลหะหยาง

ดิน (Earthly Branch)
辰 — มังกร / ดิน

ธาตุที่ซ่อนอยู่
戊 Wu (ดินหยาง) · หลัก
乙 Yi (ไม้หยิน) · รอง
癸 Gui (น้ำหยิน) · เล็กน้อย

[ ปิด ]
```

ภาษาไทยล้วน — ศัพท์เทคนิคน้อยที่สุด

---

## 7. Screen States

| State | Trigger | UI |
|---|---|---|
| A Full | birth_time KNOWN | ทุก component ครบ |
| B Partial | birth_time UNKNOWN | เสาชั่วโมง unknown + banner |
| C Disputed | BOUNDARY_DISPUTED | pillar แสดง ? + 2 ตัวเลือก |
| D Loading | fetching | skeleton placeholders |

---

## 8. Language Rules

ห้ามใช้ → ใช้แทน:
```
ขาดธาตุทอง    → ธาตุทองควรเสริม
แข็งแกร่ง     → พลังเด่น
เหมาะเลย      → จังหวะสนับสนุน
กดดูรายละเอียด → ดูช่วงเวลาที่เหมาะ
Unknown       → ไม่ทราบ
Partial       → ผลบางส่วน
ขาด           → ควรเสริม
```

---

## 9. Files to Create/Modify

```
src/app/[locale]/analysis-workspace.tsx
src/ui/components/
  archetype-card.tsx
  archetype-detail-view.tsx    ← NEW V2
  archetype-artwork.tsx        ← NEW V2 (SVG per archetype)
  four-pillars-row.tsx
  pillar-detail-sheet.tsx      ← NEW V2
  element-balance.tsx
  daily-timing-card.tsx
  partial-banner.tsx
src/ui/styles/
  f8sync-tokens.css
public/archetypes/             ← placeholder folder (images added later)
  .gitkeep
```

---

## 10. DO NOT

```
ห้าม touch src/core/engine/
ห้าม implement V2-deferred features
ห้ามใช้ 12:00 default
ห้าม hardcode BaZi values ใน UI
ห้ามใช้ font-weight 600, 700
ห้ามใช้ gradient/shadow/glow ยกเว้น detail view overlay
ห้ามแสดง broken image — ใช้ fallback gradient เสมอ
ห้ามใช้ภาษาอังกฤษกับ user-facing text
```

---

## 11. What to Send Back

1. Files created/modified
2. Description ของแต่ละ state A/B/C/D
3. `pnpm typecheck` result
4. `pnpm test` result
5. ข้อสงสัยหรือ ambiguity

---

## 12. Data Contract for UI

UI ห้ามคำนวณ BaZi เอง ให้รับ object จาก engine/adaptor เท่านั้น

### Required View Model

สร้าง view model ชั้น UI แยกจาก engine types:

```typescript
type F8SyncDashboardViewModel = {
  state: "FULL" | "PARTIAL" | "DISPUTED" | "LOADING"
  archetype: {
    id: "ARCH-01" | "ARCH-02" | "ARCH-03" | "ARCH-04" | "ARCH-05" |
        "ARCH-06" | "ARCH-07" | "ARCH-08" | "ARCH-09" | "ARCH-10"
    nameTh: string
    element: "WOOD" | "FIRE" | "EARTH" | "METAL" | "WATER"
    strength: "STRONG" | "WEAK"
    summary: string
    detail: string
    strengths: string[]
    cautions: string[]
    supportingElements: string[]
  }
  pillars: Array<{
    key: "year" | "month" | "day" | "hour"
    labelTh: "ปี" | "เดือน" | "วัน" | "ชั่วโมง"
    state: "KNOWN" | "UNKNOWN" | "BOUNDARY_DISPUTED"
    stemChinese?: string
    stemLabelTh?: string
    branchChinese?: string
    branchLabelTh?: string
    animalTh?: string
    hiddenStems?: Array<{
      stemChinese: string
      label: string
      elementTh: string
      roleTh: "หลัก" | "รอง" | "เล็กน้อย"
    }>
    alternatives?: string[]
  }>
  elements: Array<{
    key: "WOOD" | "FIRE" | "EARTH" | "METAL" | "WATER"
    labelTh: string
    percentage: number
    statusTh: "เด่นมาก" | "เด่น" | "สมดุล" | "ควรเสริม"
  }>
  daily: {
    localDateLabel: string
    timezoneLabel: string
    headline: string
    statusTag: "จังหวะสนับสนุน" | "พลังเป็นกลาง" | "ใช้ความระมัดระวัง"
    summary: string
    activities: string[]
    detail: string
  }
  disclosures: {
    partial?: string
    boundary?: string
  }
}
```

### Mapping Rule

- `identity.archetype` จาก Gate 1E → archetype card + detail view
- `FourPillarsReadyResult` จาก Gate 1C → four pillars row + pillar detail sheet
- `BaziStructureProfile.elementDistribution` จาก Gate 1D → element balance
- `DailyTimingResult` จาก Gate 1F → daily timing card
- `hourPillar === "UNKNOWN"` → state `PARTIAL`
- `boundaryFlags.length > 0` → state `DISPUTED`

ถ้า backend/API ยังไม่ส่ง view model จริง ให้ใช้ local adapter function ใน UI file หรือ component helper เท่านั้น ห้าม hardcode BaZi values กระจายใน JSX

---

## 13. Implementation Order

ทำตามลำดับนี้เท่านั้น:

1. สร้าง static component props/types และ sample view model ใน `analysis-workspace.tsx`
2. สร้าง `partial-banner.tsx`
3. สร้าง `four-pillars-row.tsx`
4. สร้าง `pillar-detail-sheet.tsx`
5. สร้าง `element-balance.tsx`
6. สร้าง `daily-timing-card.tsx`
7. สร้าง `archetype-artwork.tsx`
8. สร้าง `archetype-card.tsx`
9. สร้าง `archetype-detail-view.tsx`
10. ต่อ components เข้ากับ `analysis-workspace.tsx`
11. เพิ่ม `public/archetypes/.gitkeep`
12. Run `pnpm typecheck`
13. Run `pnpm test`

ห้ามเริ่ม redesign หน้าอื่นจนหน้า analysis workspace เสร็จ

---

## 14. Component Contracts

### `ArchetypeCard`

```typescript
type ArchetypeCardProps = {
  archetype: F8SyncDashboardViewModel["archetype"]
  onOpenDetail: () => void
}
```

Behavior:
- เป็น `<button>` หรือ clickable card ที่ keyboard focus ได้
- `aria-label="ดูตัวตนแบบเต็ม"`
- ไม่ nested card
- artwork decorative ใช้ `aria-hidden="true"`

### `ArchetypeDetailView`

```typescript
type ArchetypeDetailViewProps = {
  open: boolean
  archetype: F8SyncDashboardViewModel["archetype"]
  onClose: () => void
}
```

Behavior:
- ถ้า `open === false` ไม่ render modal content
- close button ชัดเจน
- Escape key ปิดได้ถ้าทำได้โดยไม่เพิ่ม dependency
- image fallback ต้องทำงานเสมอ

### `FourPillarsRow`

```typescript
type FourPillarsRowProps = {
  pillars: F8SyncDashboardViewModel["pillars"]
  onSelectPillar: (pillarKey: "year" | "month" | "day" | "hour") => void
}
```

Behavior:
- กด unknown pillar ได้ แต่ sheet แสดง reason ว่าไม่ทราบเวลาเกิด
- disputed pillar ต้องเห็นชัดว่าเป็น 2 ตัวเลือก

### `PillarDetailSheet`

```typescript
type PillarDetailSheetProps = {
  pillar: F8SyncDashboardViewModel["pillars"][number] | null
  onClose: () => void
}
```

Behavior:
- ถ้า `pillar === null` ไม่ render
- hidden stems แสดงเฉพาะถ้ามี
- text ไทยล้วน

### `ElementBalance`

```typescript
type ElementBalanceProps = {
  elements: F8SyncDashboardViewModel["elements"]
}
```

Behavior:
- percentages รวมไม่จำเป็นต้องโชว์ 100 บน UI
- status ใช้ mapping section 3.3 เท่านั้น

### `DailyTimingCard`

```typescript
type DailyTimingCardProps = {
  daily: F8SyncDashboardViewModel["daily"]
}
```

Behavior:
- activities แสดงเป็น pill 2-3 ชิ้น
- CTA ใช้คำว่า `ดูช่วงเวลาที่เหมาะ →`
- ห้ามพูดถึง luck pillar, annual pillar, clash, combination, auspicious hours

### `PartialBanner`

```typescript
type PartialBannerProps = {
  text: string
  actionLabel?: string
}
```

Behavior:
- แสดงเฉพาะ partial state
- ใช้ icon info outline

---

## 15. Responsive Rules

### Mobile `< 640px`

- Dashboard เป็น single column
- Archetype artwork ขนาด 72px
- Four Pillars row ยัง 4 columns แต่ gap 4px และ text ต้องไม่ overflow
- Detail view เป็น full screen sheet
- Pillar sheet สูงไม่เกิน 80vh, scroll ได้

### Tablet/Desktop `>= 640px`

- Dashboard content max-width 960px
- Archetype artwork 88px
- Element grid 5 columns
- Detail view max-width 720px centered sheet หรือ full screen overlay ได้

### Text Overflow

- ห้าม text ทับกัน
- ใช้ `min-width: 0`, `overflow-wrap: anywhere` เฉพาะ label ยาว
- Chinese stem/branch ไม่ควรถูกตัด

---

## 16. Accessibility

- Interactive cards ต้อง keyboard focus ได้
- Modal/sheet ต้องมี close button ที่เห็นชัด
- Decorative SVG ใช้ `aria-hidden="true"`
- Icon-only buttons ต้องมี `aria-label`
- Color ห้ามเป็นวิธีเดียวในการบอก state: ต้องมี text เช่น `ผลบางส่วน`, `2 ตัวเลือก`
- Daily activities เป็น list หรือ group ที่ screen reader อ่านได้

---

## 17. CSS Guidance

ถ้าเพิ่ม CSS:

```text
src/app/globals.css
```

หรือ component-level class names ที่เข้ากับ pattern เดิม

ห้ามสร้าง CSS framework ใหม่
ห้ามเพิ่ม dependency ใหม่เพื่อ styling
ห้ามใช้ inline style จำนวนมาก ยกเว้น fallback background image/gradient ที่ต้อง dynamic

Class naming suggestion:

```css
.f8sync-dashboard
.f8sync-archetype-card
.f8sync-pillars
.f8sync-pillar-card
.f8sync-element-grid
.f8sync-daily-card
.f8sync-detail-overlay
.f8sync-detail-sheet
```

---

## 18. Test / QA Requirements

At minimum:

- `pnpm typecheck`
- `pnpm test`

Manual QA checklist:

- Full state renders with archetype, 4 pillars, 5 elements, daily card
- Partial state renders banner and unknown hour
- Disputed state shows `?` and `2 ตัวเลือก`
- Detail view opens and closes
- Pillar sheet opens and closes
- Missing archetype image uses fallback gradient
- No broken image icon
- No text overlap at mobile width
- No engine files changed

---

## 19. Known Ambiguities

1. API ยังไม่ได้ส่ง V1 engine result เข้า analysis workspace โดยตรง
   - Safe approach: build UI with local sample/view model adapter first
   - Do not wire production API contract unless explicitly requested

2. `src/core/identity/` มี untracked V8 identity work อยู่แล้ว
   - Do not modify it
   - UI v2 should use `src/core/engine/identity.ts` output shape or local view model

3. Archetype background images may not exist yet
   - Use fallback gradient
   - Add `.gitkeep` only

4. Tabler icon availability must be checked in current app
   - If Tabler CSS is not loaded, use text/icon fallback from existing UI style
   - Do not add icon package without approval

---

## 20. Final Safety Gate

Before final response, confirm:

- No `src/core/engine/` files modified
- No schema/migration modified
- No V2-deferred timing features introduced
- No `12:00` fallback introduced
- No hardcoded BaZi calculation values introduced in UI JSX
- `pnpm typecheck` result reported
- `pnpm test` result reported

---

**End of UI Brief v2.1**
