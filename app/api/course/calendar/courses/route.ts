import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/course/calendar/courses - 특정 날짜의 코스 목록 조회
export async function GET(req: NextRequest) {
  const cookie = await cookies();
  const { searchParams } = new URL(req.url);

  const params = new URLSearchParams();

  // 필수 파라미터
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "날짜는 필수입니다." }, { status: 400 });
  }

  params.append("date", date);

  // 선택적 파라미터
  if (searchParams.has("keyword")) {
    params.append("keyword", searchParams.get("keyword")!);
  }
  if (searchParams.has("lessonForm")) {
    params.append("lessonForm", searchParams.get("lessonForm")!);
  }

  const url = `${API_BASE_URL}/course/calendar/courses?${params}`;

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
      .catch(() => ({ message: "코스 목록을 불러오는데 실패했습니다." }));
    return NextResponse.json(
      { error: errorData.message || "코스 목록을 불러오는데 실패했습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
