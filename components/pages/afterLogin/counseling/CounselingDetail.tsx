"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import useCounselingDetail from "@/hooks/afterLogin/counseling/useCounselingDetail";
import { counselingApi } from "@/apis/counseling/counselingApi";
import { DogIcon } from "@/components/icons/dog";
import { formatDateTime } from "@/util/time/formatDate";
import RoundboxColorBtn from "@/components/shared/buttons/RoundboxColorBtn";
import AlertModal from "@/components/shared/modal/AlertModal";

interface ICounselingDetailProps {
  counselingId: number;
}

export default function CounselingDetail({
  counselingId,
}: ICounselingDetailProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: counseling,
    isPending,
    isError,
  } = useCounselingDetail(counselingId);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // 상담 취소 mutation
  const cancelMutation = useMutation({
    mutationFn: (id: number) => counselingApi.cancelCounseling(id),
    onSuccess: (data) => {
      if (data.success) {
        // 내 상담 목록과 현재 상담 상세 무효화
        queryClient.invalidateQueries({ queryKey: ["counselings", "my"] });
        queryClient.invalidateQueries({
          queryKey: ["counseling", counselingId],
        });
        setShowSuccessModal(true);
      } else {
        setShowErrorModal(true);
      }
    },
    onError: () => {
      setShowErrorModal(true);
    },
  });

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    cancelMutation.mutate(counselingId);
  };

  if (isPending) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-(--mt-gray)">로딩 중...</p>
      </div>
    );
  }

  if (isError || !counseling) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-red-500">상담 정보를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-6 overflow-y-auto">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-(--mt-black)">상담 상세</h1>
        <span
          className={`text-sm px-3 py-1.5 rounded-full font-medium ${
            counseling.isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {counseling.isCompleted ? "상담 완료" : "대기 중"}
        </span>
      </div>

      {/* 반려견 정보 카드 */}
      <div className="p-4 bg-gray-100 rounded-2xl flex items-center gap-4">
        <div className="overflow-hidden size-20 rounded-full relative flex-shrink-0">
          {counseling.dogImage && counseling.dogImage.trim() ? (
            <Image
              src={counseling.dogImage}
              alt={counseling.dogName}
              fill
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <div
              className="flex items-center justify-center size-20 rounded-full"
              style={{
                backgroundColor: `hsl(${
                  (counseling.dogId * 137.5) % 360
                }, 70%, 80%)`,
              }}
            >
              <DogIcon className="size-10 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-(--mt-black)">
            {counseling.dogName}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                counseling.gender === "M"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-pink-100 text-pink-700"
              }`}
            >
              {counseling.gender === "M" ? "남" : "여"}
            </span>
            <p className="text-sm text-(--mt-gray)">
              {counseling.age}살 · {counseling.breed}
            </p>
          </div>
        </div>
      </div>

      {/* 상담 정보 */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-medium text-(--mt-gray) mb-1">연락처</h3>
          <p className="text-base text-(--mt-black)">{counseling.phone}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-(--mt-gray) mb-1">
            신청 일시
          </h3>
          <p className="text-base text-(--mt-black)">
            {formatDateTime(counseling.createdAt)}
          </p>
        </div>

        {counseling.isCompleted && counseling.content && (
          <>
            <div>
              <h3 className="text-sm font-medium text-(--mt-gray) mb-1">
                완료 일시
              </h3>
              <p className="text-base text-(--mt-black)">
                {counseling.updatedAt && formatDateTime(counseling.updatedAt)}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-(--mt-gray) mb-2">
                상담 내용
              </h3>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-base text-(--mt-black) whitespace-pre-wrap">
                  {counseling.content}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 취소 버튼 - 대기 중일 때만 표시 */}
      {!counseling.isCompleted && !showCancelConfirm && (
        <div className="mt-auto pt-4">
          <RoundboxColorBtn
            txt="상담 취소"
            btnColor="bg-red-500"
            btnTxtColor="text-white"
            onClick={handleCancel}
          />
        </div>
      )}

      {/* 취소 확인 */}
      {showCancelConfirm && (
        <div className="mt-auto pt-4 flex flex-col gap-3">
          <p className="text-center text-(--mt-black) font-medium">
            정말로 상담을 취소하시겠습니까?
          </p>
          <div className="flex gap-3">
            <RoundboxColorBtn
              txt="돌아가기"
              btnColor="bg-gray-400"
              btnTxtColor="text-white"
              onClick={() => setShowCancelConfirm(false)}
            />
            <RoundboxColorBtn
              txt="취소하기"
              btnColor="bg-red-500"
              btnTxtColor="text-white"
              disabled={cancelMutation.isPending}
              onClick={confirmCancel}
            />
          </div>
        </div>
      )}

      {/* 성공 모달 */}
      <AlertModal
        isOpen={showSuccessModal}
        type="success"
        title="상담 취소 완료"
        message="상담이 성공적으로 취소되었습니다."
        onClose={() => {
          setShowSuccessModal(false);
          router.push("/counseling");
        }}
      />

      {/* 실패 모달 */}
      <AlertModal
        isOpen={showErrorModal}
        type="error"
        title="상담 취소 실패"
        message="상담 취소에 실패했습니다. 다시 시도해주세요."
        onClose={() => setShowErrorModal(false)}
      />
    </div>
  );
}
