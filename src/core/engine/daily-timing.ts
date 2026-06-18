import { calculateDayPillar, type FourPillarsReadyResult } from "./pillars";
import { formatStemBranch } from "./stems-branches";
import { deriveTenGod, getStemElement, type FiveElement, type TenGod } from "./ten-gods";
import type { BaziStructureProfile, DayMasterStrength } from "./elements";

export type DailyTimingInput = {
  localDate: string;
  timezoneId: string;
  natalPillars: FourPillarsReadyResult;
  natalStructure: BaziStructureProfile;
};

export type DailyTimingResult = {
  status: "READY" | "BLOCKED_INVALID_INPUT";
  localDate: string;
  timezoneId: string;
  currentDayPillar?: FourPillarsReadyResult["dayPillar"];
  currentDayElement?: FiveElement;
  tenGod?: TenGod;
  suitability?: "FAVORABLE" | "NEUTRAL" | "FORMAL_SUPPORT";
  activities?: string[];
  summary?: string;
  detail?: string;
  deferredFeatures: string[];
  trace: string[];
};

const tenGodThai: Record<TenGod, string> = {
  BI_JIAN: "เพื่อนร่วมแรง",
  JIE_CAI: "เพื่อนร่วมทาง",
  SHI_SHEN: "การแสดงออก",
  SHANG_GUAN: "ไอเดียใหม่",
  PIAN_CAI: "โอกาสเงิน",
  ZHENG_CAI: "งานเงินที่จับต้องได้",
  PIAN_YIN: "แรงบันดาลใจ",
  ZHENG_YIN: "แรงสนับสนุน",
  QI_SHA: "แรงกดดัน",
  ZHENG_GUAN: "ระเบียบและงานทางการ"
};

const elementThai: Record<FiveElement, string> = {
  WOOD: "ไม้",
  FIRE: "ไฟ",
  EARTH: "ดิน",
  METAL: "ทอง",
  WATER: "น้ำ"
};

const deferredFeatures = [
  "Luck Pillar interaction",
  "Annual Pillar overlay",
  "Clash, Combination, Harm interactions",
  "Hour-level timing",
  "Deity-based auspicious hours"
];

function activitiesFor(tenGod: TenGod, strength: DayMasterStrength): { suitability: DailyTimingResult["suitability"]; activities: string[] } {
  if (tenGod === "ZHENG_GUAN") {
    return { suitability: "FORMAL_SUPPORT", activities: ["จัดการเอกสาร", "คุยเรื่องงานทางการ", "วางแผนระยะยาว"] };
  }

  const outputOrWealth: TenGod[] = ["SHI_SHEN", "SHANG_GUAN", "PIAN_CAI", "ZHENG_CAI"];
  const resourceOrFriend: TenGod[] = ["PIAN_YIN", "ZHENG_YIN", "BI_JIAN", "JIE_CAI"];

  if (strength === "STRONG" && outputOrWealth.includes(tenGod)) {
    return { suitability: "FAVORABLE", activities: ["ลงมือทำงาน", "เสนอไอเดีย", "จัดการเรื่องเงิน"] };
  }
  if (strength === "WEAK" && resourceOrFriend.includes(tenGod)) {
    return { suitability: "FAVORABLE", activities: ["เรียนรู้", "ขอคำปรึกษา", "พักฟื้นพลัง"] };
  }
  return { suitability: "NEUTRAL", activities: ["ทำงานตามแผน", "สังเกตจังหวะ", "หลีกเลี่ยงการเร่งเกินจำเป็น"] };
}

function isValidLocalDate(localDate: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(localDate) && calculateDayPillar(localDate) !== null;
}

export function calculateDailyTiming(input: DailyTimingInput): DailyTimingResult {
  const trace = ["Gate 1F daily timing calculation started"];
  if (!isValidLocalDate(input.localDate)) {
    return {
      status: "BLOCKED_INVALID_INPUT",
      localDate: input.localDate,
      timezoneId: input.timezoneId,
      deferredFeatures,
      trace: [...trace, "Invalid local date"]
    };
  }

  const currentDayPillar = calculateDayPillar(input.localDate);
  if (!currentDayPillar) {
    return {
      status: "BLOCKED_INVALID_INPUT",
      localDate: input.localDate,
      timezoneId: input.timezoneId,
      deferredFeatures,
      trace: [...trace, "Current day pillar unavailable"]
    };
  }

  const currentDayElement = getStemElement(currentDayPillar.stem);
  const tenGod = deriveTenGod(input.natalPillars.dayPillar.stem, currentDayPillar.stem);
  const { suitability, activities } = activitiesFor(tenGod, input.natalStructure.dayMaster.strength);
  const summary = `วันนี้ธาตุ ${elementThai[currentDayElement]} — พลังงาน ${tenGodThai[tenGod]} / เหมาะกับ: ${activities.join(", ")}`;
  const detail = `เสาวันนี้: ${formatStemBranch(currentDayPillar)}\nความสัมพันธ์กับดวงคุณ: ${tenGodThai[tenGod]}\nรายละเอียด: วันนี้ดูจากเสาวันและ Day Master เท่านั้น ยังไม่รวมดวงปี ดวงใหญ่ หรือฤกษ์รายชั่วโมง`;

  return {
    status: "READY",
    localDate: input.localDate,
    timezoneId: input.timezoneId,
    currentDayPillar,
    currentDayElement,
    tenGod,
    suitability,
    activities,
    summary,
    detail,
    deferredFeatures,
    trace: [...trace, "MR-10.v1.0 daily stem Ten God relationship applied", "V2-deferred features excluded"]
  };
}
