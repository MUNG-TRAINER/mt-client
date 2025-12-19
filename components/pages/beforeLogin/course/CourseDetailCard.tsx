"use client";

import useSessionList from "@/hooks/beforeLogin/course/useSessionList";
import useCourseWithTrainer from "@/hooks/beforeLogin/course/useCourseWithTrainer";
import getDurationMinutes from "@/util/time/getDurationMinutes";
import CourseInfoComp from "./getComps/CourseInfoComp";
import { useCourseState } from "@/stores/courseState";
import {
  dogSizeMap,
  getLessonFormLabel,
  getDifficultyLabel,
} from "@/util/course/courseMappings";

export default function CourseDetailCard({ courseId }: { courseId: string }) {
  const {
    course: courseDetail,
    courseIsPending,
    trainer,
    trainerIsPending,
  } = useCourseWithTrainer(courseId);

  const { data: sessionList, isPending: sessionIsPending } =
    useSessionList(courseId);

  const { editMode } = useCourseState();

  const totalSessions = sessionList?.length || 0;
  const firstSession = sessionList?.[0];
  const durationMinutes = firstSession
    ? getDurationMinutes(firstSession.startTime, firstSession.endTime)
    : 0;
  const lastSession = sessionList?.[sessionList.length - 1];
  const lessonFormLabel = getLessonFormLabel(courseDetail?.lessonForm);

  if (courseIsPending || sessionIsPending || trainerIsPending) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4 w-full text-align-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <div className="p-6 text-center">로딩 중...</div>
      </div>
    );
  }

  if (!courseDetail) {
    return <div className="p-6 text-center">과정 정보를 찾을 수 없습니다.</div>;
  }

  const difficultyLabel = getDifficultyLabel(courseDetail.difficulty);

  const checkIsClose = () => {
    const now = new Date();
    const courseEndDate = new Date(
      `${lastSession?.sessionDate}T${lastSession?.endTime}`,
    );
    if (
      courseDetail.status === "DONE" ||
      courseDetail.status === "CANCELLED" ||
      now > courseEndDate
    ) {
      return true;
    }
    return false;
  };

  const isClose = checkIsClose();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white">
      {isClose && (
        <div className="sticky top-0 z-50 w-full bg-red-600 text-white py-3 px-4 text-center font-semibold shadow-md">
          {/* 빨간색 경고 배너 */}
          ⚠️ 이 과정은 종료되었습니다. 수강 신청이 불가능합니다.
        </div>
      )}
      <div className={isClose ? "opacity-60 pointer-events-none" : ""}>
        {!editMode && (
          <CourseInfoComp
            course={courseDetail}
            durationMinutes={durationMinutes}
            maxStudents={firstSession?.maxStudents || 0}
            lessonFormLabel={lessonFormLabel}
            difficultyLabel={difficultyLabel}
            trainer={trainer || undefined}
            totalSessions={totalSessions}
            schedule={courseDetail.schedule}
            firstSessionPrice={firstSession?.price}
            sessionCount={sessionList?.length || 0}
            sessionList={sessionList || []}
            trainerId={courseDetail?.trainerId}
            courseId={courseId}
          />
        )}
      </div>
    </div>
  );
}
