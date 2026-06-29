"use client";

import { useEffect, useState } from "react";
import { detectRiskAlerts } from "@/core/forecast/alerts";
import type { ForecastReading, RiskAlert } from "@/core/forecast/types";

export type RiskAlertToastLabels = {
  prefix: string; // "อีก" (in)
  suffix: string; // "ชม." (hours)
  domains: Record<RiskAlert["domain"], string>;
  close: string;
  viewDetail: string;
  title: string;
};

const SEVERITY_LABEL: Record<RiskAlert["severity"], string> = {
  info: "info",
  caution: "caution",
  high: "risk"
};

export function RiskAlertToast({ contextTimezone, labels }: { contextTimezone: string; labels: RiskAlertToastLabels }) {
  const [alert, setAlert] = useState<RiskAlert | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [reading, setReading] = useState<ForecastReading | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/forecast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestId: `risk-toast-${crypto.randomUUID()}`,
            contextTime: new Date().toISOString(),
            contextTimezone
          })
        });
        const json = await response.json();
        if (cancelled || !json.success) return;
        setReading(json.data);
        const [first] = detectRiskAlerts({ reading: json.data });
        if (first) setAlert(first);
      } catch {
        /* silent — the toast is non-critical */
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [contextTimezone]);

  if (!alert || dismissed) return null;

  function focusForecastPanel() {
    if (typeof document !== "undefined") {
      const panel = document.getElementById("forecast-panel");
      panel?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setDismissed(true);
  }

  return (
    <div className={`risk-alert-toast risk-alert-toast--${SEVERITY_LABEL[alert.severity]}`} role="alert">
      <span className="risk-alert-pulse" aria-hidden="true" />
      <div className="risk-alert-body">
        <strong className="risk-alert-title">{labels.title}</strong>
        <p className="risk-alert-message">
          {labels.prefix} {alert.hoursAhead} {labels.suffix} — {labels.domains[alert.domain]}
        </p>
      </div>
      <div className="risk-alert-actions">
        {reading ? (
          <button type="button" className="risk-alert-link" onClick={focusForecastPanel}>
            {labels.viewDetail}
          </button>
        ) : null}
        <button type="button" className="risk-alert-close" aria-label={labels.close} onClick={() => setDismissed(true)}>
          ×
        </button>
      </div>
    </div>
  );
}
