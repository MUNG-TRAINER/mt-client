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
    fileInputRef,
    handleFileSelect,
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

        const updateData: IDogUpdateRequestType = {
          name: formData.get("name") as string,
          breed: formData.get("breed") as string,
          age: Number(formData.get("age")),
          gender: formData.get("gender") as "M" | "F",
          isNeutered: formData.get("isNeutered") === "true",
          weight: Number(formData.get("weight")),
          personality: formData.get("personality") as string,
          habits: formData.get("habits") as string,
          healthInfo: formData.get("healthInfo") as string,
        };

        if (uploadedImageKey) {
          updateData.profileImage = uploadedImageKey;
        }

        await mutateAsync({ dogId, dogData: updateData });
        cleanup();
        router.push(`/mydogs/${dogId}`);
      } catch (err) {
        setError("반려견 정보 수정에 실패했습니다. 다시 시도해주세요.");
      }
    },
    [uploadImage, mutateAsync, cleanup, router, dogId]
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
          onClick={() => router.back()}
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
          onFileSelect={handleFileSelect}
          onButtonClick={() => fileInputRef.current?.click()}
        />

        <DogFormFields defaultValues={dogData} />

        <ErrorMessage message={error} />

        <div className="flex gap-3 sticky bottom-0 bg-white pt-2 pb-2">
          <button
            type="button"
            onClick={() => router.back()}
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
