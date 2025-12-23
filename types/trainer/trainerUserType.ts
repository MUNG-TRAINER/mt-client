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

// 반려견 통계 타입
export type TrainingStatus = "COMPLETED" | "ONGOING" | "CANCELLED";

export interface ITrainingSummary {
  trainingId: number;
  courseName: string;
  startDate: string;
  endDate: string;
  status: TrainingStatus;
  attendanceRate: number;
}

export interface IDogStatsResponse {
  dogId: number;
  dogName: string;
  breed: string;
  age: number;
  imageUrl: string;
  ownerName: string;
  ownerPhone: string;
  totalTrainingCount: number;
  completedTrainingCount: number;
  ongoingTrainingCount: number;
  totalAttendanceCount: number;
  attendanceRate: number;
  recentTrainings: ITrainingSummary[];
  behaviorIssues: string[];
  specialNotes: string;
}
