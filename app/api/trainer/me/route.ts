import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function PATCH(req: NextResponse) {
  const cookie = await cookies();
  const reqBody = req.json();
  const res = await fetch(`${API_BASE_URL}/trainer/me`, {
    method: "PATCH",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  if (!res?.ok) {
    throw new Error("프로필 업로드에 실패하였습니다.");
  }
  return await res.json();
}
