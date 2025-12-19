"use client";

import { useState } from "react";
import { XMarkIcon } from "@/components/icons/xMark";

interface CounselingWriteModalProps {
  isOpen: boolean;
  dogName: string;
  ownerName: string;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export const CounselingWriteModal = ({
  isOpen,
  dogName,
  ownerName,
  onClose,
  onSubmit,
}: CounselingWriteModalProps) => {
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  const handleClose = () => {
    setContent("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">반려견 정보</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* 본문 */}
        <div className="p-4">
          {/* 반려견 정보 섹션 */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">이름</span>
              <span className="text-sm font-medium text-gray-900">
                {dogName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">보호자</span>
              <span className="text-sm font-medium text-gray-900">
                {ownerName}
              </span>
            </div>
          </div>

          {/* 상담 내용 작성 */}
          <div className="space-y-2">
            <label className="text-base font-bold text-gray-900">
              상담 내용 작성
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="상담 내용을 입력해주세요..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="p-4">
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
};
