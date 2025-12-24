/**
 * ISO 8601 날짜 시간을 YYYY.MM.DD HH:mm 형식으로 변환
 * @param dateTimeString - ISO 8601 형식의 날짜 시간 문자열
 * @returns YYYY.MM.DD HH:mm 형식의 문자열
 * @example "2025-01-24T14:30:00" -> "2025.01.24 14:30"
 */
export function formatDateTime(dateTimeString: string): string {
  if (!dateTimeString) return "";

  const date = new Date(dateTimeString);

  // 유효하지 않은 날짜 체크
  if (isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

/**
 * ISO 8601 날짜를 YYYY.MM.DD 형식으로 변환
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns YYYY.MM.DD 형식의 문자열
 * @example "2025-01-24" -> "2025.01.24"
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  // 유효하지 않은 날짜 체크
  if (isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}
