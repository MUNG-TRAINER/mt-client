import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function PATCH(req: NextRequest) {
  const cookie = await cookies();
  const requestBody = await req.json();
  const res = await fetch(`${API_BASE_URL}/auth/fcm-token`, {
    method: "PATCH",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    cache: "no-cache",
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Error Update FCMTOKEN :: ", text);
    return NextResponse.json(
      {success: false, message: "FCM토큰 업데이트에 실패했습니다."},
      {status: res.status},
    );
  }
  return NextResponse.json({success: false, message: "FCM토큰 업데이트 성공."});
}
