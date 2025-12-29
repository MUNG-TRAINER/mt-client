import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const reqBody = await req.json();

    const res = await fetch(`${API_BASE_URL}/trainer/me`, {
      method: "PATCH",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "프로필 업로드에 실패하였습니다." },
        { status: res.status },
      );
    }

    const data = await res.json();

    // ✅ 반드시 Response / NextResponse
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
