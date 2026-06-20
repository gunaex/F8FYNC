import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import manifestJson from "../../data/solar-terms/manifest.json";
import datasetJson from "../../data/solar-terms/solar-terms-1899-2101.v1.json";
import { calculateGate1BCalendar } from "@/core/engine/calendar";
import { listLockedGate1BBoundaries } from "@/core/engine/ephemeris";
import { calculateFourPillars } from "@/core/engine/pillars";
import { GoldenFixtureSolarTermProvider, ProductionSolarTermProvider, productionSolarTermProvider } from "@/core/engine/solar-term-provider";
import type { SolarTermDataset, SolarTermDatasetManifest } from "@/core/engine/solar-term-types";

const manifest = manifestJson as SolarTermDatasetManifest;
const dataset = datasetJson as SolarTermDataset;
const chronologicalTermCodes = [
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

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const object = value as Record<string, unknown>;
  return `{${Object.keys(object).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(object[key])}`).join(",")}}`;
}

function checksum(value: unknown): string {
  return createHash("sha256").update(stableStringify(value)).digest("hex");
}

describe("Milestone 1B.1 production solar-term provider", () => {
  it("loads the versioned 1899-2101 local dataset with the expected checksum", () => {
    expect(manifest).toMatchObject({
      datasetId: "f8sync-solar-terms",
      datasetVersion: "solar-terms-1899-2101.v1",
      coverageStart: "1899-01-01",
      coverageEnd: "2101-12-31",
      birthYearSupportStart: 1900,
      birthYearSupportEnd: 2100,
      recordCount: 4872,
      sourceLibrary: "astronomy-engine",
      sourceLibraryVersion: "2.1.19",
      sourceLibraryLicense: "MIT",
      datasetChecksumAlgorithm: "sha256(stable-json-canonical-dataset-payload)",
      datasetFileSha256: "bd008cc9cdd03ec7192f90bf88273d3fe5f6fae82c07a10f70e7a94debb39a1c",
      datasetChecksum: "7ee6cceacac7de2c2411171c7f7fc4dc35986e7004a296b4776629072355d90c"
    });
    expect(dataset.terms).toHaveLength(4872);
    expect(checksum(dataset)).toBe(manifest.datasetChecksum);
  });

  it("keeps dataset terms chronologically ordered and complete for every buffer year", () => {
    const unique = new Set<string>();
    let previous = Number.NEGATIVE_INFINITY;
    for (const term of dataset.terms) {
      const timestamp = Date.parse(term.instantUtc);
      expect(Number.isNaN(timestamp)).toBe(false);
      expect(timestamp).toBeGreaterThan(previous);
      previous = timestamp;
      const key = `${term.year}:${term.termCode}`;
      expect(unique.has(key)).toBe(false);
      unique.add(key);
    }

    for (let year = 1899; year <= 2101; year += 1) {
      const terms = dataset.terms.filter((term) => term.year === year);
      expect(terms).toHaveLength(24);
      expect(terms.map((term) => term.termCode)).toEqual(chronologicalTermCodes);
    }
  });

  it("resolves 2026-06-20 Bangkok through the production dataset without a Golden fixture", () => {
    const result = calculateGate1BCalendar({
      localDate: "2026-06-20",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("READY");
    if (result.status !== "READY") throw new Error("expected ready result");
    expect(result.birthUtc).toBe("2026-06-20T03:30:00.000Z");
    expect(result.yearPillar).toMatchObject({ stem: "BING", branch: "WU" });
    expect(result.monthPillar).toMatchObject({ stem: "JIA", branch: "WU" });
    expect(result.trace).toContain("SolarTermProvider=production-solar-term-provider:solar-terms-1899-2101.v1");
  });

  it("keeps runtime production capabilities separate from Golden fixtures", () => {
    const productionCapabilities = productionSolarTermProvider.getCapabilities();
    const goldenProvider = new GoldenFixtureSolarTermProvider(listLockedGate1BBoundaries());
    const goldenCapabilities = goldenProvider.getCapabilities();

    expect(productionCapabilities.runtimeCalculation).toBe(false);
    expect(productionCapabilities.usesGoldenFixtures).toBe(false);
    expect(goldenCapabilities.usesGoldenFixtures).toBe(true);
    expect(goldenCapabilities.providerId).toBe("golden-fixture-solar-term-provider");
  });

  it("does not silently fall back to Golden fixtures when production data is invalid", () => {
    const invalidProvider = new ProductionSolarTermProvider({ ...dataset, terms: [] }, manifest);
    const result = calculateGate1BCalendar({
      localDate: "2000-02-04",
      localTime: "21:00",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED",
      solarTermProvider: invalidProvider
    });

    expect(result.status).toBe("BLOCKED_CALENDAR_SOURCE_UNAVAILABLE");
    if (result.status !== "BLOCKED_CALENDAR_SOURCE_UNAVAILABLE") throw new Error("expected blocked source result");
    expect(result.reasonCodes).toEqual(expect.arrayContaining(["SOLAR_TERM_DATASET_EMPTY", "SOLAR_TERM_RECORD_COUNT_MISMATCH"]));
  });

  it("resolves one-second Li Chun boundary transitions using UTC comparisons", () => {
    const liChun = productionSolarTermProvider.getLiChunBoundary(2026);
    expect(liChun.status).toBe("READY");
    if (liChun.status !== "READY") throw new Error("expected Li Chun boundary");

    const boundaryMs = Date.parse(liChun.boundary.instantUtc);
    const before = productionSolarTermProvider.findActiveJieBoundary(new Date(boundaryMs - 1_000).toISOString());
    const exact = productionSolarTermProvider.findActiveJieBoundary(liChun.boundary.instantUtc);
    const after = productionSolarTermProvider.findActiveJieBoundary(new Date(boundaryMs + 1_000).toISOString());

    expect(before.status).toBe("READY");
    expect(exact.status).toBe("READY");
    expect(after.status).toBe("READY");
    if (before.status !== "READY" || exact.status !== "READY" || after.status !== "READY") throw new Error("expected ready boundary contexts");
    expect(before.boundary.termCode).toBe("XIAO_HAN");
    expect(exact.boundary.termCode).toBe("LI_CHUN");
    expect(after.boundary.termCode).toBe("LI_CHUN");
  });

  it("resolves one-second Jie month boundary transitions using UTC comparisons", () => {
    const qingMing = productionSolarTermProvider.findNearestJieBoundary("2024-04-04T07:02:15.000Z");
    expect(qingMing.status).toBe("READY");
    if (qingMing.status !== "READY") throw new Error("expected Qing Ming boundary");

    const boundaryMs = Date.parse(qingMing.boundary.instantUtc);
    const before = productionSolarTermProvider.findActiveJieBoundary(new Date(boundaryMs - 1_000).toISOString());
    const after = productionSolarTermProvider.findActiveJieBoundary(new Date(boundaryMs + 1_000).toISOString());

    expect(before.status).toBe("READY");
    expect(after.status).toBe("READY");
    if (before.status !== "READY" || after.status !== "READY") throw new Error("expected ready boundary contexts");
    expect(before.boundary.termCode).toBe("JING_ZHE");
    expect(after.boundary.termCode).toBe("QING_MING");
  });

  it("blocks birth years outside the approved 1900-2100 support range", () => {
    const tooEarly = calculateGate1BCalendar({
      localDate: "1899-06-20",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });
    const tooLate = calculateGate1BCalendar({
      localDate: "2101-06-20",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(tooEarly.status).toBe("BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE");
    expect(tooLate.status).toBe("BLOCKED_CALENDAR_YEAR_OUT_OF_RANGE");
  });

  it("uses buffer years to resolve supported January and December edge-year births", () => {
    const january1900 = calculateGate1BCalendar({
      localDate: "1900-01-01",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });
    const december2100 = calculateGate1BCalendar({
      localDate: "2100-12-31",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(january1900.status).toBe("READY");
    expect(december2100.status).toBe("READY");
  });

  it("preserves partial Three Pillar results when birth time is unknown", () => {
    const result = calculateFourPillars({
      localDate: "2026-06-20",
      birthTimeStatus: "UNKNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("PARTIAL");
    if (result.status !== "PARTIAL") throw new Error("expected partial result");
    expect(result.chartType).toBe("THREE_PILLAR_PARTIAL");
    expect(result.hourPillar).toBe("UNKNOWN");
    expect(JSON.stringify(result)).not.toContain("12:00");
  });
});
