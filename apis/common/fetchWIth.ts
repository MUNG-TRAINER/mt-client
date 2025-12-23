"use server";
import {cookies} from "next/headers";

export async function ensureAccessToken() {
  const cookieStore = await cookies();

  if (cookieStore.get("access_token")) return;

  const refreshRes = await fetch(`/api/auth/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
  });

  if (!refreshRes.ok) {
    const a = await refreshRes.text();
    console.log(a);
    throw new Error("UNAUTHORIZED");
  }
}
