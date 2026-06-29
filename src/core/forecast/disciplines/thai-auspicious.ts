import type { ForecastDomain, ThaiHourFlavor } from "../types";

/**
 * Thai traditional "ฤกษ์ยาม" timing inherits the same 7-planet day/hour rulership that
 * traveled through South/Southeast Asian astrology. We map each hour's ruler to a
 * "flavor" (มงคล / สมดุล / ระวัง) and emphasize the luck + opportunity dimensions,
 * which is what the Thai system is most consulted for.
 */

const FLAVOR_BY_RULER: Record<string, ThaiHourFlavor> = {
  jupiter: "auspicious",
  venus: "auspicious",
  sun: "auspicious",
  mercury: "balanced",
  moon: "balanced",
  mars: "cautious",
  saturn: "cautious"
};

/** Additive contributions per flavor, focused on luck/opportunity/money. */
const FLAVOR_CONTRIBUTION: Record<ThaiHourFlavor, Record<ForecastDomain, number>> = {
  auspicious: { money: 8, career: 4, luck: 16, opportunity: 14, love: 6 },
  balanced: { money: 2, career: 2, luck: 4, opportunity: 4, love: 2 },
  cautious: { money: -4, career: -2, luck: -10, opportunity: -8, love: -2 }
};

export function thaiFlavorOfRuler(ruler: string): ThaiHourFlavor {
  return FLAVOR_BY_RULER[ruler] ?? "balanced";
}

export function thaiDomainScores(flavor: ThaiHourFlavor): Record<ForecastDomain, number> {
  return { ...FLAVOR_CONTRIBUTION[flavor] };
}
