import {TrainerCourseFlatType} from "@/types/trainer/trainerCourseFlatType";
import {fetchWithAuth} from "../common/fetchWithAuth";

export const trainerCourseAPI = {
  getTrainerCoursesByStatus: async (
    status: "SCHEDULED" | "DONE",
  ): Promise<TrainerCourseFlatType[]> => {
    const res = await fetchWithAuth(`/api/trainer/course?status=${status}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("훈련과정 내역을 불러오는데 실패했습니다.");
    }
    const json = await res.json();
    return json.data;
  },
};
