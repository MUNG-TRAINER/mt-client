import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/course/sessions/search - 훈련 세션 검색 (회차별 - 캘린더용)
export async function GET(req: NextRequest) {
  const cookie = await cookies();
  const { searchParams } = new URL(req.url);

  const params = new URLSearchParams();

  // 쿼리 파라미터 전달
  if (searchParams.has("keyword")) {
    params.append("keyword", searchParams.get("keyword")!);
  }
  if (searchParams.has("lastSessionId")) {
    params.append("lastSessionId", searchParams.get("lastSessionId")!);
  }
  if (searchParams.has("size")) {
    params.append("size", searchParams.get("size")!);
  }
  if (searchParams.has("lessonForm")) {
    params.append("lessonForm", searchParams.get("lessonForm")!);
  }
  if (searchParams.has("year")) {
    params.append("year", searchParams.get("year")!);
  }
  if (searchParams.has("month")) {
    params.append("month", searchParams.get("month")!);
  }
  if (searchParams.has("day")) {
    params.append("day", searchParams.get("day")!);
  }

  const queryString = params.toString();
  const url = queryString
    ? `${API_BASE_URL}/course/sessions/search?${queryString}`
    : `${API_BASE_URL}/course/sessions/search`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "훈련 세션 검색에 실패했습니다." }));
    return NextResponse.json(
      { error: errorData.message || "훈련 세션 검색에 실패했습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
