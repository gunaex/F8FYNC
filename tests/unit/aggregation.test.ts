import { describe, expect, it } from "vitest";
import type { FortuneRequest, PluginResult } from "@/core/domain";
import { aggregatePluginResults } from "@/core";

const request: FortuneRequest = {
  requestId: "test-request",
  locale: "th",
  queryType: "daily",
  birthProfile: { birthDate: "1990-01-01", birthLocation: "Bangkok", birthTimezone: "Asia/Bangkok" },
  contextTime: "2026-06-14T03:00:00.000Z",
  contextTimezone: "Asia/Bangkok",
  target: { type: "general", value: "" }
};

function result(pluginId: string, score: number, confidence: number): PluginResult {
  return {
    pluginId,
    pluginVersion: "1",
    calculationVersion: "1",
    status: "success",
    scores: { overall: score },
    timingWindows: [],
    warnings: [],
    confidence,
    evidence: [],
    metadata: { calculatedAt: "2026-06-14T03:00:00.000Z" }
  };
}

describe("aggregatePluginResults", () => {
  it("uses confidence weighted scores", () => {
    const aggregate = aggregatePluginResults(request, [result("a", 90, 0.8), result("b", 50, 0.2)]);
    expect(aggregate.overallScore).toBe(82);
  });

  it("exposes low agreement as a conflict", () => {
    const aggregate = aggregatePluginResults(request, [result("a", 95, 0.7), result("b", 40, 0.7)]);
    expect(aggregate.agreement.byDomain.overall).toBe("low");
    expect(aggregate.conflicts[0]?.descriptionKey).toBe("conflicts.scoreDispersion");
  });
});
