import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: true, data: { status: "mock_reset_email_queued" } });
}
