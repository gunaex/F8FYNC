import { NextResponse } from "next/server";
import { getAuthSession } from "@/core/member/session";
import { getPaymentProvider } from "@/payments";

export async function POST() {
  const session = await getAuthSession();
  if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  return NextResponse.json({ success: true, data: await getPaymentProvider().cancelSubscription({ memberId: session.memberId }) });
}
