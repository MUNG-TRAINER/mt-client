import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// PATCH /api/counseling/:id/content - 상담 내용 작성 및 완료 상태 변경
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookie = await cookies();
  const { id } = await params;
  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/trainer/counseling/${id}/content`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie.toString(),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "상담 내용 저장에 실패했습니다." }));
    return NextResponse.json(
      { error: errorData.message || "상담 내용 저장에 실패했습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
