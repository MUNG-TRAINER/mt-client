import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/auth/join/trainer`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  if (!res.ok) {
    const data = await res.json();
    return NextResponse.json({...data});
  }
  return NextResponse.json({success: true});
}
