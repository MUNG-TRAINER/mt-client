import { CourseCalendar } from "@/components/shared/calendar/CourseCalendar";
import { CourseList } from "@/components/shared/course/CourseList";
import { CourseItem } from "@/types/course/courseType";

type LessonFormFilter = "ALL" | "WALK" | "GROUP" | "PRIVATE";

interface CalendarViewProps {
  currentMonth: Date;
  keyword?: string;
  selectedFilter: LessonFormFilter;
  selectedDate: string | null;
  dateCourses: CourseItem[];
  isLoading: boolean;
  onDateClick: (date: string) => void;
  onReserve: (courseId: number) => void;
}

export function CalendarView({
  currentMonth,
  keyword,
  selectedFilter,
  selectedDate,
  dateCourses,
  isLoading,
  onDateClick,
  onReserve,
}: CalendarViewProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mb-4">
        <CourseCalendar
          currentMonth={currentMonth}
          keyword={keyword}
          lessonForm={selectedFilter === "ALL" ? undefined : selectedFilter}
          onDateClick={onDateClick}
          selectedDate={selectedDate}
        />
      </div>

      {/* 선택된 날짜의 코스 목록 */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-3">
            {selectedDate} 훈련 과정
          </h3>
          <CourseList
            courses={dateCourses}
            onReserve={onReserve}
            isLoading={isLoading}
            isEmpty={!isLoading && dateCourses.length === 0}
          />
        </div>
      )}
    </div>
  );
}
