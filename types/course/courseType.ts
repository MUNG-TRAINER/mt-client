/**
 * 훈련 과정 아이템
 */
export interface CourseItem {
  courseId: number;
  trainerId: number;
  trainerName: string;
  title: string;
  description: string;
  tags: string;
  mainImage: string | null;
  lessonForm: "WALK" | "GROUP" | "PRIVATE";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  location: string;
  type: "ONCE" | "MULTI";
  price: number;
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
 * 난이도 한글 매핑
 */
export const DIFFICULTY_LABEL: Record<CourseItem["difficulty"], string> = {
  BEGINNER: "초급",
  INTERMEDIATE: "중급",
  ADVANCED: "고급",
};

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
