"use client";
import { useMutation } from "@tanstack/react-query";
import {
  preparePayment,
  confirmPayment,
  cancelPayment,
} from "@/apis/payment/paymentApi";
import type {
  PaymentPrepareRequest,
  PaymentConfirmRequest,
  PaymentCancelRequest,
} from "@/types/payment";

/**
 * 결제 준비 mutation hook
 */
export function usePaymentPrepare() {
  return useMutation({
    mutationFn: (data: PaymentPrepareRequest) => preparePayment(data),
    onError: (error: Error) => {
      console.error("결제 준비 실패:", error);
    },
  });
}

/**
 * 결제 승인 mutation hook
 */
export function usePaymentConfirm() {
  return useMutation({
    mutationFn: (data: PaymentConfirmRequest) => confirmPayment(data),
    retry: false,
    onError: (error: Error) => {
      console.error("결제 승인 실패:", error);
    },
  });
}

/**
 * 결제 취소 mutation hook
 */
export function usePaymentCancel() {
  return useMutation({
    mutationFn: (data: PaymentCancelRequest) => cancelPayment(data),
    onError: (error: Error) => {
      console.error("결제 취소 실패:", error);
    },
  });
}
