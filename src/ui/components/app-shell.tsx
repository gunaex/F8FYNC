import Link from "next/link";
import type { ReactNode } from "react";
import { localeLabels } from "@/i18n";
import { featureFlags } from "@/config/feature-flags";
import type { SupportedLocale } from "@/core/domain";
import { RiskAlertToast } from "./risk-alert-toast";

type Dictionary = Record<string, unknown>;

function read(dictionary: Dictionary, key: string) {
  return key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) return (current as Dictionary)[part];
    return undefined;
  }, dictionary) as string;
}

export function LanguageSwitcher({ locale }: { locale: SupportedLocale }) {
  return (
    <nav className="language-switcher" aria-label="Language">
      {Object.entries(localeLabels).map(([code, label]) => (
        <Link key={code} href={`/${code}`} aria-current={code === locale}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function AppShell({ locale, dictionary, children }: { locale: SupportedLocale; dictionary: Dictionary; children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-inner">
          <Link className="brand" href={`/${locale}`}>
            <strong>{read(dictionary, "common.appName")}</strong>
            <span>{read(dictionary, "home.greeting")}</span>
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>
      </header>
      <main className="main-content">{children}</main>
      {featureFlags.v8Notifications ? (
        <RiskAlertToast
          contextTimezone="Asia/Bangkok"
          labels={{
            prefix: read(dictionary, "forecast.risk.prefix"),
            suffix: read(dictionary, "forecast.risk.suffix"),
            domains: {
              money: read(dictionary, "forecast.domains.money"),
              career: read(dictionary, "forecast.domains.career"),
              luck: read(dictionary, "forecast.domains.luck"),
              opportunity: read(dictionary, "forecast.domains.opportunity"),
              love: read(dictionary, "forecast.domains.love")
            },
            close: read(dictionary, "common.clear"),
            viewDetail: read(dictionary, "common.view"),
            title: read(dictionary, "forecast.risk.title")
          }}
        />
      ) : null}
      <nav className="bottom-nav" aria-label="Primary">
        <Link href={`/${locale}`}><span aria-hidden="true">◇</span>{read(dictionary, "nav.fortune")}</Link>
        <Link href={`/${locale}/boost`}><span aria-hidden="true">◎</span>{read(dictionary, "nav.boost")}</Link>
        <Link href={`/${locale}/timeline`}><span aria-hidden="true">▥</span>{read(dictionary, "nav.timeline")}</Link>
        <Link href={`/${locale}/account`}><span aria-hidden="true">◌</span>{read(dictionary, "nav.account")}</Link>
      </nav>
    </div>
  );
}
