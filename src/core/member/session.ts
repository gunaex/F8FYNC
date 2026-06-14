import { cookies } from "next/headers";
import type { AuthSession, Member } from "@/core/commercial";
import { createId, getMemoryStore } from "@/core/repositories/memory-store";

const memberCookie = "f8sync_member_id";
const guestCookie = "f8sync_guest_id";

export async function getAuthSession(): Promise<AuthSession> {
  const cookieStore = await cookies();
  const memberId = cookieStore.get(memberCookie)?.value;
  const guestId = cookieStore.get(guestCookie)?.value ?? createId("guest");
  const member = memberId ? getMemoryStore().members.find((item) => item.id === memberId && item.status !== "deleted") : undefined;
  return {
    memberId: member?.id,
    guestId,
    userType: member?.role === "admin" ? "admin" : member ? "member" : "guest"
  };
}

export async function setMemberSession(member: Member) {
  const cookieStore = await cookies();
  cookieStore.set(memberCookie, member.id, { httpOnly: true, sameSite: "lax", path: "/" });
  cookieStore.set(guestCookie, createId("guest"), { httpOnly: true, sameSite: "lax", path: "/" });
}

export async function clearMemberSession() {
  const cookieStore = await cookies();
  cookieStore.delete(memberCookie);
}
