import type {
  BirthInputContract,
  BirthInputValidationIssue,
  BirthInputValidationResult,
  CalculationReadiness
} from "../contracts/types";

const LOCAL_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const LOCAL_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function issue(field: BirthInputValidationIssue["field"], code: string): BirthInputValidationIssue {
  return { field, code, messageToken: `intelligence.validation.${code}` };
}

function isRealLocalDate(value: string) {
  if (!LOCAL_DATE_PATTERN.test(value)) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function isValidIanaTimezone(timezoneId: string) {
  try {
    Intl.DateTimeFormat("en-US", { timeZone: timezoneId }).format(new Date("2026-06-17T00:00:00.000Z"));
    return true;
  } catch {
    return false;
  }
}

export function validateBirthInput(input: BirthInputContract): BirthInputValidationResult {
  const issues: BirthInputValidationIssue[] = [];

  if (!isRealLocalDate(input.localDate)) {
    issues.push(issue("localDate", "LOCAL_DATE_INVALID"));
  }

  if (input.localTime !== undefined && !LOCAL_TIME_PATTERN.test(input.localTime)) {
    issues.push(issue("localTime", "LOCAL_TIME_INVALID"));
  }

  if (input.birthTimeStatus === "KNOWN" && !input.localTime) {
    issues.push(issue("localTime", "KNOWN_TIME_REQUIRES_LOCAL_TIME"));
  }

  if (input.birthTimeStatus === "UNKNOWN" && input.localTime) {
    issues.push(issue("localTime", "UNKNOWN_TIME_MUST_NOT_INCLUDE_LOCAL_TIME"));
  }

  if ((input.birthTimeStatus === "APPROXIMATE" || input.birthTimeStatus === "DISPUTED") && !input.localTime) {
    issues.push(issue("localTime", "UNCERTAIN_TIME_STATUS_REQUIRES_DECLARED_LOCAL_TIME"));
  }

  if (input.timezoneId && !isValidIanaTimezone(input.timezoneId)) {
    issues.push(issue("timezoneId", "TIMEZONE_NOT_IANA"));
  }

  if (input.timeAdjustmentPolicy === "TRUE_SOLAR_TIME") {
    issues.push(issue("timeAdjustmentPolicy", "TRUE_SOLAR_TIME_UNSUPPORTED_IN_V1"));
  }

  if (issues.length > 0) {
    return { valid: false, issues };
  }

  return { valid: true, input, issues: [] };
}

export type ReadinessOptions = {
  timeSensitive?: boolean;
  methodologyApproved?: boolean;
  compatibilityRequested?: boolean;
};

export function assessBirthInputReadiness(input: BirthInputContract, options: ReadinessOptions = {}): CalculationReadiness {
  const timeSensitive = options.timeSensitive ?? true;
  const methodologyApproved = options.methodologyApproved ?? true;
  const validation = validateBirthInput(input);

  if (!validation.valid) {
    const unsupported = validation.issues.some((validationIssue) => validationIssue.code === "TRUE_SOLAR_TIME_UNSUPPORTED_IN_V1");
    return {
      status: unsupported ? "UNSUPPORTED_IN_V1" : "BLOCKED_INVALID_INPUT",
      reasonCodes: validation.issues.map((validationIssue) => validationIssue.code),
      missingFields: [],
      blocking: true
    };
  }

  if (options.compatibilityRequested) {
    return {
      status: "UNSUPPORTED_IN_V1",
      reasonCodes: ["COMPATIBILITY_DEFERRED_IN_V1"],
      missingFields: [],
      blocking: true
    };
  }

  if (timeSensitive && (!input.timezoneId || input.timezoneConfirmationStatus !== "CONFIRMED")) {
    return {
      status: "BLOCKED_MISSING_TIMEZONE",
      reasonCodes: ["CONFIRMED_IANA_TIMEZONE_REQUIRED"],
      missingFields: ["timezoneId", "timezoneConfirmationStatus"],
      blocking: true
    };
  }

  if (!methodologyApproved) {
    return {
      status: "BLOCKED_METHODOLOGY_NOT_APPROVED",
      reasonCodes: ["METHODOLOGY_REQUIRES_EXPERT_VALIDATION"],
      missingFields: [],
      blocking: true
    };
  }

  if (input.birthTimeStatus !== "KNOWN") {
    return {
      status: "PARTIALLY_READY",
      reasonCodes: [`BIRTH_TIME_${input.birthTimeStatus}`],
      missingFields: input.birthTimeStatus === "UNKNOWN" ? ["localTime"] : [],
      blocking: false
    };
  }

  return { status: "READY", reasonCodes: [], missingFields: [], blocking: false };
}
