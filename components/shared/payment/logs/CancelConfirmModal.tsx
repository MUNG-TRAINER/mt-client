interface CancelConfirmModalProps {
  target: {
    orderName: string;
    amount: number;
  } | null;
  reason: string;
  onChangeReason: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export default function CancelConfirmModal({
  target,
  reason,
  onChangeReason,
  onClose,
  onConfirm,
  isPending,
}: CancelConfirmModalProps) {
  if (!target) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-bold text-(--mt-black) mb-2">
          결제 취소 확인
        </h3>
        <p className="text-sm text-(--mt-gray) mb-4">
          <span className="font-semibold">{target.orderName}</span>
          <br />
          결제 금액: {target.amount.toLocaleString()}원
        </p>
        <p className="text-sm text-red-600 mb-3">
          정말 취소하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="mb-6">
          <label className="block text-sm font-medium text-(--mt-gray) mb-2">
            취소 사유 <span className="text-red-600">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => onChangeReason(e.target.value)}
            placeholder="취소 사유를 입력해주세요"
            rows={3}
            className="w-full px-3 py-2 border border-(--mt-gray-light) rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-(--mt-blue-point) resize-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm font-semibold text-(--mt-gray) bg-(--mt-gray-light) rounded-lg hover:bg-gray-300 transition-colors"
          >
            닫기
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "취소 중..." : "취소하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
