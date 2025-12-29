// 훈련사가 관리하는 회원 목록 타입
export interface ITrainerUserListResponse {
  userId: number;
  name: string;
  email: string;
  phone: string;
  profileImage: string | null; // S3 Presigned URL (유효기간 15분)
}

// 회원의 반려견 목록 타입
export type Gender = "M" | "F"; // API 응답: "M" 또는 "F"

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
export type CourseType = "ONCE" | "MULTI";
export type LessonForm = "WALK" | "GROUP" | "PRIVATE";
export type CourseStatus = "SCHEDULED" | "IN_PROGRESS" | "CANCELLED" | "DONE";
export type Difficulty = "BASIC" | "STANDARD" | "EXPERT";
export type DogSize = "SMALL" | "MEDIUM" | "LARGE";
export type AttendanceStatus = "ATTENDED" | "ABSENT" | null;
export type SocializationLevel = "LOW" | "MEDIUM" | "HIGH";

// 반려견 기본 정보 (dog)
export interface IDogBasicInfo {
  dogId: number;
  name: string;
  breed: string;
  age: number;
  gender: Gender; // "M" 또는 "F"
  isNeutered: boolean; // API는 isNeutered 사용
  weight: number | null; // nullable
  personality: string | null; // nullable
  habits: string | null; // nullable
  healthInfo: string | null; // nullable
  humanSocialization: SocializationLevel; // 사람 사회화
  animalSocialization: SocializationLevel; // 동물 사회화
  profileImage: string | null; // S3 Presigned URL (유효기간 15분)
  createdAt: string;
  updatedAt: string;
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
  difficulty?: Difficulty; // 난이도 추가
  sessionId: number;
  sessionDate: string; // YYYY-MM-DD
  sessionStartTime: string; // HH:mm:ss
  sessionEndTime: string; // HH:mm:ss
  attendanceStatus?: AttendanceStatus; // 출석 상태 추가
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

// 수강 이력 (enrollmentHistory)
export interface IEnrollmentHistory {
  enrollmentNumber: number; // 몇 차 수강 (1, 2, 3...)
  courseId: number;
  title: string; // 과정별 미세한 차이
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  totalSessions: number;
  attendedSessions: number;
  attendanceRate: number;
  sessions: IMultiSessionResponse[];
}

// 다회차 훈련 - 개별 코스 (courses)
export interface IMultiCourseGroupResponse {
  courseId: number;
  title: string;
  tags: string;
  description: string;
  location: string;
  type: CourseType;
  lessonForm?: LessonForm;
  status?: CourseStatus;
  difficulty: Difficulty;
  dogSize?: DogSize;
  mainImage: string;
  detailImage?: string;
  isFree?: boolean;
  schedule?: string;
  refundPolicy?: string;
  items?: string;
  // 수강 횟수 및 이력
  enrollmentCount: number; // 수강 횟수
  enrollmentHistory: IEnrollmentHistory[] | null; // 수강 이력 (단일 수강이면 null)
  totalSessions: number;
  attendedSessions: number;
  attendanceRate: number;
  sessions: IMultiSessionResponse[]; // 여러 수강이면 빈 배열
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
