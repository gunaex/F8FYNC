import { NextResponse } from "next/server";
import { loginSchema } from "@/core/commercial";
import { loginMember } from "@/core/member/auth-service";
import { setMemberSession } from "@/core/member/session";

export async function POST(request: Request) {
  try {
    const input = loginSchema.parse(await request.json());
    const member = await loginMember(input.email, input.password);
    await setMemberSession(member);
    return NextResponse.json({ success: true, data: { member } });
  } catch {
    return NextResponse.json({ success: false, error: { code: "INVALID_CREDENTIALS", messageKey: "errors.authFailed" } }, { status: 401 });
  }
}
