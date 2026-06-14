import type { SupportedLocale } from "@/core/domain";

export const applicationConfig = {
  name: "F8SYNC",
  defaultLocale: "th" as SupportedLocale,
  supportedLocales: ["th", "en", "zh-CN"] as SupportedLocale[],
  buildVersion: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "local",
  pluginTimeoutMs: Number(process.env.PLUGIN_TIMEOUT_MS ?? 5000),
  aiTimeoutMs: Number(process.env.AI_TIMEOUT_MS ?? 10000),
  aiProvider: process.env.AI_PROVIDER ?? "mock"
};
