import {ICheckIdType} from "@/types/join/checkIdType";
import {API_BASE_URL} from "@/util/env";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  _req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  const param = await params;
  try {
    const res = await fetch(
      `${API_BASE_URL}/auth/check-username?username=${encodeURIComponent(param.id)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      //배포시삭제
      const text = await res.text();
      return NextResponse.json({
        valid: false,
        message: "서버에 오류가 발생했습니다.",
        text,
      });
    }
    const result: ICheckIdType = await res.json();
    return NextResponse.json({...result});
  } catch (error) {
    const err = error as Error;
    console.error(err);
    return NextResponse.json({
      message: "서버에 오류가 발생했습니다.",
      errMsg: err.message,
    });
  }
}
