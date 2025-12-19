"use client";

import {UserCourseType} from "@/types/course/userCourse";

interface CalendarBodyProps {
  today: Date;
  calendar: (number | null)[][];
  year: number;
  month: number;
  courses?: UserCourseType[];
  onDateClick?: (date: string) => void;
  selectedDate?: string;
}

export default function CalendarBody({
  today,
  calendar,
  year,
  month,
  courses,
  onDateClick,
  selectedDate,
}: CalendarBodyProps) {
  const koreanWeeks = ["일", "월", "화", "수", "목", "금", "토"];

  const getDateStatus = (date: number) => {
    if (!courses) return {scheduled: false, done: false};
    let scheduled = false;
    let done = false;
    courses.forEach((course) => {
      course.sessions.forEach((s) => {
        const sessionDate = new Date(s.sessionDate);
        if (
          sessionDate.getFullYear() === year &&
          sessionDate.getMonth() === month &&
          sessionDate.getDate() === date
        ) {
          if (s.sessionStatus === "SCHEDULED") scheduled = true;
          if (s.sessionStatus === "DONE") done = true;
        }
      });
    });
    return {scheduled, done};
  };

  return (
    <div className="flex flex-col gap-2">
      {/* 요일 */}
      <div className="grid grid-cols-7 text-center font-bold">
        {koreanWeeks.map((day, idx) => (
          <div
            key={idx}
            className={`py-2 ${
              idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      {calendar.map((week, wIdx) => (
        <div key={wIdx} className="grid grid-cols-7 gap-2">
          {week.map((day, dIdx) => {
            if (!day) return <div key={dIdx} />;

            const isToday =
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year;

            // 전체 courses를 기반으로 날짜 상태 확인
            const {scheduled, done} = getDateStatus(day);

            const dateString = `${year}-${String(month + 1).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")}`;

            return (
              <div
                key={dIdx}
                className={`flex flex-col justify-center items-center min-h-12 rounded-lg cursor-pointer ${
                  dateString === selectedDate
                    ? "bg-purple-100 font-bold" // 클릭된 날짜
                    : isToday
                    ? "bg-(--mt-blue-light) font-bold"
                    : ""
                }`}
                onClick={() => onDateClick?.(dateString)}
              >
                <div>{day}</div>
                {/* 한 날짜에 예정과 완료 세션 둘 다 표시 */}
                <div className="flex gap-1 mt-1">
                  {scheduled && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                  {done && (
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
