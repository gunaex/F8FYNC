import { mockPaymentProvider } from "./providers/mock";

export function getPaymentProvider() {
  return mockPaymentProvider;
}

export * from "./providers/types";
