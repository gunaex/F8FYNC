import { NextResponse } from "next/server";
import { couponRedeemSchema, validateCoupon } from "@/core/commercial";
import { getAuthSession } from "@/core/member/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = couponRedeemSchema.pick({ code: true }).parse(body);
    const session = await getAuthSession();
    const data = await validateCoupon({ code: input.code, memberId: session.memberId });
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: { code: "COUPON_VALIDATE_FAILED", messageKey: "coupon.errors.failed" } }, { status: 400 });
  }
}
