"use client";
import { API_BASE_URL } from "@/util/env";

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
    if (res.status === 401) {
      await refreshToken();
      res = await fetch(input, {
        ...init,
        credentials: "include",
      });
    }
    if (res.status === 400) {
      return await res.json();
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
