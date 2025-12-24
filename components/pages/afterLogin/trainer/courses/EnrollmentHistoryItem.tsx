import { useState } from "react";
import { CalendarIcon } from "@/components/icons/calendar";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons/chevron";
import { ChartBarIcon } from "@/components/icons/chart";
import {
  getAttendanceStatusColor,
  getAttendanceStatusLabel,
  getAttendanceStatusBadgeStyle,
} from "@/util/attendance/attendanceUtils";
import type { IEnrollmentHistory } from "@/types/trainer/trainerUserType";

interface EnrollmentHistoryItemProps {
  enrollment: IEnrollmentHistory;
}

export function EnrollmentHistoryItem({
  enrollment,
}: EnrollmentHistoryItemProps) {
  const [showSessions, setShowSessions] = useState(false);

  return (
    <div className="border-l-4 border-blue-400 pl-4 py-3 bg-gray-50 rounded-r">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
          {enrollment.enrollmentNumber}차 수강
        </span>
        <span className="text-xs text-(--mt-gray)">
          {enrollment.startDate} ~ {enrollment.endDate}
        </span>
      </div>

      <p className="font-semibold text-(--mt-black) mb-1">{enrollment.title}</p>

      <div className="flex items-center gap-4 text-xs mb-2">
        <span className="flex items-center gap-1 text-(--mt-gray)">
          <ChartBarIcon className="size-3.5" />
          {enrollment.attendedSessions}/{enrollment.totalSessions}회 출석
        </span>
        <span className="font-semibold text-green-600">
          출석률: {enrollment.attendanceRate.toFixed(1)}%
        </span>
      </div>

      <button
        onClick={() => setShowSessions(!showSessions)}
        className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
      >
        {showSessions ? (
          <ChevronUpIcon className="size-3.5" />
        ) : (
          <ChevronDownIcon className="size-3.5" />
        )}
        세션 상세 보기 ({enrollment.sessions.length}회차)
      </button>

      {showSessions && (
        <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-3">
          {enrollment.sessions.map((session, index) => (
            <div key={session.sessionId} className="flex items-start gap-3">
              <div className="flex flex-col items-center pt-1">
                <div
                  className={`w-4 h-4 rounded-full ${getAttendanceStatusColor(
                    session.attendanceStatus
                  )}`}
                />
                {index < enrollment.sessions.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200" />
                )}
              </div>

              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-(--mt-black)">
                    {session.sessionNo}회차
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getAttendanceStatusBadgeStyle(
                      session.attendanceStatus
                    )}`}
                  >
                    {getAttendanceStatusLabel(session.attendanceStatus)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-(--mt-gray)">
                  <CalendarIcon className="size-3" />
                  <span>
                    {session.sessionDate} {session.startTime.slice(0, 5)} ~{" "}
                    {session.endTime.slice(0, 5)}
                  </span>
                </div>
                <p className="text-xs text-(--mt-gray) mt-1">
                  {session.locationDetail}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
