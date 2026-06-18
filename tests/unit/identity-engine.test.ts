import { describe, expect, it } from "vitest";
import { calculateFourPillars } from "@/core/engine/pillars";
import { buildBaziStructureProfile } from "@/core/engine/elements";
import { buildIdentityLayer, deriveIdentityDimensions } from "@/core/engine/identity";

function structureForBruceLee() {
  const pillars = calculateFourPillars({
    localDate: "1940-11-27",
    localTime: "07:12",
    birthTimeStatus: "KNOWN",
    timezoneId: "America/Los_Angeles",
    timezoneConfirmationStatus: "CONFIRMED"
  });
  if (pillars.status !== "READY") throw new Error("expected ready Four Pillars");
  return buildBaziStructureProfile(pillars);
}

describe("Gate 1E identity layer", () => {
  it("derives the six locked identity dimensions from Gate 1D structure", () => {
    const dimensions = deriveIdentityDimensions(structureForBruceLee());

    expect(dimensions.coreElement).toBe("WOOD");
    expect(dimensions.dominantElement).toBeTruthy();
    expect(dimensions.missingElement).toBeTruthy();
    expect(dimensions.dayMasterStrength).toMatch(/STRONG|WEAK|BALANCED/);
    expect(dimensions.primaryTenGod).toBeTruthy();
    expect(dimensions.selfVsResourceRatio).toEqual(expect.any(Number));
  });

  it("maps Day Master element and strength to a KT archetype", () => {
    const identity = buildIdentityLayer(structureForBruceLee());

    expect(identity.classification).toBe("F8SYNC_IDENTITY_LAYER");
    expect(identity.status).toBe("READY");
    expect(identity.archetype).toMatchObject({ id: "ARCH-01", nameTh: "ต้นไม้ใหญ่", element: "WOOD", strength: "STRONG" });
    expect(identity.displayPlacement).toBe("SUMMARY");
  });

  it("keeps classical calculation outputs separated from identity product output", () => {
    const identity = buildIdentityLayer(structureForBruceLee());

    expect(identity.layerSeparation.classicalInputs).toEqual(["four_pillars", "ten_gods", "element_distribution", "day_master_strength"]);
    expect(identity.layerSeparation.productLayer).toBe("identity_dimensions");
  });

  it("flags identity as partial when hour pillar is unknown", () => {
    const pillars = calculateFourPillars({
      localDate: "1990-01-01",
      birthTimeStatus: "UNKNOWN",
      timezoneId: "Asia/Bangkok",
      timezoneConfirmationStatus: "CONFIRMED"
    });
    if (pillars.status !== "PARTIAL") throw new Error("expected partial Four Pillars");

    const identity = buildIdentityLayer(buildBaziStructureProfile(pillars));
    expect(identity.status).toBe("IDENTITY_PARTIAL");
    expect(identity.displayNote).toBe("ข้อมูลนี้ยังไม่ครบ — ใส่เวลาเกิดเพื่อดูผลที่แม่นขึ้น");
  });
});
