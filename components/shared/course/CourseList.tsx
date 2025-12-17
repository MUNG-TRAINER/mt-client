"use client";

import { CourseItem } from "@/types/course/courseType";
import { CourseCard } from "./CourseCard";

interface CourseListProps {
  courses: CourseItem[];
  onReserve?: (courseId: number) => void;
  isLoading?: boolean;
  isEmpty?: boolean;
}

export const CourseList = ({
  courses,
  onReserve,
  isLoading = false,
  isEmpty = false,
}: CourseListProps) => {
  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-40 rounded-t-lg" />
            <div className="bg-white p-4 rounded-b-lg space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 빈 상태
  if (isEmpty || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 mb-3 text-gray-300">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-base text-gray-500 mb-1">검색 결과가 없습니다</p>
        <p className="text-sm text-gray-400">다른 검색어로 시도해보세요</p>
      </div>
    );
  }

  // 목록 표시
  return (
    <div className="flex flex-col gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.courseId}
          course={course}
          onReserve={onReserve}
        />
      ))}
    </div>
  );
};
