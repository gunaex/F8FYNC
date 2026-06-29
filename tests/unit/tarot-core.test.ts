import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createDeterministicTarotRandomSource, drawTarotReading, standardGalacticWuxiaTarotDeck, tarotMeanings, tarotSpreads } from "@/core/tarot";

describe("tarot core foundation", () => {
  it("defines a complete standard 78-card deck with original galactic wuxia presentation titles", () => {
    const cards = standardGalacticWuxiaTarotDeck.cards;
    const uniqueIds = new Set(cards.map((card) => card.id));

    expect(cards).toHaveLength(78);
    expect(uniqueIds.size).toBe(78);
    expect(cards.filter((card) => card.arcana === "major")).toHaveLength(22);
    expect(cards.filter((card) => card.arcana === "minor")).toHaveLength(56);
    expect(cards.every((card) => card.visualTheme === "original_galactic_wuxia")).toBe(true);
    expect(cards.find((card) => card.standardName === "The Fool")?.visualTitle).toBe("นักเดินทางแห่งทางช้างเผือก");
  });

  it("supports one-card and three-card spreads", () => {
    expect(tarotSpreads.one_card.positions.map((position) => position.key)).toEqual(["guidance"]);
    expect(tarotSpreads.three_card.positions.map((position) => position.key)).toEqual(["context", "action", "outcome"]);
  });

  it("maps all 78 uploaded tarot images", () => {
    const cards = standardGalacticWuxiaTarotDeck.cards;
    const missingAssetPaths = cards
      .map((card) => card.imagePath)
      .filter((imagePath) => !existsSync(`public${decodeURIComponent(imagePath)}`));

    expect(cards.every((card) => card.imagePath.startsWith("/tarot/"))).toBe(true);
    expect(new Set(cards.map((card) => card.imagePath)).size).toBe(78);
    expect(missingAssetPaths).toEqual([]);
  });

  it("provides complete Thai meanings for all 78 cards", () => {
    const deckIds = standardGalacticWuxiaTarotDeck.cards.map((card) => card.id);
    const meaningIds = tarotMeanings.map((meaning) => meaning.cardId);
    const allText = JSON.stringify(tarotMeanings);

    expect(tarotMeanings).toHaveLength(78);
    expect(new Set(meaningIds).size).toBe(78);
    expect(meaningIds).toEqual(deckIds);
    expect(allText).not.toContain("[cite:");

    for (const meaning of tarotMeanings) {
      for (const side of [meaning.upright, meaning.reversed]) {
        expect(side.general.trim()).not.toBe("-");
        expect(side.love.trim()).not.toBe("-");
        expect(side.work.trim()).not.toBe("-");
        expect(side.money.trim()).not.toBe("-");
      }
    }
  });

  it("draws a deterministic audited three-card reading for test seeds", () => {
    const reading = drawTarotReading({
      requestId: "tarot-test-001",
      memberId: "member_tarot",
      spreadId: "three_card",
      idempotencyKey: "same-question-same-click",
      createdAt: "2026-06-21T05:00:00.000Z",
      randomSource: createDeterministicTarotRandomSource("f8sync-tarot-seed")
    });

    expect(reading.cards).toHaveLength(3);
    expect(new Set(reading.cards.map((item) => item.card.id)).size).toBe(3);
    expect(reading.receipt.rngProvider).toBe("deterministic_test_sha256");
    expect(reading.receipt.auditHash).toMatch(/^[a-f0-9]{64}$/);
    expect(reading.receipt.receiptId).toBe(`tarot_receipt_${reading.receipt.auditHash.slice(0, 16)}`);
    expect(reading.cards.every((item) => item.meaning.general.length > 0)).toBe(true);
    expect(reading.safety).toEqual({
      randomDrawOnly: true,
      doesNotModifyDeterministicFortune: true,
      noGuaranteedOutcome: true
    });
  });

  it("keeps audit hash stable for the same deterministic seed and receipt inputs", () => {
    const input = {
      requestId: "tarot-test-002",
      spreadId: "one_card" as const,
      allowReversals: false,
      createdAt: "2026-06-21T05:01:00.000Z"
    };
    const first = drawTarotReading({ ...input, randomSource: createDeterministicTarotRandomSource("stable-seed") });
    const second = drawTarotReading({ ...input, randomSource: createDeterministicTarotRandomSource("stable-seed") });

    expect(second.cards.map((item) => item.card.id)).toEqual(first.cards.map((item) => item.card.id));
    expect(second.cards.map((item) => item.orientation)).toEqual(["upright"]);
    expect(second.receipt.auditHash).toBe(first.receipt.auditHash);
  });

  it("does not use Math.random in tarot draw implementation", () => {
    const drawSource = readFileSync("src/core/tarot/draw.ts", "utf8");
    const randomSource = readFileSync("src/core/tarot/random.ts", "utf8");

    expect(drawSource).not.toContain("Math.random");
    expect(randomSource).not.toContain("Math.random");
  });
});
