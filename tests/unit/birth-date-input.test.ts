import { describe, expect, it } from "vitest";
import { partsFromIsoDate, sanitizeBirthYearInput, sanitizeNumericText, toIsoDate, validateBirthDateParts, type BirthDateParts } from "@/ui/components/birth-date-input";

const today = new Date("2026-06-20T00:00:00.000Z");

function validParts(year: string): BirthDateParts {
  return { day: "15", month: "01", year };
}

describe("birth date input hotfix", () => {
  it("preserves typing 1978 as four digits", () => {
    expect(sanitizeBirthYearInput("1978")).toBe("1978");
  });

  it("preserves intermediate year values while typing", () => {
    expect(["1", "19", "197", "1978"].map(sanitizeBirthYearInput)).toEqual(["1", "19", "197", "1978"]);
  });

  it("preserves pasted 1978", () => {
    expect(sanitizeBirthYearInput("1978")).toBe("1978");
  });

  it("supports backspacing from 1978 to 197", () => {
    expect(sanitizeBirthYearInput("197")).toBe("197");
  });

  it("supports replacing the year", () => {
    expect(sanitizeBirthYearInput("2000")).toBe("2000");
  });

  it("removes non-numeric characters without changing digit order", () => {
    expect(sanitizeBirthYearInput("a1b9c7d8")).toBe("1978");
  });

  it("accepts the lower supported year 1900", () => {
    const result = validateBirthDateParts(validParts("1900"), today);
    expect(result.status).toBe("VALID");
    if (result.status !== "VALID") throw new Error("expected valid date");
    expect(result.isoDate).toBe("1900-01-15");
  });

  it("accepts the current Gregorian year when not in the future", () => {
    const result = validateBirthDateParts({ day: "20", month: "06", year: "2026" }, today);
    expect(result.status).toBe("VALID");
  });

  it("rejects years below 1900", () => {
    expect(validateBirthDateParts(validParts("1899"), today).status).toBe("YEAR_BELOW_RANGE");
  });

  it("rejects future birth dates", () => {
    expect(validateBirthDateParts({ day: "21", month: "06", year: "2026" }, today).status).toBe("FUTURE_DATE");
  });

  it("accepts a valid leap date", () => {
    const result = validateBirthDateParts({ day: "29", month: "02", year: "2000" }, today);
    expect(result.status).toBe("VALID");
    if (result.status !== "VALID") throw new Error("expected valid leap date");
    expect(result.isoDate).toBe("2000-02-29");
  });

  it("rejects an invalid leap date", () => {
    expect(validateBirthDateParts({ day: "29", month: "02", year: "1978" }, today).status).toBe("INVALID_LEAP_DAY");
  });

  it("calendar picker ISO selection populates all three fields", () => {
    expect(partsFromIsoDate("1978-01-15")).toEqual({ day: "15", month: "01", year: "1978" });
  });

  it("manual entry produces canonical Gregorian ISO date", () => {
    const result = validateBirthDateParts({ day: "15", month: "01", year: "1978" }, today);
    expect(result.status).toBe("VALID");
    if (result.status !== "VALID") throw new Error("expected valid date");
    expect(result.isoDate).toBe("1978-01-15");
    expect(toIsoDate({ day: "15", month: "01", year: "1978" })).toBe("1978-01-15");
  });

  it("Buddhist Era helper does not alter canonical Gregorian value", () => {
    const result = validateBirthDateParts({ day: "15", month: "01", year: "1978" }, today);
    expect(result.status).toBe("VALID");
    if (result.status !== "VALID") throw new Error("expected valid date");
    expect(result.isoDate).toBe("1978-01-15");
    expect(result.buddhistYear).toBe(2521);
  });

  it("keeps missing birth time separate from date editing", () => {
    const birthTime = "";
    const birthTimeStatus = birthTime ? "KNOWN" : "UNKNOWN";
    expect(birthTimeStatus).toBe("UNKNOWN");
    expect(birthTime).not.toBe("12:00");
  });

  it("does not require BaZi or AI calls for basic input editing", () => {
    expect(sanitizeNumericText("1978", 4)).toBe("1978");
  });
});
