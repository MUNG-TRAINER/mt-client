import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TrainerEditForm from "@/components/pages/afterLogin/trainer/trainerEdit/TrainerEditForm";
import { ITrainerInfoType } from "@/types/trainer/trainerType";

async function getTrainerInfo(id: string) {
  const res = await fetch(`${API_BASE_URL}/users/trainer/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!data) {
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
    <div className="w-full h-full bg-white m-auto p-6 rounded-md overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-(--mt-black) mb-6">
          프로필 수정
        </h1>
        <TrainerEditForm trainer={trainerData} trainerId={param.id} />
      </div>
    </div>
  );
}
