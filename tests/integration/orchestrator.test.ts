import { describe, expect, it } from "vitest";
import { runFortuneAnalysis } from "@/core";

describe("runFortuneAnalysis", () => {
  it("runs request through plugins and aggregation with Thai locale", async () => {
    const result = await runFortuneAnalysis({
      requestId: "integration-request",
      locale: "th",
      queryType: "daily",
      birthProfile: { birthDate: "1990-01-01", birthTime: "10:30", birthLocation: "Bangkok", birthTimezone: "Asia/Bangkok" },
      contextTime: "2026-06-14T03:00:00.000Z",
      contextTimezone: "Asia/Bangkok",
      target: { type: "general", value: "" }
    });
    expect(result.metadata.locale).toBe("th");
    expect(result.sources.length).toBe(3);
    expect(result.overallScore).toBeGreaterThanOrEqual(0);
  });
});
