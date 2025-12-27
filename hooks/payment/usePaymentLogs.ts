"use client";
import { useQuery } from "@tanstack/react-query";
import { getPaymentLogs } from "@/apis/payment/paymentApi";
import type { PaymentLogResponse } from "@/types/payment";

/**
 * 결제 내역 조회 훅
 */
export function usePaymentLogs() {
  return useQuery<PaymentLogResponse[], Error>({
    queryKey: ["paymentLogs"],
    queryFn: getPaymentLogs,
  });
}
