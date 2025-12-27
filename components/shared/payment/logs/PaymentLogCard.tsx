import StatusBadge from "./StatusBadge";
import type { PaymentLogResponse } from "@/types/payment";

interface PaymentLogCardProps {
  log: PaymentLogResponse;
  formatDate: (dateString: string) => string;
  onCancel?: (log: PaymentLogResponse) => void;
}

export default function PaymentLogCard({
  log,
  formatDate,
  onCancel,
}: PaymentLogCardProps) {
  return (
    <div className="border border-(--mt-gray-light) rounded-lg p-4 hover:shadow-md hover:border-(--mt-blue-point) transition-all duration-200 bg-white">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-(--mt-black) line-clamp-2 mb-1">
            {log.orderName}
          </h3>
          <p className="text-xs text-(--mt-gray)">
            {formatDate(log.paymentDate)}
          </p>
        </div>
        <StatusBadge status={log.status} />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-(--mt-gray-light)">
        <span className="text-sm font-medium text-(--mt-gray)">결제 금액</span>
        <p className="text-xl font-bold text-(--mt-blue-point)">
          {log.amount.toLocaleString()}원
        </p>
      </div>
      {onCancel && log.status === "SUCCESS" && log.amount > 0 && (
        <button
          onClick={() => onCancel(log)}
          className="mt-3 w-full py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          결제 취소
        </button>
      )}
    </div>
  );
}
