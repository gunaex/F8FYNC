"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { FortuneQueryType, FortuneTargetType } from "@/core/domain";
import { Button, Card, SelectField, TextAreaField, TextField } from "@/ui/primitives";
import type { CanonicalBirthTimeStatus, CanonicalTimezoneConfirmationStatus } from "@/core/profile";
import { partsFromIsoDate, sanitizeBirthYearInput, sanitizeNumericText, validateBirthDateParts, type BirthDateParts } from "./birth-date-input";

export type AnalysisFormState = {
  birthDate: string;
  birthTime: string;
  birthTimeStatus: CanonicalBirthTimeStatus;
  birthLocation: string;
  birthTimezone: string;
  timezoneConfirmationStatus: CanonicalTimezoneConfirmationStatus;
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
  const [birthDateParts, setBirthDateParts] = useState<BirthDateParts>(() => partsFromIsoDate(state.birthDate));
  const [dateSubmitted, setDateSubmitted] = useState(false);
  const dateValidation = useMemo(() => validateBirthDateParts(birthDateParts), [birthDateParts]);
  const showDateError = dateSubmitted && dateValidation.status !== "VALID";
  const canonicalBirthDate = dateValidation.status === "VALID" ? dateValidation.isoDate : "";
  const buddhistYear = dateValidation.status === "VALID" ? dateValidation.buddhistYear : birthDateParts.year.length === 4 ? Number(birthDateParts.year) + 543 : null;
  const labelFallbacks: Record<string, string> = {
    birthDay: "วัน",
    birthMonth: "เดือน",
    birthYearGregorian: "ปี ค.ศ.",
    chooseFromCalendar: "เลือกจากปฏิทิน",
    birthDateErrorIncomplete: "กรุณากรอกปี ค.ศ. ให้ครบ 4 หลัก",
    birthDateErrorInvalidDay: "วันที่ที่เลือกไม่ถูกต้อง",
    birthDateErrorInvalidLeapDay: "วันที่ที่เลือกไม่ถูกต้อง",
    birthDateErrorYearBelowRange: "ระบบรองรับปีเกิดตั้งแต่ ค.ศ. 1900",
    birthDateErrorFuture: "ยังไม่สามารถเลือกวันเกิดในอนาคตได้",
    birthDateErrorNonNumericYear: "กรุณากรอกปี ค.ศ. เป็นตัวเลข",
    buddhistYearHelper: "ค.ศ. {gregorianYear} ตรงกับ พ.ศ. {buddhistYear}",
    timezoneConfirmationStatus: "ยืนยันเขตเวลาเกิด",
    timezoneConfirmed: "ยืนยันแล้ว",
    timezoneSuggested: "ระบบแนะนำ",
    timezoneUnresolved: "ยังไม่แน่ใจ",
    timezoneUnknown: "ไม่ทราบ",
    birthInputUnavailableDisclosure: "ผลบางส่วนจะยังไม่ครบจนกว่าจะมีเวลาเกิดและเขตเวลาที่เชื่อถือได้"
  };
  const label = (key: string, fallback: string) => {
    const value = dictionary[key];
    return value && !value.startsWith("form.") ? value : labelFallbacks[key] ?? fallback;
  };
  const formatLabel = (key: string, fallback: string, values: Record<string, string | number>) =>
    Object.entries(values).reduce((text, [name, value]) => text.replace(`{${name}}`, String(value)), label(key, fallback));

  useEffect(() => {
    if (state.birthDate && state.birthDate !== canonicalBirthDate) setBirthDateParts(partsFromIsoDate(state.birthDate));
  }, [canonicalBirthDate, state.birthDate]);

  function update<K extends keyof AnalysisFormState>(key: K, value: AnalysisFormState[K]) {
    const next = { ...state, [key]: value };
    onChange(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("f8sync:last-analysis", JSON.stringify({ queryType: next.queryType }));
    }
  }

  function updateBirthTime(value: string) {
    const next = { ...state, birthTime: value, birthTimeStatus: value ? "KNOWN" as const : "UNKNOWN" as const };
    onChange(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("f8sync:last-analysis", JSON.stringify({ queryType: next.queryType }));
    }
  }

  function updateBirthDateParts(nextParts: BirthDateParts) {
    setBirthDateParts(nextParts);
    const validation = validateBirthDateParts(nextParts);
    if (validation.status === "VALID") update("birthDate", validation.isoDate);
  }

  function updateCalendarDate(value: string) {
    const nextParts = partsFromIsoDate(value);
    setDateSubmitted(true);
    updateBirthDateParts(nextParts);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    setDateSubmitted(true);
    if (dateValidation.status !== "VALID") return;
    if (state.birthDate !== dateValidation.isoDate) update("birthDate", dateValidation.isoDate);
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
          <fieldset className="birth-date-field" aria-describedby={showDateError ? "birthDate-error" : buddhistYear ? "birthDate-helper" : undefined}>
            <legend>{dictionary.birthDate}</legend>
            <div className="birth-date-grid">
              <TextField
                id="birthDay"
                type="text"
                inputMode="numeric"
                autoComplete="bday-day"
                maxLength={2}
                label={label("birthDay", "Day")}
                value={birthDateParts.day}
                onBlur={() => setDateSubmitted(true)}
                onChange={(event) => updateBirthDateParts({ ...birthDateParts, day: sanitizeNumericText(event.target.value, 2) })}
              />
              <SelectField
                id="birthMonth"
                autoComplete="bday-month"
                label={label("birthMonth", "Month")}
                value={birthDateParts.month}
                onBlur={() => setDateSubmitted(true)}
                onChange={(event) => updateBirthDateParts({ ...birthDateParts, month: event.target.value })}
              >
                <option value="">{label("birthMonthPlaceholder", "Month")}</option>
                {Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0")).map((month) => (
                  <option key={month} value={month}>{label(`month.${month}`, month)}</option>
                ))}
              </SelectField>
              <TextField
                id="birthYear"
                type="text"
                inputMode="numeric"
                autoComplete="bday-year"
                maxLength={4}
                label={label("birthYearGregorian", "Gregorian year")}
                value={birthDateParts.year}
                onBlur={() => setDateSubmitted(true)}
                onChange={(event) => updateBirthDateParts({ ...birthDateParts, year: sanitizeBirthYearInput(event.target.value) })}
              />
            </div>
            {buddhistYear && birthDateParts.year.length === 4 ? (
              <p id="birthDate-helper" className="field-helper">
                {formatLabel("buddhistYearHelper", "CE {gregorianYear} is BE {buddhistYear}", { gregorianYear: birthDateParts.year, buddhistYear })}
              </p>
            ) : null}
            {showDateError ? <p id="birthDate-error" className="field-error" role="alert">{label(dateValidation.messageKey, "Invalid birth date")}</p> : null}
            <div className="calendar-picker-row">
              <label htmlFor="birthDateCalendar">{label("chooseFromCalendar", "Choose from calendar")}</label>
              <input
                id="birthDateCalendar"
                type="date"
                min="1900-01-01"
                max={new Date().toISOString().slice(0, 10)}
                value={canonicalBirthDate}
                onChange={(event) => updateCalendarDate(event.target.value)}
              />
            </div>
          </fieldset>
          <TextField
            id="birthTime"
            type="time"
            label={dictionary.birthTime}
            value={state.birthTime}
            onChange={(event) => updateBirthTime(event.target.value)}
          />
          <TextField id="birthLocation" label={dictionary.birthLocation} value={state.birthLocation} onChange={(event) => update("birthLocation", event.target.value)} />
          <TextField id="birthTimezone" required label={dictionary.birthTimezone} value={state.birthTimezone} onChange={(event) => update("birthTimezone", event.target.value)} />
          <SelectField
            id="timezoneConfirmationStatus"
            label={label("timezoneConfirmationStatus", "Timezone confirmation")}
            value={state.timezoneConfirmationStatus}
            onChange={(event) => update("timezoneConfirmationStatus", event.target.value as CanonicalTimezoneConfirmationStatus)}
          >
            <option value="CONFIRMED">{label("timezoneConfirmed", "Confirmed")}</option>
            <option value="SUGGESTED">{label("timezoneSuggested", "Suggested")}</option>
            <option value="UNRESOLVED">{label("timezoneUnresolved", "Unresolved")}</option>
            <option value="UNKNOWN">{label("timezoneUnknown", "Unknown")}</option>
          </SelectField>
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
        {state.birthTimeStatus !== "KNOWN" || state.timezoneConfirmationStatus !== "CONFIRMED" ? (
          <p className="muted">{label("birthInputUnavailableDisclosure", "Some time-specific outputs will stay unavailable until birth time and timezone are reliable.")}</p>
        ) : null}
        <div className="button-row">
          <Button type="submit" disabled={loading}>{loading ? dictionary.loading : dictionary.run}</Button>
          <Button className="secondary" type="button" onClick={() => onChange({ ...state, targetValue: "", objective: "" })}>{dictionary.clear}</Button>
        </div>
      </form>
    </Card>
  );
}
