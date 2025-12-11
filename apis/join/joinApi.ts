import {ICheckIdType} from "@/types/join/checkIdType";
import {IJoinDataType} from "@/types/join/joinDataType";
import {API_BASE_URL} from "@/util/env";

export const joinApi = {
  checkUserName: async (userName: string): Promise<ICheckIdType> => {
    const response = await fetch(
      `${API_BASE_URL}/auth/check-username?username=${userName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result: ICheckIdType = await response.json();
    if (!response.ok) {
      return result;
    }
    return result;
  },
  checkEmail: async (email: string): Promise<ICheckIdType> => {
    const response = await fetch(
      `${API_BASE_URL}/auth/check-email?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result: ICheckIdType = await response.json();
    if (!response.ok) {
      return result;
    }
    return result;
  },
  join: async (data: IJoinDataType) => {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  },
};
