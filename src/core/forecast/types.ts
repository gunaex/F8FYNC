export const FORECAST_ENGINE_VERSION = "forecast-6h-v0.1.0";
export const FORECAST_HORIZON_HOURS = 6;
export const FORECAST_DOMAINS = ["money", "career", "luck", "opportunity", "love"] as const;

export type ForecastDomain = (typeof FORECAST_DOMAINS)[number];

/**
 * Per-hour, per-domain normalized score (0-100).
 * `sources` records the raw contribution of each discipline so the receipt is auditable.
 */
export type DomainScore = {
  domain: ForecastDomain;
  score: number;
  sources: Record<ForecastDisciplineId, number>;
};

export type HourForecast = {
  /** Zero-based offset from the context hour (0 = the current hour). */
  hourOffset: number;
  /** ISO timestamp at the start of this hour bucket. */
  isoStart: string;
  /** The planetary ruler of this hour (Western/Chaldean order), when available. */
  planetaryRuler?: PlanetaryRuler;
  /** The Thai auspicious-timing flavor for this hour, when available. */
  thaiFlavor?: ThaiHourFlavor;
  scores: Record<ForecastDomain, DomainScore>;
};

export type ForecastDisciplineId = "planetary" | "thai" | "bazi";

export type PlanetaryRuler =
  | "sun"
  | "moon"
  | "mars"
  | "mercury"
  | "jupiter"
  | "venus"
  | "saturn";

export type ThaiHourFlavor = "auspicious" | "balanced" | "cautious";

export type ForecastReceipt = {
  receiptId: string;
  requestId: string;
  engineVersion: typeof FORECAST_ENGINE_VERSION;
  contextTime: string;
  contextTimezone: string;
  hasBirthProfile: boolean;
  disciplines: ForecastDisciplineId[];
  auditHash: string;
  createdAt: string;
};

export type ForecastReading = {
  contextTime: string;
  contextTimezone: string;
  /** Ecliptic longitudes (degrees) of the planets used for the wheel visualization. */
  sky: PlanetarySkySnapshot;
  hours: HourForecast[];
  receipt: ForecastReceipt;
  safety: {
    reflectiveOnly: true;
    noGuaranteedOutcome: true;
    entertainmentPurposes: true;
  };
};

export type PlanetarySkySnapshot = {
  computedAt: string;
  bodies: Array<{ ruler: PlanetaryRuler; eclipticLongitude: number }>;
};

export type ForecastInput = {
  requestId: string;
  contextTime: string;
  contextTimezone: string;
  birthProfile?: {
    birthDate: string;
    birthTime?: string;
    birthTimezone: string;
  };
  createdAt?: string;
};

export type RiskSeverity = "info" | "caution" | "high";

export type RiskAlert = {
  /** Zero-based hour offset within the horizon at which the risk peaks. */
  hourOffset: number;
  /** Approximate hours-from-now for copy ("อีก 2 ชม."). */
  hoursAhead: number;
  domain: ForecastDomain;
  severity: RiskSeverity;
  score: number;
  messageKey: string;
  actionKey: string;
};

export type RiskAlertInput = {
  reading: ForecastReading;
  /** Per-domain threshold below which a risk alert fires. */
  thresholds?: Partial<Record<ForecastDomain, number>>;
};
