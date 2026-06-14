import { getDictionary, resolveLocale, t } from "@/i18n";
import { EmptyState } from "@/ui/components";

export default async function TimelinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  return <EmptyState title={t(dictionary, "nav.timeline")} text={t(dictionary, "home.subtitle")} />;
}
