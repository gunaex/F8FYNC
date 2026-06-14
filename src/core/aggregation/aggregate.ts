import type {
  AgreementLevel,
  AggregatedFortuneResult,
  FortuneRequest,
  PluginResult,
  ScoreDomain,
  TimingWindowType
} from "@/core/domain";
import { SCORE_DOMAINS } from "@/core/domain";
import { currentTimingStatus, mergeCompatibleWindows, nextOptimalWindow } from "@/core/timing/merge";

const agreementThresholds = { high: 10, medium: 25 };

function validResults(results: PluginResult[]) {
  return results.filter((result) => result.status !== "failed" && result.confidence > 0);
}

function weightedScore(results: PluginResult[], domain: ScoreDomain) {
  let numerator = 0;
  let denominator = 0;
  for (const result of validResults(results)) {
    const score = result.scores[domain];
    if (typeof score !== "number") continue;
    numerator += score * result.confidence;
    denominator += result.confidence;
  }
  return denominator === 0 ? undefined : Math.round(numerator / denominator);
}

function agreementFor(results: PluginResult[], domain: ScoreDomain): AgreementLevel {
  const values = validResults(results).map((result) => result.scores[domain]).filter((score): score is number => typeof score === "number");
  if (values.length < 2) return "insufficient_data";
  const spread = Math.max(...values) - Math.min(...values);
  if (spread <= agreementThresholds.high) return "high";
  if (spread <= agreementThresholds.medium) return "medium";
  return "low";
}

function dominantAgreement(levels: AgreementLevel[]): AgreementLevel {
  if (levels.includes("low")) return "low";
  if (levels.includes("medium")) return "medium";
  if (levels.includes("high")) return "high";
  return "insufficient_data";
}

function timingConflictType(a: TimingWindowType, b: TimingWindowType) {
  return (["optimal", "supportive"].includes(a) && ["caution", "avoid"].includes(b)) ||
    (["optimal", "supportive"].includes(b) && ["caution", "avoid"].includes(a));
}

export function aggregatePluginResults(request: FortuneRequest, pluginResults: PluginResult[]): AggregatedFortuneResult {
  const scores: AggregatedFortuneResult["scores"] = {};
  const byDomain: AggregatedFortuneResult["agreement"]["byDomain"] = {};
  const conflicts: AggregatedFortuneResult["conflicts"] = [];

  for (const domain of SCORE_DOMAINS) {
    const score = weightedScore(pluginResults, domain);
    if (typeof score === "number") scores[domain] = score;
    byDomain[domain] = agreementFor(pluginResults, domain);
    if (byDomain[domain] === "low") {
      conflicts.push({
        domain,
        pluginIds: validResults(pluginResults)
          .filter((result) => typeof result.scores[domain] === "number")
          .map((result) => result.pluginId),
        descriptionKey: "conflicts.scoreDispersion"
      });
    }
  }

  const windows = mergeCompatibleWindows(validResults(pluginResults).flatMap((result) => result.timingWindows));
  for (let i = 0; i < windows.length; i += 1) {
    for (let j = i + 1; j < windows.length; j += 1) {
      const a = windows[i];
      const b = windows[j];
      const overlaps = new Date(a.start) <= new Date(b.end) && new Date(b.start) <= new Date(a.end);
      if (overlaps && timingConflictType(a.type, b.type)) {
        conflicts.push({
          domain: a.domainTags[0] ?? "overall",
          pluginIds: Array.from(new Set([...a.sourcePluginIds, ...b.sourcePluginIds])),
          descriptionKey: "conflicts.timingOverlap"
        });
      }
    }
  }

  const current = currentTimingStatus(windows, request.contextTime);
  const overallScore = scores.overall ?? Math.round(Object.values(scores).reduce((sum, score) => sum + score, 0) / Math.max(1, Object.values(scores).length));
  const confidenceValues = validResults(pluginResults).map((result) => result.confidence);
  const confidence = confidenceValues.length === 0 ? 0 : Number((confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length).toFixed(2));
  const recommendationCodes = [
    current.status === "caution" || current.status === "avoid" ? "USE_CAUTION_FOR_FINANCIAL_COMMITMENT" : undefined,
    nextOptimalWindow(windows, request.contextTime) ? "WAIT_FOR_NEXT_OPTIMAL_WINDOW" : undefined,
    overallScore >= 70 ? "GOOD_FOR_MEETING" : undefined,
    conflicts.length > 0 ? "MIXED_SYSTEM_SIGNALS" : undefined,
    validResults(pluginResults).length < 2 ? "INSUFFICIENT_DATA" : undefined
  ].filter((code): code is string => Boolean(code));

  return {
    requestId: request.requestId,
    overallScore,
    scores,
    timing: {
      currentStatus: current.status,
      currentWindow: current.window,
      nextOptimalWindow: nextOptimalWindow(windows, request.contextTime),
      cautionWindows: windows.filter((window) => window.type === "caution" || window.type === "avoid"),
      allWindows: windows
    },
    agreement: {
      overall: dominantAgreement(Object.values(byDomain)),
      byDomain
    },
    confidence,
    conflicts,
    recommendations: recommendationCodes.map((code, index) => ({
      code,
      priority: index + 1,
      messageKey: `recommendations.${code}`
    })),
    warnings: pluginResults.flatMap((result) => result.warnings),
    sources: pluginResults.map((result) => ({ pluginId: result.pluginId, version: result.pluginVersion, status: result.status })),
    pluginResults,
    metadata: {
      generatedAt: new Date().toISOString(),
      locale: request.locale,
      contextTimezone: request.contextTimezone
    }
  };
}
