import { describe, expect, it } from "vitest";
import { calculateGate1BCalendar } from "@/core/engine/calendar";

describe("Gate 1B calendar and solar-term foundation", () => {
  it("uses the prior BaZi year before Li Chun", () => {
    const result = calculateGate1BCalendar({
      localDate: "2000-02-04",
      localTime: "10:00",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("READY");
    if (result.status !== "READY") throw new Error("expected ready result");
    expect(result.yearPillar).toMatchObject({ stem: "JI", branch: "MAO" });
    expect(result.monthPillar).toMatchObject({ stem: "DING", branch: "CHOU" });
    expect(result.birthUtc).toBe("2000-02-04T03:00:00.000Z");
  });

  it("uses the new BaZi year after Li Chun", () => {
    const result = calculateGate1BCalendar({
      localDate: "2000-02-04",
      localTime: "21:00",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("READY");
    if (result.status !== "READY") throw new Error("expected ready result");
    expect(result.yearPillar).toMatchObject({ stem: "GENG", branch: "CHEN" });
    expect(result.monthPillar).toMatchObject({ stem: "WU", branch: "YIN" });
    expect(result.birthUtc).toBe("2000-02-04T14:00:00.000Z");
  });

  it("uses the prior BaZi month before the Qing Ming Jié boundary", () => {
    const result = calculateGate1BCalendar({
      localDate: "2024-04-04",
      localTime: "10:00",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("READY");
    if (result.status !== "READY") throw new Error("expected ready result");
    expect(result.yearPillar).toMatchObject({ stem: "JIA", branch: "CHEN" });
    expect(result.monthPillar).toMatchObject({ stem: "DING", branch: "MAO" });
    expect(result.trace).toContain("MR-03.v1.0 Jié month boundary and Five Tigers rule applied");
  });

  it("flags one-minute Li Chun boundary cases as disputed", () => {
    const result = calculateGate1BCalendar({
      localDate: "2000-02-04",
      localTime: "19:39",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("BOUNDARY_DISPUTED");
    if (result.status !== "BOUNDARY_DISPUTED") throw new Error("expected boundary-disputed result");
    expect(result.boundaryFlags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "BOUNDARY_DISPUTED",
          boundaryType: "YEAR",
          solarTerm: "Li Chun"
        })
      ])
    );
  });

  it("blocks missing birth time without substituting 12:00 or producing hour output", () => {
    const result = calculateGate1BCalendar({
      localDate: "2000-02-04",
      birthTimeStatus: "UNKNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.status).toBe("BLOCKED_MISSING_TIME");
    expect(JSON.stringify(result)).not.toContain("12:00");
    expect(JSON.stringify(result)).not.toContain("hourPillar");
  });

  it("blocks unconfirmed or invalid timezone input", () => {
    const suggested = calculateGate1BCalendar({
      localDate: "2000-02-04",
      localTime: "10:00",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "SUGGESTED"
    });
    const invalid = calculateGate1BCalendar({
      localDate: "2000-02-04",
      localTime: "10:00",
      birthTimeStatus: "KNOWN",
      timezoneId: "Bangkok Local Time",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(suggested.status).toBe("BLOCKED_MISSING_TIMEZONE");
    expect(invalid.status).toBe("BLOCKED_INVALID_INPUT");
  });

  it("keeps true solar time unsupported in Gate 1B V1", () => {
    const result = calculateGate1BCalendar({
      localDate: "2000-02-04",
      localTime: "10:00",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED",
      timeAdjustmentPolicy: "TRUE_SOLAR_TIME"
    });

    expect(result.status).toBe("UNSUPPORTED_IN_V1");
  });
});
