// 승인 대기 중인 신청 목록 응답 타입
export interface PendingApplication {
  applicationId: number;
  dogName: string;
  ownerName: string;
  courseTitle: string;
  sessionDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm:ss
  endTime: string; // HH:mm:ss
}

// 신청 상태 타입
export type ApplicationStatus = "ACCEPT" | "REJECTED";

// 승인/거절 요청 타입
export interface ApplicationStatusUpdateRequest {
  status: ApplicationStatus;
  rejectReason?: string;
}

// 승인/거절 응답 타입
export interface ApplicationStatusUpdateResponse {
  message: string;
}
