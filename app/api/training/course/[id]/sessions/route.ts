import {API_BASE_URL} from "@/util/env";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  const {id: courseId} = await params;
  const res = await fetch(`${API_BASE_URL}/course/${courseId}/sessions`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });
  if (!res.ok) {
    throw new Error("회차 정보를 가져오는데 실패했습니다.");
  }
  const result = await res.json();
  return NextResponse.json([...result]);
}
