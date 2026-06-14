import { getDictionary, resolveLocale, t } from "@/i18n";
import { RecommendationCard } from "@/ui/components";

export default async function BirthProfilesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  return <RecommendationCard title={t(dictionary, "birthProfile.manage")} items={[t(dictionary, "birthProfile.primary"), t(dictionary, "birthProfile.consent")]} />;
}
