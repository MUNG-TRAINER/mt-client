import {NextResponse} from "next/server";
import {cookieExtractor} from "@/util/cookieExtractor";
import {API_BASE_URL} from "@/util/env";

export async function POST(req: Request) {
  const body = await req.json();
  const datas = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const setCookies = datas.headers.getSetCookie();

  const {ACCESS_TOKEN, REFRESH_TOKEN, accessMaxAge, refreshMaxAge} =
    cookieExtractor(setCookies);

  const res = NextResponse.json({success: true});

  res.cookies.set("access_token", ACCESS_TOKEN, {
    maxAge: Number(accessMaxAge),
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.cookies.set("refresh_token", REFRESH_TOKEN, {
    maxAge: Number(refreshMaxAge),
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
