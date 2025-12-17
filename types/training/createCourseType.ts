export interface ICreateCourseType {
  title: string;
  location: string;
  mainImage: string;
  detailImage: string;
  schedule: string;
  isFree: string;
  lessonForm: string;
  difficulty: string;
  dogSize: string;
  description: string;
  type: string;
  session: ISessionTypes[];
  refundPolicy: string;
  items: string;
}

interface ISessionTypes {
  sessionNo: string;
  status: string;
  maxStudents: string;
  price: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  content: string;
}
