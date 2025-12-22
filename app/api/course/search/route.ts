import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/course/search - 훈련 과정 검색
export async function GET(req: NextRequest) {
  const cookie = await cookies();
  const { searchParams } = new URL(req.url);

  const params = new URLSearchParams();

  // 쿼리 파라미터 전달
  if (searchParams.has("keyword")) {
    params.append("keyword", searchParams.get("keyword")!);
  }
  if (searchParams.has("lastCourseId")) {
    params.append("lastCourseId", searchParams.get("lastCourseId")!);
  }
  if (searchParams.has("size")) {
    params.append("size", searchParams.get("size")!);
  }
  if (searchParams.has("lessonForm")) {
    params.append("lessonForm", searchParams.get("lessonForm")!);
  }

  const queryString = params.toString();
  const url = queryString
    ? `${API_BASE_URL}/course/search?${queryString}`
    : `${API_BASE_URL}/course/search`;

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
      .catch(() => ({ message: "훈련 과정 검색에 실패했습니다." }));
    return NextResponse.json(
      { error: errorData.message || "훈련 과정 검색에 실패했습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
