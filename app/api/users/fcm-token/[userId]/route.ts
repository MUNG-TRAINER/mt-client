import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{userId: string}>},
) {
  const cookie = await cookies();
  const {userId} = await params;
  const res = await fetch(`${API_BASE_URL}/users/fcm-token/${userId}`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return NextResponse.json({
      success: false,
      message: "유저의 FCM토큰을 불러오는데 실패했습니다.",
    });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
