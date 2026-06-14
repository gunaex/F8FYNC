import { AnalysisWorkspace } from "./analysis-workspace";
import { getDictionary, resolveLocale } from "@/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  return <AnalysisWorkspace locale={locale} dictionary={getDictionary(locale)} />;
}
