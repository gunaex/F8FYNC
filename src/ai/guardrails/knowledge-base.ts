import type { KnowledgeDocument } from "./types";

const now = "2026-06-14T00:00:00.000Z";

export const approvedKnowledgeDocuments: KnowledgeDocument[] = [
  {
    id: "knowledge_score_ranges_th",
    collection: "score_interpretation",
    locale: "th",
    title: "การอ่านคะแนน",
    content: "คะแนนเป็นสัญญาณเชิงเปรียบเทียบจากระบบ deterministic ช่วงคะแนนสูงหมายถึงแรงสนับสนุนมากกว่า แต่ไม่ใช่คำรับประกันผลลัพธ์",
    sourceType: "methodology",
    version: "2026-06",
    status: "approved",
    approvedAt: now,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "knowledge_timing_windows_th",
    collection: "timing_methodology",
    locale: "th",
    title: "ช่วงเวลาที่เหมาะสม",
    content: "ช่วงเวลา optimal และ supportive ใช้เพื่อช่วยจัดลำดับการกระทำ ส่วน caution และ avoid เป็นสัญญาณให้พิจารณาความรอบคอบมากขึ้น",
    sourceType: "methodology",
    version: "2026-06",
    status: "approved",
    approvedAt: now,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "knowledge_coupon_help_th",
    collection: "coupon_help",
    locale: "th",
    title: "คูปองทดลอง Premium",
    content: "FREE_1_WEEK ให้ Premium 7 วัน และ FREE_1_MONTH ให้ Premium 30 วัน สมาชิกหนึ่งบัญชีใช้คูปองฟรีได้หนึ่งครั้งตลอดอายุบัญชี",
    sourceType: "faq",
    version: "2026-06",
    status: "approved",
    approvedAt: now,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "knowledge_safety_policy_th",
    collection: "safety_policy",
    locale: "th",
    title: "นโยบายความปลอดภัย",
    content: "คำอธิบายต้องไม่รับประกันความสำเร็จ เงิน ความสัมพันธ์ สุขภาพ ความปลอดภัย หรือผลลัพธ์ทางกฎหมายและการลงทุน",
    sourceType: "internal_policy",
    version: "2026-06",
    status: "approved",
    approvedAt: now,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "knowledge_score_ranges_en",
    collection: "score_interpretation",
    locale: "en",
    title: "Reading scores",
    content: "Scores are comparative signals from deterministic systems. Higher scores indicate stronger support but never guarantee an outcome.",
    sourceType: "methodology",
    version: "2026-06",
    status: "approved",
    approvedAt: now,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "knowledge_score_ranges_zh",
    collection: "score_interpretation",
    locale: "zh-CN",
    title: "评分解读",
    content: "评分是确定性系统产生的比较信号。较高分数表示支持度更强，但不代表结果保证。",
    sourceType: "methodology",
    version: "2026-06",
    status: "approved",
    approvedAt: now,
    createdAt: now,
    updatedAt: now
  },
  {
    id: "knowledge_retired_test",
    collection: "product_help",
    locale: "th",
    title: "Retired",
    content: "This retired document must never be retrieved.",
    sourceType: "faq",
    version: "2026-01",
    status: "retired",
    createdAt: now,
    updatedAt: now
  }
];
