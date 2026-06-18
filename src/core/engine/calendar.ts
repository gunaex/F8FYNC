import {
  CALENDAR_ENGINE,
  CALENDAR_ENGINE_VERSION,
  EPHEMERIS_DATA,
  IANA_VERSION,
  findActiveJieBoundary,
  findNearestJieBoundary,
  getLiChunBoundary,
  type EarthlyBranchKey,
  type JieSolarTermBoundary
} from "./ephemeris";

export type HeavenlyStemKey = "JIA" | "YI" | "BING" | "DING" | "WU" | "JI" | "GENG" | "XIN" | "REN" | "GUI";

export type StemBranch = {
  stem: HeavenlyStemKey;
  stemName: string;
  stemChinese: string;
  branch: EarthlyBranchKey;
  branchName: string;
  branchChinese: string;
};

export type Gate1BCalendarInput = {
  localDate: string;
  localTime?: string | null;
  birthTimeStatus?: "KNOWN" | "UNKNOWN" | "APPROXIMATE" | "DISPUTED";
  timezoneId: string | null;
  timezoneConfirmationStatus?: "CONFIRMED" | "SUGGESTED" | "UNRESOLVED" | "UNKNOWN";
  timeAdjustmentPolicy?: "LOCAL_CIVIL_TIME" | "TRUE_SOLAR_TIME";
};

export type BoundaryDispute = {
  code: "BOUNDARY_DISPUTED";
  boundaryType: "YEAR" | "MONTH";
  solarTerm: string;
  boundaryUtc: string;
  distanceMs: number;
  candidates: StemBranch[];
};

export type Gate1BCalendarBlockedResult = {
  status: "BLOCKED_MISSING_TIME" | "BLOCKED_MISSING_TIMEZONE" | "BLOCKED_INVALID_INPUT" | "UNSUPPORTED_IN_V1" | "BLOCKED_UNAVAILABLE_BOUNDARY";
  reasonCodes: string[];
  trace: string[];
};

export type Gate1BCalendarReadyResult = {
  status: "READY" | "BOUNDARY_DISPUTED";
  birthUtc: string;
  yearPillar: StemBranch;
  monthPillar: StemBranch;
  boundaryFlags: BoundaryDispute[];
  versions: {
    calendarEngine: typeof CALENDAR_ENGINE;
    calendarEngineVersion: typeof CALENDAR_ENGINE_VERSION;
    ephemerisData: typeof EPHEMERIS_DATA;
    ianaVersion: typeof IANA_VERSION;
    ruleVersion: "MR-01.v1.0+MR-02.v1.0+MR-03.v1.0";
  };
  trace: string[];
};

export type Gate1BCalendarResult = Gate1BCalendarBlockedResult | Gate1BCalendarReadyResult;

const BOUNDARY_TOLERANCE_MS = 60_000;
const LOCAL_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const LOCAL_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const heavenlyStems: Record<HeavenlyStemKey, { name: string; chinese: string }> = {
  JIA: { name: "Jia", chinese: "甲" },
  YI: { name: "Yi", chinese: "乙" },
  BING: { name: "Bing", chinese: "丙" },
  DING: { name: "Ding", chinese: "丁" },
  WU: { name: "Wu", chinese: "戊" },
  JI: { name: "Ji", chinese: "己" },
  GENG: { name: "Geng", chinese: "庚" },
  XIN: { name: "Xin", chinese: "辛" },
  REN: { name: "Ren", chinese: "壬" },
  GUI: { name: "Gui", chinese: "癸" }
};

const earthlyBranches: Record<EarthlyBranchKey, { name: string; chinese: string }> = {
  ZI: { name: "Zi", chinese: "子" },
  CHOU: { name: "Chou", chinese: "丑" },
  YIN: { name: "Yin", chinese: "寅" },
  MAO: { name: "Mao", chinese: "卯" },
  CHEN: { name: "Chen", chinese: "辰" },
  SI: { name: "Si", chinese: "巳" },
  WU: { name: "Wu", chinese: "午" },
  WEI: { name: "Wei", chinese: "未" },
  SHEN: { name: "Shen", chinese: "申" },
  YOU: { name: "You", chinese: "酉" },
  XU: { name: "Xu", chinese: "戌" },
  HAI: { name: "Hai", chinese: "亥" }
};

const stemCycle: HeavenlyStemKey[] = ["JIA", "YI", "BING", "DING", "WU", "JI", "GENG", "XIN", "REN", "GUI"];
const branchCycle: EarthlyBranchKey[] = ["ZI", "CHOU", "YIN", "MAO", "CHEN", "SI", "WU", "WEI", "SHEN", "YOU", "XU", "HAI"];

function blocked(status: Gate1BCalendarBlockedResult["status"], reasonCodes: string[]): Gate1BCalendarBlockedResult {
  return { status, reasonCodes, trace: [`Gate 1B blocked: ${reasonCodes.join(", ")}`] };
}

function parseLocalDate(localDate: string): { year: number; month: number; day: number } | null {
  if (!LOCAL_DATE_PATTERN.test(localDate)) return null;
  const [year, month, day] = localDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return { year, month, day };
}

function parseLocalTime(localTime: string): { hour: number; minute: number } | null {
  if (!LOCAL_TIME_PATTERN.test(localTime)) return null;
  const [hour, minute] = localTime.split(":").map(Number);
  return { hour, minute };
}

function assertValidTimeZone(timezoneId: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: timezoneId }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

function getZonedParts(date: Date, timezoneId: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezoneId,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
    hour: Number(lookup.hour),
    minute: Number(lookup.minute),
    second: Number(lookup.second)
  };
}

function getTimezoneOffsetMs(date: Date, timezoneId: string): number {
  const parts = getZonedParts(date, timezoneId);
  const zonedAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return zonedAsUtc - date.getTime();
}

function localCivilTimeToUtc(localDate: string, localTime: string, timezoneId: string): Date | null {
  const date = parseLocalDate(localDate);
  const time = parseLocalTime(localTime);
  if (!date || !time) return null;

  const localAsUtc = Date.UTC(date.year, date.month - 1, date.day, time.hour, time.minute, 0);
  let utcMs = localAsUtc;
  for (let index = 0; index < 3; index += 1) {
    utcMs = localAsUtc - getTimezoneOffsetMs(new Date(utcMs), timezoneId);
  }
  return new Date(utcMs);
}

function stemBranch(stem: HeavenlyStemKey, branch: EarthlyBranchKey): StemBranch {
  return {
    stem,
    stemName: heavenlyStems[stem].name,
    stemChinese: heavenlyStems[stem].chinese,
    branch,
    branchName: earthlyBranches[branch].name,
    branchChinese: earthlyBranches[branch].chinese
  };
}

export function calculateYearPillarForSolarYear(solarYear: number): StemBranch {
  const index = ((solarYear - 1984) % 60 + 60) % 60;
  return stemBranch(stemCycle[index % 10], branchCycle[index % 12]);
}

function getMonthOneStem(yearStem: HeavenlyStemKey): HeavenlyStemKey {
  if (yearStem === "JIA" || yearStem === "JI") return "BING";
  if (yearStem === "YI" || yearStem === "GENG") return "WU";
  if (yearStem === "BING" || yearStem === "XIN") return "GENG";
  if (yearStem === "DING" || yearStem === "REN") return "REN";
  return "JIA";
}

export function calculateMonthPillar(yearStem: HeavenlyStemKey, activeBoundary: JieSolarTermBoundary): StemBranch {
  const monthOneStem = getMonthOneStem(yearStem);
  const monthOneStemIndex = stemCycle.indexOf(monthOneStem);
  const stem = stemCycle[(monthOneStemIndex + activeBoundary.monthNumber - 1) % stemCycle.length];
  return stemBranch(stem, activeBoundary.branchKey);
}

function buildBoundaryDispute(boundaryType: "YEAR" | "MONTH", boundary: JieSolarTermBoundary, distanceMs: number, candidates: StemBranch[]): BoundaryDispute {
  return {
    code: "BOUNDARY_DISPUTED",
    boundaryType,
    solarTerm: boundary.name,
    boundaryUtc: boundary.utc,
    distanceMs,
    candidates
  };
}

export function calculateGate1BCalendar(input: Gate1BCalendarInput): Gate1BCalendarResult {
  const trace: string[] = ["Gate 1B calendar calculation started"];
  const birthTimeStatus = input.birthTimeStatus ?? "KNOWN";

  if (input.timeAdjustmentPolicy === "TRUE_SOLAR_TIME") return blocked("UNSUPPORTED_IN_V1", ["TRUE_SOLAR_TIME_UNSUPPORTED_IN_V1"]);
  if (!parseLocalDate(input.localDate)) return blocked("BLOCKED_INVALID_INPUT", ["LOCAL_DATE_INVALID"]);
  if (birthTimeStatus !== "KNOWN" || !input.localTime) return blocked("BLOCKED_MISSING_TIME", ["KNOWN_LOCAL_TIME_REQUIRED_FOR_SOLAR_TERM_BOUNDARY"]);
  if (!parseLocalTime(input.localTime)) return blocked("BLOCKED_INVALID_INPUT", ["LOCAL_TIME_INVALID"]);
  if (!input.timezoneId || input.timezoneConfirmationStatus !== "CONFIRMED") {
    return blocked("BLOCKED_MISSING_TIMEZONE", ["CONFIRMED_IANA_TIMEZONE_REQUIRED"]);
  }
  if (!assertValidTimeZone(input.timezoneId)) return blocked("BLOCKED_INVALID_INPUT", ["TIMEZONE_NOT_IANA"]);

  const localDate = parseLocalDate(input.localDate);
  const birthUtc = localCivilTimeToUtc(input.localDate, input.localTime, input.timezoneId);
  if (!localDate || !birthUtc) return blocked("BLOCKED_INVALID_INPUT", ["LOCAL_DATE_TIME_INVALID"]);

  const liChun = getLiChunBoundary(localDate.year);
  const activeMonthBoundary = findActiveJieBoundary(birthUtc);
  if (!liChun || !activeMonthBoundary) return blocked("BLOCKED_UNAVAILABLE_BOUNDARY", ["LOCKED_GATE_1B_BOUNDARY_NOT_AVAILABLE"]);

  const liChunUtcMs = Date.parse(liChun.utc);
  const birthUtcMs = birthUtc.getTime();
  const solarYear = birthUtcMs < liChunUtcMs ? localDate.year - 1 : localDate.year;
  const yearPillar = calculateYearPillarForSolarYear(solarYear);
  const monthPillar = calculateMonthPillar(yearPillar.stem, activeMonthBoundary);
  const boundaryFlags: BoundaryDispute[] = [];
  const yearBoundaryDistanceMs = Math.abs(birthUtcMs - liChunUtcMs);

  if (yearBoundaryDistanceMs <= BOUNDARY_TOLERANCE_MS) {
    boundaryFlags.push(
      buildBoundaryDispute("YEAR", liChun, yearBoundaryDistanceMs, [
        calculateYearPillarForSolarYear(localDate.year - 1),
        calculateYearPillarForSolarYear(localDate.year)
      ])
    );
  }

  const nearestBoundary = findNearestJieBoundary(birthUtc);
  if (nearestBoundary && nearestBoundary.boundary.key !== "LI_CHUN" && nearestBoundary.distanceMs <= BOUNDARY_TOLERANCE_MS) {
    const priorBoundary = findActiveJieBoundary(new Date(Date.parse(nearestBoundary.boundary.utc) - 1));
    const candidates = [priorBoundary, nearestBoundary.boundary]
      .filter((boundary): boundary is JieSolarTermBoundary => Boolean(boundary))
      .map((boundary) => calculateMonthPillar(yearPillar.stem, boundary));
    boundaryFlags.push(buildBoundaryDispute("MONTH", nearestBoundary.boundary, nearestBoundary.distanceMs, candidates));
  }

  trace.push("MR-01.v1.0 local civil time and IANA timezone policy applied");
  trace.push("MR-02.v1.0 Li Chun year boundary applied");
  trace.push("MR-03.v1.0 Jié month boundary and Five Tigers rule applied");

  return {
    status: boundaryFlags.length > 0 ? "BOUNDARY_DISPUTED" : "READY",
    birthUtc: birthUtc.toISOString(),
    yearPillar,
    monthPillar,
    boundaryFlags,
    versions: {
      calendarEngine: CALENDAR_ENGINE,
      calendarEngineVersion: CALENDAR_ENGINE_VERSION,
      ephemerisData: EPHEMERIS_DATA,
      ianaVersion: IANA_VERSION,
      ruleVersion: "MR-01.v1.0+MR-02.v1.0+MR-03.v1.0"
    },
    trace
  };
}
