import {API_BASE_URL} from "@/util/env";
import {fetchWithAuth} from "../common/fetchWithAuth";
import {IMyPageTypes} from "@/types/mypage/myPageType";

export const usersApi = {
  me: async () => {
    const resposne = await fetchWithAuth(`${API_BASE_URL}/users/me`, {
      method: "GET",
    });

    if (!resposne?.ok) {
      throw new Error("유정의 정보를 불러올 수 없습니다.");
    }

    const data: IMyPageTypes = await resposne.json();

    return data;
  },
};
