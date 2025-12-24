import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  context:
    | { params: { dogId: string } }
    | Promise<{ params: { dogId: string } }>
) {
  const cookie = await cookies();
  try {
    const { params } = await context;
    const { dogId } = params;

    const response = await fetch(`${API_BASE_URL}/trainer/user/dogs/${dogId}`, {
      method: "GET",
      headers: {
        Cookie: cookie.toString(),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: errorText || "반려견 통계를 불러오는데 실패하였습니다." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("반려견 통계 조회 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
