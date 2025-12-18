import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  const cookie = await cookies();
  const json = await req.json();
  const res = await fetch(`${API_BASE_URL}/trainer/course`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  if (!res.ok) {
    //에러처리메세지 사용자에게 전달하는 코드
    throw new Error("훈련과정 저장에 실패했습니다.");
  }
  const result = await res.json();
  return NextResponse.json({result});
}
