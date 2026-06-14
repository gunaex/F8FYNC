import { parsePluginResult, type FortuneRequest, type PluginResult } from "@/core/domain";
import type { FortunePlugin } from "../contracts/types";

function failedResult(plugin: FortunePlugin, code: string, durationMs: number): PluginResult {
  return {
    pluginId: plugin.manifest.id,
    pluginVersion: plugin.manifest.version,
    calculationVersion: plugin.manifest.calculationVersion,
    status: "failed",
    scores: {},
    timingWindows: [],
    warnings: [{ code, severity: "caution", messageKey: "warnings.pluginFailed" }],
    confidence: 0,
    evidence: [],
    metadata: { calculatedAt: new Date().toISOString(), durationMs },
    error: { code, retryable: code === "PLUGIN_TIMEOUT" }
  };
}

export async function runPluginSafely(plugin: FortunePlugin, input: FortuneRequest, timeoutMs: number): Promise<PluginResult> {
  const started = performance.now();
  try {
    const validation = await plugin.validateInput(input);
    if (!validation.valid) return failedResult(plugin, "PLUGIN_INPUT_INVALID", Math.round(performance.now() - started));

    const timeout = new Promise<PluginResult>((resolve) => {
      setTimeout(() => resolve(failedResult(plugin, "PLUGIN_TIMEOUT", Math.round(performance.now() - started))), timeoutMs);
    });
    const result = await Promise.race([plugin.analyze(input), timeout]);
    const durationMs = Math.round(performance.now() - started);
    return parsePluginResult({ ...result, metadata: { ...result.metadata, durationMs } });
  } catch {
    return failedResult(plugin, "PLUGIN_EXECUTION_ERROR", Math.round(performance.now() - started));
  }
}

export async function runManyPluginsSafely(plugins: FortunePlugin[], input: FortuneRequest, timeoutMs: number) {
  return Promise.all(plugins.map((plugin) => runPluginSafely(plugin, input, timeoutMs)));
}
