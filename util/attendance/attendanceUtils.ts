import type { AttendanceStatus } from "@/types/trainer/trainerUserType";

/**
 * 출석 상태에 따른 배경색 클래스를 반환합니다.
 * @param status - 출석 상태 ("ATTENDED" | "ABSENT" | null)
 * @returns Tailwind CSS 배경색 클래스
 */
export const getAttendanceStatusColor = (status: AttendanceStatus): string => {
  if (status === "ATTENDED") return "bg-green-500";
  if (status === "ABSENT") return "bg-red-500";
  return "bg-gray-300";
};

/**
 * 출석 상태에 따른 라벨을 반환합니다.
 * @param status - 출석 상태 ("ATTENDED" | "ABSENT" | null)
 * @returns 한글 라벨 ("출석" | "결석" | "예정")
 */
export const getAttendanceStatusLabel = (status: AttendanceStatus): string => {
  if (status === "ATTENDED") return "출석";
  if (status === "ABSENT") return "결석";
  return "예정";
};

/**
 * 출석 상태에 따른 배지 스타일 클래스를 반환합니다.
 * @param status - 출석 상태 ("ATTENDED" | "ABSENT" | null)
 * @returns Tailwind CSS 배지 스타일 클래스
 */
export const getAttendanceStatusBadgeStyle = (
  status: AttendanceStatus
): string => {
  if (status === "ATTENDED") return "bg-green-100 text-green-700";
  if (status === "ABSENT") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
};
