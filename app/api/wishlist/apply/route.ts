import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

// 요청 바디 타입 정의
interface WishlistApplyRequest {
  wishlistItemId: number;
  dogId: number;
  courseId: number;
}

// /api/wishlist/apply POST
export async function POST(req: NextRequest) {
  const bodyRaw = await req.text();
  const body = JSON.parse(bodyRaw) as WishlistApplyRequest[];

  const cookieStore = await cookies();
  const res = await fetch(`${API_BASE_URL}/wishlist/apply`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("찜 항목을 신청으로 전환하는데 실패했습니다.");
  }

  const data = await res.json();
  return NextResponse.json({
    message: "찜 항목이 신청으로 전환되었습니다.",
    data,
  });
}