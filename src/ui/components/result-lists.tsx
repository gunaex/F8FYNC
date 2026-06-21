import { Card } from "@/ui/primitives";

export function RecommendationCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h2 className="section-title">{title}</h2>
      <ul className="list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}

export function SystemSourceCard({
  title,
  sources,
  labels
}: {
  title: string;
  sources: Array<{ pluginId: string; status: string; version: string }>;
  labels?: {
    locked: string;
    unlocked: string;
    subscriptionRequired: string;
  };
}) {
  const hasLockedSource = sources.some((source) => source.version === "locked");
  return (
    <Card>
      <h2 className="section-title">{title}</h2>
      {hasLockedSource ? <p className="source-lock-notice">{labels?.subscriptionRequired ?? "Please subscribe to use the full function."}</p> : null}
      <ul className="source-list">
        {sources.map((source) => (
          <li key={`${source.pluginId}-${source.version}`} className={source.version === "locked" ? "source-item locked" : "source-item"}>
            <strong>{source.pluginId}</strong>
            <span>{source.version === "locked" ? labels?.locked ?? "Locked" : labels?.unlocked ?? source.status}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function DisclaimerCard({ text }: { text: string }) {
  return (
    <Card className="alert">
      <p className="muted">{text}</p>
    </Card>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <Card>
      <h2 className="section-title">{title}</h2>
      <p className="muted">{text}</p>
    </Card>
  );
}
