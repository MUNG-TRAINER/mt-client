import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/util/env";
import type { PaymentLogResponse, PaymentErrorResponse } from "@/types/payment";

/**
 * 결제 내역 조회 API 라우트
 */
export async function GET() {
  try {
    const cookie = await cookies();

    const response = await fetch(`${API_BASE_URL}/payments/logs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie.toString(),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json<PaymentErrorResponse>(
        { error: errorData.message || "결제 내역 조회에 실패했습니다." },
        { status: response.status },
      );
    }

    const data: PaymentLogResponse[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("결제 내역 조회 오류:", error);
    return NextResponse.json<PaymentErrorResponse>(
      { error: "결제 내역 조회 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
