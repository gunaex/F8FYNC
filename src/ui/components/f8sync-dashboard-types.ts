export type F8SyncArchetypeId =
  | "ARCH-01"
  | "ARCH-02"
  | "ARCH-03"
  | "ARCH-04"
  | "ARCH-05"
  | "ARCH-06"
  | "ARCH-07"
  | "ARCH-08"
  | "ARCH-09"
  | "ARCH-10";

export type F8SyncElementKey = "WOOD" | "FIRE" | "EARTH" | "METAL" | "WATER";

export type F8SyncPillarKey = "year" | "month" | "day" | "hour";

export type F8SyncPillarState = "KNOWN" | "UNKNOWN" | "BOUNDARY_DISPUTED";

export type F8SyncDashboardViewModel = {
  state: "FULL" | "PARTIAL" | "DISPUTED" | "LOADING";
  archetype: {
    id: F8SyncArchetypeId;
    nameTh: string;
    element: F8SyncElementKey;
    strength: "STRONG" | "WEAK";
    summary: string;
    detail: string;
    strengths: string[];
    cautions: string[];
    supportingElements: string[];
  };
  pillars: Array<{
    key: F8SyncPillarKey;
    labelTh: "ปี" | "เดือน" | "วัน" | "ชั่วโมง";
    state: F8SyncPillarState;
    stemChinese?: string;
    stemLabelTh?: string;
    branchChinese?: string;
    branchLabelTh?: string;
    animalTh?: string;
    hiddenStems?: Array<{
      stemChinese: string;
      label: string;
      elementTh: string;
      roleTh: "หลัก" | "รอง" | "เล็กน้อย";
    }>;
    alternatives?: string[];
  }>;
  elements: Array<{
    key: F8SyncElementKey;
    labelTh: string;
    percentage: number;
    statusTh: "เด่นมาก" | "เด่น" | "สมดุล" | "ควรเสริม";
  }>;
  daily: {
    localDateLabel: string;
    timezoneLabel: string;
    headline: string;
    statusTag: "จังหวะสนับสนุน" | "พลังเป็นกลาง" | "ใช้ความระมัดระวัง";
    summary: string;
    activities: string[];
    detail: string;
  };
  disclosures: {
    partial?: string;
    boundary?: string;
  };
};
