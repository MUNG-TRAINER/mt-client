import {NAME_ACCESS_TOKEN, NAME_REFRESH_TOKEN} from "@/util/cookieExtractor";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("로그아웃하는데 실패하였습니다.");
  }
  const data = await res.json();
  const response = NextResponse.json({data});
  response.cookies.set(NAME_REFRESH_TOKEN, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  response.cookies.set(NAME_ACCESS_TOKEN, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return response;
}
