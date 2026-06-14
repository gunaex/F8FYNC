import { aiInterpretationOutputSchema } from "./schema";
import type { AIInterpretationInput } from "./types";
import { getAIProvider } from "@/ai/providers";

export async function interpretFortuneResult(input: AIInterpretationInput) {
  const provider = getAIProvider();
  const output = await provider.interpret(input);
  return aiInterpretationOutputSchema.parse(output);
}
