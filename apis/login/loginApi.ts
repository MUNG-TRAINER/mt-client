import {ILoginDataType} from "@/types/login/loginDataType";
import {API_BASE_URL} from "@/util/env";

export const loginAPi = {
  login: async (data: ILoginDataType) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error("로그인에 실패하였습니다.");
    }
    return result;
  },
};
