"use client";
import { useState } from "react";
import { usePaymentLogs } from "@/hooks/payment/usePaymentLogs";
import { usePaymentCancel } from "@/hooks/payment/usePaymentMutation";
import LoadingState from "@/components/shared/payment/logs/LoadingState";
import ErrorState from "@/components/shared/payment/logs/ErrorState";
import PaymentLogsList from "@/components/shared/payment/logs/PaymentLogsList";
import CancelConfirmModal from "@/components/shared/payment/logs/CancelConfirmModal";
import CancelResultModal from "@/components/shared/payment/logs/CancelResultModal";
import type {
  PaymentLogResponse,
  PaymentCancelResponse,
} from "@/types/payment";
import toast from "react-hot-toast";

/**
 * 결제 내역 페이지
 * 사용자의 결제 내역을 조회하여 표시합니다.
 */
export default function PaymentLogsPage() {
  const { data: logs, isLoading, error, refetch } = usePaymentLogs();
  const cancelMutation = usePaymentCancel();
  const [cancelTarget, setCancelTarget] = useState<{
    paymentKey: string;
    orderName: string;
    amount: number;
  } | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelResult, setCancelResult] = useState<{
    orderName: string;
    canceledAmount: number;
  } | null>(null);

  const handleCancelClick = (log: PaymentLogResponse) => {
    setCancelTarget({
      paymentKey: log.paymentKey,
      orderName: log.orderName,
      amount: log.amount,
    });
    setCancelReason("");
  };

  const handleCancelConfirm = async () => {
    if (!cancelTarget) return;

    if (!cancelReason || cancelReason.trim() === "") {
      toast.error("취소 사유를 입력해주세요.");
      return;
    }

    try {
      const response: PaymentCancelResponse = await cancelMutation.mutateAsync({
        paymentKey: cancelTarget.paymentKey,
        cancelReason: cancelReason.trim(),
        cancelAmount: cancelTarget.amount,
      });
      setCancelResult({
        orderName: cancelTarget.orderName,
        canceledAmount:
          response.canceledAmount ??
          response.cancelAmount ??
          cancelTarget.amount,
      });
      setCancelTarget(null);
      setCancelReason("");
      refetch();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "결제 취소에 실패했습니다.",
      );
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="h-full overflow-hidden w-full">
      <div className="relative w-full max-w-4xl mx-auto h-full">
        <div className="bg-(--mt-white) rounded-lg border border-(--mt-gray-light) shadow-sm h-full overflow-hidden">
          <div className="sticky top-0 z-10 bg-(--mt-white) px-4 pt-4 pb-3 border-b border-(--mt-gray-light)">
            <p className="text-sm text-(--mt-gray)">결제 이력</p>
            <h1 className="text-xl font-bold text-(--mt-black)">결제 내역</h1>
          </div>

          <div className="h-[calc(100%-64px)] overflow-y-auto px-4 pb-4">
            <PaymentLogsList
              logs={logs || []}
              formatDate={formatDate}
              onCancel={handleCancelClick}
            />
          </div>
        </div>
      </div>

      <CancelConfirmModal
        target={cancelTarget}
        reason={cancelReason}
        onChangeReason={setCancelReason}
        onClose={() => {
          setCancelTarget(null);
          setCancelReason("");
        }}
        onConfirm={handleCancelConfirm}
        isPending={cancelMutation.isPending}
      />

      <CancelResultModal
        result={cancelResult}
        onClose={() => setCancelResult(null)}
      />
    </div>
  );
}
