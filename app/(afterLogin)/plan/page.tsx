"use client";

import Plan from "@/components/pages/afterLogin/plan/Plan";
import {useEffect, useState} from "react";
import {UserCourseType} from "@/types/course/userCourse";
import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";
import PlanTabs from "@/components/pages/afterLogin/plan/PlanTabs";

const PlanPage = () => {
  const [courses, setCourses] = useState<UserCourseType[]>([]);
  const [allCourses, setAllCourses] = useState<UserCourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"scheduled" | "completed">(
    "scheduled"
  );
  useEffect(() => {
    setLoading(true);
    const status = activeTab === "scheduled" ? "SCHEDULED" : "DONE";
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/course?status=${status}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
      })
      .then((data) => setCourses(data))
      .catch((err) => {
        console.error(err);
        alert("훈련과정 내역을 불러오는 데 실패했습니다.");
      })
      .finally(() => setLoading(false));
  }, [activeTab]);

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
        if (!scheduledRes.ok || !doneRes.ok)
          throw new Error("Failed to fetch courses");
        const scheduledData: UserCourseType[] = await scheduledRes.json();
        const doneData: UserCourseType[] = await doneRes.json();
        // 두 상태 합치기
        setAllCourses([...scheduledData, ...doneData]);
        // 탭용 courses는 기존대로 activeTab에 따라 setCourses 사용
        const status = activeTab === "scheduled" ? "SCHEDULED" : "DONE";
        const filteredCourses = [...scheduledData, ...doneData].filter(
          (course) => course.sessions.some((s) => s.sessionStatus === status)
        );
        setCourses(filteredCourses);
      })
      .catch((err) => {
        console.error(err);
        alert("훈련과정 내역을 불러오는 데 실패했습니다.");
      })
      .finally(() => setLoading(false));
  }, [activeTab]);
  if (loading)
    return <LoadingSpinner message="신청 내역을 불러오는 중..." size="md" />;

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
