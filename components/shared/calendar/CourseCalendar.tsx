"use client";

import { useMemo } from "react";
import { useCourseCalendar } from "@/hooks/course/useCourseCalendar";

interface CourseCalendarProps {
  currentMonth: Date;
  keyword?: string;
  lessonForm?: "WALK" | "GROUP" | "PRIVATE";
  onDateClick: (date: string) => void;
  selectedDate: string | null;
}

/**
 * 달력 컴포넌트 - 세션이 있는 날짜를 점으로 표시 (수업 형태별 색상 구분)
 */
export function CourseCalendar({
  currentMonth,
  keyword,
  lessonForm,
  onDateClick,
  selectedDate,
}: CourseCalendarProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // 오늘 날짜 정보를 컴포넌트 최상단에서 한 번만 계산
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  // 해당 월의 첫 날과 마지막 날
  const startDate = `${year}-${(month + 1).toString().padStart(2, "0")}-01`;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const endDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${lastDay
    .toString()
    .padStart(2, "0")}`;

  // 전체 선택 시 각 수업 형태별로 데이터 가져오기
  const isAllFilter = !lessonForm;

  const { data: walkData } = useCourseCalendar({
    startDate,
    endDate,
    keyword,
    lessonForm: "WALK",
    enabled: isAllFilter,
  });

  const { data: groupData } = useCourseCalendar({
    startDate,
    endDate,
    keyword,
    lessonForm: "GROUP",
    enabled: isAllFilter,
  });

  const { data: privateData } = useCourseCalendar({
    startDate,
    endDate,
    keyword,
    lessonForm: "PRIVATE",
    enabled: isAllFilter,
  });

  // 특정 필터 선택 시 해당 데이터만 가져오기
  const { data: filteredData, isLoading } = useCourseCalendar({
    startDate,
    endDate,
    keyword,
    lessonForm,
    enabled: !isAllFilter,
  });

  // 성능 최적화: sessionDates 배열을 Set으로 변환하여 O(1) 조회
  const walkDateSet = useMemo(
    () => new Set(walkData?.sessionDates.map((sd) => sd.sessionDate) || []),
    [walkData]
  );

  const groupDateSet = useMemo(
    () => new Set(groupData?.sessionDates.map((sd) => sd.sessionDate) || []),
    [groupData]
  );

  const privateDateSet = useMemo(
    () => new Set(privateData?.sessionDates.map((sd) => sd.sessionDate) || []),
    [privateData]
  );

  const filteredDateSet = useMemo(
    () => new Set(filteredData?.sessionDates.map((sd) => sd.sessionDate) || []),
    [filteredData]
  );

  // 달력 렌더링을 위한 날짜 배열 생성
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = lastDay;

  const calendarDays: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // 특정 날짜에 수업 형태별 세션이 있는지 확인 (O(1) 조회)
  const getSessionsByType = (day: number) => {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    if (isAllFilter) {
      // 전체 선택 시 각 형태별 세션 확인 - Set.has()로 O(1) 조회
      return {
        hasWalk: walkDateSet.has(dateStr),
        hasGroup: groupDateSet.has(dateStr),
        hasPrivate: privateDateSet.has(dateStr),
      };
    } else {
      // 특정 형태 선택 시 - Set.has()로 O(1) 조회
      const hasSession = filteredDateSet.has(dateStr);
      return {
        hasWalk: lessonForm === "WALK" && hasSession,
        hasGroup: lessonForm === "GROUP" && hasSession,
        hasPrivate: lessonForm === "PRIVATE" && hasSession,
      };
    }
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    onDateClick(dateStr);
  };

  const isSelectedDate = (day: number) => {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    return selectedDate === dateStr;
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-semibold py-2 ${
              index === 0
                ? "text-red-500"
                : index === 6
                ? "text-blue-500"
                : "text-gray-700"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const sessions = getSessionsByType(day);
          const hasAnySession =
            sessions.hasWalk || sessions.hasGroup || sessions.hasPrivate;
          const isSelected = isSelectedDate(day);
          const isToday =
            year === todayYear && month === todayMonth && day === todayDate;

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={isLoading}
              className={`aspect-square relative flex flex-col items-center justify-center rounded-lg transition-all ${
                isSelected
                  ? "bg-blue-600 text-white font-semibold"
                  : isToday
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              } ${
                index % 7 === 0
                  ? "text-red-500"
                  : index % 7 === 6
                  ? "text-blue-500"
                  : "text-gray-700"
              }`}
            >
              <span className={`text-sm ${isSelected ? "text-white" : ""}`}>
                {day}
              </span>
              {/* 수업 형태별 색상 점 표시 */}
              {hasAnySession && (
                <div className="absolute bottom-1 flex gap-0.5">
                  {sessions.hasWalk && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-white" : "bg-blue-500"
                      }`}
                      title="산책 모임"
                    />
                  )}
                  {sessions.hasGroup && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-white" : "bg-green-500"
                      }`}
                      title="그룹 레슨"
                    />
                  )}
                  {sessions.hasPrivate && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-white" : "bg-orange-500"
                      }`}
                      title="개인 레슨"
                    />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 색상 범례 */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-gray-600">산책 모임</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-gray-600">그룹 레슨</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-gray-600">개인 레슨</span>
        </div>
      </div>
    </div>
  );
}
