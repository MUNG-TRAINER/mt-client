"use client";
import PaymentButton from "@/components/shared/payment/PaymentButton";
import useMe from "@/hooks/afterLogin/users/useMe";
import { PaymentRequestItem } from "@/types/payment";

interface PaymentCheckoutSectionProps {
  orderName: string;
  paymentRequestItems: PaymentRequestItem[];
  totalAmount: number;
  fallbackCustomerName?: string;
  fallbackCustomerEmail?: string;
}

export default function PaymentCheckoutSection({
  orderName,
  paymentRequestItems,
  totalAmount,
  fallbackCustomerName,
  fallbackCustomerEmail,
}: PaymentCheckoutSectionProps) {
  const { data: me } = useMe();
  const customerName = me?.name || fallbackCustomerName || "";
  const customerEmail = me?.email || fallbackCustomerEmail || "";

  return (
    <>
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
        orderName={orderName}
        customerName={customerName}
        customerEmail={customerEmail}
        className="w-full bg-(--mt-blue) text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-(--mt-blue-point) transition-colors"
      >
        결제하기
      </PaymentButton>
    </>
  );
}
