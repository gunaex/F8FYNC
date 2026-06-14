import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from "@/core/domain";

export { DEFAULT_LOCALE, SUPPORTED_LOCALES };

export const localeLabels: Record<SupportedLocale, string> = {
  th: "ไทย",
  en: "English",
  "zh-CN": "简体中文"
};

export function resolveLocale(locale?: string): SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale) ? (locale as SupportedLocale) : DEFAULT_LOCALE;
}
