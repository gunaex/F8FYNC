"use client";

import { useState } from "react";
import type { TarotReading, TarotSpreadId } from "@/core/tarot";
import { Button, Card, SelectField, TextAreaField } from "@/ui/primitives";

type TarotLabels = {
  title: string;
  subtitle: string;
  spreadLabel: string;
  oneCard: string;
  threeCard: string;
  questionLabel: string;
  questionPlaceholder: string;
  reversalsLabel: string;
  draw: string;
  loading: string;
  receipt: string;
  audit: string;
  upright: string;
  reversed: string;
  meaningGeneral: string;
  meaningLove: string;
  meaningWork: string;
  meaningMoney: string;
  safety: string;
  error: string;
};

export function TarotDrawPanel({ labels }: { labels: TarotLabels }) {
  const [spreadId, setSpreadId] = useState<TarotSpreadId>("one_card");
  const [question, setQuestion] = useState("");
  const [allowReversals, setAllowReversals] = useState(true);
  const [reading, setReading] = useState<TarotReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function draw() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/tarot/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: crypto.randomUUID(),
          spreadId,
          question,
          allowReversals,
          idempotencyKey: `${spreadId}:${question.trim().toLowerCase()}`
        })
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.error?.messageKey ?? "common.error");
      setReading(json.data);
    } catch {
      setError(labels.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tarot-workspace">
      <Card className="tarot-control-card">
        <span className="badge positive">Tarot</span>
        <h2>{labels.title}</h2>
        <p className="muted">{labels.subtitle}</p>
        <SelectField id="tarotSpread" label={labels.spreadLabel} value={spreadId} onChange={(event) => setSpreadId(event.target.value as TarotSpreadId)}>
          <option value="one_card">{labels.oneCard}</option>
          <option value="three_card">{labels.threeCard}</option>
        </SelectField>
        <TextAreaField
          id="tarotQuestion"
          label={labels.questionLabel}
          placeholder={labels.questionPlaceholder}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <label className="tarot-toggle">
          <input type="checkbox" checked={allowReversals} onChange={(event) => setAllowReversals(event.target.checked)} />
          <span>{labels.reversalsLabel}</span>
        </label>
        <Button type="button" onClick={draw} disabled={loading}>{loading ? labels.loading : labels.draw}</Button>
        {error ? <p className="field-error">{error}</p> : null}
      </Card>

      {reading ? (
        <div className={`tarot-reading tarot-reading--${reading.spread.id}`}>
          {reading.cards.map((item) => (
            <Card key={`${item.position.key}-${item.card.id}`} className="tarot-card-result">
              <img src={item.card.imagePath} alt={item.card.visualTitle} />
              <span className="badge neutral">{item.position.key}</span>
              <h3>{item.card.visualTitle}</h3>
              <p className="muted">{item.card.standardName}</p>
              <strong>{item.orientation === "upright" ? labels.upright : labels.reversed}</strong>
              <dl className="tarot-meaning-list">
                <div>
                  <dt>{labels.meaningGeneral}</dt>
                  <dd>{item.meaning.general}</dd>
                </div>
                <div>
                  <dt>{labels.meaningLove}</dt>
                  <dd>{item.meaning.love}</dd>
                </div>
                <div>
                  <dt>{labels.meaningWork}</dt>
                  <dd>{item.meaning.work}</dd>
                </div>
                <div>
                  <dt>{labels.meaningMoney}</dt>
                  <dd>{item.meaning.money}</dd>
                </div>
              </dl>
            </Card>
          ))}
          <Card className="tarot-receipt-card">
            <h3>{labels.receipt}</h3>
            <p className="muted">{labels.audit}: {reading.receipt.auditHash.slice(0, 16)}</p>
            <p className="muted">{labels.safety}</p>
          </Card>
        </div>
      ) : (
        <Card className="tarot-preview-card">
          <div className="tarot-preview-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="badge positive">78</span>
          <h3>{labels.title}</h3>
          <p className="muted">{labels.safety}</p>
        </Card>
      )}
    </div>
  );
}
