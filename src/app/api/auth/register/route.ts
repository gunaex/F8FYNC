import { NextResponse } from "next/server";
import { registerMember } from "@/core/member/auth-service";
import { setMemberSession } from "@/core/member/session";

export async function POST(request: Request) {
  try {
    const member = await registerMember(await request.json());
    await setMemberSession(member);
    return NextResponse.json({ success: true, data: { member } });
  } catch (error) {
    return NextResponse.json({ success: false, error: { code: error instanceof Error ? error.message : "REGISTER_FAILED", messageKey: "errors.authFailed" } }, { status: 400 });
  }
}
