# F8SYNC — Methodology Rule Lock Declaration
# MR-01 through MR-05

**Document Type:** KT Lock Declaration  
**Version:** 1.0  
**Date:** 2026-06-18  
**Declared By:** KT (Product Owner)  
**Witnessed By:** F8SYNC Methodology Lead  

---

## 1. Purpose

This document records the formal KT acceptance and LOCK of methodology rules
MR-01 through MR-05.

Upon signing this declaration:
- Rules MR-01 through MR-05 status → `LOCKED`
- Implementation Gate 1B prerequisites (rules) → MET
- Implementation Gate 1C prerequisites (rules) → MET
- No rule in this set may be changed without a versioned amendment

---

## 2. Rules Locked

| Package | Topic | Version | Status |
|---|---|---|---|
| MR-01 | Calendar and Timezone Authority | 1.0 | **LOCKED** |
| MR-02 | Year Boundary and Li Chun | 1.0 | **LOCKED** |
| MR-03 | Solar-Term Month Boundary | 1.0 | **LOCKED** |
| MR-04 | Day Pillar and Day Rollover | 1.0 | **LOCKED** |
| MR-05 | Hour Pillar and Unknown Birth Time | 1.0 | **LOCKED** |

---

## 3. Key Decisions Locked

### MR-01
- Solar calendar (not lunisolar) governs pillar boundaries
- Swiss Ephemeris DE431 is the authoritative solar term source
- IANA timezone database is the authoritative civil time source
- Historical births with uncertain IANA coverage → flagged APPROXIMATE
- All results must record engine version and ephemeris version

### MR-02
- BaZi year begins at Li Chun (立春), not Chinese New Year
- Li Chun = Sun at ecliptic longitude 315°, computed in UTC
- Birth before Li Chun → prior year pillar
- Birth after Li Chun → new year pillar
- Within 1 minute of boundary → BOUNDARY_DISPUTED, both pillars shown

### MR-03
- BaZi month boundaries are the 12 Jié (節) solar terms
- Zhōngqì terms are not month boundaries
- Gregorian calendar month is not a BaZi month boundary
- Month stem derived via Five Tigers Escape Rule (五虎遁年起月法)
- Boundary tolerance: 1 minute → BOUNDARY_DISPUTED

### MR-04
- Day pillar calculated via JDN mod 60
- Anchor: 1 Jan 2000 Bangkok = Day 戊午 Wu Wu
- Day rollover at civil midnight (00:00 local time) — default
- Zi hour split (23:00) is disclosed as variant, not used as default
- Births 23:00–00:00 → both day pillar options shown

### MR-05
- Hour branch from 12 double-hour table
- Hour stem via Five Rats Escape Rule (五鼠遁日起時法)
- Unknown birth time → hour pillar UNKNOWN, no 12:00 fallback
- Approximate birth time spanning two double-hours → BOUNDARY_DISPUTED
- Unknown hour → chart flagged THREE_PILLAR_PARTIAL
- User message: "ไม่รู้เวลาเกิดใช่มั้ย? ดูได้แค่ 3 เสาก่อนนะ 🙂 อยากครบต้องใส่เวลาเกิดด้วย"

---

## 4. Amendment Policy

A LOCKED rule may only be changed by:

1. Filing a new MR amendment document (MR-XX-AMD-YY)
2. Methodology Lead review and updated proposal
3. KT explicit acceptance of the amendment
4. New version number assigned
5. Commit and tag the amendment

No code change may implement a rule variant that contradicts a LOCKED rule
without a filed and accepted amendment.

---

## 5. Gate Status After This Declaration

| Gate | Rule Prerequisite | Status After Lock |
|---|---|---|
| Gate 1B | MR-01, MR-02, MR-03 LOCKED | ✅ Rules met |
| Gate 1C | MR-01–05 LOCKED | ✅ Rules met |
| Gate 1D | MR-06–08 LOCKED | ⏳ Pending MR-06–08 lock |
| Gate 1E | MR-09 LOCKED | ⏳ Pending MR-09 lock |
| Gate 1F | MR-10 LOCKED | ⏳ Pending MR-10 lock |

**Remaining prerequisite for Gate 1B to fully open:**
- GR-01 through GR-03 → APPROVED (evidence fields complete)

---

## 6. KT Lock Declaration

> I, KT, as Product Owner of F8SYNC, formally accept and lock
> methodology rules MR-01 through MR-05 as documented in
> `docs/product/F8SYNC_MR01` through `docs/product/F8SYNC_MR05`.
>
> These rules govern the F8SYNC calculation engine for V1.
> No implementation may contradict these rules without a filed amendment.

**Declared:** 2026-06-18  
**Product Owner:** KT  
**Methodology Lead:** F8SYNC Methodology Lead  
**Rule versions:** MR-01 v1.0 through MR-05 v1.0  

---

**End of Lock Declaration**
