import { describe, expect, it } from "vitest";
import { pluginManifestSchema } from "@/plugin-sdk/contracts/validation";
import { pluginResultSchema, type FortuneRequest } from "@/core/domain";
import { baziPlugin } from "@/plugins/bazi";
import { numerologyPlugin } from "@/plugins/numerology";
import { timingPlugin } from "@/plugins/timing";

const request: FortuneRequest = {
  requestId: "contract-request",
  locale: "th",
  queryType: "daily",
  birthProfile: { birthDate: "1990-01-01", birthTime: "10:30", birthLocation: "Bangkok", birthTimezone: "Asia/Bangkok" },
  contextTime: "2026-06-14T03:00:00.000Z",
  contextTimezone: "Asia/Bangkok",
  target: { type: "general", value: "" }
};

describe("MVP plugin contracts", () => {
  for (const plugin of [baziPlugin, numerologyPlugin, timingPlugin]) {
    it(`${plugin.manifest.id} returns a valid structured result`, async () => {
      expect(() => pluginManifestSchema.parse(plugin.manifest)).not.toThrow();
      const result = await plugin.analyze(request);
      expect(() => pluginResultSchema.parse(result)).not.toThrow();
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
      expect(JSON.stringify(result)).not.toContain("เหมาะ");
    });
  }
});
