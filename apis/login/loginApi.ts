import {ICheckLoggedInType, ILoginDataType} from "@/types/login/loginDataType";
import {API_BASE_URL} from "@/util/env";
import {fetchWithAuth} from "../common/fetchWithAuth";

export const loginApi = {
  login: async (data: ILoginDataType) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error("로그인에 실패하였습니다.");
    }
    return result;
  },
  logout: async () => {
    const res = await fetchWithAuth(`${API_BASE_URL}/auth/logout`, {
      method: "GET",
    });
    if (!res?.ok) {
      throw new Error("로그아웃하는데 실패하였습니다.");
    }
    return await res.json();
  },
  check: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.status === 401) {
      return null;
    }
    if (!res?.ok) {
      throw new Error("유저의 정보를 불러올 수 없습니다.");
    }
    const data: ICheckLoggedInType = await res.json();
    return data;
  },
};
