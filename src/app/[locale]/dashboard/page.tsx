import { getUsageSummary } from "@/core/commercial/entitlement-service";
import { getSubscription } from "@/core/commercial/subscription-service";
import { getAuthSession } from "@/core/member/session";
import { getDictionary, resolveLocale, t } from "@/i18n";
import { RecommendationCard, UsageMeter } from "@/ui/components";

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  const session = await getAuthSession();
  const subscription = await getSubscription(session.memberId);
  const usage = await getUsageSummary(session.memberId);
  return <div className="field-grid"><RecommendationCard title={t(dictionary, "member.dashboard")} items={[`${t(dictionary, "member.currentPlan")}: ${subscription.plan.code}`, session.userType]} /><UsageMeter title={t(dictionary, "usage.title")} items={usage} /></div>;
}
