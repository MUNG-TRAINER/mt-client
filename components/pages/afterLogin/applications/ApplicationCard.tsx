"use client";

import React from "react";
import {ApplicationType} from "@/types/applications/applicationsType";
import CardList from "../../../shared/cards/CourseCard";
import Image from "next/image";
import {useApplicationState} from "@/stores/applicationsState";
import {useRouter} from "next/navigation";
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
}

const statusTextMap: Record<ApplicationType["applicationStatus"], string> = {
  APPLIED: "승인 대기중",
  WAITING: "대기 예약",
  ACCEPT: "승인 완료",
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
  const {setSelectedIndex} = useApplicationState();
  const statusText = statusTextMap[app.applicationStatus];

  const router = useRouter();
  const handleClick = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  // 체크박스 변경 시 세션스토리지 업데이트
  const handleCheckboxChange = (checked: boolean) => {
    const stored = sessionStorage.getItem("selectedApplications");
    const currentSelections: SelectedApplication[] = stored
      ? JSON.parse(stored)
      : [];

    if (checked) {
      // 중복 체크 후 추가
      const exists = currentSelections.some(
        (item) => item.courseId === app.courseId
      );
      if (!exists) {
        currentSelections.push({
          title: app.title,
          price: app.price,
          courseId: app.courseId,
        });
      }
    } else {
      // 체크 해제 시 제거
      const updated = currentSelections.filter(
        (item) => item.courseId !== app.courseId
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
      style={{border: "1px solid #E9ECEF"}}
      onClick={() => handleClick(app.courseId)}
    >
      {/* 체크박스 */}
      <div
        className="absolute top-4 right-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          style={{accentColor: "var(--mt-blue-point)"}}
          className="w-6 h-6 cursor-pointer"
          checked={isSelected} // 상위 상태 반영
          disabled={["CANCELLED", "EXPIRED", "REJECTED"].includes(
            app.applicationStatus
          )}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            setSelectedIndex(app.courseId, e.target.checked);
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
        {typeof app.price === "number" && (
          <div className="flex justify-end items-baseline gap-1 mb-1">
            <span className="text-sm text-gray-500">총 금액</span>
            <span className="text-xl font-bold text-[var(--mt-blue-point)]">
              {app.price.toLocaleString()}원
            </span>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 mt-2">
        {app.applicationStatus === "REJECTED" && (
          <>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
              style={{border: "1px solid #C5C5C5", color: "#374151"}}
            >
              승인 거절
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
              style={{border: "1px solid #C5C5C5", color: "#EF4444"}}
              onClick={(e) => {
                e.stopPropagation();
                app.rejectReason
                  ? onOpenRejectModal?.(app.rejectReason)
                  : alert("거절 사유가 없습니다.");
              }}
            >
              거절사유
            </button>
          </>
        )}

        {app.applicationStatus === "ACCEPT" && (
          <>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
              style={{border: "1px solid #C5C5C5", color: "#374151"}}
            >
              승인 완료
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg bg-blue-100 text-(--mt-blue-point)"
              onClick={(e) => {
                e.stopPropagation();
                const query = encodeURIComponent(
                  JSON.stringify([
                    {
                      title: app.title,
                      price: app.price,
                      courseId: app.courseId,
                    },
                  ])
                );

                // 세션스토리지에도 중복 없이 저장
                const stored = sessionStorage.getItem("selectedApplications");
                const currentSelections: SelectedApplication[] = stored
                  ? JSON.parse(stored)
                  : [];
                const exists = currentSelections.some(
                  (item) => item.courseId === app.courseId
                );
                if (!exists) {
                  currentSelections.push({
                    title: app.title,
                    price: app.price,
                    courseId: app.courseId,
                  });
                  sessionStorage.setItem(
                    "selectedApplications",
                    JSON.stringify(currentSelections)
                  );
                }

                router.push(`/payment/detail?selected=${query}`);
              }}
            >
              결제하기
            </button>
          </>
        )}

        {[
          "APPLIED",
          "CANCELLED",
          "WAITING",
          "COUNSELING_REQUIRED",
          "EXPIRED",
        ].includes(app.applicationStatus) && (
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
            style={{border: "1px solid #C5C5C5", color: "#374151"}}
          >
            {statusText}
          </button>
        )}
      </div>
      {/* 모달은 상위 컴포넌트에서 렌더링합니다. */}
    </li>
  );
};

export default ApplicationCard;
