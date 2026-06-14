import type { FortuneQueryType, FortuneTargetType } from "@/core/domain";
import type { FortunePlugin } from "../contracts/types";
import { validatePluginManifest } from "../contracts/validation";

export class PluginRegistry {
  private plugins = new Map<string, FortunePlugin>();
  private enabled = new Set<string>();

  register(plugin: FortunePlugin) {
    const manifest = validatePluginManifest(plugin.manifest);
    const key = `${manifest.id}@${manifest.version}`;
    if (this.plugins.has(key)) {
      throw new Error(`Duplicate plugin registration: ${key}`);
    }
    this.plugins.set(key, plugin);
    if (manifest.enabledByDefault) this.enabled.add(key);
  }

  unregister(pluginId: string, version?: string) {
    for (const key of this.plugins.keys()) {
      if (key === `${pluginId}@${version}` || (!version && key.startsWith(`${pluginId}@`))) {
        this.plugins.delete(key);
        this.enabled.delete(key);
      }
    }
  }

  enable(pluginId: string) {
    const plugin = this.get(pluginId);
    this.enabled.add(`${plugin.manifest.id}@${plugin.manifest.version}`);
  }

  disable(pluginId: string) {
    for (const key of this.enabled) {
      if (key.startsWith(`${pluginId}@`)) this.enabled.delete(key);
    }
  }

  get(pluginId: string) {
    const plugin = this.list().find((item) => item.manifest.id === pluginId);
    if (!plugin) throw new Error(`Unknown plugin: ${pluginId}`);
    return plugin;
  }

  list() {
    return Array.from(this.plugins.values());
  }

  listEnabled() {
    return this.list().filter((plugin) => this.enabled.has(`${plugin.manifest.id}@${plugin.manifest.version}`));
  }

  resolve(options: { queryType: FortuneQueryType; targetType?: FortuneTargetType; selectedPluginIds?: string[] }) {
    const targetType = options.targetType ?? "general";
    const selected = new Set(options.selectedPluginIds ?? []);
    return this.listEnabled().filter((plugin) => {
      if (selected.size > 0 && !selected.has(plugin.manifest.id)) return false;
      return plugin.manifest.capabilities.includes(options.queryType) && plugin.manifest.supportedTargetTypes.includes(targetType);
    });
  }

  metadata() {
    return this.list().map((plugin) => plugin.manifest);
  }
}
