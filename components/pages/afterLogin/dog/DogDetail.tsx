"use client";

import { useState } from "react";
import { UserIcon } from "@/components/icons/user";
import useDogDetail from "@/hooks/afterLogin/dogs/useDogDetail";
import useDeleteDog from "@/hooks/afterLogin/dogs/useDeleteDog";
import { IDogProfileType } from "@/types/dog/dogType";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function DogDetail({ dogId }: { dogId: number }) {
  const router = useRouter();
  const {
    data,
    isPending,
    isError,
  }: {
    data: IDogProfileType | undefined;
    isPending: boolean;
    isError: boolean;
  } = useDogDetail(dogId);
  const { mutateAsync: deleteDog, isPending: isDeleting } = useDeleteDog();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState<string>("");

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteError("");
    try {
      await deleteDog(dogId);
      router.push("/mydogs");
    } catch (err) {
      setDeleteError("반려견 삭제에 실패했습니다. 다시 시도해주세요.");
      setShowDeleteConfirm(false);
      console.error(err);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (isPending) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col items-center justify-center gap-4">
        <p className="text-(--mt-gray)">반려견 정보를 불러올 수 없습니다.</p>
        <button
          onClick={() => router.back()}
          className="py-2 px-6 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold"
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-3 overflow-y-auto">
      <div className="flex flex-col items-center gap-2">
        {data.profileImage ? (
          <div className="relative size-30 rounded-full overflow-hidden">
            <Image
              src={data.profileImage}
              alt={`${data.name} 프로필 이미지`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center relative size-30 rounded-full overflow-hidden"
            style={{
              backgroundColor: `hsl(${(data.dogId * 137.5) % 360}, 70%, 80%)`,
            }}
          >
            <UserIcon className="size-16 text-white" />
          </div>
        )}
        <h2 className="font-bold text-xl">{data.name}</h2>
        <p className="text-(--mt-gray)">
          {data.breed} · {data.age}살 · {data.gender === "M" ? "수컷" : "암컷"}
        </p>
      </div>

      <div className="flex flex-col gap-3 [&>div>span]:border [&>div>span]:border-(--mt-gray-light) [&>div>span]:p-2 [&>div>span]:rounded-md [&>div>h3]:font-bold [&>div>h3]:text-(--mt-black)">
        <div className="flex flex-col gap-2">
          <h3>견종</h3>
          <span>{data.breed}</span>

          <h3>나이</h3>
          <span>{data.age}살</span>

          <h3>성별</h3>
          <span>{data.gender === "M" ? "수컷" : "암컷"}</span>

          <h3>체중</h3>
          <span>{data.weight}kg</span>

          <h3>성격</h3>
          <span className="whitespace-pre-wrap">{data.personality}</span>

          <h3>습관 및 특징</h3>
          <span className="whitespace-pre-wrap">{data.habits}</span>

          <h3>건강 정보</h3>
          <span className="whitespace-pre-wrap">{data.healthInfo}</span>
        </div>
      </div>

      {/* 삭제 에러 메시지 */}
      {deleteError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm">{deleteError}</p>
        </div>
      )}

      <div className="flex gap-2">
        <Link
          href={`/mydogs/${dogId}/edit`}
          className="flex-1 bg-(--mt-blue) text-(--mt-white) py-3 rounded-md font-bold text-center"
        >
          수정
        </Link>
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="flex-1 border border-red-500 text-red-500 py-3 rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? "삭제 중..." : "삭제"}
        </button>
      </div>

      <button
        onClick={() => router.back()}
        className="border text-(--mt-gray) py-3 rounded-md font-bold"
      >
        돌아가기
      </button>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-(--mt-black) mb-2">
              반려견 삭제
            </h3>
            <p className="text-(--mt-gray) mb-6">
              정말로{" "}
              <span className="font-bold text-(--mt-black)">{data?.name}</span>
              의 정보를 삭제하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="flex-1 py-3 border border-(--mt-gray-light) text-(--mt-gray) rounded-xl font-bold disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold disabled:opacity-50"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
