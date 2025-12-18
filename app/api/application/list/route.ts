import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/application/list`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("신청내역 리스트를 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  return NextResponse.json({data});
}
