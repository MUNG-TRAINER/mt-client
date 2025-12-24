"use client";
import useMyCounselings from "@/hooks/afterLogin/counseling/useMyCounselings";
import CounselingCard from "@/components/shared/cards/CounselingCard";
import Link from "next/link";

export default function MyCounselings() {
  const { data: counselings, isPending, isError } = useMyCounselings();

  if (isPending) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-(--mt-gray)">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-red-500">상담 목록을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-4 overflow-y-auto">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-(--mt-black)">나의 상담</h1>
        <Link
          href="/counseling/select-dog"
          className="px-4 py-2 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold shadow-md"
        >
          + 상담 신청
        </Link>
      </div>

      {/* 상담 리스트 */}
      {counselings && counselings.length > 0 ? (
        <div className="flex flex-col gap-3">
          {counselings.map((counseling) => (
            <CounselingCard
              key={counseling.counselingId}
              counseling={counseling}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-(--mt-gray) text-lg">신청한 상담이 없습니다.</p>
          <Link
            href="/counseling/select-dog"
            className="px-6 py-3 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold shadow-md"
          >
            첫 상담 신청하기
          </Link>
        </div>
      )}
    </div>
  );
}
