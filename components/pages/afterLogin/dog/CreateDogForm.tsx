"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DogInput from "@/components/shared/inputs/DogInput";
import useCreateDog from "@/hooks/afterLogin/dogs/useCreateDog";
import { UserIcon } from "@/components/icons/user";
import { IDogCreateRequestType } from "@/types/dog/dogType";

export default function CreateDogForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateDog();
  const [error, setError] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const dogData: IDogCreateRequestType = {
      name: formData.get("name") as string,
      breed: formData.get("breed") as string,
      age: Number(formData.get("age")),
      gender: formData.get("gender") as "M" | "F",
      isNeutered: formData.get("isNeutered") === "true",
      weight: Number(formData.get("weight")),
      personality: formData.get("personality") as string,
      habits: formData.get("habits") as string,
      healthInfo: formData.get("healthInfo") as string,
      profileImageUrl: profileImage || undefined,
    };

    try {
      await mutateAsync(dogData);
      router.push("/mydogs");
    } catch (err) {
      setError("반려견 등록에 실패했습니다. 다시 시도해주세요.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-(--mt-black)">반려견 등록</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 프로필 이미지 업로드 */}
        <div className="flex flex-col items-center gap-2">
          {profileImage ? (
            <div className="relative size-30 rounded-full overflow-hidden bg-blue-300">
              <img
                src={profileImage}
                alt="반려견 프로필"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center relative size-30 rounded-full overflow-hidden bg-blue-300">
              <UserIcon className="size-16 text-(--mt-blue-point)" />
            </div>
          )}
          <button
            type="button"
            className="text-sm text-(--mt-gray)"
            onClick={() => {
              // TODO: 이미지 업로드 로직 구현
              alert("이미지 업로드 기능은 추후 구현 예정입니다.");
            }}
          >
            프로필 이미지 업로드
          </button>
        </div>

        {/* 기본 정보 */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-(--mt-black)">기본 정보</h2>

          <DogInput
            labelTxt="이름"
            id="name"
            name="name"
            type="text"
            placeholder="반려견 이름을 입력하세요"
            headIcon={<UserIcon />}
            required={true}
          />

          <DogInput
            labelTxt="견종"
            id="breed"
            name="breed"
            type="text"
            placeholder="예: 골든 리트리버, 포메라니안"
            required={true}
          />

          <div className="grid grid-cols-2 gap-3">
            <DogInput
              labelTxt="나이"
              id="age"
              name="age"
              type="number"
              placeholder="나이 (살)"
              required={true}
              min="0"
              max="30"
            />

            <DogInput
              labelTxt="체중"
              id="weight"
              name="weight"
              type="number"
              placeholder="체중 (kg)"
              required={true}
              min="0"
              step="0.1"
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
              placeholder="반려견의 성격을 입력하세요 (예: 활발하고 사람을 좋아함)"
              required
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
              placeholder="반려견의 습관이나 특징을 입력하세요 (예: 산책을 좋아하고 공놀이를 즐김)"
              required
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
              placeholder="건강 상태나 특이사항을 입력하세요 (예: 건강 상태 양호, 슬개골 탈구 있음)"
              required
              className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none"
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

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
            disabled={isPending}
            className="flex-1 py-3 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
}
