import { NextResponse } from "next/server";
import { getAuthSession, clearMemberSession } from "@/core/member/session";
import { deleteMember, getMember, updateMember } from "@/core/member/auth-service";
import { getSubscription } from "@/core/commercial/subscription-service";
import { getMemberEntitlements } from "@/core/commercial/entitlement-service";

export async function GET() {
  const session = await getAuthSession();
  const member = await getMember(session.memberId);
  const subscription = await getSubscription(session.memberId);
  const entitlements = await getMemberEntitlements(session.memberId);
  return NextResponse.json({ success: true, data: { session, member, subscription, entitlements } });
}

export async function PATCH(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
    const member = await updateMember(session.memberId, await request.json());
    return NextResponse.json({ success: true, data: { member } });
  } catch {
    return NextResponse.json({ success: false, error: { code: "MEMBER_UPDATE_FAILED", messageKey: "errors.memberUpdateFailed" } }, { status: 400 });
  }
}

export async function DELETE() {
  const session = await getAuthSession();
  if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  await deleteMember(session.memberId);
  await clearMemberSession();
  return NextResponse.json({ success: true });
}
