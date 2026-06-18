import type { EarthlyBranchKey } from "./ephemeris";
import type { FourPillarsReadyResult } from "./pillars";
import type { StemBranch } from "./stems-branches";
import { getHiddenStems } from "./hidden-stems";
import { deriveTenGod, getStemElement, type FiveElement, type TenGodProfile } from "./ten-gods";

export type DayMasterStrength = "STRONG" | "WEAK" | "BALANCED";
export type SeasonalStrength = "STRONG" | "SECONDARY" | "INACTIVE" | "WEAK" | "DEAD";

export type ElementDistribution = Record<FiveElement, { raw: number; percentage: number }>;

export type BaziStructureProfile = {
  dayMaster: {
    stem: StemBranch["stem"];
    element: FiveElement;
    seasonalStrength: SeasonalStrength;
    strength: DayMasterStrength;
  };
  tenGods: {
    visible: TenGodProfile[];
    hidden: Array<{ branch: EarthlyBranchKey; stem: StemBranch["stem"]; role: string; tenGod: string }>;
  };
  elementDistribution: ElementDistribution;
  distributionState: "COMPLETE" | "ELEMENT_DISTRIBUTION_PARTIAL";
  displayNote?: string;
};

const elements: FiveElement[] = ["WOOD", "FIRE", "EARTH", "METAL", "WATER"];
const PARTIAL_NOTE = "การกระจายธาตุนี้ไม่ครบ — ยังขาดเสาชั่วโมง";

const seasonalTable: Record<FiveElement, Record<SeasonalStrength, FiveElement>> = {
  WOOD: { STRONG: "WOOD", SECONDARY: "FIRE", INACTIVE: "WATER", WEAK: "METAL", DEAD: "EARTH" },
  FIRE: { STRONG: "FIRE", SECONDARY: "EARTH", INACTIVE: "WOOD", WEAK: "WATER", DEAD: "METAL" },
  EARTH: { STRONG: "EARTH", SECONDARY: "METAL", INACTIVE: "FIRE", WEAK: "WOOD", DEAD: "WATER" },
  METAL: { STRONG: "METAL", SECONDARY: "WATER", INACTIVE: "EARTH", WEAK: "FIRE", DEAD: "WOOD" },
  WATER: { STRONG: "WATER", SECONDARY: "WOOD", INACTIVE: "METAL", WEAK: "EARTH", DEAD: "FIRE" }
};

function seasonForMonthBranch(branch: EarthlyBranchKey): FiveElement {
  if (branch === "YIN" || branch === "MAO") return "WOOD";
  if (branch === "SI" || branch === "WU") return "FIRE";
  if (branch === "SHEN" || branch === "YOU") return "METAL";
  if (branch === "HAI" || branch === "ZI") return "WATER";
  return "EARTH";
}

export function getSeasonalStrength(dayMasterElement: FiveElement, monthBranch: EarthlyBranchKey): SeasonalStrength {
  const season = seasonForMonthBranch(monthBranch);
  const table = seasonalTable[season];
  return (Object.keys(table) as SeasonalStrength[]).find((strength) => table[strength] === dayMasterElement) ?? "INACTIVE";
}

function addWeight(totals: Record<FiveElement, number>, stem: StemBranch["stem"], weight: number) {
  totals[getStemElement(stem)] += weight;
}

function normalize(totals: Record<FiveElement, number>): ElementDistribution {
  const total = elements.reduce((sum, element) => sum + totals[element], 0);
  const rounded: ElementDistribution = {
    WOOD: { raw: totals.WOOD, percentage: 0 },
    FIRE: { raw: totals.FIRE, percentage: 0 },
    EARTH: { raw: totals.EARTH, percentage: 0 },
    METAL: { raw: totals.METAL, percentage: 0 },
    WATER: { raw: totals.WATER, percentage: 0 }
  };
  let running = 0;
  for (const element of elements.slice(0, -1)) {
    rounded[element].percentage = Number(((totals[element] / total) * 100).toFixed(1));
    running += rounded[element].percentage;
  }
  rounded.WATER.percentage = Number((100 - running).toFixed(1));
  return rounded;
}

function availablePillars(fourPillars: FourPillarsReadyResult): StemBranch[] {
  return [fourPillars.yearPillar, fourPillars.monthPillar, fourPillars.dayPillar, ...(fourPillars.hourPillar === "UNKNOWN" ? [] : [fourPillars.hourPillar])];
}

export function calculateElementDistribution(fourPillars: FourPillarsReadyResult): ElementDistribution {
  const totals: Record<FiveElement, number> = { WOOD: 0, FIRE: 0, EARTH: 0, METAL: 0, WATER: 0 };
  for (const pillar of availablePillars(fourPillars)) {
    addWeight(totals, pillar.stem, 1);
    for (const hidden of getHiddenStems(pillar.branch)) addWeight(totals, hidden.stem, hidden.weight);
  }
  return normalize(totals);
}

export function classifyDayMasterStrength(fourPillars: FourPillarsReadyResult): DayMasterStrength {
  const dayElement = getStemElement(fourPillars.dayPillar.stem);
  const seasonal = getSeasonalStrength(dayElement, fourPillars.monthPillar.branch);
  const distribution = calculateElementDistribution(fourPillars);
  const support = distribution[dayElement].percentage;

  if (seasonal === "STRONG" || seasonal === "SECONDARY" || support >= 30) return "STRONG";
  if (seasonal === "DEAD" || support <= 15) return "WEAK";
  return "BALANCED";
}

export function buildBaziStructureProfile(fourPillars: FourPillarsReadyResult): BaziStructureProfile {
  const pillars = availablePillars(fourPillars);
  const hidden = pillars.flatMap((pillar) =>
    getHiddenStems(pillar.branch).map((hiddenStem) => ({
      branch: pillar.branch,
      stem: hiddenStem.stem,
      role: hiddenStem.role,
      tenGod: deriveTenGod(fourPillars.dayPillar.stem, hiddenStem.stem)
    }))
  );

  return {
    dayMaster: {
      stem: fourPillars.dayPillar.stem,
      element: getStemElement(fourPillars.dayPillar.stem),
      seasonalStrength: getSeasonalStrength(getStemElement(fourPillars.dayPillar.stem), fourPillars.monthPillar.branch),
      strength: classifyDayMasterStrength(fourPillars)
    },
    tenGods: {
      visible: pillars.map((pillar) => ({ targetStem: pillar.stem, tenGod: deriveTenGod(fourPillars.dayPillar.stem, pillar.stem) })),
      hidden
    },
    elementDistribution: calculateElementDistribution(fourPillars),
    distributionState: fourPillars.hourPillar === "UNKNOWN" ? "ELEMENT_DISTRIBUTION_PARTIAL" : "COMPLETE",
    ...(fourPillars.hourPillar === "UNKNOWN" ? { displayNote: PARTIAL_NOTE } : {})
  };
}
