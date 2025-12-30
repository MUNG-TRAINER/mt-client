"use client";

import {useState, useEffect} from "react";
import {XMarkIcon} from "@/components/icons/xMark";
import useDogDetail from "@/hooks/afterLogin/dogs/useDogDetail";

interface CounselingWriteModalProps {
  isOpen: boolean;
  dogId: number;
  dogName: string;
  ownerName: string;
  content?: string | null;
  onClose: () => void;
  onSubmit: (content: string) => Promise<void>;
}

export const CounselingWriteModal = ({
  isOpen,
  dogId,
  dogName,
  ownerName,
  content: initialContent,
  onClose,
  onSubmit,
}: CounselingWriteModalProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    data: dogDetail,
    isPending,
    isError,
  } = useDogDetail(dogId, {
    enabled: isOpen && !!dogId,
  });

  // 초기값 설정 (작성 또는 수정)
  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    } else {
      setContent("");
    }
  }, [initialContent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (content.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSubmit(content);
      } catch (error) {
        // 에러는 부모 컴포넌트에서 처리
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setContent("");
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
          {isPending ? (
            <div className="flex justify-center py-8">
              <div className="text-sm text-gray-500">로딩 중...</div>
            </div>
          ) : isError || !dogDetail ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-2">
              <div className="text-sm text-red-500">
                반려견 정보를 불러올 수 없습니다.
              </div>
              <div className="text-xs text-gray-400">
                잠시 후 다시 시도해주세요.
              </div>
            </div>
          ) : (
            <>
              {/* 반려견 정보 섹션 */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">이름</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.name || dogName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">성별</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.gender === "M"
                      ? "수컷"
                      : dogDetail.gender === "F"
                        ? "암컷"
                        : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">나이</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.age ? `${dogDetail.age}세` : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">견종</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.breed || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">중성화 여부</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.isNeutered !== undefined
                      ? dogDetail.isNeutered
                        ? "O"
                        : "X"
                      : "-"}
                  </span>
                </div>
                {dogDetail.weight && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">몸무게</span>
                    <span className="text-sm font-medium text-gray-900">
                      {dogDetail.weight}kg
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">사람 사회화</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.humanSocialization === "HIGH"
                      ? "높음"
                      : dogDetail.humanSocialization === "MEDIUM"
                        ? "보통"
                        : dogDetail.humanSocialization === "LOW"
                          ? "낮음"
                          : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">동물 사회화</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.animalSocialization === "HIGH"
                      ? "높음"
                      : dogDetail.animalSocialization === "MEDIUM"
                        ? "보통"
                        : dogDetail.animalSocialization === "LOW"
                          ? "낮음"
                          : "-"}
                  </span>
                </div>
                {dogDetail.healthInfo && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      중요 건강 정보
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {dogDetail.healthInfo}
                    </span>
                  </div>
                )}
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
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="상담 내용을 입력해주세요..."
                  defaultValue={""}
                  className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </>
          )}
        </div>

        {/* 버튼 */}
        {!isPending && !isError && dogDetail && (
          <div className="p-4">
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting
                ? "저장 중..."
                : initialContent
                  ? "수정 완료"
                  : "작성 완료"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
