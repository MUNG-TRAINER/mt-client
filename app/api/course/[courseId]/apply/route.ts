import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const cookieStore = await cookies();
  const body = await req.json();
  const param = await params;

  const res = await fetch(`${API_BASE_URL}/course/${param.courseId}/apply`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    try {
      // 백엔드 에러 응답을 JSON으로 파싱
      const errorBody = await res.json();
      return NextResponse.json(errorBody, { status: res.status });
    } catch {
      // JSON 파싱 실패 시 기본 에러 응답
      return NextResponse.json(
        { error: "APPLY_FAILED", message: "훈련 과정 신청에 실패했습니다." },
        { status: res.status }
      );
    }
  }

  const data = await res.json();
  return NextResponse.json({ data });
}
