import { IMyPageTypes } from "@/types/mypage/myPageType";
import { UpdateUserInfoType } from "@/schemas/mypageSchema";
import { ChangePasswordType } from "@/schemas/passwordSchema";

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

  changePassword: async (data: ChangePasswordType) => {
    const response = await fetch("/api/auth/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response?.ok) {
      throw new Error("비밀번호 변경에 실패했습니다.");
    }

    const result = await response.json();
    return result;
  },

  updatePublicStatus: async (isPublic: boolean) => {
    const response = await fetch("/api/users/me/public-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ isPublic }),
    });

    if (!response?.ok) {
      throw new Error("프로필 공개 설정 변경에 실패했습니다.");
    }
  },
};
