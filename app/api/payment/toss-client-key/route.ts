import { NextResponse } from "next/server";
import type { PaymentErrorResponse } from "@/types/payment";
import type { TossClientKeyResponse } from "@/types/payment";

export async function GET(): Promise<
  NextResponse<TossClientKeyResponse | PaymentErrorResponse>
> {
  const clientKey = process.env.TOSS_CLIENT_KEY;

  if (!clientKey) {
    return NextResponse.json(
      { error: "TOSS_CLIENT_KEY가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  return NextResponse.json({ clientKey });
}
