import {ApplicationType} from "@/types/applications/applicationsType";
import {IResultResponseData} from "@/types/response/resultResponse";

export const applicationAPI = {
  getApplicationList: async () => {
    const res = await fetch("api/application/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("신청내역 리스트를 불러오는데 실패했습니다.");
    }
    const data = (await res.json()) as IResultResponseData<ApplicationType[]>;
    return data.data;
  },
  deleteApplication: async (data: number[]) => {
    const res = await fetch("/api/application", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("훈련신청 취소에 실패했습니다.");
    }
    const result = (await res.json()) as IResultResponseData<{
      success: boolean;
    }>;
    return result;
  },
};
