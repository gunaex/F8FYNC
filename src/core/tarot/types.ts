export const TAROT_ENGINE_VERSION = "tarot-core-v0.1.0";
export const STANDARD_TAROT_DECK_VERSION = "standard-78-galactic-wuxia-v0.1.0";

export type TarotArcana = "major" | "minor";
export type TarotSuit = "wands" | "cups" | "swords" | "pentacles";
export type TarotRank = "ace" | "two" | "three" | "four" | "five" | "six" | "seven" | "eight" | "nine" | "ten" | "page" | "knight" | "queen" | "king";
export type TarotOrientation = "upright" | "reversed";
export type TarotSpreadId = "one_card" | "three_card";

export type TarotCardDefinition = {
  id: string;
  arcana: TarotArcana;
  number: number;
  standardName: string;
  suit?: TarotSuit;
  rank?: TarotRank;
  meaningKey: string;
  visualTheme: "original_galactic_wuxia";
  visualTitle: string;
  imagePath: string;
};

export type TarotDeckDefinition = {
  id: "standard_78_galactic_wuxia";
  version: typeof STANDARD_TAROT_DECK_VERSION;
  title: string;
  cards: TarotCardDefinition[];
};

export type TarotSpreadPosition = {
  index: number;
  key: string;
  titleKey: string;
};

export type TarotSpreadDefinition = {
  id: TarotSpreadId;
  titleKey: string;
  positions: TarotSpreadPosition[];
};

export type TarotDrawInput = {
  memberId?: string;
  requestId: string;
  question?: string;
  spreadId: TarotSpreadId;
  allowReversals?: boolean;
  idempotencyKey?: string;
  createdAt?: string;
  randomSource?: TarotRandomSource;
};

export type TarotRandomSource = {
  providerId: string;
  bytes(length: number): Uint8Array;
};

export type TarotDrawnCard = {
  card: TarotCardDefinition;
  position: TarotSpreadPosition;
  orientation: TarotOrientation;
};

export type TarotDrawReceipt = {
  receiptId: string;
  memberId?: string;
  requestId: string;
  spreadId: TarotSpreadId;
  deckId: TarotDeckDefinition["id"];
  deckVersion: string;
  engineVersion: typeof TAROT_ENGINE_VERSION;
  rngProvider: string;
  idempotencyKey?: string;
  cardIds: string[];
  orientations: TarotOrientation[];
  auditHash: string;
  createdAt: string;
};

export type TarotReading = {
  deck: Pick<TarotDeckDefinition, "id" | "version" | "title">;
  spread: TarotSpreadDefinition;
  cards: TarotDrawnCard[];
  receipt: TarotDrawReceipt;
  safety: {
    randomDrawOnly: true;
    doesNotModifyDeterministicFortune: true;
    noGuaranteedOutcome: true;
  };
};
