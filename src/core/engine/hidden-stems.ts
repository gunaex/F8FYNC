import type { EarthlyBranchKey } from "./ephemeris";
import type { HeavenlyStemKey } from "./stems-branches";

export type HiddenStemRole = "MAIN" | "MID" | "RESIDUAL";

export type HiddenStem = {
  stem: HeavenlyStemKey;
  role: HiddenStemRole;
  weight: number;
};

export const hiddenStemsByBranch: Record<EarthlyBranchKey, HiddenStem[]> = {
  ZI: [{ stem: "GUI", role: "MAIN", weight: 0.75 }],
  CHOU: [
    { stem: "JI", role: "MAIN", weight: 0.75 },
    { stem: "GUI", role: "MID", weight: 0.5 },
    { stem: "XIN", role: "RESIDUAL", weight: 0.25 }
  ],
  YIN: [
    { stem: "JIA", role: "MAIN", weight: 0.75 },
    { stem: "BING", role: "MID", weight: 0.5 },
    { stem: "WU", role: "RESIDUAL", weight: 0.25 }
  ],
  MAO: [{ stem: "YI", role: "MAIN", weight: 0.75 }],
  CHEN: [
    { stem: "WU", role: "MAIN", weight: 0.75 },
    { stem: "YI", role: "MID", weight: 0.5 },
    { stem: "GUI", role: "RESIDUAL", weight: 0.25 }
  ],
  SI: [
    { stem: "BING", role: "MAIN", weight: 0.75 },
    { stem: "GENG", role: "MID", weight: 0.5 },
    { stem: "WU", role: "RESIDUAL", weight: 0.25 }
  ],
  WU: [
    { stem: "DING", role: "MAIN", weight: 0.75 },
    { stem: "JI", role: "MID", weight: 0.5 }
  ],
  WEI: [
    { stem: "JI", role: "MAIN", weight: 0.75 },
    { stem: "DING", role: "MID", weight: 0.5 },
    { stem: "YI", role: "RESIDUAL", weight: 0.25 }
  ],
  SHEN: [
    { stem: "GENG", role: "MAIN", weight: 0.75 },
    { stem: "REN", role: "MID", weight: 0.5 },
    { stem: "WU", role: "RESIDUAL", weight: 0.25 }
  ],
  YOU: [{ stem: "XIN", role: "MAIN", weight: 0.75 }],
  XU: [
    { stem: "WU", role: "MAIN", weight: 0.75 },
    { stem: "XIN", role: "MID", weight: 0.5 },
    { stem: "DING", role: "RESIDUAL", weight: 0.25 }
  ],
  HAI: [
    { stem: "REN", role: "MAIN", weight: 0.75 },
    { stem: "JIA", role: "MID", weight: 0.5 }
  ]
};

export function getHiddenStems(branch: EarthlyBranchKey): HiddenStem[] {
  return hiddenStemsByBranch[branch];
}
