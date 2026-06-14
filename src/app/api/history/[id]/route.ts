import { NextResponse } from "next/server";
import { deleteHistory, getHistory } from "@/core/commercial/history-service";
import { getAuthSession } from "@/core/member/session";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession();
  if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  const { id } = await params;
  const record = await getHistory(session.memberId, id);
  if (!record) return NextResponse.json({ success: false, error: { code: "HISTORY_NOT_FOUND", messageKey: "errors.notFound" } }, { status: 404 });
  return NextResponse.json({ success: true, data: record });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession();
  if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  const { id } = await params;
  await deleteHistory(session.memberId, id);
  return NextResponse.json({ success: true });
}
