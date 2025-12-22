/**
 * 출석 상태
 */
export type AttendanceStatus =
  | "PENDING"
  | "ATTENDED"
  | "ABSENT"
  | "LATE"
  | "EXCUSED";

/**
 * 출석 정보
 */
export interface AttendanceType {
  attendanceId: number;
  userName: string;
  dogName: string;
  status: AttendanceStatus;
  checkinTime: string | null;
  checkoutTime: string | null;
  memo: string | null;
  createdAt: string;
}

/**
 * 출석 상태 업데이트 요청
 */
export interface UpdateAttendanceRequest {
  status: AttendanceStatus;
  memo?: string;
}

/**
 * 출석 상태 라벨
 */
export const ATTENDANCE_STATUS_LABEL: Record<AttendanceStatus, string> = {
  PENDING: "미확인",
  ATTENDED: "출석",
  ABSENT: "결석",
  LATE: "지각",
  EXCUSED: "공결",
};

/**
 * 출석 상태 색상
 */
export const ATTENDANCE_STATUS_COLOR: Record<AttendanceStatus, string> = {
  PENDING: "#9CA3AF", // 회색
  ATTENDED: "#10B981", // 초록색
  ABSENT: "#EF4444", // 빨간색
  LATE: "#F59E0B", // 주황색
  EXCUSED: "#3B82F6", // 파란색
};
