import type { FortunePlugin } from "@/plugin-sdk";
import type { FortuneRequest } from "@/core/domain";
import { baseResult, buildWindow, clampScore, stableNumber } from "../shared";

function digitSum(value: string) {
  return value.replace(/\D/g, "").split("").reduce((sum, digit) => sum + Number(digit), 0);
}

export const numerologyPlugin: FortunePlugin = {
  manifest: {
    id: "numerology",
    nameKey: "plugins.numerology.name",
    descriptionKey: "plugins.numerology.description",
    version: "0.1.0",
    calculationVersion: "mock-numerology-2026-06",
    capabilities: ["daily", "compatibility", "comparison"],
    supportedTargetTypes: ["general", "phone_number", "vehicle_plate", "house_number", "room_number", "name"],
    supportedLocales: ["th", "en", "zh-CN"],
    enabledByDefault: true,
    category: "numerology"
  },
  async validateInput(input: FortuneRequest) {
    return { valid: Boolean(input.birthProfile.birthDate), errors: [] };
  },
  async analyze(input) {
    const targetValue = input.target?.value ?? "";
    const targetSignal = digitSum(targetValue) || stableNumber(targetValue || "general", 1, 54);
    const birthSignal = digitSum(input.birthProfile.birthDate);
    const harmony = 100 - Math.abs(((birthSignal * 3 + targetSignal * 5) % 100) - 58);
    const base = clampScore((harmony + stableNumber(`${input.contextTime}:numerology`, 48, 84)) / 2);
    return {
      ...baseResult(input, "numerology", "0.1.0", "mock-numerology-2026-06"),
      status: "success",
      scores: {
        overall: base,
        career: clampScore(base + stableNumber(`${targetSignal}:career`, -6, 10)),
        money: clampScore(base + stableNumber(`${targetSignal}:money`, -12, 14)),
        relationship: clampScore(base + stableNumber(`${targetSignal}:relationship`, -8, 12)),
        communication: clampScore(base + stableNumber(`${targetSignal}:communication`, -4, 16))
      },
      timingWindows: [buildWindow(input, "numerology", 42, 55, base >= 65 ? "optimal" : "neutral", 0.69, ["communication", "money"])],
      warnings: targetValue.length > 80 ? [{ code: "TARGET_TRUNCATED_RISK", severity: "info", messageKey: "warnings.longTarget" }] : [],
      confidence: 0.66,
      evidence: [{ code: "TARGET_DIGIT_SIGNAL", value: targetSignal, descriptionKey: "evidence.numerology.targetSignal" }]
    };
  }
};
