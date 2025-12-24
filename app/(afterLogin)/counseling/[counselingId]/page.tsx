import CounselingDetail from "@/components/pages/afterLogin/counseling/CounselingDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담 상세",
};

interface PageProps {
  params: Promise<{
    counselingId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { counselingId } = await params;
  return <CounselingDetail counselingId={Number(counselingId)} />;
}
