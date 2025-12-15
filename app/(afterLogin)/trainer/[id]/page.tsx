import {ITrainerInfoType} from "@/types/trainer/trainerType";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

async function getTrainerInfo(id: string) {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/users/trainer/${id}`, {
    method: "GET",
    headers: {
      cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data) {
    redirect("/login");
  }
  return data;
}
export default async function Page({params}: {params: Promise<{id: string}>}) {
  const param = await params;
  const trainerData: ITrainerInfoType = await getTrainerInfo(param.id);
  return <div className="w-full h-full bg-(--mt-white) p-6 rounded-md"></div>;
}
