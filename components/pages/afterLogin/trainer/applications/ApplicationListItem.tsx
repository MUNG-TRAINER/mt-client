"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons/check";
import { CalendarIcon } from "@/components/icons/calendar";
import { ChevronDownIcon } from "@/components/icons/chevron";
import type { GroupedApplication } from "@/types/applications/applicationType";
import { formatDateWithDay } from "@/util/time/formatDateWithDay";

interface ApplicationListItemProps {
  application: GroupedApplication;
  isSelected: boolean;
  onToggle: (courseId: number, dogId: number) => void;
  onCardClick: (application: GroupedApplication) => void;
}

export const ApplicationListItem = ({
  application,
  isSelected,
  onToggle,
  onCardClick,
}: ApplicationListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    courseId,
    dogId,
    dogName,
    ownerName,
    courseTitle,
    courseType,
    totalSessions,
    sessions,
  } = application;

  // 첫 번째 회차 정보 (대표로 표시)
  const firstSession = sessions[0];
  const formattedDate = formatDateWithDay(firstSession.sessionDate);
  const formattedTime = firstSession.startTime.slice(0, 5);

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* 메인 카드 */}
      <div
        className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => onCardClick(application)}
      >
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">{dogName}</span>
            <span className="text-sm text-gray-500">({ownerName})</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
              {totalSessions}회차
            </span>
          </div>
          <div className="text-sm text-gray-700">{courseTitle}</div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
            {totalSessions > 1 && (
              <span className="text-xs text-gray-400">
                외 {totalSessions - 1}회차
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 회차 펼치기 버튼 */}
          {totalSessions > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}

          {/* 체크박스 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(courseId, dogId);
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
      </div>

      {/* 회차 상세 목록 */}
      {isExpanded && totalSessions > 1 && (
        <div className="border-t border-gray-200 bg-gray-50 p-3 space-y-2">
          {sessions.map((session) => {
            const sessionDate = formatDateWithDay(session.sessionDate);
            const sessionTime = session.startTime.slice(0, 5);
            return (
              <div
                key={session.sessionId}
                className="flex items-center justify-between text-sm py-1.5 px-2 bg-white rounded"
              >
                <span className="text-gray-700 font-medium">
                  {session.sessionNo}회차
                </span>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>{sessionDate}</span>
                  <span>{sessionTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
