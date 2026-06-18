import { describe, expect, it } from "vitest";
import { buildBaziStructureProfile } from "@/core/engine/elements";
import { calculateDailyTiming } from "@/core/engine/daily-timing";
import { calculateFourPillars } from "@/core/engine/pillars";

function natal() {
  const pillars = calculateFourPillars({
    localDate: "1940-11-27",
    localTime: "07:12",
    birthTimeStatus: "KNOWN",
    timezoneId: "America/Los_Angeles",
    timezoneConfirmationStatus: "CONFIRMED"
  });
  if (pillars.status !== "READY") throw new Error("expected ready natal pillars");
  return { pillars, structure: buildBaziStructureProfile(pillars) };
}

describe("Gate 1F daily timing", () => {
  it("calculates current day pillar and Ten God relationship to natal Day Master", () => {
    const chart = natal();
    const timing = calculateDailyTiming({
      localDate: "2024-03-15",
      timezoneId: "Asia/Bangkok",
      natalPillars: chart.pillars,
      natalStructure: chart.structure
    });

    expect(timing.status).toBe("READY");
    expect(timing.currentDayPillar).toMatchObject({ stem: "WU", branch: "YIN" });
    expect(timing.tenGod).toBe("PIAN_CAI");
    expect(timing.summary).toContain("วันนี้ธาตุ");
    expect(timing.detail).toContain("เสาวันนี้:");
  });

  it("marks Direct Officer days as suitable for formal matters for all charts", () => {
    const chart = natal();
    const timing = calculateDailyTiming({
      localDate: "2024-03-28",
      timezoneId: "Asia/Bangkok",
      natalPillars: chart.pillars,
      natalStructure: chart.structure
    });

    expect(timing.status).toBe("READY");
    expect(timing.tenGod).toBe("ZHENG_GUAN");
    expect(timing.suitability).toBe("FORMAL_SUPPORT");
    expect(timing.activities).toContain("จัดการเอกสาร");
  });

  it("keeps V2-deferred features excluded", () => {
    const chart = natal();
    const timing = calculateDailyTiming({
      localDate: "2024-03-15",
      timezoneId: "Asia/Bangkok",
      natalPillars: chart.pillars,
      natalStructure: chart.structure
    });

    expect(timing.deferredFeatures).toEqual([
      "Luck Pillar interaction",
      "Annual Pillar overlay",
      "Clash, Combination, Harm interactions",
      "Hour-level timing",
      "Deity-based auspicious hours"
    ]);
    expect(JSON.stringify(timing)).not.toContain("luckPillar");
    expect(JSON.stringify(timing)).not.toContain("annualPillar");
  });

  it("blocks invalid local dates", () => {
    const chart = natal();
    const timing = calculateDailyTiming({
      localDate: "2024-02-31",
      timezoneId: "Asia/Bangkok",
      natalPillars: chart.pillars,
      natalStructure: chart.structure
    });

    expect(timing.status).toBe("BLOCKED_INVALID_INPUT");
  });
});
