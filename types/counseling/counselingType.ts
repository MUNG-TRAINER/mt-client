/**
 * 상담 관련 타입 정의
 */

/**
 * 상담 반려견 정보
 */
export interface CounselingDog {
  counselingId: number;
  dogName: string;
  ownerName: string;
  dogImage: string;
}

/**
 * 상담 리스트 응답
 */
export type CounselingDogListResponse = CounselingDog[];
