import { isValidIanaTimezone } from "@/core/intelligence";

export type TimezoneSuggestionSource = "device" | "browser" | "account";
export type TimezoneSuggestion = {
  suggestedTimezoneId: string | null;
  source: TimezoneSuggestionSource;
  confidence: "LOW" | "MEDIUM";
  requiresUserConfirmation: true;
};

export function suggestTimezone(input: { deviceTimezone?: string | null; browserTimezone?: string | null; accountTimezone?: string | null }): TimezoneSuggestion | null {
  const candidates: Array<{ value?: string | null; source: TimezoneSuggestionSource }> = [
    { value: input.deviceTimezone, source: "device" },
    { value: input.browserTimezone, source: "browser" },
    { value: input.accountTimezone, source: "account" }
  ];
  const candidate = candidates.find((item) => item.value && isValidIanaTimezone(item.value));
  if (!candidate?.value) return null;
  return {
    suggestedTimezoneId: candidate.value,
    source: candidate.source,
    confidence: candidate.source === "account" ? "MEDIUM" : "LOW",
    requiresUserConfirmation: true
  };
}
