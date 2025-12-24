import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// GET /api/users/counseling/:counselingId - 상담 상세 조회
export async function GET(
  request: Request,
  { params }: { params: Promise<{ counselingId: string }> }
) {
  const { counselingId } = await params;
  const cookie = await cookies();

  const res = await fetch(
    `${API_BASE_URL}/users/counseling/${counselingId}`,
    {
      method: "GET",
      headers: {
        Cookie: cookie.toString(),
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "상담 정보를 불러올 수 없습니다." }));
    return NextResponse.json(
      { error: errorData.message || "상담 정보를 불러올 수 없습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// DELETE /api/users/counseling/:counselingId - 상담 취소
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ counselingId: string }> }
) {
  const { counselingId } = await params;
  const cookie = await cookies();

  const res = await fetch(
    `${API_BASE_URL}/users/counseling/${counselingId}`,
    {
      method: "DELETE",
      headers: {
        Cookie: cookie.toString(),
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "상담 취소에 실패했습니다." }));
    return NextResponse.json(
      { error: errorData.message || "상담 취소에 실패했습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
