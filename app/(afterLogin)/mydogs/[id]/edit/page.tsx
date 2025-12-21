import EditDogForm from "@/components/pages/afterLogin/dog/EditDogForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "반려견 정보 수정",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dogId = parseInt(id, 10);

  return <EditDogForm dogId={dogId} />;
}
