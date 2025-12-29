export interface ApplicationItem {
  applicationId: number;
  applicationStatus:
    | "APPLIED"
    | "WAITING"
    | "ACCEPT"
    | "PAID"
    | "CANCELLED"
    | "EXPIRED"
    | "REJECTED"
    | "COUNSELING_REQUIRED";
  price: number;
  sessionSchedule: string;
  rejectReason: string | null;
}

export interface ApplicationType {
  courseId: number;
  tags: string;
  dogId: number;
  title: string;
  description: string;
  mainImage: string | null;
  location: string;
  lessonForm: "WALK" | "GROUP" | "PRIVATE";
  type: "ONCE" | "MULTI";
  totalAmount: number; // 모든 세션 가격 합계
  sessionSchedule: string; // "첫 세션 일정 외 N회"
  dogName: string;
  rejectReason: string | null;
  applicationItems: ApplicationItem[]; // 세션별 신청 상세
}
