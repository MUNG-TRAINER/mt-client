import {NextRequest, NextResponse} from "next/server";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";

export async function PATCH(
  request: NextRequest,
  {params}: {params: Promise<{courseId: string; dogId: string}>},
) {
  const cookie = await cookies();
  const {courseId, dogId} = await params;

  try {
    const body = await request.json();

    const response = await fetch(
      `${API_BASE_URL}/trainer/applications/bulk/${courseId}/dog/${dogId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log(errorText);
      return NextResponse.json(
        {message: errorText || "일괄 상태 변경에 실패했습니다."},
        {status: response.status},
      );
    }

    const data = await response.text();
    return NextResponse.json({message: data});
  } catch (error) {
    console.error("일괄 승인/거절 처리 에러:", error);
    return NextResponse.json(
      {message: "서버 오류가 발생했습니다."},
      {status: 500},
    );
  }
}
