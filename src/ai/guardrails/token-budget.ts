import { ragConfig } from "./config";
import type { KnowledgeChunk } from "./types";

export function estimateTokens(input: string) {
  return Math.ceil(input.length / 4);
}

export function enforceRetrievalBudget(chunks: KnowledgeChunk[]) {
  const selected: KnowledgeChunk[] = [];
  let tokens = 0;
  for (const chunk of chunks) {
    const estimate = estimateTokens(chunk.content);
    if (tokens + estimate > ragConfig.maxContextTokens) break;
    selected.push(chunk);
    tokens += estimate;
  }
  return { chunks: selected, tokenEstimate: tokens };
}

export function assertAiInputBudget(serializedInput: string) {
  const tokenEstimate = estimateTokens(serializedInput);
  if (tokenEstimate > ragConfig.aiMaxInputTokens) throw new Error("AI_INPUT_TOKEN_BUDGET_EXCEEDED");
  return tokenEstimate;
}
