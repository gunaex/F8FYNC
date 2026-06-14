import type { AllowedIntent, BlockedIntent, KnowledgeCollection } from "./types";

export const allowedIntents: AllowedIntent[] = [
  "daily_fortune",
  "timing_advice",
  "compatibility",
  "multi_system_comparison",
  "fortune_method_explanation",
  "result_explanation",
  "profile_help",
  "subscription_help",
  "coupon_help",
  "product_support"
];

export const blockedIntents: BlockedIntent[] = [
  "general_chat",
  "coding",
  "homework",
  "translation_unrelated",
  "creative_writing_unrelated",
  "politics",
  "general_news",
  "medical_advice",
  "legal_advice",
  "financial_advice",
  "shopping",
  "travel_planning",
  "other_off_topic"
];

export const knowledgeCollections: KnowledgeCollection[] = [
  "fortune_methodology",
  "timing_methodology",
  "compatibility_methodology",
  "score_interpretation",
  "safety_policy",
  "product_help",
  "subscription_help",
  "coupon_help",
  "plugin_documentation",
  "localized_terminology"
];

export const ragConfig = {
  provider: process.env.RAG_PROVIDER ?? "local",
  maxChunks: Number(process.env.RAG_MAX_CHUNKS ?? 5),
  maxContextTokens: Number(process.env.RAG_MAX_CONTEXT_TOKENS ?? 2000),
  aiMaxInputTokens: Number(process.env.AI_MAX_INPUT_TOKENS ?? 4000),
  aiMaxOutputTokens: Number(process.env.AI_MAX_OUTPUT_TOKENS ?? 800),
  offTopicMainAiCall: process.env.OFF_TOPIC_MAIN_AI_CALL === "true",
  maxUserMessageLength: 1200
};

export const blockedKeywordRules: Array<{ intent: BlockedIntent; reasonCode: string; patterns: RegExp[] }> = [
  { intent: "coding", reasonCode: "BLOCKED_CODING", patterns: [/\b(code|debug|typescript|javascript|python|sql|api route|function)\b/i, /```/] },
  { intent: "homework", reasonCode: "BLOCKED_HOMEWORK", patterns: [/\b(homework|assignment|essay|solve this math)\b/i] },
  { intent: "translation_unrelated", reasonCode: "BLOCKED_TRANSLATION", patterns: [/\btranslate this|แปล(ประโยค|บทความ)|翻译\b/i] },
  { intent: "politics", reasonCode: "BLOCKED_POLITICS", patterns: [/\b(election|politics|government|นายก|เลือกตั้ง|政治)\b/i] },
  { intent: "general_news", reasonCode: "BLOCKED_NEWS", patterns: [/\b(news|latest|breaking|ข่าวล่าสุด)\b/i] },
  { intent: "medical_advice", reasonCode: "BLOCKED_MEDICAL", patterns: [/\b(diagnose|medicine|symptom|doctor|ป่วย|ยา|病|医生)\b/i] },
  { intent: "legal_advice", reasonCode: "BLOCKED_LEGAL", patterns: [/\b(lawyer|lawsuit|legal|contract law|คดี|กฎหมาย|律师)\b/i] },
  { intent: "financial_advice", reasonCode: "BLOCKED_FINANCIAL", patterns: [/\b(stock|crypto|investment|buy or sell|หุ้น|ลงทุน|加密货币)\b/i] },
  { intent: "shopping", reasonCode: "BLOCKED_SHOPPING", patterns: [/\b(buy|shopping|discount|ร้านไหนดี|ซื้ออะไร|购物)\b/i] },
  { intent: "travel_planning", reasonCode: "BLOCKED_TRAVEL", patterns: [/\b(itinerary|hotel|flight|travel plan|เที่ยวไหนดี|机票)\b/i] },
  { intent: "other_off_topic", reasonCode: "BLOCKED_PROMPT_INJECTION", patterns: [/ignore (all )?(previous|system) instructions/i, /reveal (the )?(system )?prompt/i, /ทำตามคำสั่งใหม่แทน/i] }
];

export const allowedKeywordRules: Array<{ intent: AllowedIntent; reasonCode: string; patterns: RegExp[] }> = [
  { intent: "coupon_help", reasonCode: "ALLOWED_COUPON_HELP", patterns: [/\b(coupon|FREE_1_WEEK|FREE_1_MONTH|คูปอง|优惠码)\b/i] },
  { intent: "subscription_help", reasonCode: "ALLOWED_SUBSCRIPTION_HELP", patterns: [/\b(plan|premium|subscription|แพ็กเกจ|สมาชิก|订阅)\b/i] },
  { intent: "profile_help", reasonCode: "ALLOWED_PROFILE_HELP", patterns: [/\b(profile|birth profile|วันเกิด|โปรไฟล์|出生资料)\b/i] },
  { intent: "timing_advice", reasonCode: "ALLOWED_TIMING", patterns: [/\b(timing|window|จังหวะ|ช่วงเวลา|时机)\b/i] },
  { intent: "compatibility", reasonCode: "ALLOWED_COMPATIBILITY", patterns: [/\b(compatibility|เข้ากัน|匹配)\b/i] },
  { intent: "multi_system_comparison", reasonCode: "ALLOWED_COMPARISON", patterns: [/\b(compare|comparison|เปรียบเทียบ|比较)\b/i] },
  { intent: "fortune_method_explanation", reasonCode: "ALLOWED_METHODOLOGY", patterns: [/\b(bazi|numerology|method|plugin|ระบบ|方法|数字)\b/i] },
  { intent: "daily_fortune", reasonCode: "ALLOWED_DAILY", patterns: [/\b(daily|fortune|insight|ดวง|อินไซต์|运势)\b/i] }
];
