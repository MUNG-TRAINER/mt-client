import {IFirebaseSendMsgTypes} from "@/types/firebaseMsg/IFirebaseMsgTypes";
import {fetchWithAuth} from "../common/fetchWithAuth";

export const fcmApi = {
  updateFcmToken: async (token: string) => {
    const res = await fetchWithAuth(`/api/auth/fcm-token`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({fcmToken: token}),
    });
    if (!res.ok) {
      throw new Error("FCM 토큰을 불러오는데 에러가 발생했습니다.");
    }
    return {success: true};
  },
  sendFCMMsg: async (data: IFirebaseSendMsgTypes) => {
    const res = await fetchWithAuth(`/api/fcm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }
    return await res.json();
  },
};
