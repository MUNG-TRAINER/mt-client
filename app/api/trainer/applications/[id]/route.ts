import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookie = await cookies();

  try {
    const body = await request.json();
    const applicationId = params.id;

    const response = await fetch(
      `${API_BASE_URL}/trainer/applications/${applicationId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: cookie.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: errorText || "상태 변경에 실패했습니다." },
        { status: response.status }
      );
    }

    const message = await response.text();
    return new NextResponse(message, { status: 200 });
  } catch (error) {
    console.error("신청 상태 변경 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
