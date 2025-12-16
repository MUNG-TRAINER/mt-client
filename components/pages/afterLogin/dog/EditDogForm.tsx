"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Image from "next/image";
import DogInput from "@/components/shared/inputs/DogInput";
import useUpdateDog from "@/hooks/afterLogin/dogs/useUpdateDog";
import useDogDetail from "@/hooks/afterLogin/dogs/useDogDetail";
import { UserIcon } from "@/components/icons/user";
import { IDogUpdateRequestType } from "@/types/dog/dogType";
import { presignedUrlApi } from "@/apis/common/presignedUrl";
import { imageFileSchema } from "@/schemas/fileSchema";
import ErrorMessage from "@/components/shared/feedback/ErrorMessage";

export default function EditDogForm({ dogId }: { dogId: number }) {
  const router = useRouter();
  const { data: dogData, isPending: isLoading } = useDogDetail(dogId);
  const { mutateAsync, isPending } = useUpdateDog();
  const [error, setError] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 에러 초기화
    setFileError("");

    // Zod를 사용한 파일 검증
    const validation = imageFileSchema.safeParse(file);

    if (!validation.success) {
      const errorMessage =
        validation.error.issues[0]?.message || "파일 업로드에 실패했습니다.";
      setFileError(errorMessage);
      e.target.value = ""; // input 초기화
      return;
    }

    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      // 새로운 파일이 선택되었으면 S3에 업로드
      let uploadedImageKey: string | undefined = undefined;

      if (selectedFile) {
        setIsUploading(true);

        const presignedUrl = await presignedUrlApi.getPresignedUrl({
          category: "dog-profile",
          fileName: selectedFile.name,
          contentType: selectedFile.type,
        });

        uploadedImageKey = await presignedUrlApi.uploadToS3(
          presignedUrl,
          selectedFile
        );

        console.log("업로드된 이미지 키:", uploadedImageKey);
        setIsUploading(false);
      }

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

      // 새 이미지를 업로드했으면 profileImage 추가
      if (uploadedImageKey) {
        updateData.profileImage = uploadedImageKey;
      }

      await mutateAsync({ dogId, dogData: updateData });

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      router.push(`/mydogs/${dogId}`);
    } catch (err) {
      setIsUploading(false);
      setError("반려견 정보 수정에 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    }
  };

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
        {/* 프로필 이미지 업로드 */}
        <div className="flex flex-col items-center gap-2">
          {previewUrl ? (
            <div className="relative size-30 rounded-full overflow-hidden bg-blue-300">
              <Image
                src={previewUrl}
                alt="반려견 프로필 미리보기"
                fill
                sizes="120px"
                className="object-cover"
                unoptimized
              />
            </div>
          ) : dogData.profileImage ? (
            <div className="relative size-30 rounded-full overflow-hidden bg-blue-300">
              <Image
                src={dogData.profileImage}
                alt="반려견 프로필"
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
                backgroundColor: `hsl(${(dogId * 137.5) % 360}, 70%, 80%)`,
              }}
            >
              <UserIcon className="size-16 text-white" />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || isPending}
            className="text-sm text-(--mt-gray) disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {previewUrl ? "이미지 변경" : "이미지 선택"}
          </button>

          {/* 파일 에러 메시지 */}
          <ErrorMessage message={fileError} className="w-full text-center" />
        </div>

        {/* 기본 정보 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-(--mt-black)">기본 정보</h2>

          <DogInput
            labelTxt="이름"
            id="name"
            name="name"
            type="text"
            headIcon={<UserIcon />}
            required={true}
            defaultValue={dogData.name}
          />

          <DogInput
            labelTxt="견종"
            id="breed"
            name="breed"
            type="text"
            required={true}
            defaultValue={dogData.breed}
          />

          <div className="grid grid-cols-2 gap-3">
            <DogInput
              labelTxt="나이"
              id="age"
              name="age"
              type="number"
              required={true}
              min="0"
              max="30"
              defaultValue={dogData.age}
            />

            <DogInput
              labelTxt="체중"
              id="weight"
              name="weight"
              type="number"
              required={true}
              min="0"
              step="0.1"
              defaultValue={dogData.weight}
            />
          </div>

          {/* 성별 */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">
              성별<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  required
                  defaultChecked={dogData.gender === "M"}
                  className="size-4"
                />
                <span>남</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  required
                  defaultChecked={dogData.gender === "F"}
                  className="size-4"
                />
                <span>여</span>
              </label>
            </div>
          </div>

          {/* 중성화 여부 */}
          <div className="flex flex-col gap-2">
            <label className="font-bold">
              중성화 여부<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isNeutered"
                  value="true"
                  required
                  defaultChecked={dogData.isNeutered === true}
                  className="size-4"
                />
                <span>완료</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="isNeutered"
                  value="false"
                  required
                  defaultChecked={dogData.isNeutered === false}
                  className="size-4"
                />
                <span>미완료</span>
              </label>
            </div>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-(--mt-black)">상세 정보</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="personality" className="font-bold">
              성격<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="personality"
              name="personality"
              required
              defaultValue={dogData.personality}
              className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="habits" className="font-bold">
              습관/특징<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="habits"
              name="habits"
              required
              defaultValue={dogData.habits}
              className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="healthInfo" className="font-bold">
              건강 정보<span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="healthInfo"
              name="healthInfo"
              required
              defaultValue={dogData.healthInfo}
              className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none"
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        <ErrorMessage message={error} />

        {/* 버튼 */}
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
