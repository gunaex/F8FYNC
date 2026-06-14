import { NextResponse } from "next/server";
import { clearMemberSession } from "@/core/member/session";

export async function POST() {
  await clearMemberSession();
  return NextResponse.json({ success: true });
}
