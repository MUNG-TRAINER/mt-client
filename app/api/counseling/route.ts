import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/counseling - 상담 리스트 조회
export async function GET(req: NextRequest) {
  const cookie = await cookies();
  const { searchParams } = new URL(req.url);
  const completed = searchParams.get("completed");

  const res = await fetch(
    `${API_BASE_URL}/trainer/counseling?completed=${completed}`,
    {
      method: "GET",
      headers: {
        Cookie: cookie.toString(),
      },
    }
  );

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "상담 리스트를 불러올 수 없습니다." }));
    return NextResponse.json(
      { error: errorData.message || "상담 리스트를 불러올 수 없습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
