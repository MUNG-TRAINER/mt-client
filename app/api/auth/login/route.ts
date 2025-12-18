import {NextResponse} from "next/server";
import {
  cookieExtractor,
  NAME_ACCESS_TOKEN,
  NAME_REFRESH_TOKEN,
} from "@/util/cookieExtractor";
import {API_BASE_URL} from "@/util/env";

export async function POST(req: Request) {
  const requestBody = await req.json();
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    throw new Error("로그인에 실패했습니다.");
  }

  const setCookies = res.headers.getSetCookie();

  const {ACCESS_TOKEN, REFRESH_TOKEN, accessMaxAge, refreshMaxAge} =
    cookieExtractor(setCookies);

  const data = await res.json();
  const response = NextResponse.json(data);

  response.cookies.set(NAME_ACCESS_TOKEN, ACCESS_TOKEN, {
    httpOnly: true,
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: Number(accessMaxAge),
    secure: process.env.NODE_ENV === "production",
  });

  response.cookies.set(NAME_REFRESH_TOKEN, REFRESH_TOKEN, {
    httpOnly: true,
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: Number(refreshMaxAge),
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
