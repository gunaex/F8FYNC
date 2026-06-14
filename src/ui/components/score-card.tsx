import { Card } from "@/ui/primitives";
import type { CSSProperties } from "react";

export function ScoreCard({ label, score }: { label: string; score: number }) {
  const ringStyle = { "--score": `${score}%` } as CSSProperties;

  return (
    <Card className="score-card">
      <div>
        <span className="badge positive">{label}</span>
      </div>
      <div className="score-ring-wrap">
        <div className="score-ring" style={ringStyle} aria-label={`${label} ${score}/100`}>
          <strong className="score-number">{score}</strong>
          <span>/100</span>
        </div>
        <div className="score-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </Card>
  );
}

export function DomainScoreGrid({ scores, labels }: { scores: Record<string, number>; labels: Record<string, string> }) {
  return (
    <div className="score-grid">
      {Object.entries(scores).map(([domain, score]) => (
        <Card className="mini-score-card" key={domain}>
          <div className="mini-ring" style={{ "--score": `${score}%` } as CSSProperties} aria-label={`${labels[domain] ?? domain} ${score}/100`}>
            <strong>{score}</strong>
          </div>
          <div>
            <strong>{labels[domain] ?? domain}</strong>
            <p className="muted">{score}/100</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
