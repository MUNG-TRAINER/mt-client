"use client";

import { CheckIcon } from "@/components/icons/check";
import { CalendarIcon } from "@/components/icons/calendar";
import type { PendingApplication } from "@/types/applications/applicationType";
import { formatDateWithDay } from "@/util/time/formatDateWithDay";

interface ApplicationListItemProps {
  application: PendingApplication;
  isSelected: boolean;
  onToggle: (applicationId: number) => void;
  onCardClick: (application: PendingApplication) => void;
}

export const ApplicationListItem = ({
  application,
  isSelected,
  onToggle,
  onCardClick,
}: ApplicationListItemProps) => {
  const { applicationId, dogName, courseTitle, sessionDate, startTime } =
    application;

  // 시간 포맷팅: "14:00:00" -> "14:00"
  const formattedTime = startTime.slice(0, 5);

  // 날짜 포맷팅: "2024-01-15" -> "2024.01.15(월)"
  const formattedDate = formatDateWithDay(sessionDate);

  return (
    <div
      className="bg-white rounded-lg p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onCardClick(application)}
    >
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-gray-900">{dogName}</span>
          <span className="text-sm text-gray-500">
            ({application.ownerName})
          </span>
        </div>
        <div className="text-sm text-gray-700">{courseTitle}</div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <CalendarIcon className="w-4 h-4" />
          <span>{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* 체크박스 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(applicationId);
        }}
        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
          isSelected
            ? "bg-blue-600 border-blue-600"
            : "bg-white border-gray-300"
        }`}
      >
        {isSelected && <CheckIcon className="w-4 h-4 text-white" />}
      </button>
    </div>
  );
};
