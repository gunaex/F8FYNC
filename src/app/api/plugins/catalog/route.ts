import { NextResponse } from "next/server";
import { getMethodologyCatalog } from "@/plugins/catalog";

export function GET() {
  return NextResponse.json({
    success: true,
    data: getMethodologyCatalog()
  });
}
