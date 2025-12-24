import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookie = await cookies();

  try {
    const response = await fetch(`${API_BASE_URL}/trainer/users`, {
      method: "GET",
      headers: {
        Cookie: cookie.toString(),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: errorText || "회원 목록을 불러오는데 실패하였습니다." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("훈련사 회원 목록 조회 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
