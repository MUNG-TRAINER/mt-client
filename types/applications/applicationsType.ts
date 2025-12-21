export interface ApplicationType {
  applicationId: number;
  sessionId: number;
  dogId: number;
  applicationStatus: string;
  title: string;
  description: string;
  schedule: string;
  mainImage?: string | null;
  tags: string;
  sessionSchedule: string;
  dogName: string;
  rejectReason?: string;
  location: string;
  lessonForm: string;
  type: string;
}
