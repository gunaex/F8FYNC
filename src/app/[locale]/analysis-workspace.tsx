"use client";

import { useMemo, useState } from "react";
import type { AggregatedFortuneResult, SupportedLocale } from "@/core/domain";
import { buildBaziStructureProfile } from "@/core/engine/elements";
import { getHiddenStems } from "@/core/engine/hidden-stems";
import { buildIdentityLayer } from "@/core/engine/identity";
import { calculateFourPillars, type FourPillarsBlockedResult, type FourPillarsReadyResult } from "@/core/engine/pillars";
import { stemBranch, type StemBranch } from "@/core/engine/stems-branches";
import { getStemElement, getStemPolarity, type FiveElement } from "@/core/engine/ten-gods";
import { t } from "@/i18n";
import {
  BirthProfileForm,
  ArchetypeCard,
  ArchetypeDetailView,
  CouponRedeemCard,
  DailyTimingCard,
  DisclaimerCard,
  DomainScoreGrid,
  ElementBalance,
  EmptyState,
  FourPillarsRow,
  PartialBanner,
  PillarDetailSheet,
  RecommendationCard,
  ScoreCard,
  SystemSourceCard,
  Timeline,
  TimingStatusCard,
  TimingWindowCard,
  type AnalysisFormState,
  type F8SyncDashboardViewModel,
  type F8SyncPillarKey
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
  birthDate: "",
  birthTime: "",
  birthTimeStatus: "UNKNOWN",
  birthLocation: "Bangkok, Thailand",
  birthTimezone: "Asia/Bangkok",
  timezoneConfirmationStatus: "CONFIRMED",
  contextTimezone: "Asia/Bangkok",
  queryType: "daily",
  targetType: "general",
  targetValue: "",
  objective: ""
};

const elementLabels: Record<FiveElement, string> = {
  WOOD: "ไม้",
  FIRE: "ไฟ",
  EARTH: "ดิน",
  METAL: "ทอง",
  WATER: "น้ำ"
};

const animalLabels: Record<StemBranch["branch"], string> = {
  ZI: "หนู",
  CHOU: "วัว",
  YIN: "เสือ",
  MAO: "กระต่าย",
  CHEN: "มังกร",
  SI: "งู",
  WU: "ม้า",
  WEI: "แพะ",
  SHEN: "ลิง",
  YOU: "ไก่",
  XU: "สุนัข",
  HAI: "หมู"
};

const polarityLabels: Record<ReturnType<typeof getStemPolarity>, string> = {
  YANG: "หยาง",
  YIN: "หยิน"
};

function stemLabelTh(stem: StemBranch["stem"]) {
  return `${elementLabels[getStemElement(stem)]}${polarityLabels[getStemPolarity(stem)]}`;
}

function hiddenRoleTh(role: ReturnType<typeof getHiddenStems>[number]["role"]) {
  if (role === "MAIN") return "หลัก";
  if (role === "MID") return "รอง";
  return "เล็กน้อย";
}

function elementStatus(percentage: number): "เด่นมาก" | "เด่น" | "สมดุล" | "ควรเสริม" {
  if (percentage >= 28) return "เด่นมาก";
  if (percentage >= 22) return "เด่น";
  if (percentage >= 15) return "สมดุล";
  return "ควรเสริม";
}

function mapPillar(
  key: F8SyncPillarKey,
  labelTh: "ปี" | "เดือน" | "วัน" | "ชั่วโมง",
  value: StemBranch | "UNKNOWN",
  state: "KNOWN" | "UNKNOWN" | "BOUNDARY_DISPUTED",
  alternatives?: string[]
): F8SyncDashboardViewModel["pillars"][number] {
  if (value === "UNKNOWN") return { key, labelTh, state, alternatives };
  return {
    key,
    labelTh,
    state,
    stemChinese: value.stemChinese,
    stemLabelTh: stemLabelTh(value.stem),
    branchChinese: value.branchChinese,
    branchLabelTh: elementLabels[getStemElement(getHiddenStems(value.branch)[0].stem)],
    animalTh: animalLabels[value.branch],
    hiddenStems: getHiddenStems(value.branch).map((hidden) => {
      const hiddenStem = stemBranch(hidden.stem, value.branch);
      return {
        stemChinese: hiddenStem.stemChinese,
        label: hiddenStem.stemName,
        elementTh: stemLabelTh(hidden.stem),
        roleTh: hiddenRoleTh(hidden.role)
      };
    }),
    alternatives
  };
}

function mapElements(profile: ReturnType<typeof buildBaziStructureProfile>): F8SyncDashboardViewModel["elements"] {
  return (["WOOD", "FIRE", "EARTH", "METAL", "WATER"] as const).map((key) => ({
    key,
    labelTh: elementLabels[key],
    percentage: Math.round(profile.elementDistribution[key].percentage),
    statusTh: elementStatus(profile.elementDistribution[key].percentage)
  }));
}

function dailyLabel(formState: AnalysisFormState) {
  if (!formState.birthDate) return "ยังไม่ได้เลือกวันเกิด";
  return new Intl.DateTimeFormat("th-TH", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${formState.birthDate}T00:00:00`));
}

function blockedCopy(result: FourPillarsBlockedResult) {
  if (result.reasonCodes.includes("LOCKED_GATE_1B_BOUNDARY_NOT_AVAILABLE")) {
    return {
      headline: "ยังคำนวณปีนี้ไม่ได้",
      summary: "มีเวลาเกิดแล้ว แต่ยังไม่มีข้อมูลขอบเขตปฏิทินสำหรับปีที่เลือก",
      partial: "ยังไม่มีข้อมูล solar-term ที่ล็อกไว้สำหรับปีนี้ จึงยังคำนวณ BaZi เต็มไม่ได้"
    };
  }
  if (result.reasonCodes.includes("CONFIRMED_IANA_TIMEZONE_REQUIRED") || result.status === "BLOCKED_MISSING_TIMEZONE") {
    return {
      headline: "ต้องยืนยันเขตเวลาก่อน",
      summary: "กรุณาตรวจสอบเขตเวลาเกิดให้เป็น IANA timezone ที่ถูกต้อง",
      partial: "ยังคำนวณไม่ได้จนกว่าเขตเวลาเกิดจะถูกต้องและยืนยันแล้ว"
    };
  }
  return {
    headline: "ข้อมูลยังไม่พอสำหรับการคำนวณ",
    summary: "ตรวจสอบวันเกิด เวลาเกิด สถานที่เกิด และเขตเวลาอีกครั้ง",
    partial: "ผลบางส่วน — กรุณาตรวจสอบข้อมูลวันเกิดและเขตเวลา"
  };
}

function blockedViewModel(formState: AnalysisFormState, loading: boolean, result: FourPillarsBlockedResult): F8SyncDashboardViewModel {
  const copy = blockedCopy(result);
  return {
    state: loading ? "LOADING" : "PARTIAL",
    archetype: {
      id: "ARCH-02",
      nameTh: "ต้นกล้า",
      element: "WOOD",
      strength: "WEAK",
      summary: "ต้องกรอกวันเกิดและเขตเวลาให้ถูกต้องก่อน",
      descriptionParagraphs: ["ยังไม่สามารถคำนวณโครงสร้างหลักได้จากข้อมูลปัจจุบัน"],
      strengths: [],
      cautions: [],
      methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง"
    },
    pillars: [
      { key: "year", labelTh: "ปี", state: "UNKNOWN" },
      { key: "month", labelTh: "เดือน", state: "UNKNOWN" },
      { key: "day", labelTh: "วัน", state: "UNKNOWN" },
      { key: "hour", labelTh: "ชั่วโมง", state: "UNKNOWN" }
    ],
    elements: (["WOOD", "FIRE", "EARTH", "METAL", "WATER"] as const).map((key) => ({ key, labelTh: elementLabels[key], percentage: 0, statusTh: "ควรเสริม" })),
    daily: {
      localDateLabel: dailyLabel(formState),
      timezoneLabel: formState.contextTimezone === "Asia/Bangkok" ? "กรุงเทพฯ" : formState.contextTimezone,
      headline: copy.headline,
      statusTag: "พลังเป็นกลาง",
      summary: copy.summary,
      activities: ["ตรวจสอบข้อมูล", "กรอกใหม่"],
      detail: "ยังไม่สามารถแสดงรายละเอียดได้"
    },
    disclosures: {
      partial: copy.partial
    }
  };
}

function buildF8SyncViewModel(formState: AnalysisFormState, loading: boolean): F8SyncDashboardViewModel {
  if (!formState.birthDate) {
    return blockedViewModel(formState, loading, {
      status: "BLOCKED_INVALID_INPUT",
      reasonCodes: ["LOCAL_DATE_INCOMPLETE"],
      trace: ["Birth date incomplete"]
    });
  }

  const pillars = calculateFourPillars({
    localDate: formState.birthDate,
    localTime: formState.birthTime || null,
    birthTimeStatus: formState.birthTime ? "KNOWN" : "UNKNOWN",
    timezoneId: formState.birthTimezone,
    timezoneConfirmationStatus: formState.timezoneConfirmationStatus
  });

  if (!("yearPillar" in pillars)) return blockedViewModel(formState, loading, pillars);

  const profile = buildBaziStructureProfile(pillars);
  const identity = buildIdentityLayer(profile);
  const state = loading ? "LOADING" : pillars.status === "BOUNDARY_DISPUTED" ? "DISPUTED" : pillars.chartType === "THREE_PILLAR_PARTIAL" ? "PARTIAL" : "FULL";
  const hourState = pillars.status === "BOUNDARY_DISPUTED" ? "BOUNDARY_DISPUTED" : pillars.hourPillar === "UNKNOWN" ? "UNKNOWN" : "KNOWN";
  const alternatives = pillars.boundaryFlags.length ? pillars.boundaryFlags.map((flag) => `${flag.boundaryType} ${flag.solarTerm}: 2 ตัวเลือก`) : undefined;

  return {
    state,
    archetype: {
      id: identity.archetype.id,
      nameTh: identity.archetype.nameTh,
      element: identity.archetype.element,
      strength: identity.archetype.strength,
      summary: identity.archetype.nameTh,
      descriptionParagraphs: [],
      strengths: [],
      cautions: [],
      methodologyDisclosure: "คำแนะนำจริงขึ้นอยู่กับสมดุลโดยรวมของดวง"
    },
    pillars: [
      mapPillar("year", "ปี", pillars.yearPillar, "KNOWN"),
      mapPillar("month", "เดือน", pillars.monthPillar, pillars.status === "BOUNDARY_DISPUTED" ? "BOUNDARY_DISPUTED" : "KNOWN", alternatives),
      mapPillar("day", "วัน", pillars.dayPillar, "KNOWN"),
      mapPillar("hour", "ชั่วโมง", pillars.hourPillar, hourState, alternatives)
    ],
    elements: mapElements(profile),
    daily: {
      localDateLabel: dailyLabel(formState),
      timezoneLabel: formState.contextTimezone === "Asia/Bangkok" ? "กรุงเทพฯ" : formState.contextTimezone,
      headline: "พลังไม้สนับสนุนคุณวันนี้",
      statusTag: "จังหวะสนับสนุน",
      summary: "เหมาะกับการเติบโต การเรียนรู้ และการเริ่มบทสนทนาที่ต้องใช้ความเข้าใจ",
      activities: ["วางแผน", "เรียนรู้", "เริ่มต้นใหม่"],
      detail: "วันนี้เหมาะกับการจัดลำดับสิ่งสำคัญและเริ่มงานที่ต้องค่อย ๆ สร้างผลลัพธ์"
    },
    disclosures: {
      partial: state === "PARTIAL" ? "ผลบางส่วน — ยังไม่ทราบเวลาเกิด ดูได้แค่ 3 เสาก่อนนะ" : undefined,
      boundary: state === "DISPUTED" ? "เวลานี้อยู่ใกล้ขอบเขต ผลลัพธ์จึงมี 2 ตัวเลือกที่ต้องตรวจสอบ" : undefined
    }
  };
}

export function AnalysisWorkspace({ locale, dictionary }: { locale: SupportedLocale; dictionary: Record<string, unknown> }) {
  const [formState, setFormState] = useState(initialState);
  const [analysisContextTime] = useState(() => new Date().toISOString());
  const [result, setResult] = useState<AggregatedFortuneResult | null>(null);
  const [ai, setAi] = useState<AIOutput | null>(null);
  const [explanationQuestion, setExplanationQuestion] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedPillarKey, setSelectedPillarKey] = useState<F8SyncPillarKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const flatForm = useMemo(() => {
    const keys = [
      "birthDate", "birthTime", "birthLocation", "birthTimezone", "contextTimezone", "analysisType", "targetType",
      "timezoneConfirmationStatus", "timezoneConfirmed", "timezoneSuggested", "timezoneUnresolved", "timezoneUnknown",
      "birthInputUnavailableDisclosure", "birthDay", "birthMonth", "birthYearGregorian", "birthMonthPlaceholder", "chooseFromCalendar",
      "birthDateErrorIncomplete", "birthDateErrorInvalidDay", "birthDateErrorInvalidLeapDay", "birthDateErrorYearBelowRange",
      "birthDateErrorFuture", "birthDateErrorNonNumericYear", "buddhistYearHelper",
      "month.01", "month.02", "month.03", "month.04", "month.05", "month.06", "month.07", "month.08", "month.09", "month.10", "month.11", "month.12",
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
          birthTime: formState.birthTime || undefined,
          birthLocation: formState.birthLocation,
          birthTimezone: formState.birthTimezone
        },
        contextTime: analysisContextTime,
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
  const f8syncViewModel = useMemo(() => buildF8SyncViewModel(formState, loading), [formState, loading]);
  const selectedPillar = selectedPillarKey ? f8syncViewModel.pillars.find((pillar) => pillar.key === selectedPillarKey) ?? null : null;

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
        <div className={`f8sync-dashboard f8sync-dashboard--${f8syncViewModel.state.toLowerCase()}`} aria-busy={f8syncViewModel.state === "LOADING"}>
          {f8syncViewModel.state === "LOADING" ? (
            <div className="f8sync-loading-state" role="status">
              <span />
              <span />
              <span />
            </div>
          ) : null}
          <ArchetypeCard archetype={f8syncViewModel.archetype} onOpenDetail={() => setDetailOpen(true)} />
          {f8syncViewModel.state === "PARTIAL" && f8syncViewModel.disclosures.partial ? (
            <PartialBanner text={f8syncViewModel.disclosures.partial} actionLabel="ใส่เวลาเกิดเพื่อดูผลครบ →" />
          ) : null}
          {f8syncViewModel.state === "DISPUTED" && f8syncViewModel.disclosures.boundary ? (
            <PartialBanner text={f8syncViewModel.disclosures.boundary} actionLabel="ตรวจสอบเวลาเกิดอีกครั้ง →" />
          ) : null}
          <FourPillarsRow pillars={f8syncViewModel.pillars} onSelectPillar={setSelectedPillarKey} />
          <ElementBalance elements={f8syncViewModel.elements} />
          <DailyTimingCard daily={f8syncViewModel.daily} />
        </div>
        <ArchetypeDetailView open={detailOpen} archetype={f8syncViewModel.archetype} onClose={() => setDetailOpen(false)} />
        <PillarDetailSheet pillar={selectedPillar} onClose={() => setSelectedPillarKey(null)} />
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
            <SystemSourceCard
              title={t(dictionary, "result.sources")}
              sources={result.sources}
              labels={{
                locked: t(dictionary, "result.sourceLocked"),
                unlocked: t(dictionary, "result.sourceReady"),
                subscriptionRequired: t(dictionary, "result.subscriptionRequired")
              }}
            />
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
