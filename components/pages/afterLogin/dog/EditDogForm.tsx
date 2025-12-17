"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useUpdateDog from "@/hooks/afterLogin/dogs/useUpdateDog";
import useDogDetail from "@/hooks/afterLogin/dogs/useDogDetail";
import useDogImageUpload from "@/hooks/afterLogin/dogs/useDogImageUpload";
import { IDogUpdateRequestType } from "@/types/dog/dogType";
import ErrorMessage from "@/components/shared/feedback/ErrorMessage";
import DogImageUploader from "@/components/shared/dog/DogImageUploader";
import DogFormFields from "@/components/shared/dog/DogFormFields";

export default function EditDogForm({ dogId }: { dogId: number }) {
  const router = useRouter();
  const { data: dogData, isPending: isLoading } = useDogDetail(dogId);
  const { mutateAsync, isPending } = useUpdateDog();
  const [error, setError] = useState<string>("");

  const {
    previewUrl,
    fileError,
    isUploading,
    isDeleted,
    fileInputRef,
    handleFileSelect,
    handleImageDelete,
    uploadImage,
    cleanup,
  } = useDogImageUpload();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      const formData = new FormData(e.currentTarget);

      try {
        const uploadedImageKey = await uploadImage();

        const updateData: IDogUpdateRequestType = {};

        // 필수 필드 - 비어있지 않을 때만 추가
        const name = formData.get("name") as string;
        if (name && name.trim()) updateData.name = name;

        const breed = formData.get("breed") as string;
        if (breed && breed.trim()) updateData.breed = breed;

        const age = formData.get("age");
        if (age) updateData.age = Number(age);

        const gender = formData.get("gender") as "M" | "F";
        if (gender) updateData.gender = gender;

        const isNeutered = formData.get("isNeutered");
        if (isNeutered !== null) updateData.isNeutered = isNeutered === "true";

        const humanSocialization = formData.get("humanSocialization") as
          | "LOW"
          | "MEDIUM"
          | "HIGH";
        if (humanSocialization)
          updateData.humanSocialization = humanSocialization;

        const animalSocialization = formData.get("animalSocialization") as
          | "LOW"
          | "MEDIUM"
          | "HIGH";
        if (animalSocialization)
          updateData.animalSocialization = animalSocialization;

        // 선택 필드 - 빈 값도 전송하여 삭제 가능하도록 처리
        // weight는 숫자 타입이므로 빈 문자열("")을 보낼 수 없음
        // 따라서 clearWeight 플래그로 삭제 의사를 전달 (백엔드에서 NULL 처리)
        const weight = formData.get("weight") as string | null;
        if (weight !== null) {
          const trimmedWeight = weight.trim();
          if (trimmedWeight) {
            updateData.weight = Number(trimmedWeight);
          } else {
            updateData.clearWeight = true; // 체중 삭제 플래그
          }
        }

        // 텍스트 필드는 빈 문자열("")을 보내면 백엔드에서 NULL로 처리됨
        const personality = formData.get("personality") as string;
        if (personality !== null) {
          updateData.personality = personality.trim() || "";
        }

        const habits = formData.get("habits") as string;
        if (habits !== null) {
          updateData.habits = habits.trim() || "";
        }

        const healthInfo = formData.get("healthInfo") as string;
        if (healthInfo !== null) {
          updateData.healthInfo = healthInfo.trim() || "";
        }

        // 이미지 처리: 삭제, 업로드, 또는 유지
        if (isDeleted) {
          updateData.profileImage = ""; // 빈 문자열 전송 → 백엔드에서 NULL 처리
        } else if (uploadedImageKey) {
          updateData.profileImage = uploadedImageKey;
        }

        await mutateAsync({ dogId, dogData: updateData });
        cleanup();
        router.push(`/mydogs/${dogId}`);
      } catch {
        setError("반려견 정보 수정에 실패했습니다. 다시 시도해주세요.");
      }
    },
    [uploadImage, mutateAsync, cleanup, router, dogId, isDeleted]
  );

  if (isLoading) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!dogData) {
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
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-(--mt-black)">
          반려견 정보 수정
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <DogImageUploader
          previewUrl={previewUrl}
          existingImageUrl={dogData.profileImage}
          dogId={dogId}
          fileInputRef={fileInputRef}
          fileError={fileError}
          isDisabled={isPending || isUploading}
          isDeleted={isDeleted}
          onFileSelect={handleFileSelect}
          onButtonClick={() => fileInputRef.current?.click()}
          onImageDelete={handleImageDelete}
        />

        <DogFormFields defaultValues={dogData} />

        <ErrorMessage message={error} />

        <div className="flex gap-3 sticky bottom-0 bg-white pt-2 pb-2">
          <button
            type="button"
            onClick={() => router.push(`/mydogs/${dogId}`)}
            className="flex-1 py-3 border border-(--mt-gray-light) text-(--mt-gray) rounded-xl font-bold"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isPending || isUploading}
            className="flex-1 py-3 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading
              ? "이미지 업로드 중..."
              : isPending
              ? "수정 중..."
              : "수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
