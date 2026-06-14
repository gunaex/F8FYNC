import type { AggregatedFortuneResult, FortuneQueryType, SupportedLocale } from "@/core/domain";
import type { KnowledgeChunk } from "@/ai/guardrails";

export type AIInterpretationInput = {
  locale: SupportedLocale;
  queryType: FortuneQueryType;
  userObjective?: string;
  userMessage?: string;
  retrievedKnowledge?: KnowledgeChunk[];
  aggregatedResult: AggregatedFortuneResult;
};

export type AIInterpretationOutput = {
  locale: SupportedLocale;
  headline: string;
  summary: string;
  keyInsights: string[];
  recommendedActions: string[];
  cautionNotes: string[];
  conflictExplanation?: string;
  disclaimer: string;
  providerId: string;
  generatedAt: string;
};

export interface AIInterpretationProvider {
  id: string;
  interpret(input: AIInterpretationInput): Promise<AIInterpretationOutput>;
}
