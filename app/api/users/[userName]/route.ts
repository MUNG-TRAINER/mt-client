import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{userName: string}>},
) {
  const cookie = await cookies();
  const {userName} = await params;

  const res = await fetch(`${API_BASE_URL}/users/${userName}`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.log(await res.json());
    return NextResponse.json({
      success: false,
      message: "유저의 정보를 조회할 수 없습니다.",
    });
  }
  const result = await res.json();
  return NextResponse.json(result);
}
