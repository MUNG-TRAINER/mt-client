"use client";

import useSessionList from "@/hooks/beforeLogin/course/useSessionList";
import useCourseWithTrainer from "@/hooks/beforeLogin/course/useCourseWithTrainer";
import getDurationMinutes from "@/util/time/getDurationMinutes";
import CourseHero from "./CourseHero";
import TrainerInfoCard from "./TrainerInfoCard";
import CourseBasicsSection from "./CourseBasicsSection";
import CourseIntroSection from "./CourseIntroSection";
import SessionListSection from "./SessionListSection";
import CourseActionButtons from "../../afterLogin/course/view/CourseActionButtons";

export default function CourseDetailCard({ courseId }: { courseId: string }) {
  const lessonFormMap: Record<string, string> = {
    WALK: "산책",
    GROUP: "그룹",
    PRIVATE: "1:1",
  };

  const difficultyMap: Record<string, { label: string; className: string }> = {
    BASIC: {
      label: "초급",
      className: "border-green-200 bg-green-50 text-green-700",
    },
    STANDARD: {
      label: "중급",
      className: "border-purple-200 bg-purple-50 text-purple-700",
    },
    EXPERT: {
      label: "고급",
      className: "border-orange-200 bg-orange-50 text-orange-700",
    },
  };

  const dogSizeMap: Record<string, string> = {
    SMALL: "소형견",
    MEDIUM: "중형견",
    LARGE: "대형견",
    ALL: "모든 견종",
  };

  const {
    course: courseDetail,
    courseIsPending,
    trainer,
    trainerIsPending,
  } = useCourseWithTrainer(courseId);

  const { data: sessionList, isPending: sessionIsPending } =
    useSessionList(courseId);

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

  const totalSessions = sessionList?.length || 0;
  const firstSession = sessionList?.[0];
  const lastSession = sessionList?.[sessionList.length - 1];
  const durationMinutes = firstSession
    ? getDurationMinutes(firstSession.startTime, firstSession.endTime)
    : 0;
  const lessonFormLabel = courseDetail?.lessonForm
    ? lessonFormMap[courseDetail.lessonForm] ?? "기타"
    : "기타";
  const difficultyBadge = difficultyMap[courseDetail.difficulty] || {
    label: courseDetail.difficulty || "난이도 정보 없음",
    className: "border-(--mt-gray-light) bg-(--mt-gray-smoke) text-(--mt-gray)",
  };
  const checkIsClose = () => {
    const now = new Date();
    const courseEndDate = new Date(
      `${lastSession?.sessionDate}T${lastSession?.endTime}`
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
        <CourseHero
          course={courseDetail}
          durationMinutes={durationMinutes}
          maxStudents={firstSession?.maxStudents || 0}
          lessonFormLabel={lessonFormLabel}
          difficultyBadge={difficultyBadge}
        />

        <div className="pt-5 space-y-6">
          <TrainerInfoCard trainer={trainer} />

          <CourseBasicsSection
            course={courseDetail}
            dogSizeMap={dogSizeMap}
            totalSessions={totalSessions}
            schedule={courseDetail.schedule}
            firstSessionPrice={firstSession?.price}
            sessionCount={sessionList?.length || 0}
          />

          <CourseIntroSection course={courseDetail} />

          <SessionListSection sessions={sessionList} />
        </div>
      </div>

      <CourseActionButtons
        isClose={isClose}
        trainerId={courseDetail?.trainerId}
      />
    </div>
  );
}
