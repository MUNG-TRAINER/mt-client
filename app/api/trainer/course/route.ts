import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");

  const cookieStore = await cookies();
  // 모든 쿠키를 문자열로 연결

  const res = await fetch(
    `${API_BASE_URL}/trainer/course${status ? `?status=${status}` : ""}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("훈련과정 내역을 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  return NextResponse.json({data});
}
