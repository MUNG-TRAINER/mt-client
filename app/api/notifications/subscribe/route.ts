import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/api/notifications/subscribe`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      Accept: "text/event-stream",
    },
  });

  return new NextResponse(res.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
