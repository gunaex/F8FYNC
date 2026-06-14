import { NextResponse } from "next/server";
import { createBirthProfile, listBirthProfiles } from "@/core/commercial/birth-profile-service";
import { getAuthSession } from "@/core/member/session";

export async function GET() {
  const session = await getAuthSession();
  if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
  return NextResponse.json({ success: true, data: await listBirthProfiles(session.memberId) });
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session.memberId) return NextResponse.json({ success: false, error: { code: "LOGIN_REQUIRED", messageKey: "errors.loginRequired" } }, { status: 401 });
    const profile = await createBirthProfile(session.memberId, await request.json());
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    return NextResponse.json({ success: false, error: { code: error instanceof Error ? error.message : "PROFILE_CREATE_FAILED", messageKey: "errors.profileCreateFailed" } }, { status: 400 });
  }
}
