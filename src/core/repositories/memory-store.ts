import type {
  AnalysisHistoryRecord,
  ConsentRecord,
  ManagedBirthProfile,
  Member,
  MemberSubscription,
  PaymentEvent,
  CouponRedemption,
  UsageEvent
} from "@/core/commercial";
import type { IntentAuditLog } from "@/ai/guardrails";

export type MemoryStore = {
  members: Member[];
  passwords: Record<string, string>;
  birthProfiles: ManagedBirthProfile[];
  subscriptions: MemberSubscription[];
  usageEvents: UsageEvent[];
  history: AnalysisHistoryRecord[];
  consents: ConsentRecord[];
  paymentEvents: PaymentEvent[];
  couponRedemptions: CouponRedemption[];
  couponIdempotency: Record<string, CouponRedemption>;
  locks: Record<string, Promise<void>>;
  intentAuditLogs: IntentAuditLog[];
};

declare global {
  var f8syncMemoryStore: MemoryStore | undefined;
}

export function getMemoryStore(): MemoryStore {
  if (!globalThis.f8syncMemoryStore) {
    globalThis.f8syncMemoryStore = {
      members: [],
      passwords: {},
      birthProfiles: [],
      subscriptions: [],
      usageEvents: [],
      history: [],
      consents: [],
      paymentEvents: []
      ,
      couponRedemptions: [],
      couponIdempotency: {},
      locks: {},
      intentAuditLogs: []
    };
  }
  return globalThis.f8syncMemoryStore;
}

export function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function periodKey(limitType: "per_day" | "per_month" | "total" | "none" | "concurrent") {
  const date = new Date();
  if (limitType === "per_month") return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
  if (limitType === "per_day") return date.toISOString().slice(0, 10);
  return "all";
}

export async function withMemberLock<T>(memberId: string, work: () => Promise<T>): Promise<T> {
  const store = getMemoryStore();
  const previous = store.locks[memberId] ?? Promise.resolve();
  let release: () => void = () => undefined;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });
  store.locks[memberId] = previous.then(() => current);
  await previous;
  try {
    return await work();
  } finally {
    release();
    if (store.locks[memberId] === current) {
      delete store.locks[memberId];
    }
  }
}
