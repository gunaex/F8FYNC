import { createHash } from "node:crypto";
import type {
  DomainScore,
  ForecastDisciplineId,
  ForecastDomain,
  ForecastInput,
  ForecastReading,
  ForecastReceipt,
  HourForecast
} from "./types";
import { FORECAST_DOMAINS, FORECAST_ENGINE_VERSION, FORECAST_HORIZON_HOURS } from "./types";
import { captureSky, planetaryDomainScores, planetaryRulerOfHour } from "./disciplines/planetary-hours";
import { thaiDomainScores, thaiFlavorOfRuler } from "./disciplines/thai-auspicious";
import { baziDomainScores, resolveBaziHour } from "./disciplines/bazi-hour-flow";

/** Per-discipline blend weight. The three systems are intentionally complementary. */
const WEIGHTS = { planetary: 0.42, thai: 0.3, bazi: 0.28 };

/** Pre-blend offset added to all raw contributions before normalization, so a neutral sky still centers near 60. */
const BASE_OFFSET = 52;

export function computeForecast(input: ForecastInput): ForecastReading {
  const contextDate = new Date(input.contextTime);
  const createdAt = input.createdAt ?? new Date().toISOString();
  const sky = captureSky(contextDate);

  const hours: HourForecast[] = [];
  for (let offset = 0; offset < FORECAST_HORIZON_HOURS; offset += 1) {
    hours.push(computeHour(contextDate, offset, input, sky));
  }

  const disciplines = Object.keys(WEIGHTS) as ForecastDisciplineId[];
  const receiptPayload = {
    requestId: input.requestId,
    engineVersion: FORECAST_ENGINE_VERSION,
    contextTime: input.contextTime,
    contextTimezone: input.contextTimezone,
    hasBirthProfile: Boolean(input.birthProfile),
    disciplines,
    createdAt
  };
  const auditHash = sha256Hex(JSON.stringify(receiptPayload));
  const receipt: ForecastReceipt = {
    receiptId: `forecast_${auditHash.slice(0, 16)}`,
    requestId: input.requestId,
    engineVersion: FORECAST_ENGINE_VERSION,
    contextTime: input.contextTime,
    contextTimezone: input.contextTimezone,
    hasBirthProfile: Boolean(input.birthProfile),
    disciplines,
    createdAt,
    auditHash
  };

  return {
    contextTime: input.contextTime,
    contextTimezone: input.contextTimezone,
    sky,
    hours,
    receipt,
    safety: { reflectiveOnly: true, noGuaranteedOutcome: true, entertainmentPurposes: true }
  };
}

function computeHour(contextDate: Date, hourOffset: number, input: ForecastInput, sky: ReturnType<typeof captureSky>): HourForecast {
  const hourDate = new Date(contextDate.getTime() + hourOffset * 3_600_000);
  const ruler = planetaryRulerOfHour(hourDate);
  const flavor = thaiFlavorOfRuler(ruler);

  const planetaryScores = planetaryDomainScores(ruler, sky);
  const thaiScores = thaiDomainScores(flavor);
  const bazi = resolveBaziHour(hourDate, input.contextTimezone);
  const baziScores = bazi ? baziDomainScores(bazi.relationship) : zeroScores();

  const scores = {} as Record<ForecastDomain, DomainScore>;
  for (const domain of FORECAST_DOMAINS) {
    const blended = BASE_OFFSET
      + WEIGHTS.planetary * planetaryScores[domain]
      + WEIGHTS.thai * thaiScores[domain]
      + WEIGHTS.bazi * baziScores[domain];
    scores[domain] = {
      domain,
      score: clampScore(blended),
      sources: {
        planetary: round1(planetaryScores[domain]),
        thai: round1(thaiScores[domain]),
        bazi: round1(baziScores[domain])
      }
    };
  }

  return {
    hourOffset,
    isoStart: hourFloorIso(hourDate),
    planetaryRuler: ruler,
    thaiFlavor: flavor,
    scores
  };
}

function hourFloorIso(date: Date): string {
  const floored = new Date(date);
  floored.setMinutes(0, 0, 0);
  return floored.toISOString();
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function zeroScores(): Record<ForecastDomain, number> {
  return { money: 0, career: 0, luck: 0, opportunity: 0, love: 0 };
}

function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
