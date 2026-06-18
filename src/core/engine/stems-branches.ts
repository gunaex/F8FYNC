import type { EarthlyBranchKey } from "./ephemeris";

export type HeavenlyStemKey = "JIA" | "YI" | "BING" | "DING" | "WU" | "JI" | "GENG" | "XIN" | "REN" | "GUI";

export type StemBranch = {
  stem: HeavenlyStemKey;
  stemName: string;
  stemChinese: string;
  branch: EarthlyBranchKey;
  branchName: string;
  branchChinese: string;
};

export const stemCycle: HeavenlyStemKey[] = ["JIA", "YI", "BING", "DING", "WU", "JI", "GENG", "XIN", "REN", "GUI"];
export const branchCycle: EarthlyBranchKey[] = ["ZI", "CHOU", "YIN", "MAO", "CHEN", "SI", "WU", "WEI", "SHEN", "YOU", "XU", "HAI"];

const heavenlyStems: Record<HeavenlyStemKey, { name: string; chinese: string }> = {
  JIA: { name: "Jia", chinese: "甲" },
  YI: { name: "Yi", chinese: "乙" },
  BING: { name: "Bing", chinese: "丙" },
  DING: { name: "Ding", chinese: "丁" },
  WU: { name: "Wu", chinese: "戊" },
  JI: { name: "Ji", chinese: "己" },
  GENG: { name: "Geng", chinese: "庚" },
  XIN: { name: "Xin", chinese: "辛" },
  REN: { name: "Ren", chinese: "壬" },
  GUI: { name: "Gui", chinese: "癸" }
};

const earthlyBranches: Record<EarthlyBranchKey, { name: string; chinese: string }> = {
  ZI: { name: "Zi", chinese: "子" },
  CHOU: { name: "Chou", chinese: "丑" },
  YIN: { name: "Yin", chinese: "寅" },
  MAO: { name: "Mao", chinese: "卯" },
  CHEN: { name: "Chen", chinese: "辰" },
  SI: { name: "Si", chinese: "巳" },
  WU: { name: "Wu", chinese: "午" },
  WEI: { name: "Wei", chinese: "未" },
  SHEN: { name: "Shen", chinese: "申" },
  YOU: { name: "You", chinese: "酉" },
  XU: { name: "Xu", chinese: "戌" },
  HAI: { name: "Hai", chinese: "亥" }
};

export function stemBranch(stem: HeavenlyStemKey, branch: EarthlyBranchKey): StemBranch {
  return {
    stem,
    stemName: heavenlyStems[stem].name,
    stemChinese: heavenlyStems[stem].chinese,
    branch,
    branchName: earthlyBranches[branch].name,
    branchChinese: earthlyBranches[branch].chinese
  };
}

export function formatStemBranch(value: StemBranch): string {
  return `${value.stemChinese}${value.branchChinese}`;
}

export function advanceStem(stem: HeavenlyStemKey, offset: number): HeavenlyStemKey {
  const index = stemCycle.indexOf(stem);
  return stemCycle[((index + offset) % stemCycle.length + stemCycle.length) % stemCycle.length];
}

export function advanceBranch(branch: EarthlyBranchKey, offset: number): EarthlyBranchKey {
  const index = branchCycle.indexOf(branch);
  return branchCycle[((index + offset) % branchCycle.length + branchCycle.length) % branchCycle.length];
}
