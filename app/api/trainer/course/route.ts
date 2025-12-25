import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  const cookieStore = await cookies();
  const res = await fetch(
    `${API_BASE_URL}/trainer/course${status ? `?status=${status}` : ""}`,

    {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const data = await res.json();
    return NextResponse.json(
      {
        code: data.code,
        message: data.message || "훈련과정 내역을 불러오는데 실패했습니다.",
      },
      {status: res.status},
    );
  }
  const data = await res.json();
  return NextResponse.json({data});
}
