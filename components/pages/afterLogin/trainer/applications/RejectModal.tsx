"use client";

import { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@/components/icons/xMark";

interface RejectModalProps {
  isOpen: boolean;
  dogName: string;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const RejectModal = ({
  isOpen,
  onClose,
  onConfirm,
}: RejectModalProps) => {
  const [reason, setReason] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // 포커스 관리 및 포커스 트랩
  useEffect(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 textarea에 포커스
    textareaRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape 키로 모달 닫기
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      // Tab 키로 포커스 트랩
      if (e.key === "Tab") {
        if (!modalRef.current) return;

        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: 역방향
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: 정방향
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-sm shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-modal-title"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2
            id="reject-modal-title"
            className="text-lg font-bold text-gray-900"
          >
            거절 사유
          </h2>
          <button
            onClick={handleClose}
            aria-label="모달 닫기"
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
            ref={textareaRef}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="거절 사유를 입력해주세요"
            aria-label="거절 사유 입력"
            className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* 버튼 */}
        <div className="p-4 flex gap-3">
          <button
            onClick={handleClose}
            aria-label="취소"
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
