import { NextResponse } from "next/server";
import { deleteHistory, listHistory } from "@/core/commercial/history-service";
import { getAuthSession } from "@/core/member/session";

export async function GET() {
  const session = await getAuthSession();
  if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  return NextResponse.json({ success: true, data: await listHistory(session.memberId) });
}

export async function DELETE() {
  const session = await getAuthSession();
  if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  await deleteHistory(session.memberId);
  return NextResponse.json({ success: true });
}
