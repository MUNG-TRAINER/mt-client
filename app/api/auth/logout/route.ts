import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";

export async function GET() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  return res;
}
