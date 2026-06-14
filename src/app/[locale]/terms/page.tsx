import { getDictionary, resolveLocale, t } from "@/i18n";
import { DisclaimerCard, RecommendationCard } from "@/ui/components";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  return <div className="field-grid"><RecommendationCard title={t(dictionary, "privacy.terms")} items={[t(dictionary, "pricing.cancellation"), t(dictionary, "disclaimer.general")]} /><DisclaimerCard text={t(dictionary, "disclaimer.general")} /></div>;
}
