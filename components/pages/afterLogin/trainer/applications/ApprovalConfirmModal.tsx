"use client";

import { useEffect } from "react";

interface ApprovalConfirmModalProps {
  isOpen: boolean;
  count: number;
  onClose: () => void;
  onConfirm: () => void;
}

export const ApprovalConfirmModal = ({
  isOpen,
  count,
  onClose,
  onConfirm,
}: ApprovalConfirmModalProps) => {
  // 모달 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="approval-confirm-modal-title"
        className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6"
      >
        <div className="text-center space-y-6">
          <div
            id="approval-confirm-modal-title"
            className="text-lg font-bold text-gray-900"
          >
            승인을 하시겠습니까?
          </div>
          {count > 1 && (
            <div className="text-sm text-gray-500">
              선택한 {count}건의 신청을 승인합니다.
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              aria-label="취소"
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              아니오
            </button>
            <button
              onClick={onConfirm}
              aria-label="승인 확인"
              className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              네
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
