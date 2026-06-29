import type { ArchetypeDefinition } from "./types";

const now = "2026-06-14T00:00:00.000Z";

export const archetypeDefinitions: ArchetypeDefinition[] = [
  {
    id: "arch_jade_cultivator",
    code: "jade_cultivator",
    nameKey: "identity.archetypes.jadeCultivator.name",
    shortNameKey: "identity.archetypes.jadeCultivator.shortName",
    descriptionKey: "identity.archetypes.jadeCultivator.description",
    traitKeys: ["growth", "renewal", "stability"],
    elementAffinities: ["wood", "earth"],
    visualThemeIds: ["sacred_atlas_jade"],
    loreVersion: "v8.seed.1",
    ruleVersion: "identity.rules.v1",
    status: "approved",
    commercialUseApproved: false,
    culturalReviewStatus: "not_required",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "arch_crimson_herald",
    code: "crimson_herald",
    nameKey: "identity.archetypes.crimsonHerald.name",
    shortNameKey: "identity.archetypes.crimsonHerald.shortName",
    descriptionKey: "identity.archetypes.crimsonHerald.description",
    traitKeys: ["communication", "clarity", "authority"],
    elementAffinities: ["fire", "metal"],
    visualThemeIds: ["sacred_atlas_vermilion"],
    loreVersion: "v8.seed.1",
    ruleVersion: "identity.rules.v1",
    status: "approved",
    commercialUseApproved: false,
    culturalReviewStatus: "not_required",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "arch_bronze_founder",
    code: "bronze_founder",
    nameKey: "identity.archetypes.bronzeFounder.name",
    shortNameKey: "identity.archetypes.bronzeFounder.shortName",
    descriptionKey: "identity.archetypes.bronzeFounder.description",
    traitKeys: ["stability", "discipline", "craft"],
    elementAffinities: ["earth", "metal"],
    visualThemeIds: ["sacred_atlas_bronze"],
    loreVersion: "v8.seed.1",
    ruleVersion: "identity.rules.v1",
    status: "approved",
    commercialUseApproved: false,
    culturalReviewStatus: "not_required",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "arch_azure_navigator",
    code: "azure_navigator",
    nameKey: "identity.archetypes.azureNavigator.name",
    shortNameKey: "identity.archetypes.azureNavigator.shortName",
    descriptionKey: "identity.archetypes.azureNavigator.description",
    traitKeys: ["adaptability", "intuition", "strategy"],
    elementAffinities: ["water", "wood"],
    visualThemeIds: ["sacred_atlas_azure"],
    loreVersion: "v8.seed.1",
    ruleVersion: "identity.rules.v1",
    status: "approved",
    commercialUseApproved: false,
    culturalReviewStatus: "not_required",
    createdAt: now,
    updatedAt: now
  }
];

export function listApprovedArchetypes() {
  return archetypeDefinitions.filter((item) => item.status === "approved");
}
