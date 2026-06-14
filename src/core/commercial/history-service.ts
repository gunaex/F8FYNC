import type { AggregatedFortuneResult, FortuneRequest } from "@/core/domain";
import type { AIInterpretationOutput } from "@/ai";
import type { AnalysisHistoryRecord } from "./types";
import { canUseFeature } from "./entitlement-service";
import { createId, getMemoryStore } from "@/core/repositories/memory-store";

export async function saveAnalysisHistory(memberId: string | undefined, request: FortuneRequest, result: AggregatedFortuneResult, interpretation?: AIInterpretationOutput) {
  if (!memberId) return undefined;
  const decision = await canUseFeature(memberId, "analysis_history");
  if (!decision.allowed) return undefined;
  const record: AnalysisHistoryRecord = {
    id: createId("history"),
    memberId,
    queryType: request.queryType,
    target: request.target,
    requestSnapshot: request,
    resultSnapshot: result,
    interpretationSnapshot: interpretation,
    pluginVersions: result.pluginResults.map((plugin) => ({
      pluginId: plugin.pluginId,
      pluginVersion: plugin.pluginVersion,
      calculationVersion: plugin.calculationVersion
    })),
    createdAt: new Date().toISOString()
  };
  getMemoryStore().history.unshift(record);
  return record;
}

export async function listHistory(memberId: string) {
  return getMemoryStore().history.filter((record) => record.memberId === memberId);
}

export async function getHistory(memberId: string, id: string) {
  return getMemoryStore().history.find((record) => record.memberId === memberId && record.id === id);
}

export async function deleteHistory(memberId: string, id?: string) {
  const store = getMemoryStore();
  store.history = id ? store.history.filter((record) => record.memberId !== memberId || record.id !== id) : store.history.filter((record) => record.memberId !== memberId);
}
