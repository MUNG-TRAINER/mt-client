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
      return;
    }
    return;
  },
};
