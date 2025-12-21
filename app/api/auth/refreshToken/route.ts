import {cookieExtractor, NAME_ACCESS_TOKEN} from "@/util/cookieExtractor";
import {API_BASE_URL} from "@/util/env";
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
  });
  if (!res.ok) {
    throw new Error("refresh token발급에 실패하였습니다.");
  }
  const data = await res.json();
  const result = NextResponse.json({data});
  const headerCookie = res.headers.getSetCookie();
  const {ACCESS_TOKEN, accessMaxAge} = cookieExtractor(headerCookie);
  result.cookies.set(NAME_ACCESS_TOKEN, ACCESS_TOKEN, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: Number(accessMaxAge),
    secure: process.env.NODE_ENV === "production",
  });
  return result;
}
