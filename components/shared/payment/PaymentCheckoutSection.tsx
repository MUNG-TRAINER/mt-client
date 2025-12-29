"use client";
import { useMemo } from "react";
import PaymentButton from "@/components/shared/payment/PaymentButton";
import useMe from "@/hooks/afterLogin/users/useMe";
import { PaymentRequestItem } from "@/types/payment";

// (UI 전용) 페이지가 전달하는 결제 대상 아이템 최소 스펙
export interface PaymentUiItem {
  courseId: number;
  dogId: number;
  applicationId: number;
  price: number;
  title: string;
}

// (UI 전용) 코스-반려견 단위 그룹 메타
interface PaymentGroupMeta {
  courseId: number;
  dogId: number;
  applicationIds: number[];
  totalPrice: number;
  titles: string[];
}

interface PaymentCheckoutSectionProps {
  paymentRequestItems: PaymentRequestItem[];
  totalAmount: number;
  fallbackCustomerName?: string;
  fallbackCustomerEmail?: string;
  // UI 전용 데이터: 서버 전송에는 사용하지 않음
  uiItems?: PaymentUiItem[];
}

export default function PaymentCheckoutSection({
  paymentRequestItems,
  totalAmount,
  fallbackCustomerName,
  fallbackCustomerEmail,
  uiItems = [],
}: PaymentCheckoutSectionProps) {
  const { data: me } = useMe();
  const customerName = me?.name || fallbackCustomerName || "";
  const customerEmail = me?.email || fallbackCustomerEmail || "";

  // (UI 전용) courseId + dogId 기준 그룹핑 결과
  const groupedByCourseDog = useMemo<PaymentGroupMeta[]>(() => {
    const map = new Map<string, PaymentGroupMeta>();
    for (const it of uiItems) {
      const key = `${it.courseId}::${it.dogId}`;
      const exist = map.get(key);
      if (exist) {
        exist.totalPrice += it.price;
        if (!exist.titles.includes(it.title)) exist.titles.push(it.title);
        if (it.applicationId && it.applicationId > 0)
          exist.applicationIds.push(it.applicationId);
      } else {
        map.set(key, {
          courseId: it.courseId,
          dogId: it.dogId,
          applicationIds:
            it.applicationId && it.applicationId > 0 ? [it.applicationId] : [],
          totalPrice: it.price,
          titles: [it.title],
        });
      }
    }
    return Array.from(map.values());
  }, [uiItems]);

  return (
    <>
      {/* 코스-반려견 그룹 요약 (UI 전용) */}
      {groupedByCourseDog.length > 0 && (
        <div className="border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            상품 그룹
          </h2>
          <div className="space-y-3">
            {groupedByCourseDog.map((g) => (
              <div
                key={`${g.courseId}-${g.dogId}`}
                className="flex justify-between"
              >
                <div className="flex flex-col gap-1 text-sm">
                  {g.titles.map((t) => (
                    <span key={t} className="text-gray-600">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="font-medium">
                  {g.totalPrice.toLocaleString()}원
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 결제 금액 */}
      <div className="border-b pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">결제 금액</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">상품 금액</span>
            <span className="font-medium">
              {totalAmount.toLocaleString()}원
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold text-blue-600">
            <span>총 결제 금액</span>
            <span>{totalAmount.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      {/* 주문자 정보 */}
      <div className="border-b pb-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          주문자 정보
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">이름</span>
            <span className="font-medium">{customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">이메일</span>
            <span className="font-medium">{customerEmail}</span>
          </div>
        </div>
      </div>

      {/* 결제 버튼 */}
      <PaymentButton
        paymentRequestItems={paymentRequestItems}
        customerName={customerName}
        customerEmail={customerEmail}
        className="w-full bg-(--mt-blue) text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-(--mt-blue-point) transition-colors"
      >
        결제하기
      </PaymentButton>
    </>
  );
}
