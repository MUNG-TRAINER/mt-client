"use client";

import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import CourseOfWeekUser from "./CourseOfWeekUser";
import CourseOfWeekTrainer from "./CourseOfWeekTrainer";

export default function CourseOfThisWeek() {
  const {data, isPending, isError} = useCheckLoggedIn();
  if (data && "code" in data) return null;
  if (data && "role" in data && data.role === "USER") {
    return <CourseOfWeekUser />;
  }
  if (data && "role" in data && data.role === "TRAINER") {
    return <CourseOfWeekTrainer />;
  }
}
