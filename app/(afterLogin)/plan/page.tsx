"use client";

import Plan from "@/components/pages/afterLogin/plan/Plan";
import {useEffect, useMemo, useState} from "react";
import {UserCourseType} from "@/types/course/userCourse";
import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";

const PlanPage = () => {
  const [allCourses, setAllCourses] = useState<UserCourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"scheduled" | "completed">(
    "scheduled"
  );

  useEffect(() => {
    setLoading(true);

    const scheduledFetch = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/course?status=SCHEDULED`,
      {credentials: "include"}
    );
    const doneFetch = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/course?status=DONE`,
      {credentials: "include"}
    );

    Promise.all([scheduledFetch, doneFetch])
      .then(async ([scheduledRes, doneRes]) => {
        if (!scheduledRes.ok || !doneRes.ok) {
          throw new Error("Failed to fetch courses");
        }

        const scheduledData: UserCourseType[] = await scheduledRes.json();
        const doneData: UserCourseType[] = await doneRes.json();

        setAllCourses([...scheduledData, ...doneData]);
      })
      .catch((err) => {
        console.error(err);
        alert("훈련과정 내역을 불러오는 데 실패했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

  const courses = useMemo(() => {
    const status = activeTab === "scheduled" ? "SCHEDULED" : "DONE";

    return allCourses.filter((course) =>
      course.sessions.some((s) => s.sessionStatus === status)
    );
  }, [allCourses, activeTab]);

  if (loading) {
    return <LoadingSpinner message="신청 내역을 불러오는 중..." size="md" />;
  }

  return (
    <div className="w-full h-full">
      <Plan
        courses={courses}
        allCourses={allCourses}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default PlanPage;
