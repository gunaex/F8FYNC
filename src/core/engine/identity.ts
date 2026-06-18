import type { BaziStructureProfile } from "./elements";
import type { FiveElement, TenGod } from "./ten-gods";

export type IdentityDimensionSet = {
  coreElement: FiveElement;
  dominantElement: FiveElement;
  missingElement: FiveElement;
  dayMasterStrength: BaziStructureProfile["dayMaster"]["strength"];
  primaryTenGod: TenGod;
  selfVsResourceRatio: number;
};

export type ArchetypeId =
  | "ARCH-01"
  | "ARCH-02"
  | "ARCH-03"
  | "ARCH-04"
  | "ARCH-05"
  | "ARCH-06"
  | "ARCH-07"
  | "ARCH-08"
  | "ARCH-09"
  | "ARCH-10";

export type IdentityArchetype = {
  id: ArchetypeId;
  nameTh: string;
  element: FiveElement;
  strength: "STRONG" | "WEAK";
};

export type IdentityLayerResult = {
  classification: "F8SYNC_IDENTITY_LAYER";
  status: "READY" | "IDENTITY_PARTIAL";
  dimensions: IdentityDimensionSet;
  archetype: IdentityArchetype;
  displayPlacement: "SUMMARY";
  layerSeparation: {
    classicalInputs: string[];
    productLayer: "identity_dimensions";
  };
  displayNote?: string;
};

const PARTIAL_NOTE = "ข้อมูลนี้ยังไม่ครบ — ใส่เวลาเกิดเพื่อดูผลที่แม่นขึ้น";
const elements: FiveElement[] = ["WOOD", "FIRE", "EARTH", "METAL", "WATER"];
const resourceGods: TenGod[] = ["PIAN_YIN", "ZHENG_YIN"];
const selfGods: TenGod[] = ["BI_JIAN", "JIE_CAI"];

const archetypes: Record<FiveElement, { strong: IdentityArchetype; weak: IdentityArchetype }> = {
  WOOD: {
    strong: { id: "ARCH-01", nameTh: "ต้นไม้ใหญ่", element: "WOOD", strength: "STRONG" },
    weak: { id: "ARCH-02", nameTh: "ต้นกล้า", element: "WOOD", strength: "WEAK" }
  },
  FIRE: {
    strong: { id: "ARCH-03", nameTh: "เปลวเพลิง", element: "FIRE", strength: "STRONG" },
    weak: { id: "ARCH-04", nameTh: "ประกายไฟ", element: "FIRE", strength: "WEAK" }
  },
  EARTH: {
    strong: { id: "ARCH-05", nameTh: "ภูเขา", element: "EARTH", strength: "STRONG" },
    weak: { id: "ARCH-06", nameTh: "ดิน", element: "EARTH", strength: "WEAK" }
  },
  METAL: {
    strong: { id: "ARCH-07", nameTh: "ดาบ", element: "METAL", strength: "STRONG" },
    weak: { id: "ARCH-08", nameTh: "ทอง", element: "METAL", strength: "WEAK" }
  },
  WATER: {
    strong: { id: "ARCH-09", nameTh: "มหาสมุทร", element: "WATER", strength: "STRONG" },
    weak: { id: "ARCH-10", nameTh: "ธารน้ำ", element: "WATER", strength: "WEAK" }
  }
};

function maxByPercentage(distribution: BaziStructureProfile["elementDistribution"]): FiveElement {
  return elements.reduce((best, element) => (distribution[element].percentage > distribution[best].percentage ? element : best), "WOOD");
}

function minByRaw(distribution: BaziStructureProfile["elementDistribution"]): FiveElement {
  return elements.reduce((best, element) => (distribution[element].raw < distribution[best].raw ? element : best), "WOOD");
}

function primaryTenGod(profile: BaziStructureProfile): TenGod {
  const counts = new Map<TenGod, number>();
  for (const entry of [...profile.tenGods.visible, ...profile.tenGods.hidden]) {
    const tenGod = entry.tenGod as TenGod;
    counts.set(tenGod, (counts.get(tenGod) ?? 0) + 1);
  }
  return Array.from(counts.entries()).sort((left, right) => right[1] - left[1])[0]?.[0] ?? "BI_JIAN";
}

function selfVsResourceRatio(profile: BaziStructureProfile): number {
  const all = [...profile.tenGods.visible, ...profile.tenGods.hidden].map((entry) => entry.tenGod as TenGod);
  const selfCount = all.filter((tenGod) => selfGods.includes(tenGod)).length;
  const resourceCount = all.filter((tenGod) => resourceGods.includes(tenGod)).length;
  return Number((selfCount / Math.max(resourceCount, 1)).toFixed(2));
}

function archetypeFor(coreElement: FiveElement, strength: IdentityDimensionSet["dayMasterStrength"]): IdentityArchetype {
  return strength === "WEAK" ? archetypes[coreElement].weak : archetypes[coreElement].strong;
}

export function deriveIdentityDimensions(profile: BaziStructureProfile): IdentityDimensionSet {
  return {
    coreElement: profile.dayMaster.element,
    dominantElement: maxByPercentage(profile.elementDistribution),
    missingElement: minByRaw(profile.elementDistribution),
    dayMasterStrength: profile.dayMaster.strength,
    primaryTenGod: primaryTenGod(profile),
    selfVsResourceRatio: selfVsResourceRatio(profile)
  };
}

export function buildIdentityLayer(profile: BaziStructureProfile): IdentityLayerResult {
  const dimensions = deriveIdentityDimensions(profile);
  const partial = profile.distributionState === "ELEMENT_DISTRIBUTION_PARTIAL";

  return {
    classification: "F8SYNC_IDENTITY_LAYER",
    status: partial ? "IDENTITY_PARTIAL" : "READY",
    dimensions,
    archetype: archetypeFor(dimensions.coreElement, dimensions.dayMasterStrength),
    displayPlacement: "SUMMARY",
    layerSeparation: {
      classicalInputs: ["four_pillars", "ten_gods", "element_distribution", "day_master_strength"],
      productLayer: "identity_dimensions"
    },
    ...(partial ? { displayNote: PARTIAL_NOTE } : {})
  };
}
