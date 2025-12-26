import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/util/env";
import { cookies } from "next/headers";
import type {
  PaymentPrepareRequest,
  PaymentPrepareResponse,
  PaymentErrorResponse,
} from "@/types/payment";

/**
 * 결제 준비 - 주문 생성 및 merchantUid 발급
 */
export async function POST(
  req: Request,
): Promise<NextResponse<PaymentPrepareResponse | PaymentErrorResponse>> {
  try {
    const body: PaymentPrepareRequest = await req.json();
    const cookie = await cookies();

    const response = await fetch(`${API_BASE_URL}/payments/prepare`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie.toString(),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "결제 준비 중 오류가 발생했습니다.");
    }

    const data: PaymentPrepareResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment prepare error:", error);
    const errorResponse: PaymentErrorResponse = {
      error:
        error instanceof Error
          ? error.message
          : "결제 준비 중 오류가 발생했습니다.",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
