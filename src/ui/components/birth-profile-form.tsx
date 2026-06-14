"use client";

import type { FormEvent } from "react";
import type { FortuneQueryType, FortuneTargetType } from "@/core/domain";
import { Button, Card, SelectField, TextAreaField, TextField } from "@/ui/primitives";

export type AnalysisFormState = {
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  birthTimezone: string;
  contextTimezone: string;
  queryType: FortuneQueryType;
  targetType: FortuneTargetType;
  targetValue: string;
  objective: string;
};

export function BirthProfileForm({
  dictionary,
  state,
  onChange,
  onSubmit,
  loading
}: {
  dictionary: Record<string, string>;
  state: AnalysisFormState;
  onChange: (state: AnalysisFormState) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  function update<K extends keyof AnalysisFormState>(key: K, value: AnalysisFormState[K]) {
    const next = { ...state, [key]: value };
    onChange(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("f8sync:last-analysis", JSON.stringify({ queryType: next.queryType }));
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <Card className="analysis-form-card">
      <form onSubmit={submit}>
        <div className="form-step-header">
          <span className="badge positive">{dictionary.analysisType}</span>
          <strong>{dictionary[`analysis.${state.queryType}`]}</strong>
        </div>
        <div className="field-grid">
          <TextField id="birthDate" type="date" required label={dictionary.birthDate} value={state.birthDate} onChange={(event) => update("birthDate", event.target.value)} />
          <TextField id="birthTime" type="time" label={dictionary.birthTime} value={state.birthTime} onChange={(event) => update("birthTime", event.target.value)} />
          <TextField id="birthLocation" required label={dictionary.birthLocation} value={state.birthLocation} onChange={(event) => update("birthLocation", event.target.value)} />
          <TextField id="birthTimezone" required label={dictionary.birthTimezone} value={state.birthTimezone} onChange={(event) => update("birthTimezone", event.target.value)} />
          <TextField id="contextTimezone" required label={dictionary.contextTimezone} value={state.contextTimezone} onChange={(event) => update("contextTimezone", event.target.value)} />
          <SelectField id="queryType" label={dictionary.analysisType} value={state.queryType} onChange={(event) => update("queryType", event.target.value as FortuneQueryType)}>
            {(["daily", "timing", "compatibility", "comparison"] as const).map((type) => (
              <option key={type} value={type}>{dictionary[`analysis.${type}`]}</option>
            ))}
          </SelectField>
          <SelectField id="targetType" label={dictionary.targetType} value={state.targetType} onChange={(event) => update("targetType", event.target.value as FortuneTargetType)}>
            {(["general", "phone_number", "vehicle_plate", "house_number", "room_number", "name", "event_datetime"] as const).map((type) => (
              <option key={type} value={type}>{dictionary[`target.${type}`]}</option>
            ))}
          </SelectField>
          <TextField id="targetValue" label={dictionary.targetValue} value={state.targetValue} onChange={(event) => update("targetValue", event.target.value)} />
          <TextAreaField id="objective" rows={3} label={dictionary.objective} value={state.objective} onChange={(event) => update("objective", event.target.value)} />
        </div>
        <div className="button-row">
          <Button type="submit" disabled={loading}>{loading ? dictionary.loading : dictionary.run}</Button>
          <Button className="secondary" type="button" onClick={() => onChange({ ...state, targetValue: "", objective: "" })}>{dictionary.clear}</Button>
        </div>
      </form>
    </Card>
  );
}
