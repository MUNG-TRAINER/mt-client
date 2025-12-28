import CourseActionButtons from "@/components/pages/afterLogin/course/view/CourseActionButtons";
import CourseBasicsSection from "../CourseBasicsSection";
import CourseHero from "../CourseHero";
import CourseIntroSection from "../CourseIntroSection";
import SessionListSection from "../sessions/SessionListSection";
import TrainerInfoCard from "../TrainerInfoCard";
import {ICourseType} from "@/types/course/courseType";
import {ITrainerInfoType} from "@/types/trainer/trainerType";
import {ISessionType} from "@/types/course/sessionType";
import {
  getDifficultyLabel,
  getLessonFormLabel,
} from "@/util/course/courseMappings";
import getDurationMinutes from "@/util/time/getDurationMinutes";
interface ICourseInfoCompPropsTypes {
  courseInfo: ICourseType;
  trainerInfo: ITrainerInfoType | undefined;
  sessionList: ISessionType[];
  courseId: string;
}
export default function CourseInfoComp({
  courseInfo,
  trainerInfo,
  sessionList,
  courseId,
}: ICourseInfoCompPropsTypes) {
  const lessonFormLabel = getLessonFormLabel(courseInfo?.lessonForm);
  const difficultyLabel = getDifficultyLabel(courseInfo.difficulty);
  const totalSessions = sessionList?.length || 0;
  const firstSession = sessionList?.[0];
  const durationMinutes = firstSession
    ? getDurationMinutes(firstSession.startTime, firstSession.endTime)
    : 0;

  return (
    <div className="relative">
      <CourseHero
        courseInfo={courseInfo}
        durationMinutes={durationMinutes}
        maxStudents={firstSession.maxStudents || 0}
        lessonFormLabel={lessonFormLabel}
        difficultyLabel={difficultyLabel}
      />

      <TrainerInfoCard trainer={trainerInfo} />

      <CourseBasicsSection
        courseInfo={courseInfo}
        totalSessions={totalSessions}
        schedule={courseInfo.schedule}
        firstSessionPrice={firstSession.price}
        sessionCount={sessionList.length}
      />

      <CourseIntroSection courseInfo={courseInfo} />

      <SessionListSection sessions={sessionList} courseId={courseId} />

      <CourseActionButtons
        courseInfo={courseInfo}
        sessionList={sessionList}
        courseId={courseId}
        trainerId={courseInfo?.trainerId}
      />
    </div>
  );
}
