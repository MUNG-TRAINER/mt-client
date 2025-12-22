import {ICheckIdType} from "@/types/join/checkIdType";

export const joinApi = {
  checkUserName: async (userName: string): Promise<ICheckIdType> => {
    const response = await fetch(`/api/auth/validate-username/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return {
        valid: false,
        message: "서버에 오류가 발생했습니다.",
      };
    }
    const result: ICheckIdType = await response.json();
    return result;
  },
  checkEmail: async (email: string): Promise<ICheckIdType> => {
    const response = await fetch(`/api/auth/validate-email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return {
        valid: false,
        message: "서버에 오류가 발생했습니다.",
      };
    }
    const result: ICheckIdType = await response.json();
    return result;
  },
};
