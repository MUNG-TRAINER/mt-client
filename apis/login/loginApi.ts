import {
  ICheckLoggedInType,
  IFailedCheckLoggedInType,
} from "@/types/login/loginDataType";
import {
  IResultResponse,
  IResultResponseData,
} from "@/types/response/resultResponse";
import {fetchWithAuth} from "../common/fetchWithAuth";

export const loginApi = {
  logout: async () => {
    const res = await fetchWithAuth(`/api/auth/logout`, {
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
    const res = await fetchWithAuth(`/api/auth/check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });
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
  optionalCheck: async () => {
    const res = await fetchWithAuth("/api/auth/optionalCheck", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      return (await res.json()) as Promise<{success: boolean}>;
    }
    return (await res.json()) as Promise<{success: boolean}>;
  },
};
