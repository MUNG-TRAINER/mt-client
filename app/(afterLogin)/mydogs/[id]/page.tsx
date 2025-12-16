import DogDetail from "@/components/pages/afterLogin/dog/DogDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "반려견 상세정보",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dogId = parseInt(id, 10);

  return <DogDetail dogId={dogId} />;
}
