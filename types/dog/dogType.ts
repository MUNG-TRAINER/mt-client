// 반려견 성별 타입
export type DogGenderType = "M" | "F";

// 반려견 프로필 응답 타입
export interface IDogProfileType {
  dogId: number;
  name: string;
  breed: string;
  age: number;
  gender: DogGenderType;
  isNeutered: boolean;
  weight: number;
  personality: string;
  habits: string;
  healthInfo: string;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
}

// 반려견 프로필 등록 요청 타입
export interface IDogCreateRequestType {
  name: string;
  breed: string;
  age: number;
  gender: DogGenderType;
  isNeutered: boolean;
  weight: number;
  personality: string;
  habits: string;
  healthInfo: string;
  profileImage?: string;
}

// 반려견 프로필 수정 요청 타입
export interface IDogUpdateRequestType {
  name?: string;
  breed?: string;
  age?: number;
  gender?: DogGenderType;
  isNeutered?: boolean;
  weight?: number;
  personality?: string;
  habits?: string;
  healthInfo?: string;
  profileImage?: string;
}

// 반려견 리스트 응답 타입
export type IDogListType = IDogProfileType[];
