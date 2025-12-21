"use client";

import { XMarkIcon } from "@/components/icons/xMark";
import useDogDetailByApplication from "@/hooks/afterLogin/applications/useDogDetailByApplication";

interface DogDetailModalProps {
  isOpen: boolean;
  applicationId: number | null;
  onClose: () => void;
}

export const DogDetailModal = ({
  isOpen,
  applicationId,
  onClose,
}: DogDetailModalProps) => {
  const {
    data: dogDetail,
    isPending,
    isError,
  } = useDogDetailByApplication(applicationId, {
    enabled: isOpen && !!applicationId,
  });

  if (!isOpen) return null;

  // 성별 표시
  const getGenderText = (gender?: "M" | "F") => {
    if (gender === "M") return "수컷";
    if (gender === "F") return "암컷";
    return "-";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
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
            <div className="space-y-4">
              {/* 프로필 이미지 */}
              {dogDetail.profileImageUrl && (
                <div className="flex justify-center mb-4">
                  <img
                    src={dogDetail.profileImageUrl}
                    alt={dogDetail.name}
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
              )}

              {/* 기본 정보 */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">이름</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">성별</span>
                  <span className="text-sm font-medium text-gray-900">
                    {getGenderText(dogDetail.gender)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">나이</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.age}세
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">견종</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dogDetail.breed}
                  </span>
                </div>
              </div>

              {/* 보호자 정보 */}
              <div className="space-y-2 pt-3 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900">보호자 정보</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">이름</span>
                    <span className="text-sm font-medium text-gray-900">
                      {dogDetail.ownerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">연락처</span>
                    <span className="text-sm font-medium text-gray-900">
                      {dogDetail.ownerPhone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 닫기 버튼 */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
