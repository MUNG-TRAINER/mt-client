import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// POST /api/auth/password - 비밀번호 변경
export async function POST(req: NextRequest) {
  const cookie = await cookies();
  const json = await req.json();
  const res = await fetch(`${API_BASE_URL}/auth/password`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "비밀번호 변경에 실패했습니다." }));
    return NextResponse.json(
      { error: errorData.message || "비밀번호 변경에 실패했습니다." },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
