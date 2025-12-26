"use client";
import type {
  PaymentPrepareRequest,
  PaymentPrepareResponse,
  PaymentConfirmRequest,
  PaymentConfirmResponse,
  PaymentCancelRequest,
  PaymentCancelResponse,
} from "@/types/payment";

/**
 * 결제 준비 - 주문 생성 및 merchantUid 발급
 */
export async function preparePayment(
  data: PaymentPrepareRequest,
): Promise<PaymentPrepareResponse> {
  const response = await fetch("/api/payment/prepare", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "결제 준비 중 오류가 발생했습니다.");
  }

  return response.json();
}

/**
 * 결제 승인 - 최종 결제 완료
 */
export async function confirmPayment(
  data: PaymentConfirmRequest,
): Promise<PaymentConfirmResponse> {
  const response = await fetch("/api/payment/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "결제 승인 중 오류가 발생했습니다.");
  }

  return response.json();
}

/**
 * 결제 취소 - 환불 처리
 */
export async function cancelPayment(
  data: PaymentCancelRequest,
): Promise<PaymentCancelResponse> {
  const response = await fetch("/api/payment/cancel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "결제 취소 중 오류가 발생했습니다.");
  }

  return response.json();
}
