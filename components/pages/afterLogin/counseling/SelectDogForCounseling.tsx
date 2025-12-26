"use client";
import useMyDogs from "@/hooks/afterLogin/dogs/useMyDogs";
import Image from "next/image";
import Link from "next/link";
import {DogIcon} from "@/components/icons/dog";
import {ChevronRightIcon} from "@/components/icons/chevron";

export default function SelectDogForCounseling() {
  const {data: dogs, isPending, isError} = useMyDogs();

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
        <p className="text-red-500">반려견 목록을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-4 overflow-y-auto">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-(--mt-black)">상담 신청</h1>
        <p className="text-sm text-(--mt-gray) mt-2">
          상담을 신청할 반려견을 선택해주세요
        </p>
      </div>

      {/* 반려견 리스트 */}
      {dogs && dogs.length > 0 ? (
        <div className="flex flex-col gap-3">
          {dogs.map((dog) => (
            <Link key={dog.dogId} href={`/counseling/create/${dog.dogId}`}>
              <article className="p-4 bg-gray-100 rounded-2xl flex items-center gap-3 hover:bg-gray-200 transition-colors cursor-pointer">
                {/* 프로필 이미지 */}
                <div className="overflow-hidden size-16 rounded-full relative shrink-0">
                  {dog.profileImage && dog.profileImage.trim() ? (
                    <Image
                      src={dog.profileImage}
                      alt={dog.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center size-16 rounded-full"
                      style={{
                        backgroundColor: `hsl(${
                          (dog.dogId * 137.5) % 360
                        }, 70%, 80%)`,
                      }}
                    >
                      <DogIcon className="size-8 text-white" />
                    </div>
                  )}
                </div>

                {/* 기본 정보 */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-(--mt-black)">
                    {dog.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        dog.gender === "M"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {dog.gender === "M" ? "남" : "여"}
                    </span>
                    <p className="text-sm text-(--mt-gray)">
                      {dog.age}살 · {dog.breed}
                    </p>
                  </div>
                </div>

                {/* 화살표 아이콘 */}
                <ChevronRightIcon className="size-6 text-(--mt-gray) shrink-0" />
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-(--mt-gray) text-lg">등록된 반려견이 없습니다.</p>
          <Link
            href="/mydogs/create"
            className="px-6 py-3 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold shadow-md"
          >
            반려견 등록하기
          </Link>
        </div>
      )}
    </div>
  );
}
