import { getDictionary, resolveLocale, t } from "@/i18n";
import { DisclaimerCard, RecommendationCard } from "@/ui/components";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  return <div className="field-grid"><RecommendationCard title={t(dictionary, "privacy.policy")} items={[t(dictionary, "privacy.exportData"), t(dictionary, "privacy.deleteAccount"), t(dictionary, "birthProfile.consent")]} /><DisclaimerCard text={t(dictionary, "disclaimer.general")} /></div>;
}
