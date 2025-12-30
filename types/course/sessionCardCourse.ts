// SessionCardCourse.ts
export interface SessionCardCourse {
  courseId: number;
  title: string;
  location: string;
  sessions: {
    sessionId: number;
    startTime: string;
    endTime: string;
    sessionStatus: string;
    dogName?: string;
  }[];
}
