import { getDictionary, resolveLocale, t } from "@/i18n";
import { RecommendationCard } from "@/ui/components";

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  return <RecommendationCard title={t(dictionary, "member.settings")} items={[t(dictionary, "member.profile"), t(dictionary, "birthProfile.manage"), t(dictionary, "subscription.title"), t(dictionary, "privacy.title")]} />;
}
