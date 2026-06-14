import { getDictionary, resolveLocale, t } from "@/i18n";
import { EmptyState } from "@/ui/components";

export default async function ResultPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = getDictionary(locale);
  return (
    <EmptyState
      title={t(dictionary, "result.headline")}
      text={`${t(dictionary, "home.subtitle")} `}
    />
  );
}
