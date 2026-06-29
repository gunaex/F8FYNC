import { NextResponse } from "next/server";
import { z } from "zod";
import { drawTarotReading } from "@/core/tarot";
import { getAuthSession } from "@/core/member/session";

const tarotDrawRequestSchema = z.object({
  requestId: z.string().min(6).max(80),
  spreadId: z.enum(["one_card", "three_card"]),
  question: z.string().trim().max(240).optional(),
  allowReversals: z.boolean().optional(),
  idempotencyKey: z.string().trim().max(120).optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = tarotDrawRequestSchema.parse(body);
    const session = await getAuthSession();
    const reading = drawTarotReading({
      ...parsed,
      memberId: session.memberId,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, data: reading });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_TAROT_DRAW_REQUEST", messageKey: "common.error" } },
      { status: 400 }
    );
  }
}
