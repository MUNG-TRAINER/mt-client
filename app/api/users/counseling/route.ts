import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users/counseling - 내 상담 목록 조회
export async function GET() {
  const cookie = await cookies();

  const res = await fetch(`${API_BASE_URL}/users/counseling`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "상담 목록을 불러올 수 없습니다." }));
    return NextResponse.json(
      { error: errorData.message || "상담 목록을 불러올 수 없습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// POST /api/users/counseling - 상담 신청
export async function POST(request: NextRequest) {
  const cookie = await cookies();
  const body = await request.json();

  const res = await fetch(`${API_BASE_URL}/users/counseling`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "상담 신청에 실패했습니다." }));
    return NextResponse.json(
      { error: errorData.message || "상담 신청에 실패했습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
