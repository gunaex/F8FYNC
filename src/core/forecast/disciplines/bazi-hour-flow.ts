import { calculateDayPillar, calculateHourPillar } from "@/core/engine/pillars";
import { getStemElement } from "@/core/engine/ten-gods";
import type { HeavenlyStemKey } from "@/core/engine/stems-branches";
import type { FiveElement } from "@/core/engine/ten-gods";
import type { ForecastDomain } from "../types";

/** Five-element generation cycle (生): each element produces the next. */
const produces: Record<FiveElement, FiveElement> = {
  WOOD: "FIRE",
  FIRE: "EARTH",
  EARTH: "METAL",
  METAL: "WATER",
  WATER: "WOOD"
};

/**
 * Walks the BaZi hour pillar forward from the context time. For each hour we compare the
 * hour-stem element to the day-master element and read off the ten-gods relationship:
 *   - same / produces-day-master  → resource & support (career, wellbeing)
 *   - day-master-produces-hour    → output & creativity (opportunity, love)
 *   - day-master-controls-hour    → wealth acquisition (money)
 *   - hour-controls-day-master    → authority & pressure (career, caution)
 * Contributions are additive; the engine normalizes the blend to 0-100.
 */

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

/** Builds a `YYYY-MM-DD` local-date string for a Date interpreted in the given timezone offset. */
function localDateString(date: Date, timezoneOffsetMinutes: number): string {
  const shifted = new Date(date.getTime() - timezoneOffsetMinutes * 60_000);
  return `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`;
}

function localTimeString(date: Date, timezoneOffsetMinutes: number): string {
  const shifted = new Date(date.getTime() - timezoneOffsetMinutes * 60_000);
  return `${pad2(shifted.getUTCHours())}:${pad2(shifted.getUTCMinutes())}`;
}

/** Resolves the timezone offset (minutes east of UTC) from an IANA timezone id at `date`. */
function timezoneOffsetMinutes(timezoneId: string, date: Date): number {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezoneId,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
    });
    const parts = formatter.formatToParts(date);
    const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? "0");
    const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
    return Math.round((asUtc - date.getTime()) / 60_000);
  } catch {
    return 0;
  }
}

export type BaziHourContext = {
  dayMaster: HeavenlyStemKey;
  hourStem: HeavenlyStemKey;
  relationship: ElementRelationship;
};

export type ElementRelationship =
  | "same"
  | "resource" // hour produces day-master (印)
  | "output" // day-master produces hour (食伤)
  | "wealth" // day-master controls hour (财)
  | "authority"; // hour controls day-master (官杀)

export function resolveBaziHour(date: Date, timezoneId: string): BaziHourContext | null {
  const offset = timezoneOffsetMinutes(timezoneId, date);
  const localDate = localDateString(date, offset);
  const dayPillar = calculateDayPillar(localDate);
  if (!dayPillar) return null;
  const dayMaster = dayPillar.stem;
  const localTime = localTimeString(date, offset);
  const hourPillar = calculateHourPillar(dayMaster, localTime);
  if (!hourPillar) return null;
  return { dayMaster, hourStem: hourPillar.stem, relationship: classify(dayMaster, hourPillar.stem) };
}

/** Five-element control cycle (克): each element dominates another. */
const controls: Record<FiveElement, FiveElement> = {
  WOOD: "EARTH",
  FIRE: "METAL",
  EARTH: "WATER",
  METAL: "WOOD",
  WATER: "FIRE"
};

function classify(dayMaster: HeavenlyStemKey, hourStem: HeavenlyStemKey): ElementRelationship {
  const dayElement = getStemElement(dayMaster);
  const hourElement = getStemElement(hourStem);
  if (dayElement === hourElement) return "same";
  if (produces[hourElement] === dayElement) return "resource";
  if (produces[dayElement] === hourElement) return "output";
  if (controls[dayElement] === hourElement) return "wealth";
  return "authority";
}

const RELATIONSHIP_CONTRIBUTION: Record<ElementRelationship, Record<ForecastDomain, number>> = {
  same: { money: 4, career: 8, luck: 6, opportunity: 6, love: 4 },
  resource: { money: 6, career: 10, luck: 4, opportunity: 4, love: 6 },
  output: { money: 4, career: 2, luck: 8, opportunity: 12, love: 10 },
  wealth: { money: 14, career: 6, luck: 8, opportunity: 6, love: 6 },
  authority: { money: 2, career: 10, luck: -4, opportunity: -2, love: 0 }
};

export function baziDomainScores(relationship: ElementRelationship): Record<ForecastDomain, number> {
  return { ...RELATIONSHIP_CONTRIBUTION[relationship] };
}

export { getStemElement };
export type { FiveElement };
