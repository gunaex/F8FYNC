import { NextResponse } from "next/server";
import { couponRedeemSchema, redeemCoupon } from "@/core/commercial";
import { getAuthSession } from "@/core/member/session";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session.memberId) {
      return NextResponse.json(
        { success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } },
        { status: 401 }
      );
    }
    const input = couponRedeemSchema.parse(await request.json());
    const data = await redeemCoupon({ memberId: session.memberId, code: input.code, idempotencyKey: input.idempotencyKey });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const code = error instanceof Error ? error.message : "COUPON_REDEEM_FAILED";
    const messageKey =
      code === "COUPON_FREE_ALREADY_USED"
        ? "coupon.errors.freeAlreadyUsed"
        : code === "COUPON_INVALID"
          ? "coupon.errors.invalid"
          : code === "LOGIN_REQUIRED"
            ? "errors.loginRequired"
            : "coupon.errors.failed";
    return NextResponse.json({ success: false, error: { code, messageKey } }, { status: code === "LOGIN_REQUIRED" ? 401 : 400 });
  }
}
