import manifestJson from "../../../data/solar-terms/manifest.json";
import datasetJson from "../../../data/solar-terms/solar-terms-1899-2101.v1.json";
import {
  SOLAR_TERM_BY_CODE,
  type SolarTermBoundary,
  type SolarTermBoundaryContext,
  type SolarTermBoundaryResult,
  type SolarTermDataset,
  type SolarTermDatasetManifest,
  type SolarTermProvider,
  type SolarTermProviderCapabilities,
  type SolarTermYearResult
} from "./solar-term-types";
import type { JieSolarTermBoundary } from "./ephemeris";

type DatasetTerm = SolarTermDataset["terms"][number];

const productionManifest = manifestJson as SolarTermDatasetManifest;
const productionDataset = datasetJson as SolarTermDataset;

function blocked(status: Exclude<SolarTermYearResult["status"], "READY">, reasonCodes: string[], trace: string[]) {
  return { status, reasonCodes, trace };
}

function boundaryFromDataset(term: DatasetTerm, providerId: string, manifest: SolarTermDatasetManifest): SolarTermBoundary {
  return {
    termCode: term.termCode,
    termType: term.termType,
    targetLongitudeDegrees: term.targetLongitudeDegrees,
    instantUtc: term.instantUtc,
    source: {
      providerId,
      datasetId: manifest.datasetId,
      datasetVersion: manifest.datasetVersion,
      astronomyLibrary: manifest.sourceLibrary,
      astronomyLibraryVersion: manifest.sourceLibraryVersion,
      calculationMethod: manifest.calculationMethod
    }
  };
}

function sortTerms(terms: SolarTermBoundary[]): SolarTermBoundary[] {
  return [...terms].sort((left, right) => Date.parse(left.instantUtc) - Date.parse(right.instantUtc));
}

function termYear(term: SolarTermBoundary): number {
  return new Date(term.instantUtc).getUTCFullYear();
}

function validateDataset(dataset: SolarTermDataset, manifest: SolarTermDatasetManifest): string[] {
  const reasonCodes: string[] = [];
  if (!dataset?.terms?.length) reasonCodes.push("SOLAR_TERM_DATASET_EMPTY");
  if (dataset?.terms?.length !== manifest.recordCount) reasonCodes.push("SOLAR_TERM_RECORD_COUNT_MISMATCH");
  if (dataset?.manifest?.datasetId !== manifest.datasetId) reasonCodes.push("SOLAR_TERM_DATASET_ID_MISMATCH");
  if (dataset?.manifest?.datasetVersion !== manifest.datasetVersion) reasonCodes.push("SOLAR_TERM_DATASET_VERSION_MISMATCH");
  return reasonCodes;
}

export class ProductionSolarTermProvider implements SolarTermProvider {
  private readonly providerId = "production-solar-term-provider";
  private readonly dataset: SolarTermDataset;
  private readonly manifest: SolarTermDatasetManifest;
  private readonly datasetIssues: string[];

  constructor(dataset: SolarTermDataset = productionDataset, manifest: SolarTermDatasetManifest = productionManifest) {
    this.dataset = dataset;
    this.manifest = manifest;
    this.datasetIssues = validateDataset(dataset, manifest);
  }

  getCapabilities(): SolarTermProviderCapabilities {
    return {
      providerId: this.providerId,
      datasetId: this.manifest.datasetId,
      datasetVersion: this.manifest.datasetVersion,
      coverageStart: this.manifest.coverageStart,
      coverageEnd: this.manifest.coverageEnd,
      birthYearSupportStart: this.manifest.birthYearSupportStart,
      birthYearSupportEnd: this.manifest.birthYearSupportEnd,
      runtimeCalculation: false,
      usesGoldenFixtures: false
    };
  }

  getTermsForYear(year: number): SolarTermYearResult {
    const trace = [`${this.providerId} dataset ${this.manifest.datasetVersion} requested year ${year}`];
    if (this.datasetIssues.length) return blocked("BLOCKED_CALENDAR_SOURCE_UNAVAILABLE", this.datasetIssues, trace);
    if (year < this.manifest.birthYearSupportStart - 1 || year > this.manifest.birthYearSupportEnd + 1) {
      return blocked("BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE", ["SOLAR_TERM_YEAR_OUT_OF_DATASET_RANGE"], trace);
    }
    const terms = this.dataset.terms.filter((term) => term.year === year).map((term) => boundaryFromDataset(term, this.providerId, this.manifest));
    if (!terms.length || (!this.getCapabilities().usesGoldenFixtures && terms.length !== 24)) {
      return blocked("BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE", ["SOLAR_TERM_YEAR_INCOMPLETE"], trace);
    }
    return { status: "READY", year, terms: sortTerms(terms), trace };
  }

  getLiChunBoundary(year: number): SolarTermBoundaryResult {
    const result = this.getTermsForYear(year);
    if (result.status !== "READY") return result;
    const boundary = result.terms.find((term) => term.termCode === "LI_CHUN");
    if (!boundary) return blocked("BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE", ["LI_CHUN_BOUNDARY_NOT_FOUND"], result.trace);
    return { status: "READY", boundary, trace: result.trace };
  }

  findActiveJieBoundary(instantUtc: string): SolarTermBoundaryContext {
    const trace = [`${this.providerId} active Jie lookup at ${instantUtc}`];
    if (this.datasetIssues.length) return blocked("BLOCKED_CALENDAR_SOURCE_UNAVAILABLE", this.datasetIssues, trace);
    const timestamp = Date.parse(instantUtc);
    if (Number.isNaN(timestamp)) return blocked("BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE", ["INSTANT_UTC_INVALID"], trace);
    const boundaries = sortTerms(
      this.dataset.terms
        .filter((term) => term.termType === "JIE")
        .map((term) => boundaryFromDataset(term, this.providerId, this.manifest))
        .filter((term) => Date.parse(term.instantUtc) <= timestamp)
    );
    const boundary = boundaries.at(-1);
    if (!boundary) return blocked("BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE", ["NO_ACTIVE_JIE_BOUNDARY_FOR_INSTANT"], trace);
    return { status: "READY", boundary, distanceMs: timestamp - Date.parse(boundary.instantUtc), trace };
  }

  findNearestJieBoundary(instantUtc: string): SolarTermBoundaryContext {
    const trace = [`${this.providerId} nearest Jie lookup at ${instantUtc}`];
    if (this.datasetIssues.length) return blocked("BLOCKED_CALENDAR_SOURCE_UNAVAILABLE", this.datasetIssues, trace);
    const timestamp = Date.parse(instantUtc);
    if (Number.isNaN(timestamp)) return blocked("BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE", ["INSTANT_UTC_INVALID"], trace);
    let nearest: { boundary: SolarTermBoundary; distanceMs: number } | null = null;
    for (const term of this.dataset.terms) {
      if (term.termType !== "JIE") continue;
      const boundary = boundaryFromDataset(term, this.providerId, this.manifest);
      const distanceMs = Math.abs(timestamp - Date.parse(boundary.instantUtc));
      if (!nearest || distanceMs < nearest.distanceMs) nearest = { boundary, distanceMs };
    }
    if (!nearest) return blocked("BLOCKED_SOLAR_TERM_DATA_UNAVAILABLE", ["NO_JIE_BOUNDARIES_IN_DATASET"], trace);
    return { status: "READY", boundary: nearest.boundary, distanceMs: nearest.distanceMs, trace };
  }
}

export class GoldenFixtureSolarTermProvider extends ProductionSolarTermProvider {
  constructor(fixtures: JieSolarTermBoundary[]) {
    const terms = fixtures.map((fixture) => ({
      year: new Date(fixture.utc).getUTCFullYear(),
      termCode: fixture.key,
      termType: "JIE" as const,
      targetLongitudeDegrees: fixture.eclipticLongitude,
      instantUtc: fixture.utc,
      sourceId: "golden-fixture",
      sourceVersion: "gate-1b-fixture.v1",
      ephemerisId: "locked-golden-fixture",
      calculationVersion: "golden-fixture.v1"
    }));
    const years = terms.map((term) => term.year);
    super(
      {
        manifest: {
          datasetId: "golden-fixture-solar-terms",
          datasetVersion: "gate-1b-fixture.v1",
          coverageStart: `${Math.min(...years)}-01-01`,
          coverageEnd: `${Math.max(...years)}-12-31`,
          birthYearSupportStart: Math.min(...years),
          birthYearSupportEnd: Math.max(...years),
          recordCount: terms.length,
          sourceLibrary: "golden-fixture",
          sourceLibraryVersion: "gate-1b-fixture.v1",
          sourceLibraryLicense: "F8SYNC internal test fixture",
          calculationMethod: "locked-fixture",
          generatedAt: "2026-06-20T00:00:00.000Z",
          generatorVersion: "golden-fixture.v1",
          termDefinitionVersion: "F8SYNC-SOLAR-TERM-V1"
        },
        terms
      },
      {
        datasetId: "golden-fixture-solar-terms",
        datasetVersion: "gate-1b-fixture.v1",
        coverageStart: `${Math.min(...years)}-01-01`,
        coverageEnd: `${Math.max(...years)}-12-31`,
        birthYearSupportStart: Math.min(...years),
        birthYearSupportEnd: Math.max(...years),
        recordCount: terms.length,
        sourceLibrary: "golden-fixture",
        sourceLibraryVersion: "gate-1b-fixture.v1",
        sourceLibraryLicense: "F8SYNC internal test fixture",
        calculationMethod: "locked-fixture",
        generatedAt: "2026-06-20T00:00:00.000Z",
        generatorVersion: "golden-fixture.v1",
        datasetChecksum: "golden-fixture",
        datasetChecksumAlgorithm: "golden-fixture",
        datasetFileSha256: "golden-fixture",
        termDefinitionVersion: "F8SYNC-SOLAR-TERM-V1"
      }
    );
  }

  override getCapabilities(): SolarTermProviderCapabilities {
    return {
      ...super.getCapabilities(),
      providerId: "golden-fixture-solar-term-provider",
      usesGoldenFixtures: true
    };
  }
}

export const productionSolarTermProvider = new ProductionSolarTermProvider();

export function getSolarTermDefinition(termCode: SolarTermBoundary["termCode"]) {
  return SOLAR_TERM_BY_CODE[termCode];
}
