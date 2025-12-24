import { MultiCourseCard } from "./MultiCourseCard";
import type { IDogStatsResponse } from "@/types/trainer/trainerUserType";

interface MultiCoursesListProps {
  multiCourses: IDogStatsResponse["multiCourses"];
}

export function MultiCoursesList({ multiCourses }: MultiCoursesListProps) {
  if (!multiCourses || multiCourses.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-(--mt-black)">다회차 훈련 이력</h3>
      <div className="space-y-4">
        {multiCourses.map((category) => (
          <div key={category.tags}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-(--mt-gray)">
                {category.courses.length}개 코스
              </span>
            </div>
            <div className="space-y-3">
              {category.courses.map((course) => (
                <MultiCourseCard key={course.courseId} course={course} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
