import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/util/env";

/**
 * 출석 목록 조회 API
 * GET /api/trainer/course/[courseId]/session/[sessionId]/attendance
 */
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      courseId: string;
      sessionId: string;
    }>;
  }
) {
  const { courseId, sessionId } = await params;

  try {
    const cookie = req.headers.get("cookie");

    const response = await fetch(
      `${API_BASE_URL}/trainer/course/${courseId}/session/${sessionId}/attendance`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookie && { Cookie: cookie }),
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "출석 목록을 불러오는데 실패했습니다.", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("출석 목록 조회 에러:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
