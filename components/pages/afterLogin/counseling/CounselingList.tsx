"use client";

import { CounselingDog } from "@/types/counseling/counselingType";
import { CounselingListItem } from "./CounselingListItem";

interface CounselingListProps {
  dogs: CounselingDog[];
  isLoading: boolean;
  isEmpty: boolean;
  onViewDetail: (counselingId: number) => void;
}

export const CounselingList = ({
  dogs,
  isLoading,
  isEmpty,
  onViewDetail,
}: CounselingListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <p className="text-lg">상담 내역이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {dogs.map((dog) => (
        <CounselingListItem
          key={dog.counselingId}
          dog={dog}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};
