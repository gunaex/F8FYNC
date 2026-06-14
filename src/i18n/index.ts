import th from "./dictionaries/th.json";
import en from "./dictionaries/en.json";
import zhCN from "./dictionaries/zh-CN.json";
import type { SupportedLocale } from "@/core/domain";
import { resolveLocale } from "./config";

const dictionaries = { th, en, "zh-CN": zhCN } as const;

export function getDictionary(locale?: string) {
  return dictionaries[resolveLocale(locale)];
}

export function t(dictionary: Record<string, unknown>, key: string, parameters?: Record<string, string | number>) {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) return (current as Record<string, unknown>)[part];
    return undefined;
  }, dictionary);
  const text = typeof value === "string" ? value : key;
  return Object.entries(parameters ?? {}).reduce((output, [name, replacement]) => output.replace(`{${name}}`, String(replacement)), text);
}

export function formatDateTime(value: string, locale: SupportedLocale, timezone: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", timeZone: timezone }).format(new Date(value));
}

export function formatPercent(value: number, locale: SupportedLocale) {
  return new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }).format(value);
}

export * from "./config";
