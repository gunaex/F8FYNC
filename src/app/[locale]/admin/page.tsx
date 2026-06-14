import { getAuthSession } from "@/core/member/session";
import { getDictionary, resolveLocale, t } from "@/i18n";
import { RecommendationCard } from "@/ui/components";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  const session = await getAuthSession();
  return <RecommendationCard title={t(dictionary, "admin.title")} items={[session.userType === "admin" ? t(dictionary, "admin.foundation") : t(dictionary, "errors.loginRequired")]} />;
}
