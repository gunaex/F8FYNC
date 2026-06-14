import type { SupportedLocale } from "@/core/domain";

export const routes = {
  home: (locale: SupportedLocale) => `/${locale}`,
  result: (locale: SupportedLocale) => `/${locale}/result`,
  timeline: (locale: SupportedLocale) => `/${locale}/timeline`,
  compare: (locale: SupportedLocale) => `/${locale}/compare`
};
