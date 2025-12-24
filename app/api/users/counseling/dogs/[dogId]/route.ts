import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// GET /api/users/counseling/dogs/:dogId - 상담 신청용 반려견 정보 조회
export async function GET(
  request: Request,
  { params }: { params: Promise<{ dogId: string }> }
) {
  const { dogId } = await params;
  const cookie = await cookies();

  const res = await fetch(`${API_BASE_URL}/users/counseling/dogs/${dogId}`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "반려견 정보를 불러올 수 없습니다." }));
    return NextResponse.json(
      { error: errorData.message || "반려견 정보를 불러올 수 없습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
