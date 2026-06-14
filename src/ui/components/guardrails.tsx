import type { KnowledgeChunk } from "@/ai/guardrails";
import { Card } from "@/ui/primitives";

export function OffTopicNotice({ message }: { message: string }) {
  return (
    <Card className="alert">
      <p className="muted">{message}</p>
    </Card>
  );
}

export function KnowledgeSourceDisclosure({ title, chunks }: { title: string; chunks: KnowledgeChunk[] }) {
  if (chunks.length === 0) return null;
  return (
    <Card>
      <h2 className="section-title">{title}</h2>
      <ul className="list">
        {chunks.map((chunk) => (
          <li key={chunk.documentId}>{chunk.title}</li>
        ))}
      </ul>
    </Card>
  );
}
