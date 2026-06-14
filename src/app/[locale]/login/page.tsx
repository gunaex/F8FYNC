import { getDictionary, resolveLocale, t } from "@/i18n";
import { AuthForm } from "@/ui/components";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  return (
    <div className="dashboard-grid">
      <div className="hero-panel"><span className="hero-kicker">{t(dictionary, "auth.login")}</span><h1>{t(dictionary, "auth.login")}</h1></div>
      <AuthForm mode="login" labels={{ email: t(dictionary, "auth.email"), password: t(dictionary, "auth.password"), displayName: t(dictionary, "auth.displayName"), submit: t(dictionary, "auth.submit"), success: t(dictionary, "member.dashboard"), error: t(dictionary, "errors.authFailed") }} />
    </div>
  );
}
