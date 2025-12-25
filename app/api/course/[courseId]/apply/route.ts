import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const cookieStore = await cookies();
  const body = await req.json();

  const res = await fetch(
    `${API_BASE_URL}/api/course/${params.courseId}/apply`,
    {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "훈련 과정 신청에 실패했습니다.");
  }

  const data = await res.json();
  return NextResponse.json({ data });
}
