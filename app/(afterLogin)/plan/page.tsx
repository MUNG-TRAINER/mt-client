import PlanPageContent from "@/components/pages/afterLogin/plan/PlanPageContent";
import {UserRoleType} from "@/types/common/commonType";

const PlanPage = () => {
  // 서버 컴포넌트에서는 쿠키 API 대신 임시 기본값 전달
  const defaultRole: UserRoleType = "USER";
  return <PlanPageContent defaultRole={defaultRole} />;
};

export default PlanPage;
