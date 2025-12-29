import {REFRESH_EXPIRED, TOKEN_EXPIRED, UNAUTHORIZED} from "@/util/variables";
import {loginApi} from "../login/loginApi";

async function fetchData(input: RequestInfo, init: RequestInit = {}) {
  return await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}

export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {},
) {
  try {
    let res = await fetchData(input, init);
    // 성공 응답은 바로 반환
    if (res.ok) {
      return res;
    }
    if (res.status === 400) {
      return res;
    }
    if (res.status === 401) {
      const result = await res.json();
      if (result.code === TOKEN_EXPIRED) {
        await revalidateRefreshToken();
        res = await fetchData(input, init);
        return res;
      }
      if (result.code === REFRESH_EXPIRED || result.code === UNAUTHORIZED) {
        window.location.href = "/login";
        await loginApi.logout();
        console.error("fetchWithAuth :: 인증 만료");
      }
      res = await fetchData(input, init);
      return res;
    }
    // 그 외 에러는 콘솔에 로그만 남기고 응답 반환
    console.error("API Error:", res.status, res.statusText);
    return res;
  } catch (error) {
    console.error("Fetch error:", error);
    await loginApi.logout();
    throw error;
  }
}
let refreshInFlight: Promise<void> | null = null;
export async function revalidateRefreshToken() {
  if (refreshInFlight) {
    return await refreshInFlight;
  }

  refreshInFlight = (async () => {
    const resposne = await fetch(`/api/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resposne.ok) {
      await loginApi.logout();
      window.location.href = "/login";
      throw new Error("로그인되어있지 않습니다. 로그인해주세요.");
    }
  })();

  try {
    await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}
