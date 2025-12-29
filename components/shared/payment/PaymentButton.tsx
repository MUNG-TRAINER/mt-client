"use client";
import { useState } from "react";
import { useTossPayment } from "@/hooks/payment/useTossPayment";
import { usePaymentPrepare } from "@/hooks/payment/usePaymentMutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PaymentRequestItem } from "@/types/payment";

interface PaymentButtonProps {
  paymentRequestItems: PaymentRequestItem[];
  customerName: string;
  customerEmail: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * 결제 버튼 컴포넌트
 * 클릭 시 결제 준비 API를 호출하고 토스페이먼츠 결제창을 띄웁니다.
 */
export default function PaymentButton({
  paymentRequestItems,
  customerName,
  customerEmail,
  className = "",
  children = "결제하기",
}: PaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isReady, requestPayment } = useTossPayment();
  const prepareMutation = usePaymentPrepare();
  const router = useRouter();

  const handlePayment = async () => {
    if (!isReady) {
      toast.error("결제 시스템을 준비 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      // 1. 결제 준비 - 주문 생성
      toast.loading("결제를 준비하고 있습니다...");
      const prepareResult = await prepareMutation.mutateAsync({
        paymentRequestItems, // courseIds, applicationIds
      });

      toast.dismiss();
      // 디버그: 서버 결제 준비 응답 확인
      console.log("결제 준비 결과:", prepareResult);

      const amountValue = Number(prepareResult.amount);
      // 1-1. 결제 금액이 0원일 경우 결제창 호출 없이 결제 종료 처리
      if (
        prepareResult.isCompleted ||
        (!isNaN(amountValue) && amountValue === 0)
      ) {
        toast.success("0원 결제가 완료되었습니다!");
        setTimeout(
          () =>
            router.push(
              `/payment/success?amount=${amountValue}&orderId=${prepareResult.merchantUid}`,
            ),
          1000,
        );
        return;
      }

      // 2. 토스페이먼츠 결제창 호출
      await requestPayment({
        merchantUid: prepareResult.merchantUid,
        orderName: prepareResult.orderName,
        customerName,
        customerEmail,
        amount: amountValue,
      });
    } catch (error) {
      toast.dismiss();
      console.error("결제 처리 실패:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("결제 처리 중 오류가 발생했습니다.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!isReady || isProcessing}
      className={`${className} ${
        !isReady || isProcessing
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90"
      }`}
    >
      {isProcessing ? "처리 중..." : children}
    </button>
  );
}
