import Link from "next/link";
import { getDictionary, resolveLocale, t } from "@/i18n";
import { Card } from "@/ui/primitives";

export default async function BoostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = getDictionary(locale);

  const items = [
    {
      title: t(dictionary, "boost.premium.title"),
      description: t(dictionary, "boost.premium.description"),
      status: t(dictionary, "boost.available"),
      href: `/${locale}/pricing`
    },
    {
      title: t(dictionary, "boost.tarot.title"),
      description: t(dictionary, "boost.tarot.description"),
      status: t(dictionary, "boost.comingSoon")
    },
    {
      title: t(dictionary, "boost.report.title"),
      description: t(dictionary, "boost.report.description"),
      status: t(dictionary, "boost.comingSoon")
    }
  ];

  return (
    <div className="field-grid">
      <div className="hero-panel">
        <span className="hero-kicker">{t(dictionary, "nav.boost")}</span>
        <h1>{t(dictionary, "boost.title")}</h1>
        <p>{t(dictionary, "boost.subtitle")}</p>
      </div>

      <div className="score-grid">
        {items.map((item) => (
          <Card key={item.title} className="boost-card">
            <span className="badge neutral">{item.status}</span>
            <h2>{item.title}</h2>
            <p className="muted">{item.description}</p>
            {item.href ? <Link className="button" href={item.href}>{t(dictionary, "boost.viewPlans")}</Link> : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
