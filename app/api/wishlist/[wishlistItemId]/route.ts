import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextResponse, NextRequest} from "next/server";

interface WishlistUpdateRequest {
  dogId: number;
}

export async function PATCH(
  req: NextRequest,
  context: {params: Promise<{wishlistItemId: string}>}
) {
  try {
    const {wishlistItemId} = await context.params;

    const bodyText = await req.text();

    let body: WishlistUpdateRequest;
    try {
      body = JSON.parse(bodyText) as WishlistUpdateRequest;
    } catch (e) {
      return NextResponse.json(
        {message: "잘못된 요청 형식입니다."},
        {status: 400}
      );
    }

    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const url = `${API_BASE_URL}/wishlist/${wishlistItemId}`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Cookie: cookieString,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        {message: "찜 항목 수정에 실패했습니다.", error: text},
        {status: res.status}
      );
    }

    const responseText = await res.text();

    let data = {};
    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        // 빈 응답으로 처리
      }
    }

    return NextResponse.json({message: "찜 항목 수정 완료", data});
  } catch (error) {
    console.error("PATCH 핸들러 에러:", error);
    return NextResponse.json(
      {message: "서버 에러", error: String(error)},
      {status: 500}
    );
  }
}