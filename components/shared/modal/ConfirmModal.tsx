"use client";
import { useState, useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  loadingText?: string;
  requireInput?: string; // 입력 확인이 필요한 경우 일치해야 할 텍스트
  inputPlaceholder?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  confirmButtonClass = "bg-red-500 text-white",
  onConfirm,
  onCancel,
  isLoading = false,
  loadingText = "처리 중...",
  requireInput,
  inputPlaceholder = "입력하세요",
}: ConfirmModalProps) {
  const [inputValue, setInputValue] = useState("");
  const isConfirmDisabled = requireInput
    ? inputValue !== requireInput || isLoading
    : isLoading;

  // 모달이 열릴 때마다 입력값을 깨끗한 상태로 초기화
  useEffect(() => {
    return () => {
      setInputValue("");
    };
  }, [isOpen]);

  const handleCancel = () => {
    setInputValue("");
    onCancel();
  };

  const handleConfirm = () => {
    setInputValue("");
    onConfirm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
        <h3 className="text-lg font-bold text-(--mt-black) mb-2">{title}</h3>
        <p className="text-(--mt-gray) mb-4">{message}</p>
        {requireInput && (
          <div className="mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputPlaceholder}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-(--mt-gray-light) rounded-xl focus:outline-none focus:border-(--mt-blue-point) disabled:opacity-50 disabled:cursor-not-allowed"
              autoFocus
            />
          </div>
        )}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 py-3 border border-(--mt-gray-light) text-(--mt-gray) rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className={`flex-1 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed ${confirmButtonClass}`}
          >
            {isLoading ? loadingText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
