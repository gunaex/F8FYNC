import { describe, expect, it } from "vitest";
import { getHiddenStems } from "@/core/engine/hidden-stems";
import { deriveTenGod } from "@/core/engine/ten-gods";

describe("Gate 1D hidden stems and Ten Gods", () => {
  it("exposes the locked MR-06 hidden stems table", () => {
    expect(getHiddenStems("CHEN")).toEqual([
      { stem: "WU", role: "MAIN", weight: 0.75 },
      { stem: "YI", role: "MID", weight: 0.5 },
      { stem: "GUI", role: "RESIDUAL", weight: 0.25 }
    ]);
    expect(getHiddenStems("HAI")).toEqual([
      { stem: "REN", role: "MAIN", weight: 0.75 },
      { stem: "JIA", role: "MID", weight: 0.5 }
    ]);
  });

  it("derives Ten Gods by element relationship and polarity", () => {
    expect(deriveTenGod("JIA", "JIA")).toBe("BI_JIAN");
    expect(deriveTenGod("JIA", "YI")).toBe("JIE_CAI");
    expect(deriveTenGod("JIA", "BING")).toBe("SHI_SHEN");
    expect(deriveTenGod("JIA", "DING")).toBe("SHANG_GUAN");
    expect(deriveTenGod("JIA", "WU")).toBe("PIAN_CAI");
    expect(deriveTenGod("JIA", "JI")).toBe("ZHENG_CAI");
    expect(deriveTenGod("JIA", "REN")).toBe("PIAN_YIN");
    expect(deriveTenGod("JIA", "GUI")).toBe("ZHENG_YIN");
    expect(deriveTenGod("JIA", "GENG")).toBe("QI_SHA");
    expect(deriveTenGod("JIA", "XIN")).toBe("ZHENG_GUAN");
  });
});
