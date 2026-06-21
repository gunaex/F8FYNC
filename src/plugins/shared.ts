import type { FortuneRequest, PluginResult, ScoreDomain, TimingWindow, TimingWindowType } from "@/core/domain";

export function stableNumber(seed: string, min: number, max: number) {
  let hash = 2166136261;
  for (const char of seed) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  const normalized = (hash >>> 0) / 4294967295;
  return Math.round(min + normalized * (max - min));
}

export function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function contextDateSeed(input: FortuneRequest) {
  return new Date(input.contextTime).toISOString().slice(0, 10);
}

export function contextHourSeed(input: FortuneRequest) {
  return new Date(input.contextTime).toISOString().slice(0, 13);
}

export function buildWindow(
  input: FortuneRequest,
  pluginId: string,
  offsetMinutes: number,
  durationMinutes: number,
  type: TimingWindowType,
  strength: number,
  domainTags: ScoreDomain[]
): TimingWindow {
  const start = new Date(input.contextTime);
  start.setMinutes(start.getMinutes() + offsetMinutes);
  const end = new Date(start);
  end.setMinutes(start.getMinutes() + durationMinutes);
  return {
    id: `${pluginId}-${type}-${start.getTime()}`,
    start: start.toISOString(),
    end: end.toISOString(),
    type,
    strength,
    domainTags,
    reasonCodes: [`${pluginId}.${type}`],
    sourcePluginIds: [pluginId]
  };
}

export function baseResult(input: FortuneRequest, pluginId: string, version: string, calculationVersion: string): Pick<
  PluginResult,
  "pluginId" | "pluginVersion" | "calculationVersion" | "metadata"
> {
  return {
    pluginId,
    pluginVersion: version,
    calculationVersion,
    metadata: { calculatedAt: new Date().toISOString(), inputHash: stableNumber(JSON.stringify(input), 100000, 999999).toString() }
  };
}
