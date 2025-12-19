/**
 * 상담 관련 타입 정의
 */

/**
 * 상담 반려견 정보
 */
export interface CounselingDog {
  counselingId: number;
  dogId: number;
  dogName: string;
  ownerName: string;
  dogImage: string;
  content?: string | null; // 상담 내용 (완료 시에만 존재)
}

/**
 * 상담 리스트 응답
 */
export type CounselingDogListResponse = CounselingDog[];
