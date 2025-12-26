// 결제 준비 요청
export interface PaymentPrepareRequest {
  courseIds: number[];
}

// 결제 준비 응답
export interface PaymentPrepareResponse {
  merchantUid: string;
  amount: number;
  isCompleted: boolean;
}

// 결제 승인 요청
export interface PaymentConfirmRequest {
  paymentKey: string;
  merchantUid: string;
  amount: number;
}

// 결제 승인 응답
export interface PaymentConfirmResponse {
  paymentKey: string;
  merchantUid: string;
  status: string;
  totalAmount: number;
  approvedAt: string;
}

// 결제 취소 요청
export interface PaymentCancelRequest {
  paymentKey: string;
  cancelReason: string;
  cancelAmount?: number;
}

// 결제 취소 응답
export interface PaymentCancelResponse {
  paymentKey: string;
  merchantUid: string;
  status: string;
  canceledAt: string;
  cancelAmount: number;
  cancelReason: string;
}

// 에러 응답
export interface PaymentErrorResponse {
  error: string;
}

// 토스페이먼츠 결제 위젯 옵션
export interface TossPaymentWidgetOptions {
  merchantUid: string;
  orderName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
}

// 토스 클라이언트 키 응답
export interface TossClientKeyResponse {
  clientKey: string;
}

// 결제 페이지 Props (신청에서 전달받는 데이터)
export interface PaymentDetailPageProps {
  courseIds: number[];
  orderName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
}

// 신청(Application)에서 결제 페이지로 전달 가능한 최소 쿼리 파라미터
// (URL 쿼리 특성상 string이 들어올 수 있어 런타임에서 파싱합니다)
export interface PaymentFromApplicationQuery {
  applicationId?: string | number;
  courseId?: string | number;
  title?: string;
  price?: string | number;
  dogName?: string;
  customerName?: string;
  customerEmail?: string;
}
