import type { IntentAuditLog } from "./types";
import { createId, getMemoryStore } from "@/core/repositories/memory-store";

export function writeIntentAudit(input: Omit<IntentAuditLog, "id" | "createdAt">) {
  const log: IntentAuditLog = {
    id: createId("intent_audit"),
    createdAt: new Date().toISOString(),
    ...input
  };
  getMemoryStore().intentAuditLogs.push(log);
  return log;
}
