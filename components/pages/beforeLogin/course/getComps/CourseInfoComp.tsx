import CourseActionButtons from "@/components/pages/afterLogin/course/view/CourseActionButtons";
import CourseBasicsSection from "../CourseBasicsSection";
import CourseHero from "../CourseHero";
import CourseIntroSection from "../CourseIntroSection";
import SessionListSection from "../SessionListSection";
import TrainerInfoCard from "../TrainerInfoCard";
import {ICourseType, IDifficultyBadge} from "@/types/course/courseType";
import {ITrainerInfoType} from "@/types/trainer/trainerType";
import {ISessionType} from "@/types/course/sessionType";
interface ICourseInfoCompPropsTypes {
  course: ICourseType;
  durationMinutes: number;
  maxStudents: number;
  lessonFormLabel: string;
  difficultyBadge: IDifficultyBadge;
  trainer: ITrainerInfoType | undefined;
  dogSizeMap: Record<string, string>;
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
  difficultyBadge,
  trainer,
  dogSizeMap,
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
        difficultyBadge={difficultyBadge}
      />

      <TrainerInfoCard trainer={trainer} />

      <CourseBasicsSection
        course={course}
        dogSizeMap={dogSizeMap}
        totalSessions={totalSessions}
        schedule={schedule}
        firstSessionPrice={firstSessionPrice}
        sessionCount={sessionCount}
      />

      <CourseIntroSection course={course} />

      <SessionListSection sessions={sessionList} />

      <CourseActionButtons trainerId={trainerId} courseId={courseId} />
    </>
  );
}
