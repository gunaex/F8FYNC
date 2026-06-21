import type { FortunePlugin } from "@/plugin-sdk";
import type { FortuneRequest } from "@/core/domain";
import { baseResult, buildWindow, clampScore, contextHourSeed, stableNumber } from "../shared";

export const timingPlugin: FortunePlugin = {
  manifest: {
    id: "timing",
    nameKey: "plugins.timing.name",
    descriptionKey: "plugins.timing.description",
    version: "0.1.0",
    calculationVersion: "mock-timing-2026-06",
    capabilities: ["daily", "timing", "compatibility", "comparison"],
    supportedTargetTypes: ["general", "phone_number", "vehicle_plate", "house_number", "room_number", "name", "event_datetime"],
    supportedLocales: ["th", "en", "zh-CN"],
    enabledByDefault: true,
    category: "timing"
  },
  async validateInput(input: FortuneRequest) {
    return { valid: !Number.isNaN(new Date(input.contextTime).getTime()), errors: [] };
  },
  async analyze(input) {
    const hour = new Date(input.contextTime).getUTCHours();
    const cycle = stableNumber(`${input.contextTimezone}:${contextHourSeed(input)}:timing`, 48, 91);
    return {
      ...baseResult(input, "timing", "0.1.0", "mock-timing-2026-06"),
      status: "success",
      scores: {
        overall: cycle,
        career: clampScore(cycle + 3),
        money: clampScore(cycle - 2),
        wellbeing: clampScore(cycle + 7),
        travel: clampScore(cycle + stableNumber(`${hour}:travel`, -10, 10))
      },
      timingWindows: [
        buildWindow(input, "timing", -15, 45, cycle >= 72 ? "optimal" : "supportive", 0.78, ["career", "communication"]),
        buildWindow(input, "timing", 105, 40, "optimal", 0.84, ["career", "money"]),
        buildWindow(input, "timing", 245, 30, "avoid", 0.5, ["travel"])
      ],
      warnings: cycle < 55 ? [{ code: "TIMING_WEAK_SUPPORT", severity: "caution", messageKey: "warnings.timingWeakSupport" }] : [],
      confidence: 0.78,
      evidence: [{ code: "HOURLY_CYCLE_MOCK", value: cycle, descriptionKey: "evidence.timing.hourlyCycle" }]
    };
  }
};
