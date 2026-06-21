export type BirthDateParts = {
  day: string;
  month: string;
  year: string;
};

export type BirthDateValidationResult =
  | { status: "VALID"; isoDate: string; buddhistYear: number }
  | {
      status: "INCOMPLETE" | "INVALID_DAY" | "INVALID_LEAP_DAY" | "YEAR_BELOW_RANGE" | "FUTURE_DATE" | "NON_NUMERIC_YEAR";
      messageKey: string;
    };

const MIN_BIRTH_YEAR = 1900;

export function currentGregorianYear(today = new Date()): number {
  return today.getFullYear();
}

export function sanitizeNumericText(value: string, maxLength: number): string {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

export function sanitizeBirthYearInput(value: string): string {
  return sanitizeNumericText(value, 4);
}

export function partsFromIsoDate(isoDate: string): BirthDateParts {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return { day: "", month: "", year: "" };
  return { year: match[1], month: match[2], day: String(Number(match[3])) };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function toIsoDate(parts: BirthDateParts): string {
  return `${parts.year}-${parts.month}-${parts.day.padStart(2, "0")}`;
}

export function validateBirthDateParts(parts: BirthDateParts, today = new Date()): BirthDateValidationResult {
  if (parts.year && !/^\d+$/.test(parts.year)) return { status: "NON_NUMERIC_YEAR", messageKey: "birthDateErrorNonNumericYear" };
  if (!parts.day || !parts.month || parts.year.length < 4) return { status: "INCOMPLETE", messageKey: "birthDateErrorIncomplete" };

  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  if (year < MIN_BIRTH_YEAR) return { status: "YEAR_BELOW_RANGE", messageKey: "birthDateErrorYearBelowRange" };
  if (day < 1 || day > daysInMonth(year, month)) {
    return month === 2 && day === 29 ? { status: "INVALID_LEAP_DAY", messageKey: "birthDateErrorInvalidLeapDay" } : { status: "INVALID_DAY", messageKey: "birthDateErrorInvalidDay" };
  }

  const isoDate = toIsoDate(parts);
  const todayIso = today.toISOString().slice(0, 10);
  if (isoDate > todayIso) return { status: "FUTURE_DATE", messageKey: "birthDateErrorFuture" };
  return { status: "VALID", isoDate, buddhistYear: year + 543 };
}
