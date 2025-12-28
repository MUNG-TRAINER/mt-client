interface CancelResultModalProps {
  result: {
    orderName: string;
    canceledAmount: number;
  } | null;
  onClose: () => void;
}

export default function CancelResultModal({
  result,
  onClose,
}: CancelResultModalProps) {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
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
          </div>
          <h3 className="text-lg font-bold text-(--mt-black) mb-2">
            결제가 취소되었습니다
          </h3>
          <p className="text-sm text-(--mt-gray) mb-2">
            <span className="font-semibold">{result.orderName}</span>
          </p>
          <p className="text-lg font-bold text-(--mt-blue-point) mb-6">
            취소 금액: {result.canceledAmount.toLocaleString()}원
          </p>
          <button
            onClick={onClose}
            className="w-full py-2 text-sm font-semibold text-white bg-(--mt-blue-point) rounded-lg hover:opacity-90 transition-opacity"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
