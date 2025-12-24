import CreateCounselingForm from "@/components/pages/afterLogin/counseling/CreateCounselingForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "상담 신청",
};

interface PageProps {
  params: Promise<{
    dogId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { dogId } = await params;
  return <CreateCounselingForm dogId={Number(dogId)} />;
}
