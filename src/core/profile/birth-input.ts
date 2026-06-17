import type { CalculationReadiness, CalculationReadinessStatus } from "@/core/intelligence";
import { isValidIanaTimezone } from "@/core/intelligence";

export const BIRTH_INPUT_SCHEMA_VERSION = "birth-input.v1";
export const TIME_ADJUSTMENT_POLICY_VERSION = "time-policy.local-civil.v1";

export type CanonicalBirthTimeStatus = "KNOWN" | "UNKNOWN" | "APPROXIMATE" | "DISPUTED";
export type CanonicalTimezoneConfirmationStatus = "CONFIRMED" | "SUGGESTED" | "UNRESOLVED" | "UNKNOWN";
export type CanonicalTimeAdjustmentPolicy = "LOCAL_CIVIL_TIME" | "TRUE_SOLAR_TIME";
export type CanonicalInputPrecision = "DATE_ONLY" | "MINUTE" | "APPROXIMATE" | "DISPUTED";
export type CanonicalInputSource = "USER_ENTERED" | "PROFILE" | "LEGACY_IMPORT" | "SYSTEM_ADAPTER";

export type BirthInputValidationIssue = {
  code: string;
  field: keyof CanonicalBirthInput | "birthInput";
  messageToken: string;
};

export type CanonicalBirthInput = {
  localDate: string;
  localTime: string | null;
  birthTimeStatus: CanonicalBirthTimeStatus;
  birthLocationText: string | null;
  timezoneId: string | null;
  timezoneConfirmationStatus: CanonicalTimezoneConfirmationStatus;
  timeAdjustmentPolicy: CanonicalTimeAdjustmentPolicy;
  timeAdjustmentPolicyVersion: string;
  inputPrecision: CanonicalInputPrecision;
  inputSource: CanonicalInputSource;
  inputSchemaVersion: typeof BIRTH_INPUT_SCHEMA_VERSION;
};

export type BirthInputReadiness = CalculationReadiness & {
  structurallyValid: boolean;
  timezoneConfirmed: boolean;
  timeSpecificCalculationAvailable: boolean;
  unavailableOutputs: string[];
};

export type BirthInputNormalizationResult = {
  input: CanonicalBirthInput;
  validationIssues: BirthInputValidationIssue[];
  readiness: BirthInputReadiness;
};

export type LegacyBirthProfileInput = {
  birthDate?: unknown;
  birthTime?: unknown;
  birthLocation?: unknown;
  birthTimezone?: unknown;
};

export type BirthInputPayload = Partial<CanonicalBirthInput> & LegacyBirthProfileInput;

const LOCAL_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const LOCAL_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const timeStatuses: CanonicalBirthTimeStatus[] = ["KNOWN", "UNKNOWN", "APPROXIMATE", "DISPUTED"];
const timezoneStatuses: CanonicalTimezoneConfirmationStatus[] = ["CONFIRMED", "SUGGESTED", "UNRESOLVED", "UNKNOWN"];
const inputPrecisions: CanonicalInputPrecision[] = ["DATE_ONLY", "MINUTE", "APPROXIMATE", "DISPUTED"];
const inputSources: CanonicalInputSource[] = ["USER_ENTERED", "PROFILE", "LEGACY_IMPORT", "SYSTEM_ADAPTER"];

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value.trim() : undefined;
}

function asNullableString(value: unknown): string | null | undefined {
  if (value === null) return null;
  const stringValue = asString(value);
  if (stringValue === undefined) return undefined;
  return stringValue.length > 0 ? stringValue : null;
}

function includes<T extends string>(values: readonly T[], value: unknown): value is T {
  return typeof value === "string" && values.includes(value as T);
}

function issue(field: BirthInputValidationIssue["field"], code: string): BirthInputValidationIssue {
  return { field, code, messageToken: `birthInput.validation.${code}` };
}

function isRealLocalDate(value: string) {
  if (!LOCAL_DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function deriveStatus(payload: BirthInputPayload): CanonicalBirthTimeStatus {
  if (includes(timeStatuses, payload.birthTimeStatus)) return payload.birthTimeStatus;
  const legacyTime = asNullableString(payload.localTime ?? payload.birthTime);
  if (!legacyTime || legacyTime === "12:00") return "UNKNOWN";
  return "KNOWN";
}

function derivePrecision(status: CanonicalBirthTimeStatus, supplied: unknown): CanonicalInputPrecision {
  if (includes(inputPrecisions, supplied)) return supplied;
  if (status === "UNKNOWN") return "DATE_ONLY";
  if (status === "APPROXIMATE") return "APPROXIMATE";
  if (status === "DISPUTED") return "DISPUTED";
  return "MINUTE";
}

export function normalizeBirthInput(payload: BirthInputPayload): BirthInputNormalizationResult {
  const birthTimeStatus = deriveStatus(payload);
  const suppliedLocalTime = asNullableString(payload.localTime ?? payload.birthTime);
  const explicitUnknownWithTime = payload.birthTimeStatus === "UNKNOWN" && suppliedLocalTime !== null && suppliedLocalTime !== undefined;
  const localTime = birthTimeStatus === "UNKNOWN" && !explicitUnknownWithTime ? null : suppliedLocalTime ?? null;
  const input: CanonicalBirthInput = {
    localDate: asString(payload.localDate ?? payload.birthDate) ?? "",
    localTime,
    birthTimeStatus,
    birthLocationText: asNullableString(payload.birthLocationText ?? payload.birthLocation) ?? null,
    timezoneId: asNullableString(payload.timezoneId ?? payload.birthTimezone) ?? null,
    timezoneConfirmationStatus: includes(timezoneStatuses, payload.timezoneConfirmationStatus) ? payload.timezoneConfirmationStatus : "SUGGESTED",
    timeAdjustmentPolicy: payload.timeAdjustmentPolicy === "TRUE_SOLAR_TIME" ? "TRUE_SOLAR_TIME" : "LOCAL_CIVIL_TIME",
    timeAdjustmentPolicyVersion: asString(payload.timeAdjustmentPolicyVersion) ?? TIME_ADJUSTMENT_POLICY_VERSION,
    inputPrecision: derivePrecision(birthTimeStatus, payload.inputPrecision),
    inputSource: includes(inputSources, payload.inputSource) ? payload.inputSource : "USER_ENTERED",
    inputSchemaVersion: BIRTH_INPUT_SCHEMA_VERSION
  };
  const validationIssues = validateCanonicalBirthInput(input);
  return { input, validationIssues, readiness: assessCanonicalBirthInputReadiness(input, validationIssues) };
}

export function validateCanonicalBirthInput(input: CanonicalBirthInput): BirthInputValidationIssue[] {
  const issues: BirthInputValidationIssue[] = [];

  if (!isRealLocalDate(input.localDate)) issues.push(issue("localDate", "LOCAL_DATE_INVALID"));
  if (input.localTime !== null && !LOCAL_TIME_PATTERN.test(input.localTime)) issues.push(issue("localTime", "LOCAL_TIME_INVALID"));
  if (input.birthTimeStatus === "KNOWN" && input.localTime === null) issues.push(issue("localTime", "KNOWN_TIME_REQUIRES_LOCAL_TIME"));
  if (input.birthTimeStatus === "UNKNOWN" && input.localTime !== null) issues.push(issue("localTime", "UNKNOWN_TIME_MUST_NOT_INCLUDE_LOCAL_TIME"));
  if (input.birthTimeStatus === "APPROXIMATE" && input.inputPrecision !== "APPROXIMATE") issues.push(issue("inputPrecision", "APPROXIMATE_STATUS_REQUIRES_APPROXIMATE_PRECISION"));
  if (input.birthTimeStatus === "DISPUTED" && input.inputPrecision !== "DISPUTED") issues.push(issue("inputPrecision", "DISPUTED_STATUS_REQUIRES_DISPUTED_PRECISION"));
  if (input.timezoneId !== null && !isValidIanaTimezone(input.timezoneId)) issues.push(issue("timezoneId", "TIMEZONE_NOT_IANA"));
  if (input.timeAdjustmentPolicy === "TRUE_SOLAR_TIME") issues.push(issue("timeAdjustmentPolicy", "TRUE_SOLAR_TIME_UNSUPPORTED_IN_V1"));

  return issues;
}

export function assessCanonicalBirthInputReadiness(
  input: CanonicalBirthInput,
  validationIssues = validateCanonicalBirthInput(input),
  methodologyApproved = false
): BirthInputReadiness {
  const unsupported = validationIssues.some((validationIssue) => validationIssue.code === "TRUE_SOLAR_TIME_UNSUPPORTED_IN_V1");
  const invalid = validationIssues.length > 0 && !unsupported;
  const timezoneConfirmed = Boolean(input.timezoneId && input.timezoneConfirmationStatus === "CONFIRMED");
  let status: CalculationReadinessStatus = "READY";
  const reasonCodes: string[] = [];
  const missingFields: string[] = [];
  const unavailableOutputs: string[] = [];

  if (unsupported) {
    status = "UNSUPPORTED_IN_V1";
    reasonCodes.push("TRUE_SOLAR_TIME_UNSUPPORTED_IN_V1");
  } else if (invalid) {
    status = "BLOCKED_INVALID_INPUT";
    reasonCodes.push(...validationIssues.map((validationIssue) => validationIssue.code));
  } else if (!timezoneConfirmed) {
    status = "BLOCKED_MISSING_TIMEZONE";
    reasonCodes.push("CONFIRMED_IANA_TIMEZONE_REQUIRED");
    missingFields.push("timezoneId", "timezoneConfirmationStatus");
  } else if (!methodologyApproved) {
    status = "BLOCKED_METHODOLOGY_NOT_APPROVED";
    reasonCodes.push("METHODOLOGY_REQUIRES_EXPERT_VALIDATION");
  }

  if (input.birthTimeStatus !== "KNOWN") {
    unavailableOutputs.push("hour_dependent_outputs");
    if (status === "READY") status = "PARTIALLY_READY";
    reasonCodes.push(`BIRTH_TIME_${input.birthTimeStatus}`);
    if (input.birthTimeStatus === "UNKNOWN") missingFields.push("localTime");
  }

  return {
    status,
    reasonCodes,
    missingFields: Array.from(new Set(missingFields)),
    blocking: ["BLOCKED_MISSING_TIMEZONE", "BLOCKED_INVALID_INPUT", "BLOCKED_METHODOLOGY_NOT_APPROVED", "UNSUPPORTED_IN_V1"].includes(status),
    structurallyValid: validationIssues.length === 0,
    timezoneConfirmed,
    timeSpecificCalculationAvailable: input.birthTimeStatus === "KNOWN" && timezoneConfirmed && validationIssues.length === 0,
    unavailableOutputs
  };
}

export function mapLegacyBirthProfileToCanonical(profile: LegacyBirthProfileInput): CanonicalBirthInput {
  return normalizeBirthInput({ ...profile, inputSource: "LEGACY_IMPORT" }).input;
}
