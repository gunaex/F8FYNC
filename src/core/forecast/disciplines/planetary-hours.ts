import { Body, EclipticLongitude, SiderealTime } from "astronomy-engine";
import type { ForecastDomain, PlanetaryRuler, PlanetarySkySnapshot } from "../types";

/**
 * Chaldean order, used to derive the planetary ruler of each hour.
 * Starting from a day's ruling planet, the sequence advances one step per hour.
 */
const CHALDEAN_ORDER: PlanetaryRuler[] = ["saturn", "jupiter", "mars", "sun", "venus", "mercury", "moon"];

/** Maps the ISO day-of-week (0 = Sunday) to the planet ruling the first hour of that day. */
const DAY_RULER_BY_WEEKDAY: PlanetaryRuler[] = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn"];

/** Bodies handled by astronomy-engine's `EclipticLongitude` (Sun is excluded by the library). */
const LONGITUDE_BODIES: Array<{ ruler: PlanetaryRuler; body: Body }> = [
  { ruler: "mercury", body: Body.Mercury },
  { ruler: "venus", body: Body.Venus },
  { ruler: "mars", body: Body.Mars },
  { ruler: "jupiter", body: Body.Jupiter },
  { ruler: "saturn", body: Body.Saturn }
];

/** Benefic / malefic classification used to weight domain scores. */
const BENEFIC = new Set<PlanetaryRuler>(["jupiter", "venus"]);
const MALEFIC = new Set<PlanetaryRuler>(["mars", "saturn"]);

/**
 * Per-domain affinity of each ruler. Numbers are additive contributions centered on 0;
 * the engine normalizes the final blend to 0-100.
 */
const DOMAIN_AFFINITY: Record<PlanetaryRuler, Record<ForecastDomain, number>> = {
  sun: { money: 6, career: 14, luck: 8, opportunity: 12, love: 4 },
  moon: { money: 4, career: 2, luck: 10, opportunity: 6, love: 14 },
  mars: { money: 8, career: 12, luck: -4, opportunity: 8, love: -6 },
  mercury: { money: 10, career: 12, luck: 4, opportunity: 14, love: 6 },
  jupiter: { money: 16, career: 8, luck: 18, opportunity: 14, love: 8 },
  venus: { money: 12, career: 2, luck: 8, opportunity: 6, love: 18 },
  saturn: { money: 6, career: 14, luck: -8, opportunity: -2, love: -4 }
};

function safeLongitude(body: Body, date: Date): number {
  try {
    const value = EclipticLongitude(body, date);
    if (Number.isFinite(value)) return ((value % 360) + 360) % 360;
  } catch {
    /* fall through to deterministic estimate */
  }
  // Deterministic fallback derived from the sidereal time so the wheel keeps moving smoothly.
  const sidereal = ((SiderealTime(date) % 24) + 24) % 24;
  return (((sidereal / 24) * 360) + (body as unknown as number)) % 360;
}

/**
 * Returns the planetary ruler of the hour containing `date`, following the Chaldean order
 * and the day-ruler convention used by traditional planetary-hours astrology.
 */
export function planetaryRulerOfHour(date: Date): PlanetaryRuler {
  const weekday = date.getDay();
  const dayRuler = DAY_RULER_BY_WEEKDAY[weekday];
  const startIndex = CHALDEAN_ORDER.indexOf(dayRuler);
  const elapsedHours = date.getHours() + date.getMinutes() / 60;
  const hourIndex = (startIndex + Math.floor(elapsedHours)) % CHALDEAN_ORDER.length;
  return CHALDEAN_ORDER[hourIndex];
}

/** Captures ecliptic longitudes for the wheel visualization. Sun/Moon use sidereal estimates. */
export function captureSky(date: Date): PlanetarySkySnapshot {
  const bodies: PlanetarySkySnapshot["bodies"] = [
    { ruler: "sun", eclipticLongitude: sunLongitude(date) },
    { ruler: "moon", eclipticLongitude: moonLongitude(date) }
  ];
  for (const { ruler, body } of LONGITUDE_BODIES) {
    bodies.push({ ruler, eclipticLongitude: safeLongitude(body, date) });
  }
  return { computedAt: date.toISOString(), bodies };
}

function sunLongitude(date: Date): number {
  // Sun's apparent ecliptic longitude: roughly advances ~0.9856 deg/day from the vernal equinox.
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 0);
  const dayOfYear = (date.getTime() - yearStart) / 86_400_000;
  return (((dayOfYear - 80) * 0.9856) % 360 + 360) % 360;
}

function moonLongitude(date: Date): number {
  // Moon's mean ecliptic longitude advances ~13.176 deg/day over a ~27.32-day cycle.
  const epoch = Date.UTC(2000, 0, 6, 18);
  const daysSince = (date.getTime() - epoch) / 86_400_000;
  return ((218.316 + 13.176396 * daysSince) % 360 + 360) % 360;
}

/**
 * Scores each domain from the hour's ruling planet, adjusted by benefic/malefic aspects
 * to other visible bodies. Returns raw additive contributions; the engine normalizes.
 */
export function planetaryDomainScores(ruler: PlanetaryRuler, sky: PlanetarySkySnapshot): Record<ForecastDomain, number> {
  const base = DOMAIN_AFFINITY[ruler];
  const rulerLongitude = sky.bodies.find((item) => item.ruler === ruler)?.eclipticLongitude;

  const aspectBoost: Record<ForecastDomain, number> = { money: 0, career: 0, luck: 0, opportunity: 0, love: 0 };
  if (rulerLongitude !== undefined) {
    for (const body of sky.bodies) {
      if (body.ruler === ruler) continue;
      const separation = aspectSeparation(rulerLongitude, body.eclipticLongitude);
      // Trines/sextiles (harmonious) favor the ruler; squares/oppositions challenge it.
      const harmony = harmonyFactor(separation);
      if (BENEFIC.has(body.ruler)) {
        aspectBoost.luck += harmony * 6;
        aspectBoost.money += harmony * 4;
      } else if (MALEFIC.has(body.ruler)) {
        aspectBoost.career -= harmony * 3;
        aspectBoost.love -= harmony * 3;
      }
    }
  }

  return {
    money: base.money + aspectBoost.money,
    career: base.career + aspectBoost.career,
    luck: base.luck + aspectBoost.luck,
    opportunity: base.opportunity + aspectBoost.opportunity,
    love: base.love + aspectBoost.love
  };
}

function aspectSeparation(a: number, b: number): number {
  const raw = Math.abs(a - b) % 360;
  return raw > 180 ? 360 - raw : raw;
}

/** Returns +1 for harmonious aspects (0/60/120), -1 for tense ones (90/180), interpolated. */
function harmonyFactor(separation: number): number {
  // Map separation to the nearest major aspect and return a weight in [-1, 1].
  const aspects = [
    { angle: 0, weight: 1 },
    { angle: 60, weight: 0.6 },
    { angle: 90, weight: -0.7 },
    { angle: 120, weight: 0.8 },
    { angle: 180, weight: -1 }
  ];
  let nearest = aspects[0];
  for (const aspect of aspects) {
    if (Math.abs(separation - aspect.angle) < Math.abs(separation - nearest.angle)) nearest = aspect;
  }
  return nearest.weight;
}
