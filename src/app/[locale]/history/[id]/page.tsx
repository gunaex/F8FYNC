import { getHistory } from "@/core/commercial/history-service";
import { getAuthSession } from "@/core/member/session";
import { getDictionary, resolveLocale, t } from "@/i18n";
import { RecommendationCard } from "@/ui/components";

export default async function HistoryDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: rawLocale, id } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  const session = await getAuthSession();
  const record = session.memberId ? await getHistory(session.memberId, id) : undefined;
  return <RecommendationCard title={t(dictionary, "history.detail")} items={record ? [record.queryType, String(record.resultSnapshot.overallScore)] : [t(dictionary, "history.empty")]} />;
}
