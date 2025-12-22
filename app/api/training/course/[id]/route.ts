import {API_BASE_URL} from "@/util/env";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  _req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  const {id} = await params;
  const res = await fetch(`${API_BASE_URL}/course/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("훈련과정을 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  return NextResponse.json({...data});
}
