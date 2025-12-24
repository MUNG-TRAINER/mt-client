"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import useDogForCounseling from "@/hooks/afterLogin/counseling/useDogForCounseling";
import { counselingApi } from "@/apis/counseling/counselingApi";
import { DogIcon } from "@/components/icons/dog";
import { InformationCircleIcon } from "@/components/icons/info";
import RoundboxColorBtn from "@/components/shared/buttons/RoundboxColorBtn";
import AlertModal from "@/components/shared/modal/AlertModal";

interface ICreateCounselingFormProps {
  dogId: number;
}

export default function CreateCounselingForm({
  dogId,
}: ICreateCounselingFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: dog, isPending, isError } = useDogForCounseling(dogId);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // 상담 신청 mutation
  const createMutation = useMutation({
    mutationFn: counselingApi.createCounseling,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["counselings"] });
      setShowSuccessModal(true);
    },
    onError: () => {
      setShowErrorModal(true);
    },
  });

  // 전화번호 형식 검증
  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
    return phoneRegex.test(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);

    if (value && !validatePhone(value)) {
      setPhoneError("올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)");
    } else {
      setPhoneError("");
    }
  };

  // 버튼 활성화 여부 판단
  const isFormValid = phone.trim() !== "" && validatePhone(phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      setPhoneError("연락처를 입력해주세요.");
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError("올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)");
      return;
    }

    createMutation.mutate({
      dogId,
      phone,
    });
  };

  if (isPending) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-(--mt-gray)">로딩 중...</p>
      </div>
    );
  }

  if (isError || !dog) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-red-500">반려견 정보를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 이미 상담 신청이 있는 경우
  if (dog.alreadyRequested) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col items-center justify-center gap-4">
        <p className="text-(--mt-black) text-lg font-medium">
          이미 {dog.dogName}에 대한 상담이 신청되어 있습니다.
        </p>
        <button
          onClick={() => router.push(`/counseling/${dog.counselingId}`)}
          className="px-6 py-3 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold shadow-md"
        >
          상담 내역 보기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-6 overflow-y-auto">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-(--mt-black)">상담 신청</h1>
        <p className="text-sm text-(--mt-gray) mt-2">
          반려견 정보를 확인하고 연락처를 입력해주세요
        </p>
      </div>

      {/* 반려견 정보 카드 */}
      <div className="p-4 bg-gray-100 rounded-2xl flex items-center gap-4">
        <div className="overflow-hidden size-20 rounded-full relative flex-shrink-0">
          {dog.profileImage && dog.profileImage.trim() ? (
            <Image
              src={dog.profileImage}
              alt={dog.dogName}
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          ) : (
            <div
              className="flex items-center justify-center size-20 rounded-full"
              style={{
                backgroundColor: `hsl(${(dog.dogId * 137.5) % 360}, 70%, 80%)`,
              }}
            >
              <DogIcon className="size-10 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-(--mt-black)">{dog.dogName}</h2>
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
      </div>

      {/* 상담 신청 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-(--mt-black) mb-2"
          >
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="010-1234-5678"
            className={`w-full px-4 py-3 rounded-xl border ${
              phoneError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-(--mt-blue-point)"
            } focus:outline-none focus:ring-2`}
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
          <p className="text-(--mt-gray) text-xs mt-2">
            하이픈(-)을 포함하여 입력해주세요
          </p>
        </div>

        {/* 안내 메시지 */}
        <div className="p-4 bg-blue-50 rounded-xl flex items-start gap-3">
          <InformationCircleIcon className="size-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-(--mt-black)">
            상담 신청 후 훈련사가 상담을 완료하면 알림을 받으실 수 있습니다.
          </p>
        </div>

        {/* 신청 버튼 */}
        <div className="mt-auto pt-4">
          <RoundboxColorBtn
            txt="상담 신청하기"
            btnColor="bg-(--mt-blue-point)"
            btnTxtColor="text-(--mt-white)"
            states={createMutation.isPending || !isFormValid}
            type="submit"
          />
        </div>
      </form>

      {/* 성공 모달 */}
      <AlertModal
        isOpen={showSuccessModal}
        type="success"
        title="상담 신청 완료"
        message="상담이 성공적으로 신청되었습니다."
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/counseling");
        }}
      />

      {/* 실패 모달 */}
      <AlertModal
        isOpen={showErrorModal}
        type="error"
        title="상담 신청 실패"
        message="상담 신청에 실패했습니다. 다시 시도해주세요."
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
}
