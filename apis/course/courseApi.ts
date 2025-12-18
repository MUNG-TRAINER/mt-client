import { API_BASE_URL } from "@/util/env";
import { fetchWithAuth } from "../common/fetchWithAuth";

export const courseAPI = {
  getCourseDetail: async (courseId: string) => {
    const res = await fetchWithAuth(`${API_BASE_URL}/course/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("훈련과정을 불러오는데 실패했습니다.");
    }
    return res.json();
  },
  getSessionList: async (courseId: string) => {
    const res = await fetchWithAuth(
      `${API_BASE_URL}/course/${courseId}/sessions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("세션 목록을 불러오는데 실패했습니다.");
    }
    return res.json();
  },
};
