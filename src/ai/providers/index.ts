import { applicationConfig } from "@/config";
import { mockAIProvider } from "./mock";

export function getAIProvider() {
  switch (applicationConfig.aiProvider) {
    case "mock":
    default:
      return mockAIProvider;
  }
}
