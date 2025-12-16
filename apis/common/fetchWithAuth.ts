"use client";
import {API_BASE_URL} from "@/util/env";

const TOKEN_EXPRIED = "TOKEN_EXPRIED";
const UNAUTHORIZED = "UNAUTHORIZED";
const REFRESH_EXPRIED = "REFRESH_EXPRIED";

export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {}
) {
  try {
    let res = await fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 400) {
      return res.json();
    }
    const result = await res.json();

    if (res.status === 401) {
      if (result.code === TOKEN_EXPRIED) {
        await refreshToken();
        res = await fetch(input, {
          ...init,
          credentials: "include",
        });
      }
      if (result.code === REFRESH_EXPRIED || result.code === UNAUTHORIZED) {
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
