"use client";
import useMyDogs from "@/hooks/afterLogin/dogs/useMyDogs";
import DogProfileCard from "@/components/shared/cards/DogProfileCard";
import Link from "next/link";

export default function MyDogs() {
  const { data: dogs, isPending, isError } = useMyDogs();

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
        <p className="text-red-500">반려견 정보를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-4 overflow-y-auto">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-(--mt-black)">나의 반려견</h1>
        <Link
          href="/mydogs/create"
          className="px-4 py-2 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold shadow-md"
        >
          + 반려견 추가
        </Link>
      </div>

      {/* 반려견 리스트 */}
      {dogs && dogs.length > 0 ? (
        <div className="flex flex-col gap-3">
          {dogs.map((dog) => (
            <DogProfileCard key={dog.dogId} dog={dog} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-(--mt-gray) text-lg">등록된 반려견이 없습니다.</p>
          <Link
            href="/mydogs/create"
            className="px-6 py-3 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold shadow-md"
          >
            첫 반려견 등록하기
          </Link>
        </div>
      )}
    </div>
  );
}
