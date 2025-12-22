import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ courseId: string; sessionId: string; userName: string }>;
  }
) {
  const { courseId, sessionId, userName } = await params;
  const cookieStore = await cookies();
  const body = await request.json();

  const res = await fetch(
    `${API_BASE_URL}/trainer/course/${courseId}/session/${sessionId}/attendance/${encodeURIComponent(
      userName
    )}`,
    {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "출석 상태 변경에 실패했습니다." },
      { status: res.status }
    );
  }

  return NextResponse.json({ success: true });
}
