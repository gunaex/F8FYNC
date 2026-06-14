import type { FortuneQueryType, SupportedLocale } from "@/core/domain";

export type AllowedIntent =
  | "daily_fortune"
  | "timing_advice"
  | "compatibility"
  | "multi_system_comparison"
  | "fortune_method_explanation"
  | "result_explanation"
  | "profile_help"
  | "subscription_help"
  | "coupon_help"
  | "product_support";

export type BlockedIntent =
  | "general_chat"
  | "coding"
  | "homework"
  | "translation_unrelated"
  | "creative_writing_unrelated"
  | "politics"
  | "general_news"
  | "medical_advice"
  | "legal_advice"
  | "financial_advice"
  | "shopping"
  | "travel_planning"
  | "other_off_topic";

export type IntentDecision = {
  allowed: boolean;
  intent: AllowedIntent | BlockedIntent;
  confidence: number;
  reasonCode: string;
  requiresRag: boolean;
  requiresFortuneResult: boolean;
};

export type KnowledgeCollection =
  | "fortune_methodology"
  | "timing_methodology"
  | "compatibility_methodology"
  | "score_interpretation"
  | "safety_policy"
  | "product_help"
  | "subscription_help"
  | "coupon_help"
  | "plugin_documentation"
  | "localized_terminology";

export type KnowledgeDocument = {
  id: string;
  collection: KnowledgeCollection;
  locale: SupportedLocale;
  title: string;
  content: string;
  sourceType: "internal_policy" | "methodology" | "product_documentation" | "faq";
  version: string;
  status: "draft" | "approved" | "retired";
  approvedBy?: string;
  approvedAt?: string;
  metadata?: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
};

export type KnowledgeChunk = {
  documentId: string;
  collection: KnowledgeCollection;
  title: string;
  content: string;
  locale: SupportedLocale;
  score: number;
};

export type KnowledgeRetrievalInput = {
  locale: SupportedLocale;
  intent: AllowedIntent;
  query: string;
  queryType?: FortuneQueryType;
  planCode?: string;
};

export interface KnowledgeRetriever {
  retrieve(input: KnowledgeRetrievalInput): Promise<KnowledgeChunk[]>;
}

export type IntentAuditLog = {
  id: string;
  requestId: string;
  memberId?: string;
  decision: IntentDecision;
  ragUsed: boolean;
  retrievedDocumentIds: string[];
  providerId?: string;
  tokenEstimate: number;
  cacheStatus: "hit" | "miss" | "not_applicable";
  createdAt: string;
};
