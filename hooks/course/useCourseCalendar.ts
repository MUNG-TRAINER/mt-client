"use client";
import {useQuery} from "@tanstack/react-query";
import {courseAPI} from "@/apis/course/courseApi";

interface UseCourseCalendarParams {
  startDate: string;
  endDate: string;
  keyword?: string;
  lessonForm?: "WALK" | "GROUP" | "PRIVATE";
  enabled?: boolean;
}

export interface CalendarSessionDate {
  sessionDate: string;
  sessionCount: number;
}

export interface CalendarResponse {
  sessionDates: CalendarSessionDate[];
  totalDates: number;
}

/**
 * 달력 조회 훅 - 특정 기간의 세션이 있는 날짜 목록
 */
export const useCourseCalendar = ({
  startDate,
  endDate,
  keyword,
  lessonForm,
  enabled = true,
}: UseCourseCalendarParams) => {
  return useQuery<CalendarResponse>({
    queryKey: ["courses", "calendar", startDate, endDate, keyword, lessonForm],
    queryFn: () =>
      courseAPI.getCalendar({
        startDate,
        endDate,
        keyword,
        lessonForm,
      }),
    enabled,
  });
};
