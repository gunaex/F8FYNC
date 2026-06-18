import type { HeavenlyStemKey, StemBranch } from "./stems-branches";

export type FiveElement = "WOOD" | "FIRE" | "EARTH" | "METAL" | "WATER";
export type Polarity = "YANG" | "YIN";
export type TenGod =
  | "BI_JIAN"
  | "JIE_CAI"
  | "SHI_SHEN"
  | "SHANG_GUAN"
  | "PIAN_CAI"
  | "ZHENG_CAI"
  | "PIAN_YIN"
  | "ZHENG_YIN"
  | "QI_SHA"
  | "ZHENG_GUAN";

export type TenGodProfile = {
  targetStem: HeavenlyStemKey;
  tenGod: TenGod;
};

const stemTraits: Record<HeavenlyStemKey, { element: FiveElement; polarity: Polarity }> = {
  JIA: { element: "WOOD", polarity: "YANG" },
  YI: { element: "WOOD", polarity: "YIN" },
  BING: { element: "FIRE", polarity: "YANG" },
  DING: { element: "FIRE", polarity: "YIN" },
  WU: { element: "EARTH", polarity: "YANG" },
  JI: { element: "EARTH", polarity: "YIN" },
  GENG: { element: "METAL", polarity: "YANG" },
  XIN: { element: "METAL", polarity: "YIN" },
  REN: { element: "WATER", polarity: "YANG" },
  GUI: { element: "WATER", polarity: "YIN" }
};

const produces: Record<FiveElement, FiveElement> = {
  WOOD: "FIRE",
  FIRE: "EARTH",
  EARTH: "METAL",
  METAL: "WATER",
  WATER: "WOOD"
};

const controls: Record<FiveElement, FiveElement> = {
  WOOD: "EARTH",
  FIRE: "METAL",
  EARTH: "WATER",
  METAL: "WOOD",
  WATER: "FIRE"
};

export function getStemElement(stem: HeavenlyStemKey): FiveElement {
  return stemTraits[stem].element;
}

export function getStemPolarity(stem: HeavenlyStemKey): Polarity {
  return stemTraits[stem].polarity;
}

export function deriveTenGod(dayMaster: HeavenlyStemKey, targetStem: HeavenlyStemKey): TenGod {
  const self = stemTraits[dayMaster];
  const target = stemTraits[targetStem];
  const samePolarity = self.polarity === target.polarity;

  if (self.element === target.element) return samePolarity ? "BI_JIAN" : "JIE_CAI";
  if (produces[self.element] === target.element) return samePolarity ? "SHI_SHEN" : "SHANG_GUAN";
  if (controls[self.element] === target.element) return samePolarity ? "PIAN_CAI" : "ZHENG_CAI";
  if (produces[target.element] === self.element) return samePolarity ? "PIAN_YIN" : "ZHENG_YIN";
  return samePolarity ? "QI_SHA" : "ZHENG_GUAN";
}

export function deriveVisibleTenGods(dayPillar: StemBranch, pillars: StemBranch[]): TenGodProfile[] {
  return pillars.map((pillar) => ({
    targetStem: pillar.stem,
    tenGod: deriveTenGod(dayPillar.stem, pillar.stem)
  }));
}
