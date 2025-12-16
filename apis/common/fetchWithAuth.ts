"use client";
import { API_BASE_URL } from "@/util/env";

export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {}
) {
  try {
    // Build headers safely: only set JSON content-type when appropriate
    const existingHeaders = new Headers(init.headers || {});
    const hasContentType = existingHeaders.has("Content-Type");
    const body = (init as any).body;
    const shouldSetJsonContentType =
      !hasContentType && (typeof body === "string" || body === undefined);

    const headers = new Headers(init.headers || {});
    if (shouldSetJsonContentType) {
      headers.set("Content-Type", "application/json");
    }

    let res = await fetch(input, {
      ...init,
      headers,
      credentials: "include",
    });
    if (res.status === 401) {
      await refreshToken();
      res = await fetch(input, {
        ...init,
        headers,
        credentials: "include",
      });
    }
    if (res.status === 400) {
      return await res.json();
    }
    if (!res.ok) {
      // window.location.href = "/login";
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
