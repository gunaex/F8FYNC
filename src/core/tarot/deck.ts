import {
  STANDARD_TAROT_DECK_VERSION,
  type TarotCardDefinition,
  type TarotDeckDefinition,
  type TarotRank,
  type TarotSpreadDefinition,
  type TarotSpreadId,
  type TarotSuit
} from "./types";

const majorArcana: Array<{ number: number; standardName: string; visualTitle: string }> = [
  { number: 0, standardName: "The Fool", visualTitle: "นักเดินทางแห่งทางช้างเผือก" },
  { number: 1, standardName: "The Magician", visualTitle: "จอมยุทธ์แปรธาตุดารา" },
  { number: 2, standardName: "The High Priestess", visualTitle: "ผู้พิทักษ์ตำราจันทรา" },
  { number: 3, standardName: "The Empress", visualTitle: "จักรพรรดินีสวนหยกดาว" },
  { number: 4, standardName: "The Emperor", visualTitle: "จักรพรรดิปราการฟ้า" },
  { number: 5, standardName: "The Hierophant", visualTitle: "ปรมาจารย์สำนักเมฆา" },
  { number: 6, standardName: "The Lovers", visualTitle: "พันธะคู่ดาว" },
  { number: 7, standardName: "The Chariot", visualTitle: "รถศึกมังกรอวกาศ" },
  { number: 8, standardName: "Strength", visualTitle: "ลมหายใจพยัคฆ์ดาว" },
  { number: 9, standardName: "The Hermit", visualTitle: "ผู้ถือโคมแห่งยอดเขาเงียบ" },
  { number: 10, standardName: "Wheel of Fortune", visualTitle: "วงล้อชะตากลางจักรวาล" },
  { number: 11, standardName: "Justice", visualTitle: "กระบี่สมดุลฟ้า" },
  { number: 12, standardName: "The Hanged Man", visualTitle: "ผู้กลับมุมมองเหนือเมฆ" },
  { number: 13, standardName: "Death", visualTitle: "ประตูผลัดยุคดารา" },
  { number: 14, standardName: "Temperance", visualTitle: "นักปรุงโอสถแสงดาว" },
  { number: 15, standardName: "The Devil", visualTitle: "โซ่เงาแห่งหุบเหว" },
  { number: 16, standardName: "The Tower", visualTitle: "หอคอยฟ้าผ่ากลางกาแล็กซี" },
  { number: 17, standardName: "The Star", visualTitle: "ดาวนำทางลำน้ำเงิน" },
  { number: 18, standardName: "The Moon", visualTitle: "ดวงจันทร์เหนือป่าไผ่ลวงตา" },
  { number: 19, standardName: "The Sun", visualTitle: "อาทิตย์ทองเหนือสนามยุทธ์" },
  { number: 20, standardName: "Judgement", visualTitle: "เสียงระฆังปลุกวิญญาณดาว" },
  { number: 21, standardName: "The World", visualTitle: "วงแหวนยุทธจักรจักรวาล" }
];

const suits: Array<{ suit: TarotSuit; standardTitle: string; visualTitle: string }> = [
  { suit: "wands", standardTitle: "Wands", visualTitle: "พลองมังกร" },
  { suit: "cups", standardTitle: "Cups", visualTitle: "ถ้วยจันทรา" },
  { suit: "swords", standardTitle: "Swords", visualTitle: "กระบี่ดาว" },
  { suit: "pentacles", standardTitle: "Pentacles", visualTitle: "เหรียญหยก" }
];

const ranks: Array<{ rank: TarotRank; number: number; standardTitle: string; visualTitle: string }> = [
  { rank: "ace", number: 1, standardTitle: "Ace", visualTitle: "หนึ่ง" },
  { rank: "two", number: 2, standardTitle: "Two", visualTitle: "สอง" },
  { rank: "three", number: 3, standardTitle: "Three", visualTitle: "สาม" },
  { rank: "four", number: 4, standardTitle: "Four", visualTitle: "สี่" },
  { rank: "five", number: 5, standardTitle: "Five", visualTitle: "ห้า" },
  { rank: "six", number: 6, standardTitle: "Six", visualTitle: "หก" },
  { rank: "seven", number: 7, standardTitle: "Seven", visualTitle: "เจ็ด" },
  { rank: "eight", number: 8, standardTitle: "Eight", visualTitle: "แปด" },
  { rank: "nine", number: 9, standardTitle: "Nine", visualTitle: "เก้า" },
  { rank: "ten", number: 10, standardTitle: "Ten", visualTitle: "สิบ" },
  { rank: "page", number: 11, standardTitle: "Page", visualTitle: "ศิษย์" },
  { rank: "knight", number: 12, standardTitle: "Knight", visualTitle: "ผู้กล้า" },
  { rank: "queen", number: 13, standardTitle: "Queen", visualTitle: "เจ้ายุทธหญิง" },
  { rank: "king", number: 14, standardTitle: "King", visualTitle: "จ้าวสำนัก" }
];

function keyName(value: string) {
  return value.toLowerCase().replaceAll(" ", "_");
}

function titleFileName(value: string) {
  return value.replaceAll(" ", "_");
}

const tarotImagePathOverrides: Record<string, string> = {
  "The Devil": "/tarot/The%20Devil.png",
  "Knight of Wands": "/tarot/Knight_of_Wands%20.png",
  "Ace of Swords": "/tarot/Ace_Of_Swards.png",
  "Two of Swords": "/tarot/Two_Of_Swards.png",
  "Three of Swords": "/tarot/Three_Of_Swards.png",
  "Four of Swords": "/tarot/Four_Of_Swards.png",
  "Five of Swords": "/tarot/Five_Of_Swards.png",
  "Six of Swords": "/tarot/Six_Of_Swards.png",
  "Seven of Swords": "/tarot/Seven_Of_Swards.png",
  "Eight of Swords": "/tarot/Eight_Of_Swards.png",
  "Nine of Swords": "/tarot/Nine_Of_Swards.png",
  "Ten of Swords": "/tarot/Ten_Of_Swards.png"
};

function tarotImagePath(standardName: string) {
  return tarotImagePathOverrides[standardName] ?? `/tarot/${titleFileName(standardName)}.png`;
}

const majorCards: TarotCardDefinition[] = majorArcana.map((card) => ({
  id: `major_${card.number.toString().padStart(2, "0")}_${keyName(card.standardName.replace(/^The /, ""))}`,
  arcana: "major",
  number: card.number,
  standardName: card.standardName,
  meaningKey: `tarot.major.${keyName(card.standardName.replace(/^The /, ""))}`,
  visualTheme: "original_galactic_wuxia",
  visualTitle: card.visualTitle,
  imagePath: tarotImagePath(card.standardName)
}));

const minorCards: TarotCardDefinition[] = suits.flatMap((suit) =>
  ranks.map((rank) => ({
    id: `minor_${suit.suit}_${rank.rank}`,
    arcana: "minor",
    suit: suit.suit,
    rank: rank.rank,
    number: rank.number,
    standardName: `${rank.standardTitle} of ${suit.standardTitle}`,
    meaningKey: `tarot.minor.${suit.suit}.${rank.rank}`,
    visualTheme: "original_galactic_wuxia",
    visualTitle: `${rank.visualTitle}${suit.visualTitle}`,
    imagePath: tarotImagePath(`${rank.standardTitle} of ${suit.standardTitle}`)
  }))
);

export const standardGalacticWuxiaTarotDeck: TarotDeckDefinition = {
  id: "standard_78_galactic_wuxia",
  version: STANDARD_TAROT_DECK_VERSION,
  title: "F8SYNC Original Galactic Wuxia Tarot",
  cards: [...majorCards, ...minorCards]
};

export const tarotSpreads: Record<TarotSpreadId, TarotSpreadDefinition> = {
  one_card: {
    id: "one_card",
    titleKey: "tarot.spreads.oneCard.title",
    positions: [{ index: 0, key: "guidance", titleKey: "tarot.positions.guidance" }]
  },
  three_card: {
    id: "three_card",
    titleKey: "tarot.spreads.threeCard.title",
    positions: [
      { index: 0, key: "context", titleKey: "tarot.positions.context" },
      { index: 1, key: "action", titleKey: "tarot.positions.action" },
      { index: 2, key: "outcome", titleKey: "tarot.positions.outcome" }
    ]
  }
};

export function getTarotSpread(spreadId: TarotSpreadId) {
  return tarotSpreads[spreadId];
}
