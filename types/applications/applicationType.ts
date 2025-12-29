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

// 반려견 상세 정보 응답 타입
export interface DogDetailResponse {
  dogId: number;
  name: string;
  profileImageUrl: string;
  age: number;
  gender: "M" | "F";
  breed: string;
  ownerName: string;
  ownerPhone: string;
}

// 회차 정보 타입 (그룹핑된 API용)
export interface SessionInfo {
  applicationId: number;
  sessionId: number;
  sessionNo: number;
  sessionDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm:ss
  endTime: string; // HH:mm:ss
  status?: "APPLIED" | "WAITING"; // 신청 상태
  isWaiting?: boolean; // 대기 중 여부
  isPreApproved?: boolean; // 미리 승인 여부
  waitingOrder?: number | null; // 대기 순번 (1부터 시작, 대기 중이 아니면 null)
}

// 코스별 그룹핑된 신청 타입
export interface GroupedApplication {
  courseId: number;
  courseTitle: string;
  courseType: "SINGLE" | "MULTI" | "GROUP";
  dogId: number;
  dogName: string;
  ownerName: string;
  totalSessions: number;
  sessions: SessionInfo[];
}

// 일괄 승인/거절 요청 타입
export interface BulkStatusUpdateRequest {
  status: ApplicationStatus;
  rejectReason?: string;
}
