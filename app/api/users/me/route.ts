import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users/me - 내 정보 조회
export async function GET() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
    },
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "유저의 정보를 불러올 수 없습니다." }));
    return NextResponse.json(
      { error: errorData.message || "유저의 정보를 불러올 수 없습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// PUT /api/users/me - 내 정보 수정
export async function PUT(req: NextRequest) {
  const cookie = await cookies();
  const json = await req.json();
  const res = await fetch(`${API_BASE_URL}/users/me`, {
    method: "PUT",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "사용자 정보를 수정할 수 없습니다." }));
    return NextResponse.json(
      { error: errorData.message || "사용자 정보를 수정할 수 없습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
