"use client";
import { useState } from "react";
import PaymentCheckoutSection from "@/components/shared/payment/PaymentCheckoutSection";
import type { PaymentUiItem } from "@/components/shared/payment/PaymentCheckoutSection";
import type { PaymentRequestItem } from "@/types/payment";

/**
 * 결제 상세 페이지
 * 신청 페이지에서 세션 스토리지에 저장된 데이터를 읽어 결제 정보를 표시합니다.
 */

interface PaymentItem {
  title: string;
  price: number;
  courseId: number;
  applicationId: number;
  dogId: number;
}

export default function PaymentDetailPage() {
  // useState의 lazy initialization으로 세션 스토리지에서 초기 데이터 로드
  const [items] = useState<PaymentItem[]>(() => {
    // 세션 스토리지에 JSON 배열 형태로 저장된 selectedApplications 읽기
    const raw = sessionStorage.getItem("selectedApplications");
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      const normalized = parsed
        .map((it) => ({
          title: typeof it?.title === "string" ? it.title : "",
          price: Number(it?.price ?? 0),
          courseId: Number(it?.courseId ?? 0),
          applicationId: Number(it?.applicationId ?? 0),
          dogId: Number(it?.dogId ?? 0),
        }))
        .filter((it) => it.title !== "" && !Number.isNaN(it.price));

      return normalized;
    } catch {
      return [];
    }
  });
  const paymentRequestItems: PaymentRequestItem[] = items.map((it) => ({
    courseId: it.courseId,
    applicationId: it.applicationId,
  }));
  const totalAmount = items.reduce((sum, it) => sum + it.price, 0);

  // CheckoutSection에 UI 전용 아이템 전달 (그룹핑은 내부에서 수행)
  const uiItems: PaymentUiItem[] = items.map((it) => ({
    courseId: it.courseId,
    dogId: it.dogId,
    applicationId: it.applicationId,
    price: it.price,
    title: it.title,
  }));

  return (
    <div className="w-full h-full">
      <div className="">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 헤더 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">결제하기</h1>

          <PaymentCheckoutSection
            paymentRequestItems={paymentRequestItems}
            totalAmount={totalAmount}
            uiItems={uiItems}
          />

          {/* 안내 문구 */}
          <p className="text-sm text-gray-500 text-center mt-4">
            결제 시 토스페이먼츠 결제창으로 이동합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
