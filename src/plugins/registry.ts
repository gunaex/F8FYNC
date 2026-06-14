import { PluginRegistry } from "@/plugin-sdk";
import { featureFlags } from "@/config";
import { baziPlugin } from "./bazi";
import { numerologyPlugin } from "./numerology";
import { timingPlugin } from "./timing";

export function createDefaultPluginRegistry() {
  const registry = new PluginRegistry();
  if (featureFlags.baziPlugin) registry.register(baziPlugin);
  if (featureFlags.numerologyPlugin) registry.register(numerologyPlugin);
  if (featureFlags.timingPlugin) registry.register(timingPlugin);
  return registry;
}
