import { getDictionary, resolveLocale, t } from "@/i18n";
import { EmptyState } from "@/ui/components";

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  return <EmptyState title={t(dictionary, "nav.compare")} text={t(dictionary, "form.analysis.comparison")} />;
}
