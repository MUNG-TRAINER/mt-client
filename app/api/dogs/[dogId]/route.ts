import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/dogs/[dogId] - 반려견 상세 조회
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ dogId: string }> }
) {
  const cookie = await cookies();
  const { dogId } = await params;
  const res = await fetch(`${API_BASE_URL}/dogs/${dogId}`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
    },
  });

  if (!res.ok) {
    throw new Error("반려견 정보를 불러올 수 없습니다.");
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// PATCH /api/dogs/[dogId] - 반려견 수정
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ dogId: string }> }
) {
  const cookie = await cookies();
  const { dogId } = await params;
  const json = await req.json();
  const res = await fetch(`${API_BASE_URL}/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    throw new Error("반려견 정보 수정에 실패했습니다.");
  }

  return new NextResponse(null, { status: 204 });
}

// DELETE /api/dogs/[dogId] - 반려견 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ dogId: string }> }
) {
  const cookie = await cookies();
  const { dogId } = await params;
  const res = await fetch(`${API_BASE_URL}/dogs/${dogId}`, {
    method: "DELETE",
    headers: {
      Cookie: cookie.toString(),
    },
  });

  if (!res.ok) {
    throw new Error("반려견 삭제에 실패했습니다.");
  }

  return new NextResponse(null, { status: 204 });
}
