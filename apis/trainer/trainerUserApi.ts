import { fetchWithAuth } from "../common/fetchWithAuth";
import { API_BASE_URL } from "@/util/env";
import {
  ITrainerUserListResponse,
  IDogResponse,
  IDogStatsResponse,
} from "@/types/trainer/trainerUserType";

export const trainerUserApi = {
  // 훈련사가 관리하는 회원 목록 조회
  getTrainerUsers: async (): Promise<ITrainerUserListResponse[]> => {
    const res = await fetchWithAuth(`${API_BASE_URL}/trainer/users`, {
      method: "GET",
    });
    if (!res?.ok) {
      throw new Error("회원 목록을 불러오는데 실패하였습니다.");
    }
    return await res.json();
  },

  // 특정 회원의 반려견 목록 조회
  getUserDogs: async (userId: number): Promise<IDogResponse[]> => {
    const res = await fetchWithAuth(`${API_BASE_URL}/trainer/dogs/${userId}`, {
      method: "GET",
    });
    if (!res?.ok) {
      throw new Error("반려견 목록을 불러오는데 실패하였습니다.");
    }
    return await res.json();
  },

  // 반려견 통계 정보 조회
  getDogStats: async (dogId: number): Promise<IDogStatsResponse> => {
    const res = await fetchWithAuth(
      `${API_BASE_URL}/trainer/user/dogs/${dogId}`,
      {
        method: "GET",
      }
    );
    if (!res?.ok) {
      throw new Error("반려견 통계를 불러오는데 실패하였습니다.");
    }
    return await res.json();
  },
};
