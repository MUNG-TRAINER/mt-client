"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useCreateDog from "@/hooks/afterLogin/dogs/useCreateDog";
import useDogImageUpload from "@/hooks/afterLogin/dogs/useDogImageUpload";
import { IDogCreateRequestType } from "@/types/dog/dogType";
import ErrorMessage from "@/components/shared/feedback/ErrorMessage";
import DogImageUploader from "@/components/shared/dog/DogImageUploader";
import DogFormFields from "@/components/shared/dog/DogFormFields";

export default function CreateDogForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateDog();
  const [error, setError] = useState<string>("");

  const {
    previewUrl,
    fileError,
    isUploading,
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
        const uploadedImageUrl = await uploadImage();

        // 선택 필드 trim 처리
        const weight = formData.get("weight") as string;
        const personality = (formData.get("personality") as string)?.trim();
        const habits = (formData.get("habits") as string)?.trim();
        const healthInfo = (formData.get("healthInfo") as string)?.trim();

        const dogData: IDogCreateRequestType = {
          // 필수값
          name: (formData.get("name") as string) || "",
          breed: (formData.get("breed") as string) || "",
          age: Number(formData.get("age") || 0),
          gender: (formData.get("gender") as "M" | "F") || "M",
          isNeutered: formData.get("isNeutered") === "true",
          humanSocialization:
            (formData.get("humanSocialization") as "LOW" | "MEDIUM" | "HIGH") ||
            "MEDIUM",
          animalSocialization:
            (formData.get("animalSocialization") as
              | "LOW"
              | "MEDIUM"
              | "HIGH") || "MEDIUM",
          // 선택값 (값이 있을 때만 포함)
          ...(weight && { weight: Number(weight) }),
          ...(personality && { personality }),
          ...(habits && { habits }),
          ...(healthInfo && { healthInfo }),
          ...(uploadedImageUrl && { profileImage: uploadedImageUrl }),
        };

        await mutateAsync(dogData);
        cleanup();
        router.push("/mydogs");
      } catch {
        setError("반려견 등록에 실패했습니다. 다시 시도해주세요.");
      }
    },
    [uploadImage, mutateAsync, cleanup, router]
  );

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-(--mt-black)">반려견 등록</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <DogImageUploader
          previewUrl={previewUrl}
          fileInputRef={fileInputRef}
          fileError={fileError}
          isDisabled={isPending || isUploading}
          onFileSelect={handleFileSelect}
          onButtonClick={() => fileInputRef.current?.click()}
          onImageDelete={handleImageDelete}
        />

        <DogFormFields />

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
              ? "등록 중..."
              : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
