import {ICheckIdType} from "@/types/join/checkIdType";
import {API_BASE_URL} from "@/util/env";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/auth/validate-username/[id]">,
) {
  const {id} = await ctx.params;
  const response = await fetch(
    `${API_BASE_URL}/auth/check-username?username=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const result: ICheckIdType = await response.json();
  if (!response.ok) {
    return NextResponse.json({
      valid: false,
      message: result.message || "서버에 오류가 발생했습니다.",
    });
  }
  return NextResponse.json({...result});
}
