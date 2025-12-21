export interface TrainerCourseType {
    courseId: number;
    trainerId: number;
    title: string;
    type: string;
    lessonForm: string;
    mainImage: string;
    location: string;
    tags: string;
    description: string;
    sessions: TrainerCourseSessionType[];
  }
  
  export interface TrainerCourseSessionType {
    sessionId: number;
    sessionNo: number;
    sessionDate: string;
    startTime: string;
    endTime: string;
    sessionStatus: "SCHEDULED" | "DONE";
  }
  