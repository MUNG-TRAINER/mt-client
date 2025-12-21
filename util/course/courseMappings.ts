/**
 * 과정(Course) 관련 매핑 데이터 유틸리티
 */

/**
 * 수업 형태(Lesson Form) 한글 매핑
 */
export const lessonFormMap: Record<string, string> = {
  WALK: "산책",
  GROUP: "그룹",
  PRIVATE: "1:1",
};

/**
 * 난이도(Difficulty) 한글 매핑
 */
export const difficultyMap: Record<string, string> = {
  BASIC: "초급",
  STANDARD: "중급",
  EXPERT: "고급",
};

/**
 * 반려견 크기(Dog Size) 한글 매핑
 */
export const dogSizeMap: Record<string, string> = {
  SMALL: "소형견",
  MEDIUM: "중형견",
  LARGE: "대형견",
  ALL: "모든 견종",
};

/**
 * 수업 형태 레이블 가져오기 (기본값: "기타")
 */
export const getLessonFormLabel = (lessonForm?: string): string => {
  if (!lessonForm) return "기타";
  return lessonFormMap[lessonForm] ?? "기타";
};

/**
 * 난이도 레이블 가져오기 (기본값: "기타")
 */
export const getDifficultyLabel = (difficulty?: string): string => {
  if (!difficulty) return "기타";
  return difficultyMap[difficulty] ?? difficulty;
};

/**
 * 반려견 크기 레이블 가져오기
 */
export const getDogSizeLabel = (dogSize?: string): string[] => {
  if (!dogSize) return [];
  const result = [];
  for (const size of dogSize?.split(",") || []) {
    result.push(dogSizeMap[size.trim()] ?? size.trim());
  }
  return result;
};
