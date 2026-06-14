"use client";

import { useState, type FormEvent } from "react";
import { Button, Card, TextField } from "@/ui/primitives";

export function CouponRedeemCard({ labels }: { labels: Record<string, string> }) {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = new FormData(event.currentTarget);
    const code = String(form.get("couponCode") ?? "");
    const idempotencyKey = crypto.randomUUID();
    const response = await fetch("/api/coupons/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, idempotencyKey })
    });
    const json = await response.json();
    if (json.success) {
      setStatus(labels.success);
    } else if (json.error?.messageKey === "errors.loginRequired") {
      setStatus(labels.loginRequired);
    } else if (json.error?.messageKey === "coupon.errors.freeAlreadyUsed") {
      setStatus(labels.freeAlreadyUsed);
    } else if (json.error?.messageKey === "coupon.errors.invalid") {
      setStatus(labels.invalid);
    } else {
      setStatus(labels.failed);
    }
    setLoading(false);
  }

  return (
    <Card className="coupon-card">
      <form onSubmit={submit} className="field-grid">
        <div>
          <span className="badge positive">{labels.title}</span>
          <p className="muted">{labels.description}</p>
        </div>
        <TextField id="couponCode" name="couponCode" label={labels.inputLabel} placeholder={labels.placeholder} />
        <Button type="submit" disabled={loading}>{loading ? labels.loading : labels.redeem}</Button>
        {status ? <p className="muted">{status}</p> : null}
      </form>
    </Card>
  );
}
