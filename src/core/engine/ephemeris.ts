export type SolarTermKey = "XIAO_HAN" | "LI_CHUN" | "JING_ZHE" | "QING_MING";

export type JieSolarTermBoundary = {
  key: SolarTermKey;
  name: string;
  eclipticLongitude: number;
  monthNumber: number;
  branchKey: EarthlyBranchKey;
  utc: string;
  source: "LOCKED_GATE_1B_BOUNDARY_TABLE";
};

export type EarthlyBranchKey =
  | "ZI"
  | "CHOU"
  | "YIN"
  | "MAO"
  | "CHEN"
  | "SI"
  | "WU"
  | "WEI"
  | "SHEN"
  | "YOU"
  | "XU"
  | "HAI";

export const CALENDAR_ENGINE = "f8sync-gate-1b-boundary-table";
export const CALENDAR_ENGINE_VERSION = "gate-1b-boundary-table.v1";
export const EPHEMERIS_DATA = "DE431-derived-boundary-fixtures";
export const IANA_VERSION = "runtime-intl";

const lockedGate1BBoundaries: JieSolarTermBoundary[] = [
  {
    key: "XIAO_HAN",
    name: "Xiao Han",
    eclipticLongitude: 285,
    monthNumber: 12,
    branchKey: "CHOU",
    utc: "2000-01-06T07:00:00.000Z",
    source: "LOCKED_GATE_1B_BOUNDARY_TABLE"
  },
  {
    key: "LI_CHUN",
    name: "Li Chun",
    eclipticLongitude: 315,
    monthNumber: 1,
    branchKey: "YIN",
    utc: "2000-02-04T12:40:00.000Z",
    source: "LOCKED_GATE_1B_BOUNDARY_TABLE"
  },
  {
    key: "LI_CHUN",
    name: "Li Chun",
    eclipticLongitude: 315,
    monthNumber: 1,
    branchKey: "YIN",
    utc: "2024-02-04T08:27:00.000Z",
    source: "LOCKED_GATE_1B_BOUNDARY_TABLE"
  },
  {
    key: "JING_ZHE",
    name: "Jing Zhe",
    eclipticLongitude: 345,
    monthNumber: 2,
    branchKey: "MAO",
    utc: "2024-03-05T02:22:00.000Z",
    source: "LOCKED_GATE_1B_BOUNDARY_TABLE"
  },
  {
    key: "QING_MING",
    name: "Qing Ming",
    eclipticLongitude: 15,
    monthNumber: 3,
    branchKey: "CHEN",
    utc: "2024-04-04T07:02:00.000Z",
    source: "LOCKED_GATE_1B_BOUNDARY_TABLE"
  }
];

export function listLockedGate1BBoundaries(): JieSolarTermBoundary[] {
  return [...lockedGate1BBoundaries].sort((left, right) => Date.parse(left.utc) - Date.parse(right.utc));
}

export function getLiChunBoundary(gregorianYear: number): JieSolarTermBoundary | null {
  return lockedGate1BBoundaries.find((boundary) => boundary.key === "LI_CHUN" && new Date(boundary.utc).getUTCFullYear() === gregorianYear) ?? null;
}

export function findNearestJieBoundary(utcDate: Date): { boundary: JieSolarTermBoundary; distanceMs: number } | null {
  const timestamp = utcDate.getTime();
  let nearest: { boundary: JieSolarTermBoundary; distanceMs: number } | null = null;

  for (const boundary of lockedGate1BBoundaries) {
    const distanceMs = Math.abs(timestamp - Date.parse(boundary.utc));
    if (!nearest || distanceMs < nearest.distanceMs) nearest = { boundary, distanceMs };
  }

  return nearest;
}

export function findActiveJieBoundary(utcDate: Date): JieSolarTermBoundary | null {
  const timestamp = utcDate.getTime();
  const boundaries = listLockedGate1BBoundaries().filter((boundary) => Date.parse(boundary.utc) <= timestamp);
  return boundaries.at(-1) ?? null;
}
