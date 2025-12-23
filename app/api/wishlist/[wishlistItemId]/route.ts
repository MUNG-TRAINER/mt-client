import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextResponse, NextRequest} from "next/server";

interface WishlistUpdateRequest {
  dogId: number;
}

export async function PATCH(
  req: NextRequest,
  {params}: {params: {wishlistItemId: string}}
) {
  const wishlistItemId = params.wishlistItemId;

  const body = (await req.json()) as WishlistUpdateRequest;

  const res = await fetch(`${API_BASE_URL}/wishlist/${wishlistItemId}`, {
    method: "PATCH",
    headers: {
      Cookie: req.headers.get("cookie") ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("백엔드 PATCH 에러:", text);
    return NextResponse.json(
      {message: "찜 항목 수정에 실패했습니다."},
      {status: res.status}
    );
  }

  return NextResponse.json({message: "찜 항목 수정 완료"});
}
