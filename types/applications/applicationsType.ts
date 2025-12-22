export interface ApplicationType {
  applicationId: number;
  courseId: number;
  dogId: number;
  applicationStatus: string;
  title: string;
  description: string;
  schedule: string;
  mainImage?: string | null;
  tags: string;
  sessionSchedule: string;
  price: number;
  dogName: string;
  rejectReason?: string;
  location: string;
  lessonForm: string;
  type: string;
}
