import {useEffect, useMemo, useState} from "react";
import {UserCourseType} from "@/types/course/userCourse";
import {userCourseApi} from "@/apis/users/userCourseApi";
import { useQuery } from "@tanstack/react-query";

export const useUserPlanCourses = () => {
  const [allCourses, setAllCourses] = useState<UserCourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"scheduled" | "completed">(
    "scheduled"
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      userCourseApi.getCoursesByStatus("SCHEDULED"),
      userCourseApi.getCoursesByStatus("DONE"),
    ])
      .then(([scheduled, done]) => setAllCourses([...scheduled, ...done]))
      .catch((err) => {
        setError(new Error("훈련과정 내역을 불러오는 데 실패했습니다."));
      })
      .finally(() => setLoading(false));
  }, []);

  const courses = useMemo(() => {
    const status = activeTab === "scheduled" ? "SCHEDULED" : "DONE";
    return allCourses.filter((course) =>
      course.sessions.some((s) => s.sessionStatus === status)
    );
  }, [allCourses, activeTab]);

  return {
    loading,
    allCourses,
    courses,
    activeTab,
    setActiveTab,
    error,
  };
};
