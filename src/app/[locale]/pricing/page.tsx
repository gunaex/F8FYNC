import { subscriptionPlans } from "@/core/commercial";
import { getDictionary, resolveLocale, t } from "@/i18n";
import { PricingCard, RecommendationCard } from "@/ui/components";

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = getDictionary(locale);
  const formatter = new Intl.NumberFormat(locale, { style: "currency", currency: "THB", maximumFractionDigits: 0 });

  return (
    <div className="field-grid">
      <div className="hero-panel">
        <span className="hero-kicker">{t(dictionary, "nav.pricing")}</span>
        <h1>{t(dictionary, "pricing.title")}</h1>
        <p>{t(dictionary, "pricing.subtitle")}</p>
      </div>
      <div className="score-grid">
        {subscriptionPlans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            name={t(dictionary, plan.nameKey)}
            description={t(dictionary, plan.descriptionKey)}
            price={plan.priceMinor === 0 ? formatter.format(0) : formatter.format(plan.priceMinor / 100)}
            billingLabel={t(dictionary, `pricing.billing.${plan.billingType}`)}
            cta={t(dictionary, "pricing.upgrade")}
          />
        ))}
      </div>
      <RecommendationCard title={t(dictionary, "pricing.faq")} items={[t(dictionary, "pricing.cancellation"), t(dictionary, "billing.mock")]} />
    </div>
  );
}
