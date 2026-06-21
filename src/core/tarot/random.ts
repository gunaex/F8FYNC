import { createHash, randomBytes } from "node:crypto";
import type { TarotRandomSource } from "./types";

export function createSecureTarotRandomSource(): TarotRandomSource {
  return {
    providerId: "node_crypto_random_bytes",
    bytes: (length) => randomBytes(length)
  };
}

export function createDeterministicTarotRandomSource(seed: string): TarotRandomSource {
  let counter = 0;
  return {
    providerId: "deterministic_test_sha256",
    bytes(length) {
      const output = new Uint8Array(length);
      let offset = 0;
      while (offset < length) {
        const block = createHash("sha256").update(`${seed}:${counter}`).digest();
        counter += 1;
        const slice = block.subarray(0, Math.min(block.length, length - offset));
        output.set(slice, offset);
        offset += slice.length;
      }
      return output;
    }
  };
}

export function sha256Hex(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
