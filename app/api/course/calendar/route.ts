import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/course/calendar - 달력 조회 (세션 날짜 목록)
export async function GET(req: NextRequest) {
  const cookie = await cookies();
  const { searchParams } = new URL(req.url);

  const params = new URLSearchParams();

  // 필수 파라미터
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "시작 날짜와 종료 날짜는 필수입니다." },
      { status: 400 }
    );
  }

  params.append("startDate", startDate);
  params.append("endDate", endDate);

  // 선택적 파라미터
  if (searchParams.has("keyword")) {
    params.append("keyword", searchParams.get("keyword")!);
  }
  if (searchParams.has("lessonForm")) {
    params.append("lessonForm", searchParams.get("lessonForm")!);
  }

  const url = `${API_BASE_URL}/course/calendar?${params}`;

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
      .catch(() => ({ message: "달력 데이터를 불러오는데 실패했습니다." }));
    return NextResponse.json(
      { error: errorData.message || "달력 데이터를 불러오는데 실패했습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
