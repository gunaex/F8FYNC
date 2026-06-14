import { NextResponse } from "next/server";
import { getPaymentProvider } from "@/payments";

export async function POST(request: Request) {
  return NextResponse.json({ success: true, data: await getPaymentProvider().parseWebhook(request) });
}
