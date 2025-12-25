import type { Metadata } from "next";
import { ApplicationManagementClient } from "@/components/pages/afterLogin/trainer/applications/ApplicationManagementClient";

export const metadata: Metadata = {
  title: "승인 대기 목록 | 메이트 트레이너",
  description: "훈련 과정 신청 승인 관리",
};

export default function ApplicationManagementPage() {
  return <ApplicationManagementClient />;
}
