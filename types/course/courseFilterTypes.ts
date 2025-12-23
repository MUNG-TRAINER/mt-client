/**
 * 코스 검색 필터 관련 공통 타입 정의
 */

/**
 * 수업 형태 필터 타입
 * - ALL: 전체
 * - WALK: 산책 모임
 * - GROUP: 그룹 레슨
 * - PRIVATE: 개인 레슨
 */
export type LessonFormFilter = "ALL" | "WALK" | "GROUP" | "PRIVATE";

/**
 * 코스 목록 뷰 모드 타입
 * - list: 리스트 뷰
 * - calendar: 캘린더 뷰
 */
export type ViewMode = "list" | "calendar";
