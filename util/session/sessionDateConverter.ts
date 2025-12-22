export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return dateStr;
  }
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
export const formatTime = (timeStr: string) => {
  if (!timeStr) {
    return timeStr;
  }
  return timeStr.slice(0, 5);
};
