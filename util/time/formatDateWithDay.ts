/**
 * YYYY-MM-DD 형식의 날짜를 YYYY.MM.DD(요일) 형식으로 변환
 * @param dateString - YYYY-MM-DD 형식의 날짜 문자열
 * @returns YYYY.MM.DD(요일) 형식의 문자열
 * @example "2024-01-15" -> "2024.01.15(월)"
 */
export function formatDateWithDay(dateString: string): string {
  const date = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[date.getDay()];

  const formatted = dateString.replace(/-/g, ".");

  return `${formatted}(${dayOfWeek})`;
}
