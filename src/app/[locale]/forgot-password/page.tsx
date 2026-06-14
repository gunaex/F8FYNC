import { getDictionary, resolveLocale, t } from "@/i18n";
import { AuthForm } from "@/ui/components";

export default async function ForgotPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const dictionary = getDictionary(resolveLocale(rawLocale));
  return <AuthForm mode="forgot" labels={{ email: t(dictionary, "auth.email"), password: t(dictionary, "auth.password"), displayName: t(dictionary, "auth.displayName"), submit: t(dictionary, "auth.forgotPassword"), success: t(dictionary, "auth.resetPassword"), error: t(dictionary, "common.error") }} />;
}
