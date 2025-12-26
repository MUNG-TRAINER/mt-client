"use client";
import { useEffect, useRef, useState } from "react";
import {
  ANONYMOUS,
  loadTossPayments,
  type TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import type { TossPaymentWidgetOptions } from "@/types/payment";
import { getTossClientKeyFromApi } from "@/apis/payment/tossClientKeyApi";

// API를 통해 클라이언트 키를 가져옵니다

// SDK가 제공하는 결제 객체 타입
type TossPaymentsInstance = TossPaymentsPayment;

/**
 * 토스페이먼츠 결제 위젯을 사용하기 위한 커스텀 훅
 * 스크립트 태그로 로드된 토스페이먼츠 SDK를 사용합니다.
 */
export function useTossPayment() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const paymentRef = useRef<TossPaymentsInstance | null>(null);

  useEffect(() => {
    let mounted = true;

    const initialize = async (retries = 0) => {
      try {
        const clientKey = await getTossClientKeyFromApi();
        if (!clientKey) {
          throw new Error(
            "TOSS_CLIENT_KEY가 설정되지 않았습니다. 서버 환경 변수를 확인하세요.",
          );
        }

        // SDK 패키지로 직접 로드 후 결제 객체 생성
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({ customerKey: ANONYMOUS });

        if (!payment || typeof payment.requestPayment !== "function") {
          throw new Error("TossPayments SDK 로드 실패: requestPayment 없음");
        }

        if (!mounted) return;

        paymentRef.current = payment;
        setIsReady(true);
        setError(null);
      } catch (err) {
        console.error("토스페이먼츠 초기화 실패:", err);
        if (retries < 3) {
          setTimeout(() => initialize(retries + 1), 500);
        } else {
          setError(
            err instanceof Error
              ? err.message
              : "토스페이먼츠 초기화 중 오류가 발생했습니다.",
          );
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  /**
   * 결제 요청 실행
   */
  const requestPayment = async (options: TossPaymentWidgetOptions) => {
    if (!paymentRef.current) {
      throw new Error("토스페이먼츠가 초기화되지 않았습니다.");
    }

    try {
      await paymentRef.current.requestPayment({
        method: "CARD",
        amount: {
          currency: "KRW",
          value: options.amount,
        },
        orderId: options.merchantUid,
        orderName: options.orderName,
        customerEmail: options.customerEmail,
        customerName: options.customerName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error("결제 요청 실패:", error);
      throw error;
    }
  };

  return {
    isReady,
    error,
    requestPayment,
  };
}
