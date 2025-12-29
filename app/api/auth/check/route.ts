import {NAME_ACCESS_TOKEN, NAME_REFRESH_TOKEN} from "@/util/cookieExtractor";
import {API_BASE_URL} from "@/util/env";
import {REFRESH_EXPIRED} from "@/util/variables";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

function wrapData(data: unknown) {
  return data && typeof data === "object" && "data" in data ? data : {data};
}

function getSetCookieValue(setCookies: string[], name: string) {
  for (const cookie of setCookies) {
    const parts = cookie.split(";").map((p) => p.trim());
    const [key, value] = parts[0].split("=");
    if (key !== name) continue;
    const maxAgePart = parts.find((p) => p.startsWith("Max-Age="));
    const maxAge = maxAgePart ? maxAgePart.split("=")[1] : undefined;
    return {value, maxAge};
  }
  return null;
}

export async function GET() {
  const cookie = await cookies();
  const cookieHeader = cookie.toString();

  const res = await fetch(`${API_BASE_URL}/auth/check`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      {message: "유저의 정보를 불러올 수 없습니다."},
      {status: res.status},
    );
  }

  const data = await res.json();
  const responseData = wrapData(data);

  const hasRefreshToken = !!cookie.get(NAME_REFRESH_TOKEN);
  if (data?.code !== "ANONYMOUS" || !hasRefreshToken) {
    return NextResponse.json(responseData);
  }

  const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!refreshRes.ok) {
    const refreshData = await refreshRes.json().catch(() => null);
    const response = NextResponse.json(responseData);
    if (refreshData?.code === REFRESH_EXPIRED) {
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
    }
    return response;
  }

  const setCookies = refreshRes.headers.getSetCookie();
  const access = getSetCookieValue(setCookies, NAME_ACCESS_TOKEN);
  const refresh = getSetCookieValue(setCookies, NAME_REFRESH_TOKEN);

  const mergedCookieHeader =
    cookieHeader +
    (access ? `; ${NAME_ACCESS_TOKEN}=${access.value}` : "") +
    (refresh ? `; ${NAME_REFRESH_TOKEN}=${refresh.value}` : "");

  const res2 = await fetch(`${API_BASE_URL}/auth/check`, {
    method: "GET",
    headers: {
      Cookie: mergedCookieHeader,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data2 = res2.ok ? await res2.json() : data;
  const response = NextResponse.json(wrapData(data2), {status: res2.status});

  if (access) {
    response.cookies.set(NAME_ACCESS_TOKEN, access.value, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: access.maxAge ? Number(access.maxAge) : undefined,
      secure: process.env.NODE_ENV === "production",
    });
  }
  if (refresh) {
    response.cookies.set(NAME_REFRESH_TOKEN, refresh.value, {
      httpOnly: true,
      path: "/",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: refresh.maxAge ? Number(refresh.maxAge) : undefined,
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response;
}
