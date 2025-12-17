"use client";

import React, {useState} from "react";
import {ApplicationType} from "@/types/applications/applicationsType";
import CardList from "../../../shared/cards/CardLst";
import Image from "next/image";

interface Props {
  app: ApplicationType;
  onSelect: (id: number, checked: boolean) => void;
  isSelected: boolean;
}

const statusTextMap: Record<ApplicationType["applicationStatus"], string> = {
  APPLIED: "승인 대기중",
  WAITING: "대기 예약",
  ACCEPT: "승인 완료",
  REJECTED: "승인 거절",
  CANCELLED: "취소됨",
};

const ApplicationCard: React.FC<Props> = ({app, onSelect, isSelected}) => {
  const statusText = statusTextMap[app.applicationStatus];
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const tags = app.tags?.split(",") ?? [];

  // mainImage fallback 처리
  const imageSrc =
    app.mainImage &&
    (app.mainImage.startsWith("http") || app.mainImage.startsWith("/"))
      ? app.mainImage
      : "/images/application/test.jpg"; // public/images/application/test.jpg 필요

  return (
    <li
      className="relative cursor-pointer flex flex-col rounded-2xl shadow-md bg-white p-4"
      style={{border: "1px solid #E9ECEF"}}
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
          checked={isSelected}
          onChange={(e) => onSelect(app.applicationId, e.target.checked)}
        />
      </div>

      {/* 디자인 영역은 ApplicationInfo에 맡김 */}
      <CardList
        title={app.title}
        description={app.description}
        tags={tags}
        mainImage={imageSrc}
        sessionSchedule={app.sessionSchedule}
        location={app.location}
      />
      {/* 도그 네임 */}
      {app.dogName && (
        <div className=" flex items-center p-1 text-sm font-medium text-gray-700 mb-2 gap-1">
          <Image
            src="/images/application/dog.jpg"
            alt="달력"
            width={19}
            height={19} // height도 width 비슷하게 맞춰주는게 좋음
          />
          신청 강아지 : {app.dogName}
        </div>
      )}

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
              onClick={() =>
                app.rejectReason
                  ? setRejectModalOpen(true)
                  : alert("거절 사유가 없습니다.")
              }
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
              onClick={() => console.log("결제하기 클릭")}
            >
              결제하기
            </button>
          </>
        )}

        {["APPLIED", "CANCELLED", "WAITING"].includes(
          app.applicationStatus
        ) && (
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
            style={{border: "1px solid #C5C5C5", color: "#374151"}}
          >
            {statusText}
          </button>
        )}
      </div>

      {/* 거절사유 모달 */}
      {isRejectModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setRejectModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-80 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">거절 사유</h3>
            <p className="text-sm text-gray-700 bg-blue-100 p-4">
              {app.rejectReason?.trim() || "사유 없음"}
            </p>
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setRejectModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ApplicationCard;
