"use client";

import {ISessionType} from "@/types/course/sessionType";
import {useState} from "react";
import {
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  UsersIcon,
  ChevronDownIcon,
} from "@/components/icons/courseInfoIcons";

interface ISessionAccordionProps {
  session: ISessionType;
}

export default function SessionAccordion({session}: ISessionAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) {
      return timeStr;
    }
    return timeStr.slice(0, 5);
  };

  const formatDateForDisplay = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${date.getFullYear()}.${month}.${day}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col border border-(--mt-gray-light) rounded-lg overflow-hidden">
      {/* 헤더 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-(--mt-gray-smoke) transition-colors"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span
            className={`font-bold text-(--mt-black) transition-all ${
              isOpen ? "line-clamp-3" : "text-base truncate"
            }`}
          >
            {session.content}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {!isOpen && (
            <span className="text-sm text-(--mt-gray)">
              {formatDateForDisplay(session.sessionDate)}
            </span>
          )}

          <ChevronDownIcon
            className={`size-5 text-(--mt-gray) transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* 펼친 내용 */}
      {
        <div
          className={`border-t border-(--mt-gray-light)  bg-white ${
            isOpen ? "scale-y-100 max-h-full p-4 space-y-4 " : "scale-y-0 h-0 "
          } transition-transform duration-200 ease-in-out origin-top`}
        >
          {/* 세부 정보 */}
          <div className="pt-1 border-(--mt-gray-light) space-y-3">
            <div className="flex items-start gap-2">
              <CalendarIcon className="size-5 text-(--mt-blue-point) mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-(--mt-gray) mb-1">진행 날짜</p>
                <p className="text-sm font-medium text-(--mt-black)">
                  {formatDate(session.sessionDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <ClockIcon className="size-5 text-(--mt-blue-point) mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-(--mt-gray) mb-1">시간</p>
                <p className="text-sm font-medium text-(--mt-black)">
                  {formatTime(session.startTime)} ~{" "}
                  {formatTime(session.endTime)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <LocationIcon className="size-5 text-(--mt-blue-point) mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-(--mt-gray) mb-1">위치</p>
                <p className="text-sm font-medium text-(--mt-black)">
                  {session.locationDetail}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <UsersIcon className="size-5 text-(--mt-blue-point) mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-(--mt-gray) mb-1">정원</p>
                <p className="text-sm font-medium text-(--mt-black)">
                  {session.maxStudents}명
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
