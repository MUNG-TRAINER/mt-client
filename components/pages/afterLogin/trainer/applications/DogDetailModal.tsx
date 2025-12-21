"use client";

import { XMarkIcon } from "@/components/icons/xMark";
import useDogDetail from "@/hooks/afterLogin/dogs/useDogDetail";

interface DogDetailModalProps {
  isOpen: boolean;
  dogId: number;
  dogName: string;
  ownerName: string;
  onClose: () => void;
}

export const DogDetailModal = ({
  isOpen,
  dogId,
  dogName,
  ownerName,
  onClose,
}: DogDetailModalProps) => {
  const {
    data: dogDetail,
    isPending,
    isError,
  } = useDogDetail(dogId, {
    enabled: isOpen && !!dogId,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">반려견 정보</h2>
          <button
            onClick={onClose}
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
            <div className="space-y-3">
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
                  <span className="text-sm text-gray-500">중요 건강 정보</span>
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
          )}
        </div>

        {/* 닫기 버튼 */}
        {!isPending && !isError && dogDetail && (
          <div className="p-4">
            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
