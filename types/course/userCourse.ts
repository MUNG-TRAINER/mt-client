export interface UserCourseType {
  courseId: number;
  title: string;
  mainImage: string;
  lessonForm: string;
  location: string;
  type: string;
  tags: string;
  description: string;

  sessions: UserCourseSessionType[];
}

export interface UserCourseSessionType {
  sessionId: number;
  sessionNo: number;
  sessionDate: string; // LocalDate → string
  startTime: string; // LocalTime → string
  endTime: string;
  sessionStatus: "SCHEDULED" | "DONE";
  orderStatus: string; // READY_TO_PAY | PAID | CANCELLED 등
  dogName: string;
}
