import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

// /api/wishlist/dogs GET (조회)
export async function GET() {
    const cookie = await cookies();
    const res = await fetch(`${API_BASE_URL}/wishlist/dogs`, {
      method: "GET",
      headers: {
        Cookie: cookie.toString(),
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("반려견 리스트를 가져오는데 실패했습니다.");
    }
    const data = await res.json();
    return NextResponse.json({data});
  }