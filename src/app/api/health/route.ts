import { NextResponse } from "next/server";
import { applicationConfig } from "@/config";
import { getMethodologyCatalog } from "@/plugins/catalog";
import { createDefaultPluginRegistry } from "@/plugins/registry";

export function GET() {
  const registry = createDefaultPluginRegistry();
  const methodologyCatalog = getMethodologyCatalog();
  return NextResponse.json({
    status: "ok",
    registeredPluginCount: registry.list().length,
    enabledPluginIds: registry.listEnabled().map((plugin) => plugin.manifest.id),
    methodologyCatalog: {
      active: methodologyCatalog.filter((item) => item.status === "active").length,
      foundation: methodologyCatalog.filter((item) => item.status === "foundation").length,
      roadmap: methodologyCatalog.filter((item) => item.status === "roadmap").length
    },
    aiProvider: { id: applicationConfig.aiProvider, available: true },
    rag: {
      provider: process.env.RAG_PROVIDER ?? "local",
      offTopicMainAiCall: process.env.OFF_TOPIC_MAIN_AI_CALL === "true" ? "enabled" : "disabled",
      maxChunks: Number(process.env.RAG_MAX_CHUNKS ?? 5)
    },
    paymentProvider: { id: process.env.PAYMENT_PROVIDER ?? "mock", available: true },
    database: { configured: Boolean(process.env.DATABASE_URL), fallback: process.env.DATABASE_URL ? "postgres" : "memory" },
    buildVersion: applicationConfig.buildVersion
  });
}
