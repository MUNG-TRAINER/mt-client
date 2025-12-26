import {fetchWithAuth} from "../common/fetchWithAuth";
import {ITrainerInfoType} from "@/types/trainer/trainerType";

export const trainerApi = {
  getProfile: async (trainerId: string) => {
    const res = await fetchWithAuth(`/api/users/trainer/${trainerId}`, {
      method: "GET",
    });
    if (!res?.ok) {
      throw new Error("트레이너 정보를 불러오는데 실패하였습니다.");
    }
    return await res.json();
  },
  uploadProfile: async (data: Partial<ITrainerInfoType>) => {
    const res = await fetchWithAuth(`/api/trainer/me`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!res?.ok) {
      throw new Error("프로필 업로드에 실패하였습니다.");
    }
    return await res.json();
  },
};
