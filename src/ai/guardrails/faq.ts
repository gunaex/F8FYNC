import type { SupportedLocale } from "@/core/domain";
import type { AllowedIntent } from "./types";

const answers: Record<SupportedLocale, Partial<Record<AllowedIntent, string>>> = {
  th: {
    coupon_help: "คูปอง FREE_1_WEEK ให้ Premium 7 วัน และ FREE_1_MONTH ให้ Premium 30 วัน โดยต้องเข้าสู่ระบบก่อนใช้ และหนึ่งบัญชีใช้คูปองฟรีได้หนึ่งครั้ง",
    subscription_help: "สามารถดูแพ็กเกจและสถานะสมาชิกได้ที่หน้าบัญชีหรือหน้าแพ็กเกจ"
  },
  en: {
    coupon_help: "FREE_1_WEEK grants 7 days of Premium and FREE_1_MONTH grants 30 days. You must sign in first, and one account can use one free coupon.",
    subscription_help: "You can view your plan and subscription status from the account or pricing pages."
  },
  "zh-CN": {
    coupon_help: "FREE_1_WEEK 可获得 7 天高级权限，FREE_1_MONTH 可获得 30 天。必须先登录，一个账户只能使用一次免费优惠码。",
    subscription_help: "你可以在账户或价格页面查看套餐和订阅状态。"
  }
};

export function getDeterministicFaqAnswer(locale: SupportedLocale, intent: AllowedIntent, message: string) {
  if (!/coupon|FREE_1_WEEK|FREE_1_MONTH|คูปอง|优惠码|plan|subscription|แพ็กเกจ|订阅/i.test(message)) return undefined;
  return answers[locale][intent];
}
