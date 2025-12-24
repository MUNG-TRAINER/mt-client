import {API_BASE_URL} from "@/util/env";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{trainerId: string}>},
) {
  const {trainerId} = await params;
  const res = await fetch(`${API_BASE_URL}/users/trainer/${trainerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    console.error("getTrainer");
  }
  const result = await res.json();
  return NextResponse.json({...result});
}
