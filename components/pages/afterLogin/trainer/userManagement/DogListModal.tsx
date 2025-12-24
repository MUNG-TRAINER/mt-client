"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { trainerUserApi } from "@/apis/trainer/trainerUserApi";
import { ITrainerUserListResponse } from "@/types/trainer/trainerUserType";
import { DogIcon } from "@/components/icons/dog";
import { ChevronRightIcon } from "@/components/icons/chevron";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getBackgroundColorStyle } from "@/util/color/generateColorFromId";

interface IDogListModalProps {
  user: ITrainerUserListResponse;
  onClose: () => void;
}

export default function DogListModal({ user, onClose }: IDogListModalProps) {
  const router = useRouter();

  const {
    data: dogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userDogs", user.userId],
    queryFn: () => trainerUserApi.getUserDogs(user.userId),
    enabled: !!user.userId,
  });

  // Escape 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleDogClick = (dogId: number) => {
    onClose();
    router.push(`/trainer/user-management/dog/${dogId}`);
  };

  const isMaleGender = (gender: string) => {
    const normalized = gender.toUpperCase();
    return normalized === "M" || normalized === "MALE";
  };
  const getGenderBadgeColor = (gender: string) => {
    if (isMaleGender(gender)) {
      return "bg-blue-100 text-blue-700";
    }
    return "bg-pink-100 text-pink-700";
  };
  const getGenderLabel = (gender: string) => {
    return isMaleGender(gender) ? "남" : "여";
  };

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dog-list-modal-title"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-lg w-full mx-4 max-h-[80vh] flex flex-col shadow-xl">
        {/* 헤더 */}
        <div className="p-6 border-b border-(--mt-gray-light)">
          <h2
            id="dog-list-modal-title"
            className="text-xl font-bold text-(--mt-black)"
          >
            반려견 리스트
          </h2>
          <p className="text-sm text-(--mt-gray) mt-1">{user.name}</p>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && (
            <div
              className="flex items-center justify-center py-12"
              role="status"
              aria-live="polite"
            >
              <p className="text-(--mt-gray)">로딩 중...</p>
            </div>
          )}

          {error && (
            <div
              className="flex items-center justify-center py-12"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-red-500">오류가 발생했습니다.</p>
            </div>
          )}

          {!isLoading && !error && dogs.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-12"
              role="status"
            >
              <DogIcon
                className="size-16 text-(--mt-gray-light) mb-4"
                aria-hidden="true"
              />
              <p className="text-(--mt-gray)">등록된 반려견이 없습니다.</p>
            </div>
          )}

          {!isLoading && !error && dogs.length > 0 && (
            <div className="space-y-3" role="list" aria-label="반려견 목록">
              {dogs.map((dog) => (
                <button
                  key={dog.dogId}
                  onClick={() => handleDogClick(dog.dogId)}
                  className="w-full p-4 bg-gray-100 rounded-2xl flex items-center gap-3 hover:bg-gray-200 transition-colors"
                  aria-label={`${dog.name}, ${getGenderLabel(dog.gender)}, ${
                    dog.age
                  }살, ${dog.breed} 상세정보 보기`}
                >
                  {/* 프로필 이미지 */}
                  <div className="overflow-hidden size-16 rounded-full relative flex-shrink-0">
                    {dog.profileImage && dog.profileImage.trim() ? (
                      <Image
                        src={dog.profileImage}
                        alt={dog.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div
                        className="flex items-center justify-center size-16 rounded-full"
                        style={getBackgroundColorStyle(dog.dogId)}
                        aria-hidden="true"
                      >
                        <DogIcon className="size-8 text-white" />
                      </div>
                    )}
                  </div>

                  {/* 반려견 정보 */}
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-(--mt-black)">
                      {dog.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${getGenderBadgeColor(
                          dog.gender
                        )}`}
                      >
                        {getGenderLabel(dog.gender)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {dog.age}살 · {dog.breed}
                      </span>
                    </div>
                  </div>

                  {/* 화살표 */}
                  <ChevronRightIcon
                    className="size-5 text-gray-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="p-6 border-t border-(--mt-gray-light)">
          <button
            onClick={onClose}
            className="w-full py-3 bg-(--mt-gray-light) text-(--mt-black) rounded-xl font-bold hover:bg-gray-300 transition-colors"
            aria-label="반려견 리스트 모달 닫기"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
