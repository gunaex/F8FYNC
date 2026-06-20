import { calculateGate1BCalendar, type BoundaryDispute } from "./calendar";
import { advanceBranch, advanceStem, formatStemBranch, stemBranch, type StemBranch, type HeavenlyStemKey } from "./stems-branches";
import type { EarthlyBranchKey } from "./ephemeris";
import type { SolarTermProvider } from "./solar-term-types";

export type FourPillarsInput = {
  localDate: string;
  localTime?: string | null;
  birthTimeStatus: "KNOWN" | "UNKNOWN" | "APPROXIMATE" | "DISPUTED";
  timezoneId: string | null;
  timezoneConfirmationStatus: "CONFIRMED" | "SUGGESTED" | "UNRESOLVED" | "UNKNOWN";
  timeAdjustmentPolicy?: "LOCAL_CIVIL_TIME" | "TRUE_SOLAR_TIME";
  solarTermProvider?: SolarTermProvider;
};

export type FourPillarsBlockedResult = {
  status:
    | "BLOCKED_MISSING_TIMEZONE"
    | "BLOCKED_INVALID_TIMEZONE"
    | "BLOCKED_INVALID_INPUT"
    | "UNSUPPORTED_IN_V1"
    | "BLOCKED_UNAVAILABLE_BOUNDARY"
    | "BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE"
    | "BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE"
    | "BLOCKED_CALENDAR_SOURCE_UNAVAILABLE";
  reasonCodes: string[];
  trace: string[];
};

export type FourPillarsReadyResult = {
  status: "READY" | "PARTIAL" | "BOUNDARY_DISPUTED";
  chartType: "FOUR_PILLAR" | "THREE_PILLAR_PARTIAL";
  yearPillar: StemBranch;
  monthPillar: StemBranch;
  dayPillar: StemBranch;
  hourPillar: StemBranch | "UNKNOWN";
  hourPillarState: "KNOWN" | "UNKNOWN" | "APPROXIMATE" | "DISPUTED";
  affectedOutputs: string[];
  boundaryFlags: BoundaryDispute[];
  ziHourVariant?: {
    primaryDayPillar: StemBranch;
    alternativeDayPillar: StemBranch;
    disclosure: string;
  };
  fullBaziString: string;
  versions: {
    ruleVersion: "MR-01.v1.0+MR-02.v1.0+MR-03.v1.0+MR-04.v1.0+MR-05.v1.0";
    dayAnchor: "2000-01-01 Asia/Bangkok 戊午";
  };
  trace: string[];
};

export type FourPillarsResult = FourPillarsBlockedResult | FourPillarsReadyResult;

const LOCAL_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const LOCAL_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const DAY_ANCHOR_DATE = "2000-01-01";
const DAY_ANCHOR_STEM: HeavenlyStemKey = "WU";
const DAY_ANCHOR_BRANCH: EarthlyBranchKey = "WU";
const UNKNOWN_TIME_DISCLOSURE = "ไม่รู้เวลาเกิดใช่มั้ย? ดูได้แค่ 3 เสาก่อนนะ 🙂 อยากครบต้องใส่เวลาเกิดด้วย";

function blocked(status: FourPillarsBlockedResult["status"], reasonCodes: string[], trace: string[]): FourPillarsBlockedResult {
  return { status, reasonCodes, trace };
}

function parseLocalDate(localDate: string): { year: number; month: number; day: number } | null {
  if (!LOCAL_DATE_PATTERN.test(localDate)) return null;
  const [year, month, day] = localDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return { year, month, day };
}

function dateOnlyToUtcMs(localDate: string): number | null {
  const parsed = parseLocalDate(localDate);
  if (!parsed) return null;
  return Date.UTC(parsed.year, parsed.month - 1, parsed.day);
}

function dayDifference(localDate: string, anchorDate: string): number | null {
  const dateMs = dateOnlyToUtcMs(localDate);
  const anchorMs = dateOnlyToUtcMs(anchorDate);
  if (dateMs === null || anchorMs === null) return null;
  return Math.round((dateMs - anchorMs) / 86_400_000);
}

export function calculateDayPillar(localDate: string): StemBranch | null {
  const diff = dayDifference(localDate, DAY_ANCHOR_DATE);
  if (diff === null) return null;
  return stemBranch(advanceStem(DAY_ANCHOR_STEM, diff), advanceBranch(DAY_ANCHOR_BRANCH, diff));
}

function hourBranchForLocalTime(localTime: string): EarthlyBranchKey | null {
  if (!LOCAL_TIME_PATTERN.test(localTime)) return null;
  const [hour] = localTime.split(":").map(Number);
  if (hour === 23 || hour === 0) return "ZI";
  if (hour < 3) return "CHOU";
  if (hour < 5) return "YIN";
  if (hour < 7) return "MAO";
  if (hour < 9) return "CHEN";
  if (hour < 11) return "SI";
  if (hour < 13) return "WU";
  if (hour < 15) return "WEI";
  if (hour < 17) return "SHEN";
  if (hour < 19) return "YOU";
  if (hour < 21) return "XU";
  return "HAI";
}

function ziHourStem(dayStem: HeavenlyStemKey): HeavenlyStemKey {
  if (dayStem === "JIA" || dayStem === "JI") return "JIA";
  if (dayStem === "YI" || dayStem === "GENG") return "BING";
  if (dayStem === "BING" || dayStem === "XIN") return "WU";
  if (dayStem === "DING" || dayStem === "REN") return "GENG";
  return "REN";
}

export function calculateHourPillar(dayStem: HeavenlyStemKey, localTime: string): StemBranch | null {
  const branch = hourBranchForLocalTime(localTime);
  if (!branch) return null;
  const branchOrder: EarthlyBranchKey[] = ["ZI", "CHOU", "YIN", "MAO", "CHEN", "SI", "WU", "WEI", "SHEN", "YOU", "XU", "HAI"];
  const stem = advanceStem(ziHourStem(dayStem), branchOrder.indexOf(branch));
  return stemBranch(stem, branch);
}

function calculateAlternativeNextDayPillar(localDate: string): StemBranch | null {
  const parsed = parseLocalDate(localDate);
  if (!parsed) return null;
  const next = new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day + 1));
  return calculateDayPillar(next.toISOString().slice(0, 10));
}

function buildFullBaziString(yearPillar: StemBranch, monthPillar: StemBranch, dayPillar: StemBranch, hourPillar: StemBranch | "UNKNOWN"): string {
  const hour = hourPillar === "UNKNOWN" ? "UNKNOWN" : formatStemBranch(hourPillar);
  return [formatStemBranch(yearPillar), formatStemBranch(monthPillar), formatStemBranch(dayPillar), hour].join(" ");
}

export function calculateFourPillars(input: FourPillarsInput): FourPillarsResult {
  const trace = ["Gate 1C Four Pillars calculation started"];
  const calendarTime = input.birthTimeStatus === "UNKNOWN" ? "00:00" : input.localTime;
  const calendar = calculateGate1BCalendar({ ...input, localTime: calendarTime, birthTimeStatus: "KNOWN" });

  if (
    calendar.status === "BLOCKED_INVALID_INPUT" ||
    calendar.status === "BLOCKED_MISSING_TIMEZONE" ||
    calendar.status === "BLOCKED_INVALID_TIMEZONE" ||
    calendar.status === "UNSUPPORTED_IN_V1" ||
    calendar.status === "BLOCKED_UNAVAILABLE_BOUNDARY" ||
    calendar.status === "BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE" ||
    calendar.status === "BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE" ||
    calendar.status === "BLOCKED_CALENDAR_SOURCE_UNAVAILABLE"
  ) {
    return blocked(calendar.status, calendar.reasonCodes, [...trace, ...calendar.trace]);
  }
  if (calendar.status === "BLOCKED_MISSING_TIME") {
    return blocked("BLOCKED_INVALID_INPUT", calendar.reasonCodes, [...trace, ...calendar.trace]);
  }
  if (!("yearPillar" in calendar)) {
    return blocked("BLOCKED_UNAVAILABLE_BOUNDARY", ["GATE_1B_CALENDAR_RESULT_UNAVAILABLE"], [...trace, ...calendar.trace]);
  }

  const dayPillar = calculateDayPillar(input.localDate);
  if (!dayPillar) return blocked("BLOCKED_INVALID_INPUT", ["LOCAL_DATE_INVALID"], trace);

  let hourPillar: StemBranch | "UNKNOWN" = "UNKNOWN";
  const affectedOutputs: string[] = [];
  if (input.birthTimeStatus === "KNOWN") {
    if (!input.localTime) return blocked("BLOCKED_INVALID_INPUT", ["KNOWN_TIME_REQUIRES_LOCAL_TIME"], trace);
    const calculatedHour = calculateHourPillar(dayPillar.stem, input.localTime);
    if (!calculatedHour) return blocked("BLOCKED_INVALID_INPUT", ["LOCAL_TIME_INVALID"], trace);
    hourPillar = calculatedHour;
  } else {
    affectedOutputs.push("hour_pillar", "hour_dependent_outputs");
    trace.push(UNKNOWN_TIME_DISCLOSURE);
  }

  const ziHourVariant =
    input.birthTimeStatus === "KNOWN" && input.localTime && input.localTime >= "23:00"
      ? {
          primaryDayPillar: dayPillar,
          alternativeDayPillar: calculateAlternativeNextDayPillar(input.localDate) ?? dayPillar,
          disclosure: "Birth falls between 23:00 and 00:00; F8SYNC V1 uses civil midnight and discloses the Zi-hour split variant."
        }
      : undefined;

  trace.push("MR-04.v1.0 day pillar anchor and civil midnight rollover applied");
  trace.push("MR-05.v1.0 hour pillar and unknown-time policy applied");

  const status = calendar.status === "BOUNDARY_DISPUTED" ? "BOUNDARY_DISPUTED" : input.birthTimeStatus === "UNKNOWN" ? "PARTIAL" : "READY";

  return {
    status,
    chartType: input.birthTimeStatus === "UNKNOWN" ? "THREE_PILLAR_PARTIAL" : "FOUR_PILLAR",
    yearPillar: calendar.yearPillar,
    monthPillar: calendar.monthPillar,
    dayPillar,
    hourPillar,
    hourPillarState: input.birthTimeStatus,
    affectedOutputs,
    boundaryFlags: calendar.boundaryFlags,
    ziHourVariant,
    fullBaziString: buildFullBaziString(calendar.yearPillar, calendar.monthPillar, dayPillar, hourPillar),
    versions: {
      ruleVersion: "MR-01.v1.0+MR-02.v1.0+MR-03.v1.0+MR-04.v1.0+MR-05.v1.0",
      dayAnchor: "2000-01-01 Asia/Bangkok 戊午"
    },
    trace: [...trace, ...calendar.trace]
  };
}
