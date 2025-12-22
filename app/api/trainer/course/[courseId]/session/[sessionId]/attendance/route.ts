import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; sessionId: string }> }
) {
  const { courseId, sessionId } = await params;
  const cookieStore = await cookies();

  const res = await fetch(
    `${API_BASE_URL}/trainer/course/${courseId}/session/${sessionId}/attendance`,
    {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "출석 목록을 불러오는데 실패했습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
