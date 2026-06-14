import { NextResponse } from "next/server";
import { subscriptionPlans } from "@/core/commercial";
import { getSubscription } from "@/core/commercial/subscription-service";
import { getAuthSession } from "@/core/member/session";

export async function GET() {
  const session = await getAuthSession();
  return NextResponse.json({ success: true, data: { plans: subscriptionPlans, current: await getSubscription(session.memberId) } });
}
