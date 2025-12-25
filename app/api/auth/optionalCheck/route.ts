import {
  cookieExtractor,
  NAME_ACCESS_TOKEN,
  NAME_REFRESH_TOKEN,
} from "@/util/cookieExtractor";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return NextResponse.json({success: false});
  }

  const setCookies = res.headers.getSetCookie();
  const {ACCESS_TOKEN, REFRESH_TOKEN, accessMaxAge, refreshMaxAge} =
    cookieExtractor(setCookies);
  const response = NextResponse.json({success: true});
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
