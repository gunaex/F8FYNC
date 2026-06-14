import { listHistory } from "@/core/commercial/history-service";
import { getAuthSession } from "@/core/member/session";
import { getDictionary, resolveLocale, t } from "@/i18n";
import { RecommendationCard } from "@/ui/components";

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  const session = await getAuthSession();
  const history = session.memberId ? await listHistory(session.memberId) : [];
  return <RecommendationCard title={t(dictionary, "history.title")} items={history.length ? history.map((item) => `${item.queryType} · ${item.createdAt}`) : [t(dictionary, "history.empty")]} />;
}
