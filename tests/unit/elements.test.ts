import { describe, expect, it } from "vitest";
import { calculateFourPillars } from "@/core/engine/pillars";
import { buildBaziStructureProfile, calculateElementDistribution, getSeasonalStrength } from "@/core/engine/elements";

function readyBruceLee() {
  const result = calculateFourPillars({
    localDate: "1940-11-27",
    localTime: "07:12",
    birthTimeStatus: "KNOWN",
    timezoneId: "America/Los_Angeles",
    timezoneConfirmationStatus: "CONFIRMED"
  });
  if (result.status !== "READY") throw new Error("expected ready Four Pillars result");
  return result;
}

describe("Gate 1D element weighting and Day Master strength", () => {
  it("normalizes weighted elements to 100 percent", () => {
    const distribution = calculateElementDistribution(readyBruceLee());
    const total = Object.values(distribution).reduce((sum, entry) => sum + entry.percentage, 0);

    expect(Number(total.toFixed(1))).toBe(100);
    expect(distribution.EARTH.raw).toBeGreaterThan(distribution.WOOD.raw);
  });

  it("uses the MR-07 seasonal strength table", () => {
    expect(getSeasonalStrength("WOOD", "YIN")).toBe("STRONG");
    expect(getSeasonalStrength("WOOD", "HAI")).toBe("SECONDARY");
    expect(getSeasonalStrength("WOOD", "SHEN")).toBe("DEAD");
  });

  it("builds a complete structure profile for known-time charts", () => {
    const profile = buildBaziStructureProfile(readyBruceLee());

    expect(profile.dayMaster).toMatchObject({ stem: "JIA", element: "WOOD" });
    expect(profile.distributionState).toBe("COMPLETE");
    expect(profile.tenGods.visible).toHaveLength(4);
    expect(profile.tenGods.hidden.length).toBeGreaterThan(4);
  });

  it("flags partial element distribution when hour pillar is unknown", () => {
    const result = calculateFourPillars({
      localDate: "1990-01-01",
      birthTimeStatus: "UNKNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });
    if (result.status !== "PARTIAL") throw new Error("expected partial Four Pillars result");

    const profile = buildBaziStructureProfile(result);
    expect(profile.distributionState).toBe("ELEMENT_DISTRIBUTION_PARTIAL");
    expect(profile.displayNote).toBe("การกระจายธาตุนี้ไม่ครบ — ยังขาดเสาชั่วโมง");
  });
});
