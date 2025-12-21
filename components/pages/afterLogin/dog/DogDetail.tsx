"use client";

import { useState } from "react";
import { DogIcon } from "@/components/icons/dog";
import { CakeIcon } from "@/components/icons/cake";
import { MaleIcon, FemaleIcon } from "@/components/icons/gender";
import { CheckIcon } from "@/components/icons/check";
import useDogDetail from "@/hooks/afterLogin/dogs/useDogDetail";
import useDeleteDog from "@/hooks/afterLogin/dogs/useDeleteDog";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SocializationLevel } from "@/types/dog/dogType";

import ErrorMessage from "@/components/shared/feedback/ErrorMessage";
import ConfirmModal from "@/components/shared/modal/ConfirmModal";
import DogDeleteConfirm from "./DogDeleteConfirm";

/**
 * 사회화 수준을 한글로 변환하는 헬퍼 함수
 * 모든 케이스를 명시적으로 처리하여 타입 안전성 보장
 */
function getSocializationLevelText(level: SocializationLevel): string {
  switch (level) {
    case "LOW":
      return "낮음";
    case "MEDIUM":
      return "보통";
    case "HIGH":
      return "높음";
    default:
      // 예상치 못한 값에 대한 폴백
      console.error(`Unknown socialization level: ${level}`);
      return "알 수 없음";
  }
}

export default function DogDetail({ dogId }: { dogId: number }) {
  const router = useRouter();
  const { data, isPending, isError } = useDogDetail(dogId);
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
          onClick={() => router.push("/mydogs")}
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
              fill
              sizes="120px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center relative size-30 rounded-full overflow-hidden"
            style={{
              backgroundColor: `hsl(${(data.dogId * 137.5) % 360}, 70%, 80%)`,
            }}
          >
            <DogIcon className="size-16 text-white" />
          </div>
        )}
        <h2 className="font-bold text-xl">{data.name}</h2>
        <div className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-(--mt-blue) text-white font-medium">
          <CakeIcon className="size-4" />
          <span>{data.age}살</span>
        </div>
        <div className="flex items-center gap-2 w-full max-w-xs justify-between">
          <span
            className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-medium ${
              data.gender === "M"
                ? "bg-blue-100 text-blue-700"
                : "bg-pink-100 text-pink-700"
            }`}
          >
            {data.gender === "M" ? (
              <MaleIcon className="size-3.5" />
            ) : (
              <FemaleIcon className="size-3.5" />
            )}
            <span>{data.gender === "M" ? "남" : "여"}</span>
          </span>
          <span
            className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-medium ${
              data.isNeutered
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {data.isNeutered && <CheckIcon className="size-3.5" />}
            <span>{data.isNeutered ? "중성화 완료" : "중성화 미완료"}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 [&>div>span]:border [&>div>span]:border-(--mt-gray-light) [&>div>span]:p-2 [&>div>span]:rounded-md [&>div>h3]:font-bold [&>div>h3]:text-(--mt-black)">
        <div className="flex flex-col gap-2">
          <h3>견종</h3>
          <span>{data.breed}</span>

          {data.weight !== undefined && data.weight !== null && (
            <>
              <h3>체중</h3>
              <span>{data.weight}kg</span>
            </>
          )}

          <h3>사람 사회화 수준</h3>
          <span>{getSocializationLevelText(data.humanSocialization)}</span>

          <h3>동물 사회화 수준</h3>
          <span>{getSocializationLevelText(data.animalSocialization)}</span>

          {data.personality && (
            <>
              <h3>성격</h3>
              <span className="whitespace-pre-wrap">{data.personality}</span>
            </>
          )}

          {data.habits && (
            <>
              <h3>습관 및 특징</h3>
              <span className="whitespace-pre-wrap">{data.habits}</span>
            </>
          )}

          {data.healthInfo && (
            <>
              <h3>건강 정보</h3>
              <span className="whitespace-pre-wrap">{data.healthInfo}</span>
            </>
          )}
        </div>
      </div>

      {/* 삭제 에러 메시지 */}
      <ErrorMessage message={deleteError} />

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
        onClick={() => router.push("/mydogs")}
        className="border text-(--mt-gray) py-3 rounded-md font-bold"
      >
        돌아가기
      </button>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="반려견 삭제"
        message={<DogDeleteConfirm name={data?.name} />}
        confirmText="삭제"
        cancelText="취소"
        confirmButtonClass="bg-red-500 text-white"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isDeleting}
        loadingText="삭제 중..."
        requireInput={data?.name}
        inputPlaceholder={`반려견 이름 입력`}
      />
    </div>
  );
}
