import { API_BASE_URL } from "@/util/env";
import { fetchWithAuth } from "../common/fetchWithAuth";
import { IMyPageTypes } from "@/types/mypage/myPageType";
import { UpdateUserInfoType } from "@/schemas/mypageSchema";

export const usersApi = {
  me: async () => {
    const resposne = await fetchWithAuth(`${API_BASE_URL}/users/me`, {
      method: "GET",
    });

    if (!resposne?.ok) {
      throw new Error("유정의 정보를 불러올 수 없습니다.");
    }

    const data: IMyPageTypes = await resposne.json();
    return data;
  },

  updateUserInfo: async (data: UpdateUserInfoType) => {
    const response = await fetchWithAuth(`${API_BASE_URL}/users/me`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!response?.ok) {
      throw new Error("사용자 정보를 수정할 수 없습니다.");
    }

    const result: IMyPageTypes = await response.json();
    return result;
  },
};
