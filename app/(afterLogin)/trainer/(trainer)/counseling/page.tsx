import { Metadata } from "next";
import CounselingManagementClient from "@/components/pages/afterLogin/counseling/CounselingManagementClient";

export const metadata: Metadata = {
  title: "상담 관리",
  description: "훈련사 상담 관리 페이지",
};

export default function CounselingManagementPage() {
  return <CounselingManagementClient />;
}
