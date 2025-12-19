"use client";

import { CounselingDog } from "@/types/counseling/counselingType";
import Image from "next/image";
import { DogIcon } from "@/components/icons/dog";

interface CounselingListItemProps {
  dog: CounselingDog;
  onViewDetail: (counselingId: number) => void;
}

export const CounselingListItem = ({
  dog,
  onViewDetail,
}: CounselingListItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
      {/* 왼쪽: 프로필 이미지 + 정보 */}
      <div className="flex items-center gap-3">
        {/* 강아지 프로필 이미지 */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
          {dog.dogImage && dog.dogImage.trim() ? (
            <Image
              src={dog.dogImage}
              alt={dog.dogName}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <div
              className="flex items-center justify-center w-14 h-14 rounded-full"
              style={{
                backgroundColor: `hsl(${
                  (dog.counselingId * 137.5) % 360
                }, 70%, 80%)`,
              }}
            >
              <DogIcon className="w-7 h-7 text-white" />
            </div>
          )}
        </div>

        {/* 강아지 이름 + 보호자 이름 */}
        <div className="flex flex-col">
          <p className="font-bold text-gray-900">{dog.dogName}</p>
          <p className="text-sm text-gray-500">보호자: {dog.ownerName}</p>
        </div>
      </div>

      {/* 오른쪽: 버튼 */}
      <button
        onClick={() => onViewDetail(dog.counselingId)}
        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        상담 내용 작성
      </button>
    </div>
  );
};
