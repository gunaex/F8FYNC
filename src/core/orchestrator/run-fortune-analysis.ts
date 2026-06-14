import { applicationConfig } from "@/config";
import { parseFortuneRequest, type AggregatedFortuneResult, type FortuneRequest } from "@/core/domain";
import { aggregatePluginResults } from "@/core/aggregation/aggregate";
import { runManyPluginsSafely } from "@/plugin-sdk";
import { createDefaultPluginRegistry } from "@/plugins/registry";

export async function runFortuneAnalysis(rawRequest: FortuneRequest): Promise<AggregatedFortuneResult> {
  const request = parseFortuneRequest(rawRequest);
  const registry = createDefaultPluginRegistry();
  const plugins = registry.resolve({
    queryType: request.queryType,
    targetType: request.target?.type,
    selectedPluginIds: request.selectedPluginIds
  });
  const pluginResults = await runManyPluginsSafely(plugins, request, applicationConfig.pluginTimeoutMs);
  return aggregatePluginResults(request, pluginResults);
}
