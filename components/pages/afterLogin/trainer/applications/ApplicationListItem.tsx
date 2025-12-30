"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons/check";
import { CalendarIcon } from "@/components/icons/calendar";
import { ChevronDownIcon } from "@/components/icons/chevron";
import type { GroupedApplication } from "@/types/applications/applicationType";
import { formatDateWithDay } from "@/util/time/formatDateWithDay";
import { formatTime } from "@/util/time/formatTime";

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
    totalSessions,
    sessions,
  } = application;

  // 첫 번째 회차 정보 (대표로 표시) - sessions가 비어 있을 수 있으므로 안전하게 접근
  const firstSession = sessions?.[0];
  const formattedDate = firstSession
    ? formatDateWithDay(firstSession.sessionDate)
    : "";
  const formattedTime =
    firstSession?.startTime != null ? firstSession.startTime.slice(0, 5) : "";

  // 대기 상태 배지 설정
  const getBadgeConfig = () => {
    if (!firstSession) return null;

    // 대기 중 상태 (status=WAITING 또는 isWaiting=true)
    if (firstSession.status === "WAITING" || firstSession.isWaiting) {
      // 미리 승인된 대기
      if (firstSession.isPreApproved) {
        return {
          color: "bg-green-100 text-green-700 border border-green-300",
          text: `✓ 승인 예정 (대기 ${firstSession.waitingOrder}번)`,
          icon: "✓",
        };
      }
      // 일반 대기
      return {
        color: "bg-orange-100 text-orange-700 border border-orange-300",
        text: `⏳ 정원초과 대기 (${firstSession.waitingOrder}번)`,
        icon: "⏳",
      };
    }

    // 일반 승인 대기
    const capacityText =
      firstSession.maxCapacity && firstSession.currentParticipants !== undefined
        ? ` (${firstSession.currentParticipants}/${firstSession.maxCapacity})`
        : "";
    return {
      color: "bg-blue-100 text-blue-700",
      text: `승인 대기${capacityText}`,
      icon: null,
    };
  };

  const badgeConfig = getBadgeConfig();

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
            {badgeConfig && (
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded ${badgeConfig.color}`}
              >
                {badgeConfig.text}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-700">{courseTitle}</div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
            {totalSessions > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded((prev) => !prev);
                }}
                className="ml-1 inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <span>외 {totalSessions - 1}회차</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* 체크박스 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(courseId, dogId);
            }}
            role="checkbox"
            aria-checked={isSelected}
            aria-label={`${dogName} 신청 선택`}
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
            const sessionTime = formatTime(session.startTime);

            // 회차별 대기 상태 배지
            let sessionBadge = null;
            // 대기 중 상태 (status=WAITING 또는 isWaiting=true)
            if (
              (session.status === "WAITING" || session.isWaiting) &&
              session.isPreApproved
            ) {
              sessionBadge = (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 border border-green-300 text-xs font-medium rounded">
                  ✓ 승인 예정 ({session.waitingOrder}번)
                </span>
              );
            } else if (session.status === "WAITING" || session.isWaiting) {
              sessionBadge = (
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 border border-orange-300 text-xs font-medium rounded">
                  ⏳ 대기 {session.waitingOrder}번
                </span>
              );
            }

            return (
              <div
                key={session.sessionId}
                className="flex items-center justify-between text-sm py-1.5 px-2 bg-white rounded"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">
                    {session.sessionNo}회차
                  </span>
                  {sessionBadge}
                </div>
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
