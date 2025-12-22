"use client";
import useGetCourse from "@/hooks/afterLogin/course/useGetCourse";
import CourseOfThisWeekLayout from "./CourseOfThisWeekLayout";

export default function CourseOfWeekTrainer() {
  const {data, isPending, isError} = useGetCourse();
  return (
    <CourseOfThisWeekLayout
      title="이번주 나의 지도 일정"
      data={{type: "course", data: data ?? []}}
    />
  );
}
