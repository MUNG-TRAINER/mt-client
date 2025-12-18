import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/dogs - 내 반려견 목록 조회
export async function GET() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/dogs`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
    },
  });

  if (!res.ok) {
    throw new Error("반려견 목록을 불러올 수 없습니다.");
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// POST /api/dogs - 반려견 등록
export async function POST(req: NextRequest) {
  const cookie = await cookies();
  const json = await req.json();
  const res = await fetch(`${API_BASE_URL}/dogs`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    throw new Error("반려견 등록에 실패했습니다.");
  }

  const data = await res.json();
  return NextResponse.json(data);
}
