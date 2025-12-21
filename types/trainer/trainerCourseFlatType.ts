export interface TrainerCourseFlatType {
    courseId: number;
    trainerId: number;
    title: string;
    type: string;
    lessonForm: string;
    mainImage: string;
    location: string;
    tags: string;
    description: string;
  
    sessionId: number;
    sessionNo: number;
    sessionDate: string;
    startTime: string;
    endTime: string;
    sessionStatus: "SCHEDULED" | "DONE";
  }
  