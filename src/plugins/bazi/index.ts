import type { FortunePlugin } from "@/plugin-sdk";
import type { FortuneRequest } from "@/core/domain";
import { baseResult, buildWindow, clampScore, stableNumber } from "../shared";

export const baziPlugin: FortunePlugin = {
  manifest: {
    id: "bazi",
    nameKey: "plugins.bazi.name",
    descriptionKey: "plugins.bazi.description",
    version: "0.1.0",
    calculationVersion: "mock-bazi-2026-06",
    capabilities: ["daily", "timing", "compatibility", "comparison"],
    supportedTargetTypes: ["general", "name", "event_datetime"],
    supportedLocales: ["th", "en", "zh-CN"],
    enabledByDefault: true,
    category: "bazi"
  },
  async validateInput(input: FortuneRequest) {
    return { valid: Boolean(input.birthProfile.birthDate && input.birthProfile.birthLocation), errors: [] };
  },
  async analyze(input) {
    const seed = `${input.birthProfile.birthDate}|${input.birthProfile.birthTime ?? "12:00"}|${input.contextTime}|bazi`;
    const base = stableNumber(seed, 44, 88);
    return {
      ...baseResult(input, "bazi", "0.1.0", "mock-bazi-2026-06"),
      status: "success",
      scores: {
        overall: clampScore(base + 4),
        career: clampScore(base + stableNumber(`${seed}:career`, -8, 12)),
        money: clampScore(base + stableNumber(`${seed}:money`, -10, 8)),
        relationship: clampScore(base + stableNumber(`${seed}:relationship`, -8, 8)),
        wellbeing: clampScore(base + stableNumber(`${seed}:wellbeing`, -6, 10))
      },
      timingWindows: [
        buildWindow(input, "bazi", 18, 48, "supportive", 0.72, ["career", "communication"]),
        buildWindow(input, "bazi", 165, 35, "caution", 0.56, ["money"])
      ],
      warnings: base < 52 ? [{ code: "LOW_DAILY_SUPPORT", severity: "caution", messageKey: "warnings.lowDailySupport" }] : [],
      confidence: 0.72,
      evidence: [{ code: "DAY_STEM_MOCK", value: base, descriptionKey: "evidence.bazi.dayPattern" }]
    };
  }
};
