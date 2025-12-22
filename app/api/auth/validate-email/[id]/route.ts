import {ICheckIdType} from "@/types/join/checkIdType";
import {API_BASE_URL} from "@/util/env";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/auth/validate-email/[id]">,
) {
  const {id} = await ctx.params;
  const response = await fetch(`${API_BASE_URL}/auth/check-email?email=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    //배포시삭제
    const text = await response.text();
    return NextResponse.json({
      valid: false,
      message: "서버에 오류가 발생했습니다.",
      text,
    });
  }
  const result: ICheckIdType = await response.json();
  return NextResponse.json({...result});
}
