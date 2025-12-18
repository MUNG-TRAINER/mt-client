import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/users/[userName]/dogs - 타인의 반려견 목록 조회
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userName: string }> }
) {
  const cookie = await cookies();
  const { userName } = await params;
  const res = await fetch(`${API_BASE_URL}/users/${userName}/dogs`, {
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
