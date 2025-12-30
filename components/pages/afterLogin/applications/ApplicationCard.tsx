"use client";

import React from "react";
import { ApplicationType } from "@/types/applications/applicationsType";
import CardList from "../../../shared/cards/CourseCard";
import Image from "next/image";
import { useApplicationState } from "@/stores/applicationsState";
import { useRouter } from "next/navigation";
import DogImage from "@/public/images/application/dog.jpg";
interface Props {
  app: ApplicationType;
  isSelected: boolean; //  선택 여부
  onOpenRejectModal?: (reason?: string | null) => void;
}
interface SelectedApplication {
  title: string;
  price: number;
  courseId: number;
  applicationId: number;
  dogId: number;
}

const statusTextMap: Record<string, string> = {
  APPLIED: "승인 대기중",
  WAITING: "대기 예약",
  ACCEPT: "승인 완료",
  PAID: "결제완료",
  REJECTED: "승인 거절",
  CANCELLED: "취소됨",
  COUNSELING_REQUIRED: "상담 요청",
  EXPIRED: "만료됨",
};

const ApplicationCard: React.FC<Props> = ({
  app,
  isSelected,
  onOpenRejectModal,
}) => {
  const { setSelectedIndex } = useApplicationState();

  // 전체 상태 결정 (모든 세션이 같은 상태면 그 상태, 아니면 첫 번째)
  const allStatuses = app.applicationItems.map(
    (item) => item.applicationStatus
  );
  const isSameStatus = allStatuses.every((status) => status === allStatuses[0]);
  const displayStatus = isSameStatus ? allStatuses[0] : allStatuses[0];
  const statusText = statusTextMap[displayStatus] || displayStatus;

  const router = useRouter();
  const handleClick = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  // 체크박스 변경 시 세션스토리지 업데이트 (각 세션별로 객체 생성)
  const handleCheckboxChange = (checked: boolean) => {
    const stored = sessionStorage.getItem("selectedApplications");
    const currentSelections: SelectedApplication[] = stored
      ? JSON.parse(stored)
      : [];

    if (checked) {
      // 해당 과정의 모든 세션을 각각 SelectedApplication 객체로 추가
      app.applicationItems.forEach((item) => {
        const exists = currentSelections.some(
          (sel) => sel.applicationId === item.applicationId
        );
        if (!exists) {
          currentSelections.push({
            title: app.title,
            price: item.price,
            courseId: app.courseId,
            applicationId: item.applicationId,
            dogId: app.dogId,
          });
        }
      });
    } else {
      // 체크 해제 시 해당 과정의 모든 세션 제거
      const applicationIds = app.applicationItems.map(
        (item) => item.applicationId
      );
      const updated = currentSelections.filter(
        (item) => !applicationIds.includes(item.applicationId)
      );
      sessionStorage.setItem("selectedApplications", JSON.stringify(updated));
      return;
    }

    sessionStorage.setItem(
      "selectedApplications",
      JSON.stringify(currentSelections)
    );
  };

  return (
    <li
      className="relative cursor-pointer flex flex-col rounded-2xl shadow-md bg-white p-4"
      style={{ border: "1px solid #E9ECEF" }}
      onClick={() => handleClick(app.courseId)}
    >
      {/* 체크박스 */}
      <div
        className="absolute top-4 right-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          style={{ accentColor: "var(--mt-blue-point)" }}
          className="w-6 h-6 cursor-pointer"
          checked={isSelected} // 상위 상태 반영
          disabled={["CANCELLED", "EXPIRED", "REJECTED", "PAID"].includes(
            displayStatus
          )}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            // 모든 세션 ID를 선택 상태에 추가/제거
            if (e.target.checked) {
              // 체크 시 모든 세션 ID 추가
              app.applicationItems.forEach((item) => {
                setSelectedIndex(item.applicationId, true);
              });
            } else {
              // 체크 해제 시 모든 세션 ID 제거
              app.applicationItems.forEach((item) => {
                setSelectedIndex(item.applicationId, false);
              });
            }
            handleCheckboxChange(e.target.checked);
          }}
        />
      </div>
      <CardList
        title={app.title}
        description={app.description}
        lessonForm={app.lessonForm}
        type={app.type}
        mainImage={app.mainImage ?? undefined}
        sessionSchedule={app.sessionSchedule}
        location={app.location}
      />
      {/* ===== Dog Name + Type + LessonForm ===== */}
      <div className="flex justify-between pl-1 pr-1">
        {app.dogName && (
          <div className="flex items-center text-xs font-medium text-gray-400 gap-1">
            <Image
              src={DogImage}
              placeholder="blur"
              alt="강아지"
              width={19}
              height={19}
            />
            {app.dogName}
          </div>
        )}
        {typeof app.totalAmount === "number" && (
          <div className="flex justify-end items-baseline gap-1 mb-1">
            <span className="text-sm text-gray-500">총 금액</span>
            <span className="text-xl font-bold text-(--mt-blue-point)">
              {app.totalAmount.toLocaleString()}원
            </span>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 mt-2">
        {displayStatus === "REJECTED" && (
          <>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
              style={{ border: "1px solid #C5C5C5", color: "#374151" }}
            >
              승인 거절
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
              style={{ border: "1px solid #C5C5C5", color: "#EF4444" }}
              onClick={(e) => {
                e.stopPropagation();
                if (app.rejectReason) {
                  onOpenRejectModal?.(app.rejectReason);
                } else {
                  alert("거절 사유가 없습니다.");
                }
              }}
            >
              거절사유
            </button>
          </>
        )}

        {displayStatus === "ACCEPT" && (
          <>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
              style={{ border: "1px solid #C5C5C5", color: "#374151" }}
            >
              승인 완료
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg bg-blue-100 text-(--mt-blue-point)"
              onClick={(e) => {
                e.stopPropagation();
                // 세션스토리지에 각 세션별로 객체 저장
                let currentSelections: SelectedApplication[] = [];
                const stored = sessionStorage.getItem("selectedApplications");
                if (stored) {
                  try {
                    currentSelections = JSON.parse(stored);
                  } catch (error) {
                    console.error(
                      "세션스토리지의 selectedApplications 파싱 중 오류가 발생했습니다.",
                      error
                    );
                    currentSelections = [];
                  }
                }
                // 현재 과정의 모든 세션 추가
                app.applicationItems.forEach((item) => {
                  const exists = currentSelections.some(
                    (sel) => sel.applicationId === item.applicationId
                  );
                  if (!exists) {
                    currentSelections.push({
                      title: app.title,
                      price: item.price,
                      courseId: app.courseId,
                      applicationId: item.applicationId,
                      dogId: app.dogId,
                    });
                  }
                });
                sessionStorage.setItem(
                  "selectedApplications",
                  JSON.stringify(currentSelections)
                );
                router.push(`/payment/detail`);
              }}
            >
              결제하기
            </button>
          </>
        )}

        {[
          "APPLIED",
          "WAITING",
          "CANCELLED",
          "EXPIRED",
          "COUNSELING_REQUIRED",
        ].includes(displayStatus) && (
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
            style={{ border: "1px solid #C5C5C5", color: "#374151" }}
          >
            {displayStatus === "WAITING" &&
            app.applicationItems.some(
              (item) => item.isWaiting && item.waitingOrder
            )
              ? (() => {
                  const waitingItem = app.applicationItems.find(
                    (item) => item.isWaiting && item.waitingOrder
                  );
                  return `대기예약 (${waitingItem?.waitingOrder}번)`;
                })()
              : statusText}
          </button>
        )}
      </div>
    </li>
  );
};

export default ApplicationCard;
