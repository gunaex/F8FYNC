import { describe, expect, it } from "vitest";
import { resolveSacredIdentity } from "@/core/identity";
import type { AggregatedFortuneResult } from "@/core/domain";

const result: AggregatedFortuneResult = {
  requestId: "identity-request",
  overallScore: 74,
  scores: {
    overall: 74,
    career: 82,
    money: 64,
    relationship: 70,
    wellbeing: 76,
    communication: 88,
    travel: 62
  },
  timing: {
    currentStatus: "supportive",
    cautionWindows: [],
    allWindows: []
  },
  agreement: {
    overall: "high",
    byDomain: {
      career: "high",
      communication: "high"
    }
  },
  confidence: 0.84,
  conflicts: [],
  recommendations: [],
  warnings: [],
  sources: [{ pluginId: "bazi", version: "1.0.0", status: "success" }],
  pluginResults: [],
  metadata: {
    generatedAt: "2026-06-14T00:00:00.000Z",
    locale: "th",
    contextTimezone: "Asia/Bangkok"
  }
};

describe("V8 sacred identity resolver", () => {
  it("resolves a deterministic identity profile from aggregated results", () => {
    const first = resolveSacredIdentity({ analysisId: "analysis_1", aggregatedResult: result, locale: "th" });
    const second = resolveSacredIdentity({ analysisId: "analysis_1", aggregatedResult: result, locale: "th" });

    expect(first).toEqual(second);
    expect(first.status).toBe("complete");
    if (first.status !== "complete") return;
    expect(first.profile.mappingVersion).toBe("identity.mapping.v8.0.0");
    expect(first.profile.primaryArchetype.role).toBe("primary");
    expect(first.profile.supportingArchetypes).toHaveLength(2);
    expect(first.profile.symbolicSeal.deterministicSeedHash).toMatch(/^[0-9a-f]{8}$/);
    expect(first.profile.disclosureKeys).toContain("identity.disclosure.noGuarantee");
  });

  it("returns a structured incomplete state when no score data exists", () => {
    const incomplete = resolveSacredIdentity({
      analysisId: "analysis_empty",
      aggregatedResult: { ...result, scores: {}, overallScore: 0 },
      locale: "th"
    });

    expect(incomplete).toEqual({
      status: "incomplete",
      reasonCode: "INSUFFICIENT_RESULT_DATA",
      disclosureKeys: ["identity.disclosure.incomplete"]
    });
  });
});
