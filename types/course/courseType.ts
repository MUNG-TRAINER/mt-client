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
  difficultyBadge: IDifficultyBadge;
}
export interface ICourseBasicsSectionProps {
  course: ICourseType;
  dogSizeMap: Record<string, string>;
  totalSessions: number;
  schedule: string;
  firstSessionPrice?: number;
  sessionCount: number;
}
