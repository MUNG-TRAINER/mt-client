import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// PATCH /api/users/me/public-status - 프로필 공개 여부 변경
export async function PATCH(req: NextRequest) {
  const cookie = await cookies();
  const json = await req.json();
  const res = await fetch(`${API_BASE_URL}/users/me/public-status`, {
    method: "PATCH",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "프로필 공개 설정 변경에 실패했습니다." }));
    return NextResponse.json(
      {
        error: errorData.message || "프로필 공개 설정 변경에 실패했습니다.",
      },
      { status: res.status }
    );
  }

  return new NextResponse(null, { status: 200 });
}
