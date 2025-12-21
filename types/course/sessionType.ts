export interface ISessionType {
  sessionId: number;
  sessionNo: number;
  sessionDate: string; // ISO 형식의 날짜 문자열("HH:MM:SS" to minutes)
  startTime: string; // ISO 형식의 시간 문자열("HH:MM:SS" to minutes)
  endTime: string;
  locationDetail: string;
  status: string;
  maxStudents: number;
  currentStudents: number; // 현재 신청 인원
  content: string;
  price: number;
}
