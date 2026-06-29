import { standardGalacticWuxiaTarotDeck, getTarotSpread } from "./deck";
import { getTarotMeaning } from "./meanings";
import { createSecureTarotRandomSource, sha256Hex } from "./random";
import { TAROT_ENGINE_VERSION, type TarotCardDefinition, type TarotDrawInput, type TarotOrientation, type TarotRandomSource, type TarotReading } from "./types";

const MAX_UINT32_EXCLUSIVE = 0x1_0000_0000;

function randomUint32(randomSource: TarotRandomSource) {
  const bytes = randomSource.bytes(4);
  if (bytes.length !== 4) throw new Error("TAROT_RANDOM_SOURCE_INVALID_BYTE_LENGTH");
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0, false);
}

function randomIndex(maxExclusive: number, randomSource: TarotRandomSource) {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) throw new Error("TAROT_RANDOM_INDEX_INVALID_RANGE");
  const rejectionLimit = MAX_UINT32_EXCLUSIVE - (MAX_UINT32_EXCLUSIVE % maxExclusive);
  let value = randomUint32(randomSource);
  while (value >= rejectionLimit) {
    value = randomUint32(randomSource);
  }
  return value % maxExclusive;
}

function drawCards(deck: TarotCardDefinition[], count: number, randomSource: TarotRandomSource) {
  const remaining = [...deck];
  const selected: TarotCardDefinition[] = [];
  for (let index = 0; index < count; index += 1) {
    const selectedIndex = randomIndex(remaining.length, randomSource);
    const [card] = remaining.splice(selectedIndex, 1);
    selected.push(card);
  }
  return selected;
}

function drawOrientation(allowReversals: boolean, randomSource: TarotRandomSource): TarotOrientation {
  if (!allowReversals) return "upright";
  return randomIndex(2, randomSource) === 0 ? "upright" : "reversed";
}

function canonicalReceiptPayload(value: unknown) {
  return JSON.stringify(value);
}

function receiptIdFromHash(auditHash: string) {
  return `tarot_receipt_${auditHash.slice(0, 16)}`;
}

export function drawTarotReading(input: TarotDrawInput): TarotReading {
  const randomSource = input.randomSource ?? createSecureTarotRandomSource();
  const spread = getTarotSpread(input.spreadId);
  const createdAt = input.createdAt ?? new Date().toISOString();
  const selectedCards = drawCards(standardGalacticWuxiaTarotDeck.cards, spread.positions.length, randomSource);
  const cards = selectedCards.map((card, index) => {
    const orientation = drawOrientation(input.allowReversals ?? true, randomSource);
    return {
      card,
      position: spread.positions[index],
      orientation,
      meaning: getTarotMeaning(card.id, orientation)
    };
  });
  const receiptPayload = {
    memberId: input.memberId,
    requestId: input.requestId,
    spreadId: spread.id,
    deckId: standardGalacticWuxiaTarotDeck.id,
    deckVersion: standardGalacticWuxiaTarotDeck.version,
    engineVersion: TAROT_ENGINE_VERSION,
    rngProvider: randomSource.providerId,
    idempotencyKey: input.idempotencyKey,
    cardIds: cards.map((item) => item.card.id),
    orientations: cards.map((item) => item.orientation),
    createdAt
  } as const;
  const auditHash = sha256Hex(canonicalReceiptPayload(receiptPayload));

  return {
    deck: {
      id: standardGalacticWuxiaTarotDeck.id,
      version: standardGalacticWuxiaTarotDeck.version,
      title: standardGalacticWuxiaTarotDeck.title
    },
    spread,
    cards,
    receipt: {
      receiptId: receiptIdFromHash(auditHash),
      ...receiptPayload,
      auditHash
    },
    safety: {
      randomDrawOnly: true,
      doesNotModifyDeterministicFortune: true,
      noGuaranteedOutcome: true
    }
  };
}
