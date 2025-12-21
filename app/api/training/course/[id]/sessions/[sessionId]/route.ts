import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function PATCH(
  req: NextRequest,
  {params}: {params: Promise<{id: string; sessionId: string}>},
) {
  const cookie = await cookies();
  const {id, sessionId} = await params;
  const requestBody = await req.json();
  const res = await fetch(
    `${API_BASE_URL}/course/${id}/sessions/${sessionId}`,
    {
      method: "PATCH",
      headers: {
        Cookie: cookie.toString(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    },
  );
  if (res.status === 400) {
    const result = await res.json();
    return NextResponse.json({...result});
  }
  if (!res.ok) {
    const result = await res.json();
    return NextResponse.json({...result});
  }
  return NextResponse.json({success: true});
}
