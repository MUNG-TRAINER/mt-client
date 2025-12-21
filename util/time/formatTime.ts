/**
 * 시간 문자열을 HH:mm 형식으로 포맷팅
 * @param timeString - 시간 문자열 (HH:mm:ss, HH:mm 등)
 * @returns HH:mm 형식의 문자열
 * @example "14:30:00" -> "14:30"
 * @example "14:30" -> "14:30"
 */
export function formatTime(timeString: string): string {
  if (!timeString) return "";

  // HH:mm:ss 형식인 경우
  if (timeString.length >= 5) {
    return timeString.slice(0, 5);
  }

  // 이미 HH:mm 형식이거나 더 짧은 경우 그대로 반환
  return timeString;
}
