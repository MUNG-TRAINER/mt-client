"use client";
import type {
  TossClientKeyResponse,
  PaymentErrorResponse,
} from "@/types/payment";

export async function getTossClientKeyFromApi(): Promise<string> {
  const res = await fetch("/api/payment/toss-client-key", { method: "GET" });

  if (!res.ok) {
    const error: PaymentErrorResponse = await res
      .json()
      .catch(() => ({ error: "클라이언트 키를 불러올 수 없습니다." }));
    throw new Error(error.error || "클라이언트 키를 불러올 수 없습니다.");
  }

  const data: TossClientKeyResponse = await res.json();
  return data.clientKey;
}
