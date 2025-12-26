"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { usePaymentConfirm } from "@/hooks/payment/usePaymentMutation";
import toast from "react-hot-toast";

/**
 * 결제 성공 페이지
 * 토스페이먼츠에서 리다이렉트된 후 결제 승인 API를 호출합니다.
 */
export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(true);
  const confirmMutation = usePaymentConfirm();
  // 중복 승인 방지용 ref + sessionStorage 키
  const hasConfirmedRef = useRef(false);

  useEffect(() => {
    const confirmPayment = async () => {
      if (hasConfirmedRef.current) return;

      // URL 파라미터 스냅샷 (마운트 시점 1회)
      const paymentKey = searchParams.get("paymentKey");
      const merchantUid = searchParams.get("orderId");
      const amount = searchParams.get("amount");
      const amountNumber = amount ? Number(amount) : NaN;

      // 0원 결제: 승인 API 호출 없이 즉시 성공 처리
      if (!isNaN(amountNumber) && amountNumber === 0) {
        toast.success("0원 결제가 완료되었습니다!");
        setIsConfirming(false);
        return;
      }
      // 필수 파라미터 검증
      if (!paymentKey || !merchantUid || !amount) {
        toast.error("결제 정보가 올바르지 않습니다.");
        router.push("/");
        return;
      }

      // 동일 결제 재승인 방지 (새로고침/중복 진입 대비)
      const confirmKey = `confirmed:${paymentKey}`;
      if (typeof window !== "undefined" && sessionStorage.getItem(confirmKey)) {
        setIsConfirming(false);
        setTimeout(() => router.push("/"), 1000);
        return;
      }

      hasConfirmedRef.current = true;

      try {
        await confirmMutation.mutateAsync({
          paymentKey,
          merchantUid,
          amount: Number(amount),
        });

        // 성공 처리 및 중복 방지 플래그 설정
        if (typeof window !== "undefined") {
          sessionStorage.setItem(confirmKey, "1");
        }

        toast.success("결제가 완료되었습니다!");
        setIsConfirming(false);
      } catch (error) {
        // 일부 중복/재승인 오류는 성공으로 간주 가능 (백엔드에서 이미 승인된 경우)
        const msg = error instanceof Error ? error.message : "승인 오류";
        const maybeAlreadyApproved = /이미|already|duplicate|중복/i.test(msg);

        if (maybeAlreadyApproved) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem(confirmKey, "1");
          }
          toast.success("이미 승인된 결제입니다.");
          setIsConfirming(false);
          return;
        }

        console.error("결제 승인 실패:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "결제 승인 중 오류가 발생했습니다.",
        );
        setTimeout(() => router.push("/payment/fail"), 2000);
      }
    };

    // 빈 의존성 배열: 마운트 시 1회만 시도 (StrictMode 중복은 ref로 방지)
    confirmPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full">
        {isConfirming ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              결제를 처리하고 있습니다
            </h1>
            <p className="text-gray-600">잠시만 기다려주세요...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-green-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              결제가 완료되었습니다!
            </h1>
            <p className="text-gray-600 mb-4">
              주문이 정상적으로 처리되었습니다.
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              홈으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
