import { useState } from "react";
import { CalendarIcon } from "@/components/icons/calendar";
import { MapPinIcon } from "@/components/icons/location";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons/chevron";
import { BookOpenIcon } from "@/components/icons/book";
import {
  getAttendanceStatusColor,
  getAttendanceStatusLabel,
  getAttendanceStatusBadgeStyle,
} from "@/util/attendance/attendanceUtils";
import {
  getDifficultyColor,
  getDifficultyLabel,
} from "@/util/course/difficultyUtils";
import type { IMultiCourseGroupResponse } from "@/types/trainer/trainerUserType";
import { EnrollmentHistoryItem } from "./EnrollmentHistoryItem";

interface MultiCourseCardProps {
  course: IMultiCourseGroupResponse;
}

export function MultiCourseCard({ course }: MultiCourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMultipleEnrollments = course.enrollmentCount > 1;

  return (
    <div className="border border-(--mt-gray-light) rounded-xl overflow-hidden">
      <div
        className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        aria-expanded={isExpanded}
        aria-controls={`course-details-${course.title}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2">
              <h4
                id={`course-title-${course.title}`}
                className="text-base font-bold text-(--mt-black) mb-1.5"
              >
                {course.title}
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {isMultipleEnrollments && (
                  <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                    {course.enrollmentCount}회 수강
                  </span>
                )}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${getDifficultyColor(
                    course.difficulty
                  )}`}
                >
                  {getDifficultyLabel(course.difficulty)}
                </span>
              </div>
            </div>
            <p className="text-sm text-(--mt-gray) mb-2">
              {course.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-(--mt-gray) flex-wrap">
              <span className="flex items-center gap-1 whitespace-nowrap">
                <MapPinIcon className="size-3.5" aria-hidden="true" />
                {course.location}
              </span>
              <span className="whitespace-nowrap">
                {course.attendedSessions} / {course.totalSessions} 세션
              </span>
              <span className="font-bold text-(--mt-blue-point) whitespace-nowrap">
                {course.attendanceRate.toFixed(1)}%
              </span>
            </div>
          </div>
          <button
            className="ml-2 text-(--mt-gray)"
            aria-expanded={isExpanded}
            aria-label={
              isExpanded ? "코스 상세 정보 접기" : "코스 상세 정보 펼치기"
            }
          >
            {isExpanded ? (
              <ChevronUpIcon className="size-6" aria-hidden="true" />
            ) : (
              <ChevronDownIcon className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden"
          role="progressbar"
          aria-valuenow={course.attendanceRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`출석률 ${course.attendanceRate.toFixed(1)}%`}
        >
          <div
            className="bg-linear-to-r from-(--mt-blue-point) to-blue-600 h-full transition-all duration-300"
            style={{ width: `${course.attendanceRate}%` }}
          />
        </div>
      </div>

      {isExpanded && (
        <div
          id={`course-details-${course.title}`}
          className="p-4 bg-white space-y-3"
        >
          {isMultipleEnrollments && course.enrollmentHistory ? (
            <>
              <h5 className="font-semibold text-(--mt-black) mb-3 flex items-center gap-1.5">
                <BookOpenIcon
                  className="size-5 text-(--mt-blue-point)"
                  aria-hidden="true"
                />
                수강 이력 ({course.enrollmentCount}회)
              </h5>
              {course.enrollmentHistory.map((enrollment) => (
                <EnrollmentHistoryItem
                  key={enrollment.enrollmentNumber}
                  enrollment={enrollment}
                />
              ))}
            </>
          ) : (
            <>
              <h5 className="font-semibold text-(--mt-black) mb-2">
                세션 상세
              </h5>
              {course.sessions.map((session, index) => (
                <div key={session.sessionId} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${getAttendanceStatusColor(
                        session.attendanceStatus
                      )}`}
                    />
                    {index < course.sessions.length - 1 && (
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
                      <CalendarIcon className="size-3" aria-hidden="true" />
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
