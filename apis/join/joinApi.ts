import {ICheckIdType} from "@/types/join/checkIdType";
import {
  IJoinTrainerDataType,
  IJoinUserDataType,
} from "@/types/join/joinDataType";

export const joinApi = {
  checkUserName: async (userName: string): Promise<ICheckIdType> => {
    const response = await fetch(`/api/auth/validate-username/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result: ICheckIdType = await response.json();
    if (!response.ok) {
      return {
        valid: false,
        message: result.message || "서버에 오류가 발생했습니다.",
      };
    }
    return result;
  },
  checkEmail: async (email: string): Promise<ICheckIdType> => {
    const response = await fetch(`/api/auth/validate-email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result: ICheckIdType = await response.json();
    if (!response.ok) {
      return {
        valid: false,
        message: result.message || "서버에 오류가 발생했습니다.",
      };
    }
    return result;
  },
  joinTrainer: async (data: IJoinTrainerDataType) => {
    const response = await fetch(`/api/auth/join/trainer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("회원가입에 실패했습니다.");
    }
    return await response.json();
  },
  joinUser: async (data: IJoinUserDataType) => {
    const response = await fetch(`/api/auth/join/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("회원가입에 실패했습니다.");
    }
    return await response.json();
  },
};
