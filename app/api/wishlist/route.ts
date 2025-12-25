import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

interface WishlistDeleteRequest {
  wishlistItemId: number[];
}

// /api/wishlist GET (조회)
export async function GET() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/wishlist`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("찜 한 내역 리스트를 불러오는데 실패했습니다.");
  }
  const data = await res.json();
  return NextResponse.json({data});
}

// /api/wishlist POST (생성)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // { courseId: number, dogId: number }

    const cookieStore = await cookies();
    const res = await fetch(`${API_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

   
    // 먼저 text로 읽기
    const text = await res.text();

    // JSON이면 파싱, 아니면 null
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      return NextResponse.json(
        {
          code: data.code ?? "WISHLIST_FAILED",
          message: data.message ?? "찜 항목 생성에 실패했습니다",
        },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "찜 항목 생성 완료" },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { code: "WISHLIST_FAILED", message: e.message },
      { status: 500 }
    );
  }
}


// /api/wishlist DELETE (여러 개 삭제)
export async function DELETE(req: NextRequest) {
  const body: WishlistDeleteRequest = await req.json();

  const cookieStore = await cookies();
  const res = await fetch(`${API_BASE_URL}/wishlist`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("찜 항목 삭제에 실패했습니다.");
  }

  return NextResponse.json({message: "선택한 찜 항목 삭제 완료"});
}