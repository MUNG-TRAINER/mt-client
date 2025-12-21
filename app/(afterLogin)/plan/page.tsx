"use client";

import Plan from "@/components/pages/afterLogin/plan/Plan";
import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import { useUserPlanCourses } from "@/hooks/afterLogin/users/useUserPlanCourse"; 
import { useTrainerPlanCourses } from "@/hooks/afterLogin/trainer/useTrainerPlanCourse";
import { UserRoleType } from "@/types/common/commonType";


const PlanPage = () => {
  const { data} = useCheckLoggedIn();

  // 로그인 유저 정보
  const user = data && "userId" in data ? data : null;
  const role: UserRoleType = user?.role ?? "USER";
  
  const isTrainer = role === "TRAINER";
  const trainerPlanData = useTrainerPlanCourses(isTrainer);
  const userPlanData = useUserPlanCourses();
  
  const planData = role === "TRAINER" ? trainerPlanData : userPlanData;

const { loading, allCourses, courses, activeTab, setActiveTab } = planData;


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
        isTrainer={role === "TRAINER"}
      />
    </div>
  );
};

export default PlanPage;
