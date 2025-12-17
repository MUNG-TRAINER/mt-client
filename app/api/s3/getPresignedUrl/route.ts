import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const cookie = await cookies();
  const data = await req.json();
  const response = await fetch(`${API_BASE_URL}/presigned-url`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response?.ok) {
    throw new Error("Presigned URL 발급에 실패했습니다.");
  }

  const result = await response.json();
  const presignedUrl: string = result.uploadUrl;
  return NextResponse.json({presignedUrl});
}
