"use client";
import {useApplications} from "@/hooks/afterLogin/applications/useApplications";
import CourseOfThisWeekLayout from "./CourseOfThisWeekLayout";

export default function CourseOfWeekUser() {
  const {thisWeekSchedule, isPending, isError} = useApplications();
  return (
    <CourseOfThisWeekLayout
      title="이번주 나의 훈련 과정"
      data={{type: "application", data: thisWeekSchedule ?? []}}
    />
  );
}
