import { NextResponse } from "next/server";
import { z } from "zod";
import { computeForecast } from "@/core/forecast";
import { canUseFeature } from "@/core/commercial/entitlement-service";
import { getAuthSession } from "@/core/member/session";
import { featureFlags } from "@/config/feature-flags";

const birthProfileSchema = z.object({
  birthDate: z.string().min(8).max(12),
  birthTime: z.string().optional(),
  birthTimezone: z.string().min(2)
});

const forecastRequestSchema = z.object({
  requestId: z.string().min(6).max(80),
  contextTime: z.string().min(10),
  contextTimezone: z.string().min(2),
  birthProfile: birthProfileSchema.optional()
});

export async function POST(request: Request) {
  try {
    if (!featureFlags.forecast6h) {
      return NextResponse.json(
        { success: false, error: { code: "FORECAST_DISABLED", messageKey: "errors.entitlementDenied" } },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = forecastRequestSchema.parse(body);
    const session = await getAuthSession();

    // During development the feature is open to everyone. In production the feature flag is
    // turned off and access is gated by the forecast_6h entitlement (premium plans).
    if (!featureFlags.forecastDevBypass) {
      const usageSubject = session.memberId ?? `guest:${session.guestId}`;
      const decision = await canUseFeature(usageSubject, "forecast_6h");
      if (!decision.allowed) {
        return NextResponse.json(
          { success: false, error: { code: decision.reasonCode ?? "FEATURE_NOT_ALLOWED", messageKey: "errors.entitlementDenied" } },
          { status: 403 }
        );
      }
    }

    const reading = computeForecast({
      requestId: parsed.requestId,
      contextTime: parsed.contextTime,
      contextTimezone: parsed.contextTimezone,
      birthProfile: parsed.birthProfile,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, data: reading });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_FORECAST_REQUEST", messageKey: "common.error" } },
      { status: 400 }
    );
  }
}
