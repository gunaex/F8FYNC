import type { ConsentRecord, Member } from "@/core/commercial";
import { registerSchema } from "@/core/commercial";
import { createId, getMemoryStore } from "@/core/repositories/memory-store";

const consentVersion = "2026-06-14";

export async function registerMember(input: unknown): Promise<Member> {
  const parsed = registerSchema.parse(input);
  if (!parsed.consent.termsAccepted || !parsed.consent.privacyAccepted) {
    throw new Error("CONSENT_REQUIRED");
  }
  const store = getMemoryStore();
  if (store.members.some((member) => member.email.toLowerCase() === parsed.email.toLowerCase() && member.status !== "deleted")) {
    throw new Error("EMAIL_ALREADY_REGISTERED");
  }
  const now = new Date().toISOString();
  const member: Member = {
    id: createId("member"),
    email: parsed.email.toLowerCase(),
    displayName: parsed.displayName,
    locale: parsed.locale,
    timezone: parsed.timezone,
    status: "active",
    role: "member",
    createdAt: now,
    updatedAt: now
  };
  store.members.push(member);
  store.passwords[member.id] = parsed.password;
  const consents: ConsentRecord[] = [
    { id: createId("consent"), memberId: member.id, consentType: "terms", version: consentVersion, granted: true, grantedAt: now },
    { id: createId("consent"), memberId: member.id, consentType: "privacy", version: consentVersion, granted: true, grantedAt: now }
  ];
  if (parsed.consent.birthProfileStorageAccepted) {
    consents.push({ id: createId("consent"), memberId: member.id, consentType: "birth_profile_storage", version: consentVersion, granted: true, grantedAt: now });
  }
  store.consents.push(...consents);
  return member;
}

export async function loginMember(email: string, password: string): Promise<Member> {
  const store = getMemoryStore();
  const member = store.members.find((item) => item.email === email.toLowerCase() && item.status !== "deleted");
  if (!member || store.passwords[member.id] !== password) throw new Error("INVALID_CREDENTIALS");
  return member;
}

export async function deleteMember(memberId: string) {
  const store = getMemoryStore();
  const member = store.members.find((item) => item.id === memberId);
  if (!member) throw new Error("MEMBER_NOT_FOUND");
  member.status = "deleted";
  member.updatedAt = new Date().toISOString();
}

export async function updateMember(memberId: string, patch: Partial<Pick<Member, "displayName" | "locale" | "timezone">>) {
  const member = getMemoryStore().members.find((item) => item.id === memberId && item.status !== "deleted");
  if (!member) throw new Error("MEMBER_NOT_FOUND");
  Object.assign(member, patch, { updatedAt: new Date().toISOString() });
  return member;
}

export async function getMember(memberId?: string) {
  if (!memberId) return undefined;
  return getMemoryStore().members.find((item) => item.id === memberId && item.status !== "deleted");
}
