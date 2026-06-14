import type { TimingWindow, TimingWindowType } from "@/core/domain";

const rank: Record<TimingWindowType, number> = { optimal: 5, supportive: 4, neutral: 3, caution: 2, avoid: 1 };

export function sortTimingWindows(windows: TimingWindow[]) {
  return [...windows].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

export function mergeCompatibleWindows(windows: TimingWindow[]) {
  const sorted = sortTimingWindows(windows);
  const merged: TimingWindow[] = [];
  for (const window of sorted) {
    const previous = merged.at(-1);
    if (!previous || previous.type !== window.type || new Date(window.start) > new Date(previous.end)) {
      merged.push({ ...window });
      continue;
    }
    previous.end = new Date(Math.max(new Date(previous.end).getTime(), new Date(window.end).getTime())).toISOString();
    previous.strength = Math.max(previous.strength, window.strength);
    previous.domainTags = Array.from(new Set([...previous.domainTags, ...window.domainTags]));
    previous.reasonCodes = Array.from(new Set([...previous.reasonCodes, ...window.reasonCodes]));
    previous.sourcePluginIds = Array.from(new Set([...previous.sourcePluginIds, ...window.sourcePluginIds]));
  }
  return merged.sort((a, b) => rank[b.type] - rank[a.type] || b.strength - a.strength);
}

export function currentTimingStatus(windows: TimingWindow[], contextTime: string): { status: TimingWindowType; window?: TimingWindow } {
  const now = new Date(contextTime).getTime();
  const current = windows
    .filter((window) => new Date(window.start).getTime() <= now && new Date(window.end).getTime() >= now)
    .sort((a, b) => rank[b.type] - rank[a.type] || b.strength - a.strength)[0];
  return { status: current?.type ?? "neutral", window: current };
}

export function nextOptimalWindow(windows: TimingWindow[], contextTime: string) {
  const now = new Date(contextTime).getTime();
  return sortTimingWindows(windows).find((window) => window.type === "optimal" && new Date(window.start).getTime() > now);
}
