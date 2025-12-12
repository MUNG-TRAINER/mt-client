import {ILoginDataType} from "@/types/login/loginDataType";
import {API_BASE_URL} from "@/util/env";

export const loginAPi = {
  login: async (data: ILoginDataType) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  },
};
