import type { AIInterpretationInput, AIInterpretationProvider } from "@/ai/interpreter/types";

const copy = {
  th: {
    headline: "อินไซต์วันนี้พร้อมใช้งาน",
    summary: (score: number, agreement: string) => `คะแนนรวมอยู่ที่ ${score}/100 โดยระดับความสอดคล้องของระบบคือ ${agreement} ควรใช้ผลนี้เป็นแนวโน้มประกอบการตัดสินใจ ไม่ใช่คำรับประกัน`,
    insight: "ระบบคำนวณให้สัญญาณจากหลายแหล่งและรวมผลด้วยความมั่นใจของแต่ละระบบ",
    action: "เลือกงานสำคัญในช่วงเวลาที่ระบบให้แรงสนับสนุนสูงกว่า",
    caution: "หลีกเลี่ยงการตัดสินใจเร่งด่วนในช่วงที่มีคำเตือนหรือความขัดแย้ง",
    disclaimer: "ผลลัพธ์เป็นข้อมูลเชิงแนะนำจากระบบเชิงสัญลักษณ์ ไม่ใช่คำแนะนำทางการแพทย์ กฎหมาย การเงิน หรือคำรับประกันผลลัพธ์"
  },
  en: {
    headline: "Your timing insight is ready",
    summary: (score: number, agreement: string) => `The overall score is ${score}/100 with ${agreement} system agreement. Treat this as directional support, not a guarantee.`,
    insight: "The engine combined multiple deterministic systems using each system confidence.",
    action: "Place important actions inside higher-support timing windows where practical.",
    caution: "Avoid rushed decisions during caution windows or mixed-system signals.",
    disclaimer: "This is guidance from symbolic timing systems, not medical, legal, financial, or guaranteed outcome advice."
  },
  "zh-CN": {
    headline: "今日时机洞察已生成",
    summary: (score: number, agreement: string) => `综合评分为 ${score}/100，系统一致性为 ${agreement}。请把它视为方向性参考，而不是结果保证。`,
    insight: "系统根据多个确定性插件及其置信度合并结果。",
    action: "重要行动可优先安排在支持度更高的时间窗口。",
    caution: "在提示谨慎或系统信号混合时，避免仓促决定。",
    disclaimer: "本结果是象征性时机系统的参考，不构成医疗、法律、财务建议或结果保证。"
  }
};

export const mockAIProvider: AIInterpretationProvider = {
  id: "mock",
  async interpret(input: AIInterpretationInput) {
    const text = copy[input.locale];
    const conflictExplanation = input.aggregatedResult.conflicts.length
      ? text.caution
      : undefined;
    return {
      locale: input.locale,
      headline: text.headline,
      summary: text.summary(input.aggregatedResult.overallScore, input.aggregatedResult.agreement.overall),
      keyInsights: [text.insight, ...(input.retrievedKnowledge?.slice(0, 1).map((chunk) => chunk.content) ?? [])],
      recommendedActions: [text.action, ...input.aggregatedResult.recommendations.slice(0, 2).map((item) => item.code)],
      cautionNotes: input.aggregatedResult.warnings.length ? [text.caution] : [],
      conflictExplanation,
      disclaimer: text.disclaimer,
      providerId: "mock",
      generatedAt: new Date().toISOString()
    };
  }
};
