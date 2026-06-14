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

export function SystemSourceCard({ title, sources }: { title: string; sources: Array<{ pluginId: string; status: string; version: string }> }) {
  return (
    <Card>
      <h2 className="section-title">{title}</h2>
      <ul className="list">
        {sources.map((source) => (
          <li key={`${source.pluginId}-${source.version}`}>
            <strong>{source.pluginId}</strong> <span className="muted">{source.status} · {source.version}</span>
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
