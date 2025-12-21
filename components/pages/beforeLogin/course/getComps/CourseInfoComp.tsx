import CourseActionButtons from "@/components/pages/afterLogin/course/view/CourseActionButtons";
import CourseBasicsSection from "../CourseBasicsSection";
import CourseHero from "../CourseHero";
import CourseIntroSection from "../CourseIntroSection";
import SessionListSection from "../SessionListSection";
import TrainerInfoCard from "../TrainerInfoCard";
import { ICourseType } from "@/types/course/courseType";
import { ITrainerInfoType } from "@/types/trainer/trainerType";
import { ISessionType } from "@/types/course/sessionType";
interface ICourseInfoCompPropsTypes {
  course: ICourseType;
  durationMinutes: number;
  maxStudents: number;
  lessonFormLabel: string;
  difficultyLabel: string;
  trainer: ITrainerInfoType | undefined;
  totalSessions: number;
  schedule: string;
  firstSessionPrice: number | undefined;
  sessionCount: number;
  sessionList: ISessionType[];
  trainerId: number;
  courseId: string;
}
export default function CourseInfoComp({
  course,
  durationMinutes,
  maxStudents = 0,
  lessonFormLabel,
  difficultyLabel,
  trainer,
  totalSessions,
  schedule,
  firstSessionPrice,
  sessionCount,
  sessionList,
  trainerId,
  courseId,
}: ICourseInfoCompPropsTypes) {
  return (
    <>
      <CourseHero
        course={course}
        durationMinutes={durationMinutes}
        maxStudents={maxStudents}
        lessonFormLabel={lessonFormLabel}
        difficultyLabel={difficultyLabel}
      />

      <div className="pt-5 space-y-6">
        <TrainerInfoCard trainer={trainer} />

        <CourseBasicsSection
          course={course}
          totalSessions={totalSessions}
          schedule={schedule}
          firstSessionPrice={firstSessionPrice}
          sessionCount={sessionCount}
        />

        <CourseIntroSection course={course} />

        <SessionListSection sessions={sessionList} />
      </div>

      <CourseActionButtons trainerId={trainerId} />
    </>
  );
}
