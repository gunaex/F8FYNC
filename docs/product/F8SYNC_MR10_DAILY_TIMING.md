# F8SYNC — MR-10: Daily Timing Methodology

**Package:** MR-10  
**Topic:** Daily Timing Methodology  
**Status:** `RULE_PROPOSED`  
**Confidence:** HIGH (structure) / MEDIUM (scoring)  
**Author Role:** F8SYNC Methodology Lead  
**Date:** 2026-06-18  
**Depends On:** MR-02 through MR-08  
**Required By:** Gate 1F  

---

## 1. Scope

MR-10 establishes:

- What daily timing means in BaZi context
- How the current day's pillar interacts with the natal chart
- How favorable / unfavorable energy is assessed for a given day
- What F8SYNC V1 calculates vs defers to V2
- User-facing display format for daily timing

---

## 2. Daily Timing Foundation

BaZi daily timing assesses how the energy of the current day interacts with a person's natal chart.

The current day has:
- A Day Pillar (Year + Month + Day stems and branches — from MR-02, MR-03, MR-04)
- Hidden stems within the day branch (MR-06)

The natal chart has:
- Four Pillars with Day Master as reference (MR-07)
- Element distribution (MR-08)

---

## 3. Interaction Assessment

### 3.1 Day Stem vs Day Master

The Ten God relationship between the current day stem and the natal Day Master indicates the type of energy active:

| Ten God of Day Stem | Energy Type |
|---|---|
| 正官 Direct Officer | Discipline, responsibility, recognition |
| 七殺 Seven Killings | Pressure, challenge, competition |
| 正財 Direct Wealth | Steady income, practical gains |
| 偏財 Indirect Wealth | Unexpected opportunity, risk |
| 正印 Direct Resource | Support, learning, rest |
| 偏印 Indirect Resource | Creativity, unconventional thinking |
| 食神 Eating God | Expression, enjoyment, productivity |
| 傷官 Hurting Officer | Innovation, rebellion, visibility |
| 比肩 Rob Wealth | Teamwork, competition, independence |
| 劫財 Friend | Collaboration, rivalry |

### 3.2 Favorable vs Unfavorable Assessment

A day is assessed as favorable when the day's energy:
- Supports or complements the Day Master element (per MR-07 seasonal logic)
- Produces a Ten God the person benefits from (based on Day Master strength)

A day is less favorable when:
- The day element controls or drains the Day Master
- The Ten God relationship creates conflict with the natal structure

**F8SYNC V1 simplified model:**
- Strong Day Master benefits from Output and Wealth stars
- Weak Day Master benefits from Resource and Friend stars
- All charts benefit from Direct Officer days for formal matters

Confidence: **MEDIUM** — framework is classical; specific scoring varies by practitioner.

---

## 4. Display Format

F8SYNC V1 daily timing display follows UX principles (gระชับ ชัดเจน ตรงประเด็น เพื่อนคุยกัน):

**Summary view (default):**
```
วันนี้ธาตุ [X] — พลังงาน [ชื่อ Ten God ภาษาไทย]
เหมาะกับ: [2-3 กิจกรรมสั้นๆ]
```

**Detail view (กดดูเพิ่ม):**
```
เสาวันนี้: [Day Pillar stems + branches]
ความสัมพันธ์กับดวงคุณ: [Ten God ของเสาวันกับ Day Master]
รายละเอียด: [คำอธิบายยาว]
```

---

## 5. What F8SYNC V1 Does Not Calculate

The following are deferred to V2 or future research:

- Luck Pillar (大運) interaction with daily timing
- Annual Pillar (流年) overlay
- Clash, Combination, Harm interactions (六沖六合六害)
- Hour-level timing within the day
- Deity-based auspicious hours (吉時)

---

## 6. Proposed Rules

### Rule MR-10-A: Daily Timing Basis

```
Daily timing is assessed by calculating the current day's pillar
(Year, Month, Day stems and branches) using the same rules as natal
pillar calculation (MR-02, MR-03, MR-04).

The current day is determined in the user's local timezone (IANA per MR-01).
```

Confidence: HIGH

### Rule MR-10-B: Interaction Assessment

```
The primary interaction assessed is the Ten God relationship between
the current day Heavenly Stem and the natal Day Master.

Secondary assessment includes the current day branch element vs
the natal element distribution.
```

Confidence: HIGH

### Rule MR-10-C: Favorable Assessment Model

```
F8SYNC V1 uses a simplified favorable/unfavorable model based on
Day Master strength (MR-07) and Ten God type:

Strong Day Master: benefits from Output (食傷) and Wealth (財) stars
Weak Day Master: benefits from Resource (印) and Friend (比劫) stars
All charts: Direct Officer (正官) days suit formal and official matters

Full numeric scoring is deferred to V2.
```

Confidence: MEDIUM

### Rule MR-10-D: Display Format

```
Daily timing is displayed in two layers:

Summary (default): ธาตุวันนี้ + พลังงาน Ten God + 2-3 กิจกรรมแนะนำ
Detail (on tap): เสาวันเต็ม + Ten God relationship + คำอธิบาย

Language: ภาษาไทยล้วน ศัพท์เทคนิคน้อยที่สุด
Tone: เพื่อนคุยกัน ไม่เป็นทางการ
```

Confidence: HIGH

### Rule MR-10-E: Deferred Features

```
The following are explicitly deferred to V2 and must not be
implemented in V1:

- Luck Pillar interaction
- Annual Pillar overlay
- Clash, Combination, Harm interactions
- Hour-level timing
- Deity-based auspicious hours
```

Confidence: HIGH

---

## 7. Acceptance Checklist

- [ ] KT reviews and accepts Rule MR-10-A (Daily Timing Basis)
- [ ] KT reviews and accepts Rule MR-10-B (Interaction Assessment)
- [ ] KT reviews and accepts Rule MR-10-C (Favorable Assessment — simplified V1)
- [ ] KT confirms MEDIUM confidence on scoring is acceptable for V1
- [ ] KT reviews and accepts Rule MR-10-D (Display Format)
- [ ] KT reviews and accepts Rule MR-10-E (Deferred Features)
- [ ] Rule versions assigned
- [ ] Document committed and tagged

**Upon full acceptance: Status → `LOCKED`**

---

**End of MR-10**
