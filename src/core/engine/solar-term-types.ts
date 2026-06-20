import type { EarthlyBranchKey } from "./ephemeris";

export type SolarTermCode =
  | "CHUN_FEN"
  | "QING_MING"
  | "GU_YU"
  | "LI_XIA"
  | "XIAO_MAN"
  | "MANG_ZHONG"
  | "XIA_ZHI"
  | "XIAO_SHU"
  | "DA_SHU"
  | "LI_QIU"
  | "CHU_SHU"
  | "BAI_LU"
  | "QIU_FEN"
  | "HAN_LU"
  | "SHUANG_JIANG"
  | "LI_DONG"
  | "XIAO_XUE"
  | "DA_XUE"
  | "DONG_ZHI"
  | "XIAO_HAN"
  | "DA_HAN"
  | "LI_CHUN"
  | "YU_SHUI"
  | "JING_ZHE";

export type SolarTermType = "JIE" | "QI";

export type SolarTermDefinition = {
  code: SolarTermCode;
  name: string;
  targetLongitudeDegrees: number;
  termType: SolarTermType;
  monthNumber?: number;
  branchKey?: EarthlyBranchKey;
};

export type SolarTermBoundary = {
  termCode: SolarTermCode;
  termType: SolarTermType;
  targetLongitudeDegrees: number;
  instantUtc: string;
  source: {
    providerId: string;
    datasetId: string;
    datasetVersion: string;
    astronomyLibrary: string;
    astronomyLibraryVersion: string;
    calculationMethod: string;
  };
};

export type SolarTermDatasetManifest = {
  datasetId: string;
  datasetVersion: string;
  coverageStart: string;
  coverageEnd: string;
  birthYearSupportStart: number;
  birthYearSupportEnd: number;
  recordCount: number;
  sourceLibrary: string;
  sourceLibraryVersion: string;
  sourceLibraryLicense: string;
  calculationMethod: string;
  generatedAt: string;
  generatorVersion: string;
  datasetChecksum: string;
  datasetChecksumAlgorithm: string;
  datasetFileSha256: string;
  termDefinitionVersion: string;
};

export type SolarTermDataset = {
  manifest: Omit<SolarTermDatasetManifest, "datasetChecksum" | "datasetChecksumAlgorithm" | "datasetFileSha256">;
  terms: Array<{
    year: number;
    termCode: SolarTermCode;
    termType: SolarTermType;
    targetLongitudeDegrees: number;
    instantUtc: string;
    sourceId: string;
    sourceVersion: string;
    ephemerisId: string;
    calculationVersion: string;
  }>;
};

export type SolarTermProviderStatus =
  | "READY"
  | "BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE"
  | "BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE"
  | "BLOCKED_CALENDAR_SOURCE_UNAVAILABLE";

export type SolarTermYearResult =
  | { status: "READY"; year: number; terms: SolarTermBoundary[]; trace: string[] }
  | { status: Exclude<SolarTermProviderStatus, "READY">; reasonCodes: string[]; trace: string[] };

export type SolarTermBoundaryResult =
  | { status: "READY"; boundary: SolarTermBoundary; trace: string[] }
  | { status: Exclude<SolarTermProviderStatus, "READY">; reasonCodes: string[]; trace: string[] };

export type SolarTermBoundaryContext =
  | { status: "READY"; boundary: SolarTermBoundary; distanceMs: number; trace: string[] }
  | { status: Exclude<SolarTermProviderStatus, "READY">; reasonCodes: string[]; trace: string[] };

export type SolarTermProviderCapabilities = {
  providerId: string;
  datasetId: string;
  datasetVersion: string;
  coverageStart: string;
  coverageEnd: string;
  birthYearSupportStart: number;
  birthYearSupportEnd: number;
  runtimeCalculation: false;
  usesGoldenFixtures: boolean;
};

export interface SolarTermProvider {
  getTermsForYear(year: number): SolarTermYearResult;
  getLiChunBoundary(year: number): SolarTermBoundaryResult;
  findActiveJieBoundary(instantUtc: string): SolarTermBoundaryContext;
  findNearestJieBoundary(instantUtc: string): SolarTermBoundaryContext;
  getCapabilities(): SolarTermProviderCapabilities;
}

export const SOLAR_TERM_DEFINITIONS: SolarTermDefinition[] = [
  { code: "CHUN_FEN", name: "Chun Fen", targetLongitudeDegrees: 0, termType: "QI" },
  { code: "QING_MING", name: "Qing Ming", targetLongitudeDegrees: 15, termType: "JIE", monthNumber: 3, branchKey: "CHEN" },
  { code: "GU_YU", name: "Gu Yu", targetLongitudeDegrees: 30, termType: "QI" },
  { code: "LI_XIA", name: "Li Xia", targetLongitudeDegrees: 45, termType: "JIE", monthNumber: 4, branchKey: "SI" },
  { code: "XIAO_MAN", name: "Xiao Man", targetLongitudeDegrees: 60, termType: "QI" },
  { code: "MANG_ZHONG", name: "Mang Zhong", targetLongitudeDegrees: 75, termType: "JIE", monthNumber: 5, branchKey: "WU" },
  { code: "XIA_ZHI", name: "Xia Zhi", targetLongitudeDegrees: 90, termType: "QI" },
  { code: "XIAO_SHU", name: "Xiao Shu", targetLongitudeDegrees: 105, termType: "JIE", monthNumber: 6, branchKey: "WEI" },
  { code: "DA_SHU", name: "Da Shu", targetLongitudeDegrees: 120, termType: "QI" },
  { code: "LI_QIU", name: "Li Qiu", targetLongitudeDegrees: 135, termType: "JIE", monthNumber: 7, branchKey: "SHEN" },
  { code: "CHU_SHU", name: "Chu Shu", targetLongitudeDegrees: 150, termType: "QI" },
  { code: "BAI_LU", name: "Bai Lu", targetLongitudeDegrees: 165, termType: "JIE", monthNumber: 8, branchKey: "YOU" },
  { code: "QIU_FEN", name: "Qiu Fen", targetLongitudeDegrees: 180, termType: "QI" },
  { code: "HAN_LU", name: "Han Lu", targetLongitudeDegrees: 195, termType: "JIE", monthNumber: 9, branchKey: "XU" },
  { code: "SHUANG_JIANG", name: "Shuang Jiang", targetLongitudeDegrees: 210, termType: "QI" },
  { code: "LI_DONG", name: "Li Dong", targetLongitudeDegrees: 225, termType: "JIE", monthNumber: 10, branchKey: "HAI" },
  { code: "XIAO_XUE", name: "Xiao Xue", targetLongitudeDegrees: 240, termType: "QI" },
  { code: "DA_XUE", name: "Da Xue", targetLongitudeDegrees: 255, termType: "JIE", monthNumber: 11, branchKey: "ZI" },
  { code: "DONG_ZHI", name: "Dong Zhi", targetLongitudeDegrees: 270, termType: "QI" },
  { code: "XIAO_HAN", name: "Xiao Han", targetLongitudeDegrees: 285, termType: "JIE", monthNumber: 12, branchKey: "CHOU" },
  { code: "DA_HAN", name: "Da Han", targetLongitudeDegrees: 300, termType: "QI" },
  { code: "LI_CHUN", name: "Li Chun", targetLongitudeDegrees: 315, termType: "JIE", monthNumber: 1, branchKey: "YIN" },
  { code: "YU_SHUI", name: "Yu Shui", targetLongitudeDegrees: 330, termType: "QI" },
  { code: "JING_ZHE", name: "Jing Zhe", targetLongitudeDegrees: 345, termType: "JIE", monthNumber: 2, branchKey: "MAO" }
];

export const CHRONOLOGICAL_TERM_CODES: SolarTermCode[] = [
  "XIAO_HAN",
  "DA_HAN",
  "LI_CHUN",
  "YU_SHUI",
  "JING_ZHE",
  "CHUN_FEN",
  "QING_MING",
  "GU_YU",
  "LI_XIA",
  "XIAO_MAN",
  "MANG_ZHONG",
  "XIA_ZHI",
  "XIAO_SHU",
  "DA_SHU",
  "LI_QIU",
  "CHU_SHU",
  "BAI_LU",
  "QIU_FEN",
  "HAN_LU",
  "SHUANG_JIANG",
  "LI_DONG",
  "XIAO_XUE",
  "DA_XUE",
  "DONG_ZHI"
];

export const SOLAR_TERM_BY_CODE = Object.fromEntries(SOLAR_TERM_DEFINITIONS.map((term) => [term.code, term])) as Record<SolarTermCode, SolarTermDefinition>;
