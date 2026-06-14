import { beforeEach, describe, expect, it } from "vitest";
import { filterFortuneResultForEntitlement } from "@/core/commercial/premium-reveal-service";
import { activateMockSubscription } from "@/core/commercial/subscription-service";
import type { AggregatedFortuneResult } from "@/core/domain";

const fullResult: AggregatedFortuneResult = {
  requestId: "reveal-test",
  overallScore: 72,
  scores: {
    overall: 72,
    career: 80,
    money: 68,
    relationship: 66,
    communication: 73,
    travel: 61
  },
  timing: {
    currentStatus: "supportive",
    currentWindow: {
      id: "current",
      start: "2026-06-14T01:00:00.000Z",
      end: "2026-06-14T03:00:00.000Z",
      type: "supportive",
      strength: 0.7,
      domainTags: ["overall"],
      reasonCodes: ["PRIVATE_REASON"],
      sourcePluginIds: ["bazi"]
    },
    nextOptimalWindow: {
      id: "next",
      start: "2026-06-14T04:00:00.000Z",
      end: "2026-06-14T06:00:00.000Z",
      type: "optimal",
      strength: 0.9,
      domainTags: ["career"],
      reasonCodes: ["PREMIUM_TIMING_REASON"],
      sourcePluginIds: ["timing"]
    },
    cautionWindows: [],
    allWindows: [
      {
        id: "full",
        start: "2026-06-14T08:00:00.000Z",
        end: "2026-06-14T10:00:00.000Z",
        type: "caution",
        strength: 0.4,
        domainTags: ["money"],
        reasonCodes: ["FULL_TIMELINE_REASON"],
        sourcePluginIds: ["timing"]
      }
    ]
  },
  agreement: {
    overall: "medium",
    byDomain: {
      career: "high",
      money: "medium"
    }
  },
  confidence: 0.82,
  conflicts: [{ domain: "money", pluginIds: ["bazi", "timing"], descriptionKey: "conflicts.scoreDispersion" }],
  recommendations: [
    { code: "GOOD_FOR_MEETING", priority: 1, messageKey: "recommendations.GOOD_FOR_MEETING" },
    { code: "WAIT_FOR_NEXT_OPTIMAL_WINDOW", priority: 2, messageKey: "recommendations.WAIT_FOR_NEXT_OPTIMAL_WINDOW" },
    { code: "MIXED_SYSTEM_SIGNALS", priority: 3, messageKey: "recommendations.MIXED_SYSTEM_SIGNALS" }
  ],
  warnings: [{ code: "INFO", severity: "info", messageKey: "warnings.info" }],
  sources: [{ pluginId: "bazi", version: "1.0.0", status: "success" }],
  pluginResults: [
    {
      pluginId: "bazi",
      pluginVersion: "1.0.0",
      calculationVersion: "calc-1",
      status: "success",
      scores: { overall: 72, career: 80 },
      timingWindows: [],
      warnings: [],
      confidence: 0.8,
      evidence: [{ code: "PRIVATE_EVIDENCE", value: 42, descriptionKey: "evidence.private" }],
      metadata: { calculatedAt: "2026-06-14T00:00:00.000Z" }
    }
  ],
  metadata: {
    generatedAt: "2026-06-14T00:00:00.000Z",
    locale: "th",
    contextTimezone: "Asia/Bangkok"
  }
};

beforeEach(() => {
  globalThis.f8syncMemoryStore = undefined;
});

describe("premium reveal filtering", () => {
  it("removes premium-only result values for guests", async () => {
    const filtered = await filterFortuneResultForEntitlement(undefined, fullResult);

    expect(filtered.premiumReveal.level).toBe("preview");
    expect(filtered.scores).toEqual({ overall: 72 });
    expect(filtered.pluginResults).toEqual([]);
    expect(filtered.timing.allWindows).toEqual([]);
    expect(filtered.timing.nextOptimalWindow?.reasonCodes).toEqual([]);
    expect(filtered.sources[0].version).toBe("locked");
    expect(JSON.stringify(filtered)).not.toContain("PRIVATE_EVIDENCE");
    expect(JSON.stringify(filtered)).not.toContain("FULL_TIMELINE_REASON");
  });

  it("returns full result for active premium members", async () => {
    await activateMockSubscription("member_premium_reveal");
    const filtered = await filterFortuneResultForEntitlement("member_premium_reveal", fullResult);

    expect(filtered.premiumReveal.level).toBe("full");
    expect(filtered.pluginResults).toHaveLength(1);
    expect(filtered.timing.allWindows).toHaveLength(1);
    expect(filtered.scores.career).toBe(80);
  });
});
