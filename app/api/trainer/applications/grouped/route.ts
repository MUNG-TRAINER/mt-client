import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookie = await cookies();

  try {
    const response = await fetch(
      `${API_BASE_URL}/trainer/applications/grouped`,
      {
        method: "GET",
        headers: {
          Cookie: cookie.toString(),
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: errorText || "그룹핑된 목록 조회에 실패했습니다." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("그룹핑된 승인 대기 목록 조회 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
