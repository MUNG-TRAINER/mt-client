import { useState } from "react";
import { CalendarIcon } from "@/components/icons/calendar";
import { MapPinIcon } from "@/components/icons/location";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons/chevron";
import { ChartBarIcon } from "@/components/icons/chart";
import { BookOpenIcon } from "@/components/icons/book";
import type {
  IMultiCourseGroupResponse,
  IEnrollmentHistory,
  IMultiSessionResponse,
} from "@/types/trainer/trainerUserType";

interface MultiCourseCardProps {
  course: IMultiCourseGroupResponse;
}

interface EnrollmentHistoryItemProps {
  enrollment: IEnrollmentHistory;
  getAttendanceStatusColor: (status: string | null) => string;
  getAttendanceStatusLabel: (status: string | null) => string;
}

function EnrollmentHistoryItem({
  enrollment,
  getAttendanceStatusColor,
  getAttendanceStatusLabel,
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
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      session.attendanceStatus === "ATTENDED"
                        ? "bg-green-100 text-green-700"
                        : session.attendanceStatus === "ABSENT"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
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

export function MultiCourseCard({ course }: MultiCourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMultipleEnrollments = course.enrollmentCount > 1;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return "bg-green-100 text-green-700";
      case "INTERMEDIATE":
        return "bg-yellow-100 text-yellow-700";
      case "ADVANCED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return "초급";
      case "INTERMEDIATE":
        return "중급";
      case "ADVANCED":
        return "고급";
      default:
        return difficulty;
    }
  };

  const getAttendanceStatusColor = (status: string | null) => {
    if (status === "ATTENDED") return "bg-green-500";
    if (status === "ABSENT") return "bg-red-500";
    return "bg-gray-300";
  };

  const getAttendanceStatusLabel = (status: string | null) => {
    if (status === "ATTENDED") return "출석";
    if (status === "ABSENT") return "결석";
    return "예정";
  };

  return (
    <div className="border border-(--mt-gray-light) rounded-xl overflow-hidden">
      <div
        className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2">
              <h4 className="text-base font-bold text-(--mt-black) mb-1.5">
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
                <MapPinIcon className="size-3.5" />
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
          <button className="ml-2 text-(--mt-gray)">
            {isExpanded ? (
              <ChevronUpIcon className="size-6" />
            ) : (
              <ChevronDownIcon className="size-6" />
            )}
          </button>
        </div>

        <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-(--mt-blue-point) to-blue-600 h-full transition-all duration-300"
            style={{ width: `${course.attendanceRate}%` }}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 bg-white space-y-3">
          {isMultipleEnrollments && course.enrollmentHistory ? (
            <>
              <h5 className="font-semibold text-(--mt-black) mb-3 flex items-center gap-1.5">
                <BookOpenIcon className="size-5 text-(--mt-blue-point)" />
                수강 이력 ({course.enrollmentCount}회)
              </h5>
              {course.enrollmentHistory.map((enrollment) => (
                <EnrollmentHistoryItem
                  key={enrollment.enrollmentNumber}
                  enrollment={enrollment}
                  getAttendanceStatusColor={getAttendanceStatusColor}
                  getAttendanceStatusLabel={getAttendanceStatusLabel}
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
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          session.attendanceStatus === "ATTENDED"
                            ? "bg-green-100 text-green-700"
                            : session.attendanceStatus === "ABSENT"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
