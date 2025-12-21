/**
 * 세션 요약 정보
 */
export interface SessionSummaryDto {
  sessionId: number;
  startTime: string; // ISO 8601 형식
  endTime: string; // ISO 8601 형식
  locationDetail: string;
  maxStudents: number;
  price: number;
  status: string; // 세션 상태 (예: "SCHEDULED" | "CANCELLED" | "DONE" 등)
}

/**
 * 훈련 과정 아이템 (검색 결과용)
 */
export interface CourseItem {
  courseId: number;
  trainerId: number;
  trainerName: string;
  title: string;
  description: string; // 과정 설명
  tags: string; // 태그 (쉼표로 구분)
  mainImage: string;
  type: "ONCE" | "MULTI";
  lessonForm: "WALK" | "GROUP" | "PRIVATE";
  difficulty: string; // "초급", "중급", "고급" 등
  isFree: boolean; // 무료 여부
  status: string; // 과정 상태: "SCHEDULED" | "CANCELLED" | "DONE"
  location: string; // 시/도 단위
  schedule: string; // 일정 정보
  dogSize: string; // 대상 강아지 크기
  session: SessionSummaryDto | null; // 최저가 세션 정보
}

/**
 * 훈련 과정 검색 응답 (커서 기반 무한 스크롤)
 */
export interface CourseSearchResponse {
  courses: CourseItem[];
  hasMore: boolean; // 다음 페이지 존재 여부
  lastCourseId: number | null; // 마지막 courseId (다음 요청 시 사용)
  size: number; // 현재 조회된 항목 수
}

/**
 * 수업 형태 한글 매핑
 */
export const LESSON_FORM_LABEL: Record<CourseItem["lessonForm"], string> = {
  WALK: "산책",
  GROUP: "그룹",
  PRIVATE: "개인",
};

/**
 * 훈련 유형 한글 매핑
 */
export const TYPE_LABEL: Record<CourseItem["type"], string> = {
  ONCE: "일회성",
  MULTI: "다회차",
};

export interface ICourseType {
  courseId: number;
  trainerId: number;
  title: string;
  description: string;
  type: string;
  lessonForm: "WALK" | "GROUP" | "PRIVATE" | string;
  status: string;
  isFree: boolean;
  difficulty: "BASIC" | "STANDARD" | "EXPERT" | string;
  location: string;
  schedule: string;
  refundPolicy: string;
  mainImage: string;
  mainImageKey: string;
  detailImage: string;
  detailImageKey: string;
  items: string;
  dogSize: string;
  tags: string; // Comma-separated tags
}
export interface IUploadCourseTypes {
  sessionNo: number;
  status: string;
  maxStudents: number;
  price: number;
  sessionDate: string;
  startTime: string;
  endTime: string;
  content: string;
  locationDetail: string;
}
export interface IDifficultyBadge {
  label: string;
  className: string;
}

export interface ICourseHeroProps {
  course: ICourseType;
  durationMinutes: number;
  maxStudents: number;
  lessonFormLabel: string;
  difficultyLabel: string;
}
export interface ICourseBasicsSectionProps {
  course: ICourseType;
  totalSessions: number;
  schedule: string;
  firstSessionPrice?: number;
  sessionCount: number;
}
