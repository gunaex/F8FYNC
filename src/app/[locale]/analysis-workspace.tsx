"use client";

import { useMemo, useState } from "react";
import type { AggregatedFortuneResult, SupportedLocale } from "@/core/domain";
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

function buildF8SyncViewModel(formState: AnalysisFormState, loading: boolean): F8SyncDashboardViewModel {
  const state = loading ? "LOADING" : formState.birthTimeStatus === "UNKNOWN" ? "PARTIAL" : formState.birthTimeStatus === "DISPUTED" ? "DISPUTED" : "FULL";
  const hourState = state === "PARTIAL" ? "UNKNOWN" : state === "DISPUTED" ? "BOUNDARY_DISPUTED" : "KNOWN";

  return {
    state,
    archetype: {
      id: "ARCH-09",
      nameTh: "มหาสมุทร",
      element: "WATER",
      strength: "STRONG",
      summary: "มองภาพรวมได้ลึกและเชื่อมโยงข้อมูลหลายด้านได้ดี",
      detail: "ตัวตนแบบมหาสมุทรเหมาะกับงานที่ต้องใช้ความเข้าใจ ความนิ่ง และการตัดสินใจจากข้อมูลหลายชั้น",
      strengths: ["รับฟังและจับประเด็นซับซ้อนได้ดี", "ปรับตัวกับสถานการณ์ใหม่ได้ไว", "มองความเสี่ยงก่อนตัดสินใจ"],
      cautions: ["คิดวนมากเกินไปเมื่อข้อมูลยังไม่ครบ", "เก็บความรู้สึกไว้คนเดียวได้นาน", "ควรกำหนดขอบเขตการตัดสินใจให้ชัด"],
      supportingElements: ["ธาตุไม้", "ธาตุทอง"]
    },
    pillars: [
      {
        key: "year",
        labelTh: "ปี",
        state: "KNOWN",
        stemChinese: "庚",
        stemLabelTh: "โลหะหยาง",
        branchChinese: "辰",
        branchLabelTh: "ดิน",
        animalTh: "มังกร",
        hiddenStems: [
          { stemChinese: "戊", label: "Wu", elementTh: "ดินหยาง", roleTh: "หลัก" },
          { stemChinese: "乙", label: "Yi", elementTh: "ไม้หยิน", roleTh: "รอง" },
          { stemChinese: "癸", label: "Gui", elementTh: "น้ำหยิน", roleTh: "เล็กน้อย" }
        ]
      },
      {
        key: "month",
        labelTh: "เดือน",
        state: "KNOWN",
        stemChinese: "丁",
        stemLabelTh: "ไฟหยิน",
        branchChinese: "亥",
        branchLabelTh: "น้ำ",
        animalTh: "หมู",
        hiddenStems: [
          { stemChinese: "壬", label: "Ren", elementTh: "น้ำหยาง", roleTh: "หลัก" },
          { stemChinese: "甲", label: "Jia", elementTh: "ไม้หยาง", roleTh: "รอง" }
        ]
      },
      {
        key: "day",
        labelTh: "วัน",
        state: "KNOWN",
        stemChinese: "甲",
        stemLabelTh: "ไม้หยาง",
        branchChinese: "戌",
        branchLabelTh: "ดิน",
        animalTh: "สุนัข",
        hiddenStems: [
          { stemChinese: "戊", label: "Wu", elementTh: "ดินหยาง", roleTh: "หลัก" },
          { stemChinese: "辛", label: "Xin", elementTh: "ทองหยิน", roleTh: "รอง" },
          { stemChinese: "丁", label: "Ding", elementTh: "ไฟหยิน", roleTh: "เล็กน้อย" }
        ]
      },
      {
        key: "hour",
        labelTh: "ชั่วโมง",
        state: hourState,
        stemChinese: hourState === "KNOWN" ? "戊" : undefined,
        stemLabelTh: hourState === "KNOWN" ? "ดินหยาง" : undefined,
        branchChinese: hourState === "KNOWN" ? "辰" : undefined,
        branchLabelTh: hourState === "KNOWN" ? "ดิน" : undefined,
        animalTh: hourState === "KNOWN" ? "มังกร" : undefined,
        hiddenStems: hourState === "KNOWN" ? [
          { stemChinese: "戊", label: "Wu", elementTh: "ดินหยาง", roleTh: "หลัก" },
          { stemChinese: "乙", label: "Yi", elementTh: "ไม้หยิน", roleTh: "รอง" },
          { stemChinese: "癸", label: "Gui", elementTh: "น้ำหยิน", roleTh: "เล็กน้อย" }
        ] : undefined,
        alternatives: hourState === "BOUNDARY_DISPUTED" ? ["ตัวเลือกก่อนขอบเขต", "ตัวเลือกหลังขอบเขต"] : undefined
      }
    ],
    elements: [
      { key: "WOOD", labelTh: "ไม้", percentage: state === "PARTIAL" ? 24 : 22, statusTh: "เด่น" },
      { key: "FIRE", labelTh: "ไฟ", percentage: state === "PARTIAL" ? 14 : 16, statusTh: state === "PARTIAL" ? "ควรเสริม" : "สมดุล" },
      { key: "EARTH", labelTh: "ดิน", percentage: state === "PARTIAL" ? 28 : 30, statusTh: "เด่นมาก" },
      { key: "METAL", labelTh: "ทอง", percentage: state === "PARTIAL" ? 12 : 13, statusTh: "ควรเสริม" },
      { key: "WATER", labelTh: "น้ำ", percentage: state === "PARTIAL" ? 22 : 19, statusTh: "สมดุล" }
    ],
    daily: {
      localDateLabel: "18 มิ.ย. 2026",
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
