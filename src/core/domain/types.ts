export type SupportedLocale = "th" | "en" | "zh-CN";
export const DEFAULT_LOCALE: SupportedLocale = "th";
export const SUPPORTED_LOCALES: SupportedLocale[] = ["th", "en", "zh-CN"];

export type FortuneQueryType = "daily" | "timing" | "compatibility" | "comparison";
export type FortuneTargetType =
  | "general"
  | "phone_number"
  | "vehicle_plate"
  | "house_number"
  | "room_number"
  | "name"
  | "event_datetime";

export type BirthProfile = {
  birthDate: string;
  birthTime?: string;
  birthLocation: string;
  birthTimezone: string;
};

export type FortuneTarget = {
  type: FortuneTargetType;
  value: string;
  label?: string;
};

export type FortuneRequest = {
  requestId: string;
  locale: SupportedLocale;
  queryType: FortuneQueryType;
  birthProfile: BirthProfile;
  contextTime: string;
  contextTimezone: string;
  target?: FortuneTarget;
  selectedPluginIds?: string[];
  objective?: string;
};

export type ScoreDomain =
  | "overall"
  | "career"
  | "money"
  | "relationship"
  | "wellbeing"
  | "communication"
  | "travel";

export const SCORE_DOMAINS: ScoreDomain[] = [
  "overall",
  "career",
  "money",
  "relationship",
  "wellbeing",
  "communication",
  "travel"
];

export type TimingWindowType = "optimal" | "supportive" | "neutral" | "caution" | "avoid";

export type TimingWindow = {
  id: string;
  start: string;
  end: string;
  type: TimingWindowType;
  strength: number;
  domainTags: ScoreDomain[];
  reasonCodes: string[];
  sourcePluginIds: string[];
};

export type PluginWarning = {
  code: string;
  severity: "info" | "caution" | "high";
  messageKey: string;
  parameters?: Record<string, string | number>;
};

export type PluginResult = {
  pluginId: string;
  pluginVersion: string;
  calculationVersion: string;
  status: "success" | "partial" | "failed";
  scores: Partial<Record<ScoreDomain, number>>;
  timingWindows: TimingWindow[];
  warnings: PluginWarning[];
  confidence: number;
  evidence: Array<{
    code: string;
    value?: string | number;
    descriptionKey: string;
  }>;
  metadata: {
    calculatedAt: string;
    durationMs?: number;
    inputHash?: string;
  };
  error?: {
    code: string;
    retryable: boolean;
  };
};

export type AgreementLevel = "high" | "medium" | "low" | "insufficient_data";

export type AggregatedFortuneResult = {
  requestId: string;
  overallScore: number;
  scores: Partial<Record<ScoreDomain, number>>;
  timing: {
    currentStatus: TimingWindowType;
    currentWindow?: TimingWindow;
    nextOptimalWindow?: TimingWindow;
    cautionWindows: TimingWindow[];
    allWindows: TimingWindow[];
  };
  agreement: {
    overall: AgreementLevel;
    byDomain: Partial<Record<ScoreDomain, AgreementLevel>>;
  };
  confidence: number;
  conflicts: Array<{
    domain: ScoreDomain;
    pluginIds: string[];
    descriptionKey: string;
  }>;
  recommendations: Array<{
    code: string;
    priority: number;
    messageKey: string;
    parameters?: Record<string, string | number>;
  }>;
  warnings: PluginWarning[];
  sources: Array<{
    pluginId: string;
    version: string;
    status: PluginResult["status"];
  }>;
  pluginResults: PluginResult[];
  metadata: {
    generatedAt: string;
    locale: SupportedLocale;
    contextTimezone: string;
  };
};
