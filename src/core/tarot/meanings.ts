import meanings from "./meanings.json";
import type { TarotCardMeaning, TarotOrientation } from "./types";

export const tarotMeanings = meanings as TarotCardMeaning[];

const tarotMeaningByCardId = new Map(tarotMeanings.map((meaning) => [meaning.cardId, meaning]));

export function getTarotMeaning(cardId: string, orientation: TarotOrientation) {
  const meaning = tarotMeaningByCardId.get(cardId);
  if (!meaning) throw new Error(`TAROT_MEANING_NOT_FOUND:${cardId}`);
  return meaning[orientation];
}
