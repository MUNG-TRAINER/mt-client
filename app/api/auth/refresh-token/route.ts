import {
  cookieExtractor,
  NAME_ACCESS_TOKEN,
  NAME_REFRESH_TOKEN,
} from "@/util/cookieExtractor";
import {API_BASE_URL} from "@/util/env";
import {REFRESH_EXPIRED} from "@/util/variables";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function POST() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  if (!res.ok) {
    const data = await res.json();
    const result = NextResponse.json({...data});
    if (data.code === REFRESH_EXPIRED) {
      result.cookies.set(NAME_REFRESH_TOKEN, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      result.cookies.set(NAME_ACCESS_TOKEN, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
    }
    console.error("refresh token발급에 실패하였습니다.");
    return result;
  }
  const data = await res.json();
  const result = NextResponse.json({...data});
  const headerCookie = res.headers.getSetCookie();
  const {ACCESS_TOKEN, accessMaxAge, REFRESH_TOKEN, refreshMaxAge} =
    cookieExtractor(headerCookie);
  result.cookies.set(NAME_ACCESS_TOKEN, ACCESS_TOKEN, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: Number(accessMaxAge),
    secure: process.env.NODE_ENV === "production",
  });
  result.cookies.set(NAME_REFRESH_TOKEN, REFRESH_TOKEN, {
    httpOnly: true,
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: Number(refreshMaxAge),
    secure: process.env.NODE_ENV === "production",
  });
  return result;
}
