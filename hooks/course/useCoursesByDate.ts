"use client";
import {useQuery} from "@tanstack/react-query";
import {courseAPI} from "@/apis/course/courseApi";
import {CourseSearchResponse} from "@/types/course/courseType";

interface UseCoursesByDateParams {
  date: string | null;
  keyword?: string;
  lessonForm?: "WALK" | "GROUP" | "PRIVATE";
  enabled?: boolean;
}

/**
 * 특정 날짜의 코스 목록 조회 훅
 */
export const useCoursesByDate = ({
  date,
  keyword,
  lessonForm,
  enabled = true,
}: UseCoursesByDateParams) => {
  return useQuery<CourseSearchResponse>({
    queryKey: ["courses", "date", date, keyword, lessonForm],
    queryFn: () => {
      if (!date) {
        throw new Error("날짜가 필요합니다.");
      }
      return courseAPI.getCoursesByDate({
        date,
        keyword,
        lessonForm,
      });
    },
    enabled: enabled && !!date,
  });
};
