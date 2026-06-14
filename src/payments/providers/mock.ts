import { activateMockSubscription, cancelMockSubscription } from "@/core/commercial/subscription-service";
import { createId, getMemoryStore } from "@/core/repositories/memory-store";
import type { PaymentProvider } from "./types";

export const mockPaymentProvider: PaymentProvider = {
  async createCustomer(input) {
    return { providerCustomerId: `mock_customer_${input.memberId}` };
  },
  async createCheckoutSession(input) {
    await activateMockSubscription(input.memberId, input.planCode);
    return {
      checkoutUrl: input.successUrl ?? "/",
      providerSessionId: createId("mock_checkout")
    };
  },
  async createPortalSession(input) {
    return { portalUrl: `/api/subscription?memberId=${input.memberId}` };
  },
  async cancelSubscription(input) {
    const subscription = await cancelMockSubscription(input.memberId);
    return { status: subscription.status };
  },
  async parseWebhook(request) {
    const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const event = { provider: "mock", type: String(payload.type ?? "mock.event"), memberId: typeof payload.memberId === "string" ? payload.memberId : undefined, payload };
    getMemoryStore().paymentEvents.push({ id: createId("payment_event"), ...event, createdAt: new Date().toISOString() });
    return event;
  }
};
