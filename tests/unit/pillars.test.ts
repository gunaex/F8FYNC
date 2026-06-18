import { describe, expect, it } from "vitest";
import { calculateDayPillar, calculateFourPillars, calculateHourPillar } from "@/core/engine/pillars";

describe("Gate 1C Four Pillars foundation", () => {
  it("calculates the locked day-pillar anchor for 1 Jan 2000 Bangkok", () => {
    expect(calculateDayPillar("2000-01-01")).toMatchObject({ stem: "WU", branch: "WU", stemChinese: "戊", branchChinese: "午" });
  });

  it("calculates Bruce Lee as a known-time Four Pillars baseline", () => {
    const result = calculateFourPillars({
      localDate: "1940-11-27",
      localTime: "07:12",
      birthTimeStatus: "KNOWN",
      timezoneId: "America/Los_Angeles",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("READY");
    if (result.status !== "READY") throw new Error("expected ready result");
    expect(result.yearPillar).toMatchObject({ stem: "GENG", branch: "CHEN" });
    expect(result.monthPillar).toMatchObject({ stem: "DING", branch: "HAI" });
    expect(result.dayPillar).toMatchObject({ stem: "JIA", branch: "XU" });
    expect(result.hourPillar).toMatchObject({ stem: "WU", branch: "CHEN" });
    expect(result.fullBaziString).toBe("庚辰 丁亥 甲戌 戊辰");
  });

  it("derives hour pillar from the Five Rats rule", () => {
    expect(calculateHourPillar("JIA", "07:12")).toMatchObject({ stem: "WU", branch: "CHEN" });
    expect(calculateHourPillar("WU", "00:00")).toMatchObject({ stem: "REN", branch: "ZI" });
  });

  it("returns a partial Three Pillar chart when birth time is unknown", () => {
    const result = calculateFourPillars({
      localDate: "1990-01-01",
      birthTimeStatus: "UNKNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("PARTIAL");
    if (result.status !== "PARTIAL") throw new Error("expected partial result");
    expect(result.chartType).toBe("THREE_PILLAR_PARTIAL");
    expect(result.hourPillar).toBe("UNKNOWN");
    expect(result.affectedOutputs).toContain("hour_dependent_outputs");
    expect(JSON.stringify(result)).not.toContain("12:00");
  });

  it("discloses the Zi-hour split variant without changing the primary civil-midnight day", () => {
    const result = calculateFourPillars({
      localDate: "2024-03-15",
      localTime: "23:30",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("READY");
    if (result.status !== "READY") throw new Error("expected ready result");
    expect(result.dayPillar).toMatchObject({ stem: "WU", branch: "YIN" });
    expect(result.hourPillar).toMatchObject({ stem: "REN", branch: "ZI" });
    expect(result.ziHourVariant?.primaryDayPillar).toMatchObject({ stem: "WU", branch: "YIN" });
    expect(result.ziHourVariant?.alternativeDayPillar).toMatchObject({ stem: "JI", branch: "MAO" });
  });

  it("blocks missing or unconfirmed timezone before calculating pillars", () => {
    const result = calculateFourPillars({
      localDate: "1940-11-27",
      localTime: "07:12",
      birthTimeStatus: "KNOWN",
      timezoneId: "America/Los_Angeles",
      timezoneConfirmationStatus: "SUGGESTED"
    });

    expect(result.status).toBe("BLOCKED_MISSING_TIMEZONE");
  });

  it("keeps true solar time unsupported in V1", () => {
    const result = calculateFourPillars({
      localDate: "1940-11-27",
      localTime: "07:12",
      birthTimeStatus: "KNOWN",
      timezoneId: "America/Los_Angeles",
      timezoneConfirmationStatus: "CONFIRMED",
      timeAdjustmentPolicy: "TRUE_SOLAR_TIME"
    });

    expect(result.status).toBe("UNSUPPORTED_IN_V1");
  });
});
