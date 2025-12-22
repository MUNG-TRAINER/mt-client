import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {API_BASE_URL} from "@/util/env";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");

  const cookieStore = await cookies();

  const res = await fetch(
    `${API_BASE_URL}/users/course${status ? `?status=${status}` : ""}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch failed:", text);
    throw new Error("훈련과정 내역을 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return NextResponse.json(data);
}
