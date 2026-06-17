import { beforeEach, describe, expect, it } from "vitest";
import { createBirthProfile, updateBirthProfile } from "@/core/commercial/birth-profile-service";
import { getMemoryStore } from "@/core/repositories/memory-store";
import {
  mapLegacyBirthProfileToCanonical,
  normalizeBirthInput,
  suggestTimezone,
  validateCanonicalBirthInput
} from "@/core/profile";

beforeEach(() => {
  globalThis.f8syncMemoryStore = undefined;
});

describe("birth input foundation", () => {
  it("requires local time when status is KNOWN", () => {
    const result = normalizeBirthInput({
      localDate: "1990-01-01",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.validationIssues.map((issue) => issue.code)).toContain("KNOWN_TIME_REQUIRES_LOCAL_TIME");
    expect(result.readiness.status).toBe("BLOCKED_INVALID_INPUT");
  });

  it("rejects trusted local time when status is UNKNOWN", () => {
    const result = normalizeBirthInput({
      localDate: "1990-01-01",
      localTime: "10:30",
      birthTimeStatus: "UNKNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.validationIssues.map((issue) => issue.code)).toContain("UNKNOWN_TIME_MUST_NOT_INCLUDE_LOCAL_TIME");
  });

  it("does not turn missing or ambiguous legacy time into 12:00", () => {
    const missing = mapLegacyBirthProfileToCanonical({ birthDate: "1990-01-01", birthLocation: "", birthTimezone: "Asia/Bangkok" });
    const legacyNoon = mapLegacyBirthProfileToCanonical({ birthDate: "1990-01-01", birthTime: "12:00", birthLocation: "", birthTimezone: "Asia/Bangkok" });

    expect(missing.localTime).toBeNull();
    expect(missing.birthTimeStatus).toBe("UNKNOWN");
    expect(legacyNoon.localTime).toBeNull();
    expect(legacyNoon.birthTimeStatus).toBe("UNKNOWN");
    expect(JSON.stringify(missing)).not.toContain("12:00");
  });

  it("preserves approximate and disputed states", () => {
    const approximate = normalizeBirthInput({
      localDate: "1990-01-01",
      localTime: "08:00",
      birthTimeStatus: "APPROXIMATE",
      inputPrecision: "APPROXIMATE",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });
    const disputed = normalizeBirthInput({
      localDate: "1990-01-01",
      localTime: "08:00",
      birthTimeStatus: "DISPUTED",
      inputPrecision: "DISPUTED",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(approximate.input.birthTimeStatus).toBe("APPROXIMATE");
    expect(approximate.readiness.unavailableOutputs).toContain("hour_dependent_outputs");
    expect(disputed.input.birthTimeStatus).toBe("DISPUTED");
    expect(disputed.readiness.unavailableOutputs).toContain("hour_dependent_outputs");
  });

  it("allows optional birth location text", () => {
    const result = normalizeBirthInput({
      localDate: "1990-01-01",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });

    expect(result.input.birthLocationText).toBeNull();
    expect(validateCanonicalBirthInput(result.input)).toEqual([]);
  });

  it("validates IANA timezone and rejects invalid timezone", () => {
    const valid = normalizeBirthInput({ localDate: "1990-01-01", localTime: "10:30", birthTimeStatus: "KNOWN", timezoneId: "Asia/Bangkok", timezoneConfirmationStatus: "CONFIRMED" });
    const invalid = normalizeBirthInput({ localDate: "1990-01-01", localTime: "10:30", birthTimeStatus: "KNOWN", timezoneId: "Bangkok Local Time", timezoneConfirmationStatus: "CONFIRMED" });

    expect(valid.validationIssues).toEqual([]);
    expect(invalid.validationIssues.map((issue) => issue.code)).toContain("TIMEZONE_NOT_IANA");
  });

  it("keeps suggested timezone unconfirmed and blocks time-sensitive readiness", () => {
    const suggestion = suggestTimezone({ browserTimezone: "Asia/Bangkok" });
    const result = normalizeBirthInput({
      localDate: "1990-01-01",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      timezoneId: suggestion?.suggestedTimezoneId,
      timezoneConfirmationStatus: "SUGGESTED"
    });

    expect(suggestion).toMatchObject({ suggestedTimezoneId: "Asia/Bangkok", requiresUserConfirmation: true });
    expect(result.readiness.status).toBe("BLOCKED_MISSING_TIMEZONE");
  });

  it("moves from missing timezone block to methodology block after confirmation", () => {
    const suggested = normalizeBirthInput({ localDate: "1990-01-01", localTime: "10:30", birthTimeStatus: "KNOWN", timezoneId: "Asia/Bangkok", timezoneConfirmationStatus: "SUGGESTED" });
    const confirmed = normalizeBirthInput({ localDate: "1990-01-01", localTime: "10:30", birthTimeStatus: "KNOWN", timezoneId: "Asia/Bangkok", timezoneConfirmationStatus: "CONFIRMED" });

    expect(suggested.readiness.status).toBe("BLOCKED_MISSING_TIMEZONE");
    expect(confirmed.readiness.status).toBe("BLOCKED_METHODOLOGY_NOT_APPROVED");
  });

  it("keeps True Solar Time unsupported in V1", () => {
    const result = normalizeBirthInput({
      localDate: "1990-01-01",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED",
      timeAdjustmentPolicy: "TRUE_SOLAR_TIME"
    });

    expect(result.readiness.status).toBe("UNSUPPORTED_IN_V1");
    expect(result.validationIssues.map((issue) => issue.code)).toContain("TRUE_SOLAR_TIME_UNSUPPORTED_IN_V1");
  });

  it("enforces API ownership through member-scoped profile update", async () => {
    const profile = await createBirthProfile("member_owner", {
      label: "Owner",
      localDate: "1990-01-01",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED",
      consentGranted: true
    });

    await expect(updateBirthProfile("member_other", profile.id, { label: "Nope" })).rejects.toThrow("PROFILE_NOT_FOUND");
  });

  it("saves canonical input without AI, calculation, usage, or history side effects", async () => {
    const profile = await createBirthProfile("member_profile", {
      label: "Canonical",
      localDate: "1990-01-01",
      localTime: "10:30",
      birthTimeStatus: "KNOWN",
      birthLocationText: "",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED",
      consentGranted: true
    });
    const store = getMemoryStore();

    expect(profile.birthInput.inputSchemaVersion).toBe("birth-input.v1");
    expect(profile.inputReadiness.status).toBe("BLOCKED_METHODOLOGY_NOT_APPROVED");
    expect(store.history).toHaveLength(0);
    expect(store.usageEvents).toHaveLength(0);
    expect(store.intentAuditLogs).toHaveLength(0);
  });
});
