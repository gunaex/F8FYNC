import { getSubscription } from "@/core/commercial/subscription-service";
import { getAuthSession } from "@/core/member/session";
import { getDictionary, resolveLocale, t } from "@/i18n";
import { RecommendationCard } from "@/ui/components";

export default async function SubscriptionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  const session = await getAuthSession();
  const subscription = await getSubscription(session.memberId);
  return <RecommendationCard title={t(dictionary, "subscription.title")} items={[`${t(dictionary, "member.currentPlan")}: ${subscription.plan.code}`, t(dictionary, "pricing.manage"), t(dictionary, "subscription.cancel")]} />;
}
