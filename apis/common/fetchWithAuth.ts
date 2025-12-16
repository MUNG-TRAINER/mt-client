"use client";
import { API_BASE_URL } from "@/util/env";

const TOKEN_EXPIRED = "TOKEN_EXPIRED";
const UNAUTHORIZED = "UNAUTHORIZED";
const REFRESH_EXPIRED = "REFRESH_EXPIRED";

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
  init: RequestInit = {}
) {
  try {
    let res = await fetchData(input, init);
    if (res.status === 400) {
      return res.json();
    }
    const result = await res.json();
    if (res.status === 401) {
      if (result.code === TOKEN_EXPIRED) {
        await refreshToken();
        res = await fetchData(input, init);
      }
      if (result.code === REFRESH_EXPIRED || result.code === UNAUTHORIZED) {
        window.location.href = "/login";
      }
    }

    if (!res.ok) {
      window.location.href = "/login";
    }

    return res;
  } catch {
    window.location.href = "/login";
  }
}

async function refreshToken() {
  const resposne = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!resposne.ok) {
    window.location.href = "/login";
    throw new Error("로그인되어있지 않습니다. 로그인해주세요.");
  }
}
