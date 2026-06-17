"use client";

import { useMemo, useState } from "react";
import type { AggregatedFortuneResult, SupportedLocale } from "@/core/domain";
import { t } from "@/i18n";
import {
  BirthProfileForm,
  CouponRedeemCard,
  DisclaimerCard,
  DomainScoreGrid,
  EmptyState,
  RecommendationCard,
  ScoreCard,
  SystemSourceCard,
  Timeline,
  TimingStatusCard,
  TimingWindowCard,
  type AnalysisFormState
} from "@/ui/components";
import { TextField } from "@/ui/primitives";

type AIOutput = {
  headline: string;
  summary: string;
  keyInsights: string[];
  recommendedActions: string[];
  cautionNotes: string[];
};

const initialState: AnalysisFormState = {
  birthDate: "1990-01-01",
  birthTime: "10:30",
  birthTimeStatus: "KNOWN",
  birthLocation: "Bangkok, Thailand",
  birthTimezone: "Asia/Bangkok",
  timezoneConfirmationStatus: "CONFIRMED",
  contextTimezone: "Asia/Bangkok",
  queryType: "daily",
  targetType: "general",
  targetValue: "",
  objective: ""
};

export function AnalysisWorkspace({ locale, dictionary }: { locale: SupportedLocale; dictionary: Record<string, unknown> }) {
  const [formState, setFormState] = useState(initialState);
  const [result, setResult] = useState<AggregatedFortuneResult | null>(null);
  const [ai, setAi] = useState<AIOutput | null>(null);
  const [explanationQuestion, setExplanationQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const flatForm = useMemo(() => {
    const keys = [
      "birthDate", "birthTime", "birthLocation", "birthTimezone", "contextTimezone", "analysisType", "targetType",
      "birthTimeStatus", "birthTimeKnown", "birthTimeUnknown", "birthTimeApproximate", "birthTimeDisputed",
      "timezoneConfirmationStatus", "timezoneConfirmed", "timezoneSuggested", "timezoneUnresolved", "timezoneUnknown",
      "birthInputUnavailableDisclosure",
      "targetValue", "objective", "analysis.daily", "analysis.timing", "analysis.compatibility", "analysis.comparison",
      "target.general", "target.phone_number", "target.vehicle_plate", "target.house_number", "target.room_number",
      "target.name", "target.event_datetime", "loading", "run", "clear"
    ];
    return Object.fromEntries(keys.map((key) => [key, t(dictionary, key.startsWith("analysis.") || key.startsWith("target.") ? `form.${key}` : key === "loading" || key === "run" || key === "clear" ? `common.${key}` : `form.${key}`)]));
  }, [dictionary]);

  async function runAnalysis() {
    setLoading(true);
    setError(null);
    setAi(null);
    try {
      const payload = {
        requestId: crypto.randomUUID(),
        locale,
        queryType: formState.queryType,
        birthProfile: {
          birthDate: formState.birthDate,
          birthTime: formState.birthTimeStatus === "UNKNOWN" ? undefined : formState.birthTime || undefined,
          birthLocation: formState.birthLocation,
          birthTimezone: formState.birthTimezone
        },
        contextTime: new Date().toISOString(),
        contextTimezone: formState.contextTimezone,
        target: { type: formState.targetType, value: formState.targetValue },
        objective: formState.objective || undefined
      };
      const response = await fetch("/api/fortune", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await response.json();
      if (!json.success) throw new Error(json.error?.messageKey ?? "common.error");
      setResult(json.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "common.error");
    } finally {
      setLoading(false);
    }
  }

  async function explain() {
    if (!result) return;
    const response = await fetch("/api/interpretation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        queryType: formState.queryType,
        userObjective: formState.objective,
        userMessage: explanationQuestion,
        aggregatedResult: result
      })
    });
    const json = await response.json();
    if (json.success) setAi(json.data);
  }

  const domainLabels = {
    overall: t(dictionary, "result.overallScore"),
    career: t(dictionary, "result.career"),
    money: t(dictionary, "result.money"),
    relationship: t(dictionary, "result.relationship"),
    wellbeing: t(dictionary, "result.wellbeing"),
    communication: t(dictionary, "result.communication"),
    travel: t(dictionary, "result.travel")
  };
  const timingLabels = {
    optimal: t(dictionary, "timing.optimal"),
    supportive: t(dictionary, "timing.supportive"),
    neutral: t(dictionary, "timing.neutral"),
    caution: t(dictionary, "timing.caution"),
    avoid: t(dictionary, "timing.avoid")
  };

  return (
    <div className="dashboard-grid">
      <div>
        <div className="hero-panel">
          <span className="hero-kicker">{t(dictionary, "common.appName")}</span>
          <h1>{t(dictionary, "home.greeting")}</h1>
          <p>{t(dictionary, "home.subtitle")}</p>
          <div className="hero-signal-strip" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <CouponRedeemCard
          labels={{
            title: t(dictionary, "coupon.title"),
            description: t(dictionary, "coupon.description"),
            inputLabel: t(dictionary, "coupon.inputLabel"),
            placeholder: t(dictionary, "coupon.placeholder"),
            redeem: t(dictionary, "coupon.redeem"),
            loading: t(dictionary, "common.loading"),
            success: t(dictionary, "coupon.success"),
            loginRequired: t(dictionary, "coupon.errors.loginRequired"),
            freeAlreadyUsed: t(dictionary, "coupon.errors.freeAlreadyUsed"),
            invalid: t(dictionary, "coupon.errors.invalid"),
            failed: t(dictionary, "coupon.errors.failed")
          }}
        />
        <BirthProfileForm dictionary={flatForm} state={formState} onChange={setFormState} onSubmit={runAnalysis} loading={loading} />
      </div>

      <div className="field-grid">
        {error ? <EmptyState title={t(dictionary, "common.error")} text={error} /> : null}
        {result ? (
          <>
            <div className="result-header-card">
              <span className="badge positive">{t(dictionary, "result.headline")}</span>
              <h2>{timingLabels[result.timing.currentStatus]}</h2>
              <p className="muted">{t(dictionary, "disclaimer.general")}</p>
            </div>
            <ScoreCard label={t(dictionary, "result.overallScore")} score={result.overallScore} />
            <div className="result-grid">
              <TimingStatusCard label={t(dictionary, "timing.current")} statusLabel={timingLabels[result.timing.currentStatus]} />
              <TimingWindowCard window={result.timing.nextOptimalWindow} locale={locale} timezone={result.metadata.contextTimezone} label={t(dictionary, "home.nextWindow")} />
            </div>
            <DomainScoreGrid scores={result.scores as Record<string, number>} labels={domainLabels} />
            <RecommendationCard title={t(dictionary, "result.recommendations")} items={result.recommendations.map((item) => t(dictionary, item.messageKey, item.parameters))} />
            {result.warnings.length ? <RecommendationCard title={t(dictionary, "result.warnings")} items={result.warnings.map((item) => t(dictionary, item.messageKey, item.parameters))} /> : null}
            {result.conflicts.length ? <RecommendationCard title={t(dictionary, "result.conflicts")} items={result.conflicts.map((item) => t(dictionary, item.descriptionKey))} /> : null}
            <SystemSourceCard title={t(dictionary, "result.sources")} sources={result.sources} />
            <div className="card">
              <h2 className="section-title">{t(dictionary, "result.viewTimeline")}</h2>
              <Timeline windows={result.timing.allWindows} locale={locale} timezone={result.metadata.contextTimezone} labels={timingLabels} />
            </div>
            <div className="button-row">
              <TextField
                id="explanationQuestion"
                label={t(dictionary, "result.explanationQuestion")}
                placeholder={t(dictionary, "result.explanationPlaceholder")}
                value={explanationQuestion}
                onChange={(event) => setExplanationQuestion(event.target.value)}
              />
              <button className="button secondary" type="button" onClick={explain}>{t(dictionary, "result.aiExplanation")}</button>
            </div>
            {ai ? (
              <RecommendationCard title={ai.headline} items={[ai.summary, ...ai.keyInsights, ...ai.recommendedActions, ...ai.cautionNotes]} />
            ) : null}
            <DisclaimerCard text={t(dictionary, "disclaimer.general")} />
          </>
        ) : (
          <div className="preview-stack">
            <EmptyState title={t(dictionary, "result.headline")} text={t(dictionary, "disclaimer.general")} />
            <div className="preview-card">
              <div className="preview-rings" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <strong>{t(dictionary, "home.todayScore")}</strong>
              <p className="muted">{t(dictionary, "home.nextWindow")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
