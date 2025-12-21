"use client";

import { useState } from "react";
import { XMarkIcon } from "@/components/icons/xMark";

interface RejectModalProps {
  isOpen: boolean;
  dogName: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const RejectModal = ({
  isOpen,
  dogName,
  onClose,
  onConfirm,
}: RejectModalProps) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason);
      setReason("");
    }
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">거절 사유</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6 space-y-4">
          {/* 안내 텍스트 */}
          <div className="text-center">
            <div className="text-base text-gray-700">
              선택한 신청을 거절하시겠습니까?
            </div>
            <div className="text-sm text-gray-500 mt-1">
              거절 사유를 입력해주세요.
            </div>
          </div>

          {/* 거절 사유 입력 */}
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="거절 사유를 입력해주세요"
            className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500 text-sm"
            autoFocus
          />
        </div>

        {/* 버튼 */}
        <div className="p-4 flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            거절하기
          </button>
        </div>
      </div>
    </div>
  );
};
