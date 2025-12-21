import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function DELETE(req: NextRequest) {
  const cookie = await cookies();
  const requestBody = await req.json();
  const res = await fetch(`${API_BASE_URL}/application`, {
    method: "DELETE",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({applicationId: requestBody}),
  });

  if (!res.ok) {
    throw new Error("훈련신청 취소에 실패했습니다.");
  }
  return NextResponse.json({data: {success: true}});
}
