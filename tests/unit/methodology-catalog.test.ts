import { describe, expect, it } from "vitest";
import { getMethodologyCatalog } from "@/plugins/catalog";

describe("methodology catalog", () => {
  it("represents active, foundation, and roadmap methodology families", () => {
    const catalog = getMethodologyCatalog();
    const families = catalog.map((item) => item.family);

    expect(families).toEqual(
      expect.arrayContaining([
        "bazi",
        "numerology",
        "timing",
        "thai_astrology",
        "western_astrology",
        "tarot",
        "i_ching",
        "korean_saju",
        "japanese_systems"
      ])
    );
    expect(catalog.filter((item) => item.status === "active").every((item) => item.calculationImplemented)).toBe(true);
    expect(catalog.filter((item) => item.status !== "active").every((item) => !item.calculationImplemented)).toBe(true);
    expect(catalog.find((item) => item.family === "tarot")?.auditedRandomness).toBe(true);
  });
});
