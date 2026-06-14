import { describe, expect, it } from "vitest";
import { PluginRegistry } from "@/plugin-sdk";
import { timingPlugin } from "@/plugins/timing";

describe("PluginRegistry", () => {
  it("rejects duplicate plugin id and version combinations", () => {
    const registry = new PluginRegistry();
    registry.register(timingPlugin);
    expect(() => registry.register(timingPlugin)).toThrow(/Duplicate plugin/);
  });

  it("selects eligible plugins by capability and target", () => {
    const registry = new PluginRegistry();
    registry.register(timingPlugin);
    const resolved = registry.resolve({ queryType: "timing", targetType: "phone_number" });
    expect(resolved.map((plugin) => plugin.manifest.id)).toEqual(["timing"]);
  });
});
