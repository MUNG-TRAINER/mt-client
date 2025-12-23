// 훈련사가 관리하는 회원 목록 타입
export interface ITrainerUserListResponse {
  userId: number;
  name: string;
  email: string;
  phone: string;
  profileImage: string | null; // S3 Presigned URL (유효기간 15분)
}

// 회원의 반려견 목록 타입
export type Gender = "MALE" | "FEMALE";

export interface IDogResponse {
  dogId: number;
  name: string;
  breed: string;
  age: number;
  gender: Gender;
  weight: number;
  profileImage: string | null; // S3 Presigned URL (유효기간 15분)
  neutered: boolean;
  registeredDate: string;
}

// 반려견 통계 상세 타입 (API_DOG_STATS_DETAIL.md 기반)
export type CourseType = "SINGLE" | "MULTI";
export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type AttendanceStatus = "ATTENDED" | "ABSENT" | null;

// 반려견 기본 정보 (dog)
export interface IDogBasicInfo {
  dogId: number;
  name: string;
  breed: string;
  age: number;
  gender: Gender;
  weight: number;
  profileImage: string | null; // S3 Presigned URL (유효기간 15분)
  neutered: boolean;
  registeredDate: string;
}

// 상담 기록 (counselings)
export interface ICounselingResponse {
  counselingId: number;
  dogId: number;
  content: string;
  trainerId: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// 통계 요약 (stats)
export interface IStats {
  timesApplied: number; // 총 신청한 훈련 횟수
  attendedCount: number; // 총 출석한 세션 수
}

// 단회차 훈련 (trainingApplications)
export interface ITrainingSessionDto {
  courseId: number;
  courseTitle: string;
  courseDescription: string;
  tags: string;
  type: CourseType;
  sessionId: number;
  sessionDate: string; // YYYY-MM-DD
  sessionStartTime: string; // HH:mm:ss
  sessionEndTime: string; // HH:mm:ss
}

// 다회차 훈련 - 개별 세션 (sessions)
export interface IMultiSessionResponse {
  sessionId: number;
  sessionNo: number;
  sessionDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm:ss
  endTime: string; // HH:mm:ss
  locationDetail: string;
  attendanceStatus: AttendanceStatus;
}

// 다회차 훈련 - 개별 코스 (courses)
export interface IMultiCourseGroupResponse {
  courseId: number;
  title: string;
  tags: string;
  description: string;
  location: string;
  type: CourseType;
  difficulty: Difficulty;
  mainImage: string;
  totalSessions: number;
  attendedSessions: number;
  attendanceRate: number;
  sessions: IMultiSessionResponse[];
}

// 다회차 훈련 - 태그별 그룹 (multiCourses)
export interface IMultiCourseCategoryResponse {
  tags: string;
  courses: IMultiCourseGroupResponse[];
}

// 최상위 응답 타입
export interface IDogStatsResponse {
  dog: IDogBasicInfo;
  counselings: ICounselingResponse[];
  stats: IStats;
  trainingApplications: ITrainingSessionDto[];
  multiCourses: IMultiCourseCategoryResponse[];
}
