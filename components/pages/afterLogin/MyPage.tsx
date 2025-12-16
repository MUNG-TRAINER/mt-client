"use client";
import { UserIcon } from "@/components/icons/user";
import UserBadge from "@/components/shared/badges/UserBadge";
import ToggleSlide from "@/components/shared/toggleSlide/ToggleSlide";
import useMe from "@/hooks/afterLogin/users/useMe";
import { IMyPageTypes } from "@/types/mypage/myPageType";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";

export default function MyPage() {
  const {
    data,
    isPending,
    isError,
  }: { data: IMyPageTypes | undefined; isPending: boolean; isError: boolean } =
    useMe();
  const [showDogs, setShowDogs] = useState(false);
  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-3 overflow-y-auto">
      <div className="flex flex-col items-center gap-2">
        {data?.profileImage ? (
          <div className="relative size-30 rounded-full overflow-hidden bg-blue-300">
            <Image
              src={data?.profileImage}
              fill
              alt="프로필 이미지"
              className="object-cover"
            />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center relative size-30 rounded-full overflow-hidden bg-blue-300">
              <UserIcon className="size-16 text-(--mt-blue-point)" />
            </div>
            <button className="text-sm text-(--mt-gray)">
              프로필 이미지 업로드
            </button>
          </>
        )}
        <div className="flex items-center gap-2">
          <UserBadge role={data?.role} />
          <h2 className="font-bold">{data?.userName}</h2>
        </div>
      </div>
      <div className="flex flex-col gap-3 [&>div>span]:border [&>div>span]:border-(--mt-gray-light) [&>div>span]:p-2 [&>div>span]:rounded-md [&>div>h3]:font-bold [&>div>h3]:text-(--mt-black)">
        <div className="flex flex-col gap-2">
          <h3>이름</h3>
          <span>{data?.name}</span>
          <h3>이메일</h3>
          <span>{data?.email}</span>
          <h3>연락처</h3>
          <span>{data?.phone}</span>
          {data?.role === "TRAINER" && (
            <Link
              href={`/trainer/${data.userId}`}
              className="py-2 text-center bg-(--mt-blue-point) p-2 rounded-xl text-(--mt-white) text-nowrap font-bold shadow-md"
            >
              훈련사 상세페이지
            </Link>
          )}
          <h3>나의 반려견</h3>
          <div className="border border-(--mt-gray-light) p-2 rounded-md flex flex-col gap-5">
            <Link
              href={"/mydogs"}
              className="py-2 text-center bg-(--mt-blue-point) p-2 rounded-xl text-(--mt-white) text-nowrap font-bold shadow-md"
            >
              나의 반려견 정보 보러가기
            </Link>
            <div className="flex justify-around items-center gap-10">
              <h3 className="font-bold text-(--mt-black) text-nowrap">
                반려견 프로필 공개
              </h3>
              <ToggleSlide
                toggleState={showDogs}
                toggleFn={setShowDogs}
                barWidth={60}
                barHeight={30}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 [&>h3]:font-bold [&>h4]:font-bold text-(--mt-black)">
          <h3 className="">세부 정보</h3>
          <h4>생년월일</h4>
          <span>{data?.birth}</span>
          <h4 className="font-bold text-(--mt-black)">주소</h4>
          <h5>시/도</h5>
          <span
            className={`${
              data?.sido ? "" : "bg-(--mt-gray-light) text-(--mt-gray)"
            }`}
          >
            {data?.sido ? data?.sido : "주소를 입력해주세요."}
          </span>
          <h5>시/군/구</h5>
          <span
            className={`${
              data?.sigungu ? "" : "bg-(--mt-gray-light) text-(--mt-gray)"
            }`}
          >
            {data?.sigungu ? data?.sigungu : "주소를 입력해주세요."}
          </span>
          <h5>도로명주소</h5>
          <span
            className={`${
              data?.roadname ? "" : "bg-(--mt-gray-light) text-(--mt-gray)"
            }`}
          >
            {data?.roadname ? data?.roadname : "주소를 입력해주세요."}
          </span>
          <h5>나머지주소</h5>
          <span
            className={`${
              data?.restAddress ? "" : "bg-(--mt-gray-light) text-(--mt-gray)"
            }`}
          >
            {data?.restAddress ? data?.restAddress : "주소를 입력해주세요."}
          </span>
          <h5>우편편번호</h5>
          <span
            className={`${
              data?.postcode ? "" : "bg-(--mt-gray-light) text-(--mt-gray)"
            }`}
          >
            {data?.postcode ? data?.postcode : "주소를 입력해주세요."}
          </span>
        </div>
      </div>
      <button className="bg-(--mt-blue) text-(--mt-white) py-3 rounded-md font-bold">
        수정
      </button>
      <button className="border text-(--mt-gray) py-3 rounded-md font-bold">
        비밀번호변경
      </button>
    </div>
  );
}
