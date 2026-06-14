import { birthProfileInputSchema } from "./schemas";
import type { ManagedBirthProfile } from "./types";
import { canUseFeature } from "./entitlement-service";
import { createId, getMemoryStore } from "@/core/repositories/memory-store";

export async function listBirthProfiles(memberId: string) {
  return getMemoryStore().birthProfiles.filter((profile) => profile.memberId === memberId);
}

export async function createBirthProfile(memberId: string, input: unknown): Promise<ManagedBirthProfile> {
  const parsed = birthProfileInputSchema.parse(input);
  if (!parsed.consentGranted) throw new Error("BIRTH_PROFILE_CONSENT_REQUIRED");
  const decision = await canUseFeature(memberId, "saved_profiles");
  const existing = await listBirthProfiles(memberId);
  if (!decision.allowed || (decision.entitlement?.limitValue !== undefined && existing.length >= decision.entitlement.limitValue)) {
    throw new Error("PROFILE_LIMIT_EXCEEDED");
  }
  const now = new Date().toISOString();
  const profile: ManagedBirthProfile = {
    id: createId("profile"),
    memberId,
    label: parsed.label,
    birthDate: parsed.birthDate,
    birthTime: parsed.birthTime || undefined,
    birthLocation: parsed.birthLocation,
    birthTimezone: parsed.birthTimezone,
    genderForCalculation: parsed.genderForCalculation,
    isPrimary: parsed.isPrimary ?? existing.length === 0,
    createdAt: now,
    updatedAt: now
  };
  if (profile.isPrimary) existing.forEach((item) => (item.isPrimary = false));
  getMemoryStore().birthProfiles.push(profile);
  return profile;
}

export async function updateBirthProfile(memberId: string, id: string, input: unknown) {
  const parsed = birthProfileInputSchema.partial().parse(input);
  const profile = getMemoryStore().birthProfiles.find((item) => item.id === id && item.memberId === memberId);
  if (!profile) throw new Error("PROFILE_NOT_FOUND");
  if (parsed.isPrimary) (await listBirthProfiles(memberId)).forEach((item) => (item.isPrimary = false));
  Object.assign(profile, parsed, { updatedAt: new Date().toISOString() });
  return profile;
}

export async function deleteBirthProfile(memberId: string, id: string) {
  const store = getMemoryStore();
  const index = store.birthProfiles.findIndex((item) => item.id === id && item.memberId === memberId);
  if (index < 0) throw new Error("PROFILE_NOT_FOUND");
  store.birthProfiles.splice(index, 1);
}
