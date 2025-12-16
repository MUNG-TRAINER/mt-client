import { ITrainerInfoType } from "@/types/trainer/trainerType";
import UserInfoCard from "@/components/pages/afterLogin/trainer/trainerInfo/UserInfoCard";
import { API_BASE_URL } from "@/util/env";
import { redirect } from "next/navigation";
import TrainerDetailSection from "@/components/pages/afterLogin/trainer/trainerInfo/TrainerDetailCard";

async function getTrainerInfo(id: string) {
  const res = await fetch(`${API_BASE_URL}/users/trainer/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    redirect("/login");
  }
  return data;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const trainerData: ITrainerInfoType = await getTrainerInfo(param.id);
  return (
    <div className="w-full h-full bg-white m-auto p-6 rounded-md flex flex-col gap-6 overflow-y-auto">
      <UserInfoCard user={trainerData}></UserInfoCard>
      <TrainerDetailSection trainer={trainerData} />
    </div>
  );
}
