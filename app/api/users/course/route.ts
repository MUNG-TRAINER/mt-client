import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const cookieStore = cookies();
  // 모든 쿠키를 문자열로 연결
  const cookieHeader = (await cookieStore).getAll().map(c => `${c.name}=${c.value}`).join("; ");


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/course${status ? `?status=${status}` : ""}`,
    {
        headers: {
            Cookie: cookieHeader,
            "Content-Type": "application/json",
          },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch failed:", text);
    throw new Error("훈련과정 내역을 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return NextResponse.json(data);
}
