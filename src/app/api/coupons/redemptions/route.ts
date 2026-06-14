import { NextResponse } from "next/server";
import { getMemberCouponRedemptions } from "@/core/commercial";
import { getAuthSession } from "@/core/member/session";

export async function GET() {
  const session = await getAuthSession();
  if (!session.memberId) {
    return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  }
  return NextResponse.json({ success: true, data: await getMemberCouponRedemptions(session.memberId) });
}
