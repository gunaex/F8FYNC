export type CreateCustomerInput = { memberId: string; email: string };
export type CustomerResult = { providerCustomerId: string };
export type CheckoutSessionInput = { memberId: string; planCode: string; successUrl?: string; cancelUrl?: string };
export type CheckoutSessionResult = { checkoutUrl: string; providerSessionId: string };
export type PortalSessionInput = { memberId: string };
export type PortalSessionResult = { portalUrl: string };
export type CancelSubscriptionInput = { memberId: string };
export type SubscriptionProviderResult = { status: string };
export type PaymentWebhookEvent = { provider: string; type: string; memberId?: string; payload: Record<string, unknown> };

export interface PaymentProvider {
  createCustomer(input: CreateCustomerInput): Promise<CustomerResult>;
  createCheckoutSession(input: CheckoutSessionInput): Promise<CheckoutSessionResult>;
  createPortalSession(input: PortalSessionInput): Promise<PortalSessionResult>;
  cancelSubscription(input: CancelSubscriptionInput): Promise<SubscriptionProviderResult>;
  parseWebhook(request: Request): Promise<PaymentWebhookEvent>;
}
