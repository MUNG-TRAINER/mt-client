import {UserCourseType} from "@/types/course/userCourse";
import {useState} from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

interface CalendarProps {
  courses?: UserCourseType[];
  selectedDate?: string;
  onDateClick?: (date: string) => void;
}

export default function Calendar({
  courses,
  onDateClick,
  selectedDate,
}: CalendarProps) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  // 달력 계산 (기존 코드 그대로)
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const calendar: (number | null)[][] = [];
  let week: (number | null)[] = [];
  for (let i = 0; i < startWeek; i++) week.push(null);
  for (let d = 1; d <= totalDays; d++) {
    week.push(d);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }
  if (week.length > 0) while (week.length < 7) week.push(null);
  if (week.length > 0) calendar.push(week);

  return (
    <section className="flex flex-col gap-3 p-3">
      <CalendarHeader
        year={year}
        month={month}
        setMonth={setMonth}
        setYear={setYear}
      />
      <CalendarBody
        calendar={calendar}
        today={today}
        year={year}
        month={month}
        courses={courses}
        onDateClick={onDateClick}
        selectedDate={selectedDate}
      />
      <div className="text-xs w-full flex justify-center items-center gap-1 text-[#495057]">
        <span className="w-2 h-2 bg-blue-500 rounded-full" /> 예정된 훈련 &nbsp;
        &nbsp;
        <span className="w-2 h-2 bg-purple-500 rounded-full" /> 완료된 훈련
      </div>
    </section>
  );
}
