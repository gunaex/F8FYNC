import { NextResponse } from "next/server";
import { deleteBirthProfile, updateBirthProfile } from "@/core/commercial/birth-profile-service";
import { getAuthSession } from "@/core/member/session";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAuthSession();
    if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
    const { id } = await params;
    const profile = await updateBirthProfile(session.memberId, id, await request.json());
    return NextResponse.json({ success: true, data: profile });
  } catch {
    return NextResponse.json({ success: false, error: { code: "PROFILE_UPDATE_FAILED", messageKey: "errors.profileUpdateFailed" } }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession();
  if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  const { id } = await params;
  await deleteBirthProfile(session.memberId, id);
  return NextResponse.json({ success: true });
}
