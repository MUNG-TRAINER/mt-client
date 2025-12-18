import {
  ICheckLoggedInType,
  IFailedCheckLoggedInType,
  ILoginDataType,
} from "@/types/login/loginDataType";
import {
  IResultResponse,
  IResultResponseData,
} from "@/types/response/resultResponse";

export const loginApi = {
  login: async (data: ILoginDataType) => {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("로그인에 실패하였습니다.");
    }
    const result = await res.json();
    return result;
  },
  logout: async () => {
    const res = await fetch(`/api/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res?.ok) {
      throw new Error("로그아웃하는데 실패하였습니다.");
    }
    const data: IResultResponseData<IResultResponse> = await res.json();
    return data;
  },
  check: async () => {
    const res = await fetch(`/api/auth/check`);
    if (res.status === 401) {
      const data: IResultResponseData<IFailedCheckLoggedInType> =
        await res.json();
      return data.data;
    }
    if (!res?.ok) {
      throw new Error("유저의 정보를 불러올 수 없습니다.");
    }
    const data: IResultResponseData<ICheckLoggedInType> = await res.json();
    return data.data;
  },
};
