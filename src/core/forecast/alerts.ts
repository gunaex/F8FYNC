import type { ForecastDomain, ForecastReading, RiskAlert, RiskAlertInput, RiskSeverity } from "./types";
import { FORECAST_DOMAINS } from "./types";

/**
 * Default per-domain thresholds below which a risk alert fires. Tuned so that a normal
 * day surfaces a small number of meaningful cautions rather than a wall of noise.
 */
const DEFAULT_THRESHOLDS: Record<ForecastDomain, number> = {
  career: 45,
  money: 42,
  love: 38,
  opportunity: 40,
  luck: 38
};

const SEVERITY_BANDS: Array<{ ceiling: number; severity: RiskSeverity }> = [
  { ceiling: 28, severity: "high" },
  { ceiling: 38, severity: "caution" },
  { ceiling: Number.POSITIVE_INFINITY, severity: "info" }
];

/**
 * Scans the horizon for the lowest-scoring hour in each domain and returns one alert per
 * domain that actually dips under its threshold. Results are ordered by hours-ahead so the
 * nearest upcoming risk surfaces first.
 */
export function detectRiskAlerts(input: RiskAlertInput): RiskAlert[] {
  const thresholds = { ...DEFAULT_THRESHOLDS, ...input.thresholds };
  const alerts: RiskAlert[] = [];

  for (const domain of FORECAST_DOMAINS) {
    let worst = null as { hourOffset: number; score: number } | null;
    for (const hour of input.reading.hours) {
      const score = hour.scores[domain].score;
      if (score < thresholds[domain] && (!worst || score < worst.score)) {
        worst = { hourOffset: hour.hourOffset, score };
      }
    }
    if (!worst) continue;
    alerts.push({
      hourOffset: worst.hourOffset,
      hoursAhead: worst.hourOffset,
      domain,
      severity: severityFor(worst.score),
      score: worst.score,
      messageKey: `forecast.risk.${domain}`,
      actionKey: `forecast.risk.${domain}.action`
    });
  }

  return alerts.sort((a, b) => a.hoursAhead - b.hoursAhead);
}

function severityFor(score: number): RiskSeverity {
  for (const band of SEVERITY_BANDS) {
    if (score < band.ceiling) return band.severity;
  }
  return "info";
}
