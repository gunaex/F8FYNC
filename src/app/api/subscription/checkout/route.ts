import { NextResponse } from "next/server";
import { getAuthSession } from "@/core/member/session";
import { getPaymentProvider } from "@/payments";

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const data = await getPaymentProvider().createCheckoutSession({ memberId: session.memberId, planCode: String(body.planCode ?? "premium"), successUrl: body.successUrl, cancelUrl: body.cancelUrl });
  return NextResponse.json({ success: true, data });
}
