import { IMyPageTypes } from "@/types/mypage/myPageType";
import { UpdateUserInfoType } from "@/schemas/mypageSchema";

export const usersApi = {
  me: async () => {
    const response = await fetch("/api/users/me", {
      method: "GET",
      credentials: "include",
    });

    if (!response?.ok) {
      throw new Error("유저의 정보를 불러올 수 없습니다.");
    }

    const data: IMyPageTypes = await response.json();
    return data;
  },

  updateUserInfo: async (data: UpdateUserInfoType) => {
    const response = await fetch("/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response?.ok) {
      throw new Error("사용자 정보를 수정할 수 없습니다.");
    }

    const result: IMyPageTypes = await response.json();
    return result;
  },
};
