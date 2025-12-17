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
