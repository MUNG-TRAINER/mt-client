/**
 * 상담 관련 타입 정의
 */

/**
 * 상담 반려견 정보 (훈련사용)
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
 * 상담 리스트 응답 (훈련사용)
 */
export type CounselingDogListResponse = CounselingDog[];

// ===== 사용자용 상담 타입 =====

/**
 * 상담 신청용 반려견 정보 응답 타입
 */
export interface IDogForCounselingType {
  dogId: number;
  dogName: string;
  breed: string;
  age: number;
  gender: "M" | "F";
  profileImage: string | null;
  alreadyRequested: boolean;
  counselingId: number | null;
}

/**
 * 상담 신청 요청 타입
 */
export interface ICreateCounselingRequestType {
  dogId: number;
  phone: string;
}

/**
 * 상담 신청 응답 타입
 */
export interface ICreateCounselingResponseType {
  counselingId: number;
  message: string;
}

/**
 * 사용자 상담 목록 아이템 타입
 */
export interface IUserCounselingListItemType {
  counselingId: number;
  dogId: number;
  dogName: string;
  dogImage: string | null;
  phone: string;
  isCompleted: boolean;
  createdAt: string;
  content: string | null;
}

/**
 * 사용자 상담 목록 타입
 */
export type IUserCounselingListType = IUserCounselingListItemType[];

/**
 * 사용자 상담 상세 응답 타입
 */
export interface IUserCounselingDetailType {
  counselingId: number;
  dogId: number;
  dogName: string;
  breed: string;
  age: number;
  gender: "M" | "F";
  dogImage: string | null;
  phone: string;
  isCompleted: boolean;
  createdAt: string;
  content: string | null;
  updatedAt: string | null;
}

/**
 * 상담 취소 응답 타입
 */
export interface ICancelCounselingResponseType {
  success: boolean;
  message: string;
}
