"use client";

import { useState, type FormEvent } from "react";
import type { SubscriptionPlan } from "@/core/commercial";
import { Button, Card, TextField } from "@/ui/primitives";

export function PricingCard({
  plan,
  name,
  description,
  price,
  cta
}: {
  plan: SubscriptionPlan;
  name: string;
  description: string;
  price: string;
  cta: string;
}) {
  async function upgrade() {
    await fetch("/api/subscription/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planCode: plan.code })
    });
  }

  return (
    <Card className="pricing-card">
      <span className="badge positive">{name}</span>
      <strong className="price-display">{price}</strong>
      <p className="muted">{description}</p>
      <Button type="button" onClick={upgrade}>{cta}</Button>
    </Card>
  );
}

export function AuthForm({
  mode,
  labels
}: {
  mode: "login" | "register" | "forgot" | "reset";
  labels: Record<string, string>;
}) {
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      displayName: String(form.get("displayName") ?? ""),
      locale: "th",
      timezone: "Asia/Bangkok",
      consent: { termsAccepted: true, privacyAccepted: true, birthProfileStorageAccepted: false }
    };
    const endpoint =
      mode === "register"
        ? "/api/auth/register"
        : mode === "forgot"
          ? "/api/auth/forgot-password"
          : mode === "reset"
            ? "/api/auth/reset-password"
            : "/api/auth/login";
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setStatus(response.ok ? labels.success : labels.error);
  }

  return (
    <Card className="analysis-form-card">
      <form onSubmit={submit} className="field-grid">
        {mode === "register" ? <TextField id="displayName" name="displayName" label={labels.displayName} /> : null}
        <TextField id="email" name="email" type="email" required label={labels.email} />
        {mode !== "forgot" ? <TextField id="password" name="password" type="password" required label={labels.password} /> : null}
        <Button type="submit">{labels.submit}</Button>
        {status ? <p className="muted">{status}</p> : null}
      </form>
    </Card>
  );
}

export function UsageMeter({ title, items }: { title: string; items: Array<{ featureKey: string; used: number; remaining?: number; limitValue?: number }> }) {
  return (
    <Card>
      <h2 className="section-title">{title}</h2>
      <ul className="list">
        {items.map((item) => (
          <li key={item.featureKey}>
            <strong>{item.featureKey}</strong>
            <p className="muted">{item.used}/{item.limitValue ?? "∞"} · {item.remaining ?? "∞"}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
