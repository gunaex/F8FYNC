import { NextResponse } from "next/server";
import { getUsageSummary } from "@/core/commercial/entitlement-service";
import { getAuthSession } from "@/core/member/session";

export async function GET() {
  const session = await getAuthSession();
  return NextResponse.json({ success: true, data: await getUsageSummary(session.memberId ?? `guest:${session.guestId}`) });
}
