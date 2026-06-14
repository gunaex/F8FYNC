import { AppShell } from "@/ui/components";
import { getDictionary, resolveLocale } from "@/i18n";

export default async function LocaleLayout({
  children,
  params
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const dictionary = getDictionary(locale);
  return <AppShell locale={locale} dictionary={dictionary}>{children}</AppShell>;
}
