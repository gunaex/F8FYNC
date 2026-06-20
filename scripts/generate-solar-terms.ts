import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SearchSunLongitude } from "astronomy-engine";

type TermCode =
  | "CHUN_FEN" | "QING_MING" | "GU_YU" | "LI_XIA" | "XIAO_MAN" | "MANG_ZHONG"
  | "XIA_ZHI" | "XIAO_SHU" | "DA_SHU" | "LI_QIU" | "CHU_SHU" | "BAI_LU"
  | "QIU_FEN" | "HAN_LU" | "SHUANG_JIANG" | "LI_DONG" | "XIAO_XUE" | "DA_XUE"
  | "DONG_ZHI" | "XIAO_HAN" | "DA_HAN" | "LI_CHUN" | "YU_SHUI" | "JING_ZHE";

type DatasetTerm = {
  year: number;
  termCode: TermCode;
  termType: "JIE" | "QI";
  targetLongitudeDegrees: number;
  instantUtc: string;
  sourceId: string;
  sourceVersion: string;
  ephemerisId: string;
  calculationVersion: string;
};

type DatasetManifest = {
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

type Dataset = {
  manifest: Omit<DatasetManifest, "datasetChecksum" | "datasetChecksumAlgorithm" | "datasetFileSha256">;
  terms: DatasetTerm[];
};

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DATA_DIR = join(ROOT, "data", "solar-terms");
const DATASET_PATH = join(DATA_DIR, "solar-terms-1899-2101.v1.json");
const MANIFEST_PATH = join(DATA_DIR, "manifest.json");

const DATASET_ID = "f8sync-solar-terms";
const DATASET_VERSION = "solar-terms-1899-2101.v1";
const SOURCE_LIBRARY = "astronomy-engine";
const SOURCE_LIBRARY_VERSION = "2.1.19";
const CALCULATION_METHOD = "SearchSunLongitude";
const GENERATED_AT = "2026-06-20T00:00:00.000Z";
const GENERATOR_VERSION = "f8sync-solar-term-generator.v1";
const TERM_DEFINITION_VERSION = "F8SYNC-SOLAR-TERM-V1";
const DATASET_CHECKSUM_ALGORITHM = "sha256(stable-json-canonical-dataset-payload)";
const TERM_DEFINITIONS: Record<TermCode, { targetLongitudeDegrees: number; termType: "JIE" | "QI" }> = {
  CHUN_FEN: { targetLongitudeDegrees: 0, termType: "QI" },
  QING_MING: { targetLongitudeDegrees: 15, termType: "JIE" },
  GU_YU: { targetLongitudeDegrees: 30, termType: "QI" },
  LI_XIA: { targetLongitudeDegrees: 45, termType: "JIE" },
  XIAO_MAN: { targetLongitudeDegrees: 60, termType: "QI" },
  MANG_ZHONG: { targetLongitudeDegrees: 75, termType: "JIE" },
  XIA_ZHI: { targetLongitudeDegrees: 90, termType: "QI" },
  XIAO_SHU: { targetLongitudeDegrees: 105, termType: "JIE" },
  DA_SHU: { targetLongitudeDegrees: 120, termType: "QI" },
  LI_QIU: { targetLongitudeDegrees: 135, termType: "JIE" },
  CHU_SHU: { targetLongitudeDegrees: 150, termType: "QI" },
  BAI_LU: { targetLongitudeDegrees: 165, termType: "JIE" },
  QIU_FEN: { targetLongitudeDegrees: 180, termType: "QI" },
  HAN_LU: { targetLongitudeDegrees: 195, termType: "JIE" },
  SHUANG_JIANG: { targetLongitudeDegrees: 210, termType: "QI" },
  LI_DONG: { targetLongitudeDegrees: 225, termType: "JIE" },
  XIAO_XUE: { targetLongitudeDegrees: 240, termType: "QI" },
  DA_XUE: { targetLongitudeDegrees: 255, termType: "JIE" },
  DONG_ZHI: { targetLongitudeDegrees: 270, termType: "QI" },
  XIAO_HAN: { targetLongitudeDegrees: 285, termType: "JIE" },
  DA_HAN: { targetLongitudeDegrees: 300, termType: "QI" },
  LI_CHUN: { targetLongitudeDegrees: 315, termType: "JIE" },
  YU_SHUI: { targetLongitudeDegrees: 330, termType: "QI" },
  JING_ZHE: { targetLongitudeDegrees: 345, termType: "JIE" }
};
const CHRONOLOGICAL_TERM_CODES: TermCode[] = [
  "XIAO_HAN", "DA_HAN", "LI_CHUN", "YU_SHUI", "JING_ZHE", "CHUN_FEN",
  "QING_MING", "GU_YU", "LI_XIA", "XIAO_MAN", "MANG_ZHONG", "XIA_ZHI",
  "XIAO_SHU", "DA_SHU", "LI_QIU", "CHU_SHU", "BAI_LU", "QIU_FEN",
  "HAN_LU", "SHUANG_JIANG", "LI_DONG", "XIAO_XUE", "DA_XUE", "DONG_ZHI"
];

function toSecondIso(date: Date): string {
  return new Date(Math.round(date.getTime() / 1000) * 1000).toISOString();
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const object = value as Record<string, unknown>;
  return `{${Object.keys(object).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(object[key])}`).join(",")}}`;
}

function checksum(value: unknown): string {
  return createHash("sha256").update(stableStringify(value)).digest("hex");
}

function generateYear(year: number): DatasetTerm[] {
  const terms: DatasetTerm[] = [];
  let searchStart = new Date(Date.UTC(year, 0, 1, 0, 0, 0));

  for (const termCode of CHRONOLOGICAL_TERM_CODES) {
    const definition = TERM_DEFINITIONS[termCode];
    const found = SearchSunLongitude(definition.targetLongitudeDegrees, searchStart, 40);
    if (!found) throw new Error(`SearchSunLongitude failed for ${year} ${termCode}`);
    const instantUtc = toSecondIso(found.date);
    const eventYear = new Date(instantUtc).getUTCFullYear();
    if (eventYear !== year) throw new Error(`Generated ${termCode} for ${year} outside UTC year: ${instantUtc}`);
    terms.push({
      year,
      termCode,
      termType: definition.termType,
      targetLongitudeDegrees: definition.targetLongitudeDegrees,
      instantUtc,
      sourceId: SOURCE_LIBRARY,
      sourceVersion: SOURCE_LIBRARY_VERSION,
      ephemerisId: "astronomy-engine-internal-solar-theory",
      calculationVersion: GENERATOR_VERSION
    });
    searchStart = new Date(Date.parse(instantUtc) + 86_400_000);
  }

  return terms;
}

const terms = Array.from({ length: 2101 - 1899 + 1 }, (_, index) => 1899 + index).flatMap(generateYear);
const manifestWithoutChecksum: Dataset["manifest"] = {
  datasetId: DATASET_ID,
  datasetVersion: DATASET_VERSION,
  coverageStart: "1899-01-01",
  coverageEnd: "2101-12-31",
  birthYearSupportStart: 1900,
  birthYearSupportEnd: 2100,
  recordCount: terms.length,
  sourceLibrary: SOURCE_LIBRARY,
  sourceLibraryVersion: SOURCE_LIBRARY_VERSION,
  sourceLibraryLicense: "MIT",
  calculationMethod: CALCULATION_METHOD,
  generatedAt: GENERATED_AT,
  generatorVersion: GENERATOR_VERSION,
  termDefinitionVersion: TERM_DEFINITION_VERSION
};
const dataset: Dataset = { manifest: manifestWithoutChecksum, terms };
const datasetChecksum = checksum(dataset);

mkdirSync(DATA_DIR, { recursive: true });
writeFileSync(DATASET_PATH, `${JSON.stringify(dataset, null, 2)}\n`);
const datasetFileSha256 = createHash("sha256").update(readFileSync(DATASET_PATH)).digest("hex");
const manifest: DatasetManifest = { ...manifestWithoutChecksum, datasetChecksum, datasetChecksumAlgorithm: DATASET_CHECKSUM_ALGORITHM, datasetFileSha256 };
writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(JSON.stringify({ dataset: DATASET_PATH, manifest: MANIFEST_PATH, recordCount: terms.length, datasetChecksum, datasetFileSha256 }, null, 2));
