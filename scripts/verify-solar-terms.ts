import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

type TermCode =
  | "CHUN_FEN" | "QING_MING" | "GU_YU" | "LI_XIA" | "XIAO_MAN" | "MANG_ZHONG"
  | "XIA_ZHI" | "XIAO_SHU" | "DA_SHU" | "LI_QIU" | "CHU_SHU" | "BAI_LU"
  | "QIU_FEN" | "HAN_LU" | "SHUANG_JIANG" | "LI_DONG" | "XIAO_XUE" | "DA_XUE"
  | "DONG_ZHI" | "XIAO_HAN" | "DA_HAN" | "LI_CHUN" | "YU_SHUI" | "JING_ZHE";

type Dataset = {
  manifest: Omit<DatasetManifest, "datasetChecksum" | "datasetChecksumAlgorithm" | "datasetFileSha256">;
  terms: Array<{
    year: number;
    termCode: TermCode;
    termType: "JIE" | "QI";
    targetLongitudeDegrees: number;
    instantUtc: string;
  }>;
};

type DatasetManifest = {
  datasetId: string;
  datasetVersion: string;
  coverageStart: string;
  coverageEnd: string;
  birthYearSupportStart: number;
  birthYearSupportEnd: number;
  recordCount: number;
  datasetChecksum: string;
  datasetChecksumAlgorithm: string;
  datasetFileSha256: string;
};

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

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DATASET_PATH = join(ROOT, "data", "solar-terms", "solar-terms-1899-2101.v1.json");
const MANIFEST_PATH = join(ROOT, "data", "solar-terms", "manifest.json");

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const object = value as Record<string, unknown>;
  return `{${Object.keys(object).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(object[key])}`).join(",")}}`;
}

function checksum(value: unknown): string {
  return createHash("sha256").update(stableStringify(value)).digest("hex");
}

function fileSha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function assert(condition: unknown, message: string) {
  if (!condition) throw new Error(message);
}

const dataset = JSON.parse(readFileSync(DATASET_PATH, "utf8")) as Dataset;
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as DatasetManifest;

assert(manifest.datasetId === dataset.manifest.datasetId, "manifest datasetId mismatch");
assert(manifest.datasetVersion === dataset.manifest.datasetVersion, "manifest datasetVersion mismatch");
assert(manifest.recordCount === 4872, "manifest record count must be 4872");
assert(dataset.terms.length === 4872, "dataset record count must be 4872");
assert(manifest.coverageStart === "1899-01-01", "coverageStart mismatch");
assert(manifest.coverageEnd === "2101-12-31", "coverageEnd mismatch");
assert(manifest.birthYearSupportStart === 1900, "birth support start mismatch");
assert(manifest.birthYearSupportEnd === 2100, "birth support end mismatch");
assert(manifest.datasetChecksumAlgorithm === "sha256(stable-json-canonical-dataset-payload)", "dataset checksum algorithm mismatch");
assert(checksum(dataset) === manifest.datasetChecksum, "dataset checksum mismatch");
assert(fileSha256(DATASET_PATH) === manifest.datasetFileSha256, "dataset file SHA-256 mismatch");

let previous = Number.NEGATIVE_INFINITY;
const unique = new Set<string>();
for (const term of dataset.terms) {
  const timestamp = Date.parse(term.instantUtc);
  assert(!Number.isNaN(timestamp), `invalid ISO instant ${term.instantUtc}`);
  assert(timestamp > previous, `terms are not strictly chronological at ${term.year} ${term.termCode}`);
  previous = timestamp;
  assert(TERM_DEFINITIONS[term.termCode]?.targetLongitudeDegrees === term.targetLongitudeDegrees, `longitude mismatch for ${term.termCode}`);
  assert(TERM_DEFINITIONS[term.termCode]?.termType === term.termType, `term type mismatch for ${term.termCode}`);
  const key = `${term.year}:${term.termCode}`;
  assert(!unique.has(key), `duplicate year/term ${key}`);
  unique.add(key);
}

for (let year = 1899; year <= 2101; year += 1) {
  const terms = dataset.terms.filter((term) => term.year === year);
  assert(terms.length === 24, `expected 24 terms for ${year}`);
  assert(JSON.stringify(terms.map((term) => term.termCode)) === JSON.stringify(CHRONOLOGICAL_TERM_CODES), `unexpected term order for ${year}`);
}

console.log(JSON.stringify({ ok: true, recordCount: dataset.terms.length, datasetChecksum: manifest.datasetChecksum, datasetFileSha256: manifest.datasetFileSha256 }, null, 2));
