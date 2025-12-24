import {useMemo, useState} from "react";
import {UserCourseType} from "@/types/course/userCourse";
import {userCourseApi} from "@/apis/users/userCourseApi";
import {useQuery} from "@tanstack/react-query";

export const useUserPlanCourses = () => {
  const [activeTab, setActiveTab] = useState<"scheduled" | "completed">(
    "scheduled",
  );
  const {
    data: userCourseScheduled = [],
    isPending: scheduledPending,
    isError: scheduledError,
  } = useQuery({
    queryKey: ["userCourseScheduled"],
    queryFn: () => userCourseApi.getCoursesByStatus("SCHEDULED"),
  });

  const {
    data: userCourseDone = [],
    isPending: donePending,
    isError: doneError,
  } = useQuery({
    queryKey: ["userCourseDone"],
    queryFn: () => userCourseApi.getCoursesByStatus("DONE"),
  });

  const isLoadig = scheduledPending && donePending;

  const isError = scheduledError && doneError;

  const allCourses: UserCourseType[] = useMemo(() => {
    return isLoadig ? [] : [...userCourseScheduled, ...userCourseDone];
  }, [isLoadig, userCourseDone, userCourseScheduled]);

  const courses = useMemo(() => {
    const status = activeTab === "scheduled" ? "SCHEDULED" : "DONE";
    return allCourses.filter((course) =>
      course.sessions.some((s) => s.sessionStatus === status),
    );
  }, [allCourses, activeTab]);

  return {
    isLoadig,
    isError,
    allCourses,
    courses,
    activeTab,
    setActiveTab,
  };
};
