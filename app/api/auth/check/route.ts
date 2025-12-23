import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/auth/check`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    console.log(await res.json());
    const response = NextResponse.json(
      {message: "유저의 정보를 불러올 수 없습니다."},
      {status: res.status},
    );
    return response;
  }
  const data = await res.json();
  // 백엔드에서 이미 {data: {...}} 형태로 오는 경우와 직접 {...} 형태로 오는 경우 모두 처리
  const response = NextResponse.json(data.data ? data : {data});

  return response;
}
