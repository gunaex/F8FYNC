import type { TimingWindow, TimingWindowType, SupportedLocale } from "@/core/domain";
import { formatDateTime } from "@/i18n";
import { Card } from "@/ui/primitives";

const variants: Record<TimingWindowType, string> = {
  optimal: "positive",
  supportive: "positive",
  neutral: "",
  caution: "caution",
  avoid: "risk"
};

export function TimingStatusCard({ label, statusLabel }: { label: string; statusLabel: string }) {
  return (
    <Card className="timing-status-card">
      <p className="muted">{label}</p>
      <strong>{statusLabel}</strong>
      <div className="timing-pulse" aria-hidden="true" />
    </Card>
  );
}

export function TimingWindowCard({
  window,
  locale,
  timezone,
  label
}: {
  window?: TimingWindow;
  locale: SupportedLocale;
  timezone: string;
  label: string;
}) {
  if (!window) {
    return (
      <Card className="timing-window-card">
        <p className="muted">{label}</p>
        <strong>-</strong>
      </Card>
    );
  }
  return (
    <Card className="timing-window-card">
      <span className={`badge ${variants[window.type]}`}>{label}</span>
      <p>
        <strong>{formatDateTime(window.start, locale, timezone)}</strong>
      </p>
      <p className="muted">{formatDateTime(window.end, locale, timezone)}</p>
    </Card>
  );
}

export function Timeline({
  windows,
  locale,
  timezone,
  labels
}: {
  windows: TimingWindow[];
  locale: SupportedLocale;
  timezone: string;
  labels: Record<string, string>;
}) {
  return (
    <div className="timeline">
      {windows.map((window) => (
        <div className="timeline-item" key={window.id}>
          <span className={`timeline-dot ${window.type}`} aria-hidden="true" />
          <div>
            <strong>{labels[window.type] ?? window.type}</strong>
            <p className="muted">
              {formatDateTime(window.start, locale, timezone)} - {formatDateTime(window.end, locale, timezone)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
