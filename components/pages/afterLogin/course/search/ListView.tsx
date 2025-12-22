import { CourseList } from "@/components/shared/course/CourseList";
import { CourseItem } from "@/types/course/courseType";

interface ListViewProps {
  courses: CourseItem[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  observerTarget: React.RefObject<HTMLDivElement | null>;
  onReserve: (courseId: number) => void;
}

export function ListView({
  courses,
  isLoading,
  isFetchingNextPage,
  observerTarget,
  onReserve,
}: ListViewProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <CourseList
        courses={courses}
        onReserve={onReserve}
        isLoading={isLoading}
        isEmpty={!isLoading && courses.length === 0}
      />

      {/* 무한 스크롤 감지 영역 */}
      <div
        ref={observerTarget}
        className="h-10 flex items-center justify-center"
      >
        {isFetchingNextPage && (
          <div className="text-sm text-gray-500">로딩 중...</div>
        )}
      </div>
    </div>
  );
}
