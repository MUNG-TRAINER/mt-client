"use client";
import CreateCourseCard from "../CreateCourseCard";
import CourseDescription from "./CourseDescription";
import CourseDifficulty from "./CourseDifficulty";
import CourseDogSize from "./CourseDogSize";
import CourseIsFree from "./CourseIsFree";
import CourseItems from "./CourseItems";
import CourseLessonForm from "./CourseLessonForm";
import CourseLocation from "./CourseLocation";
import CourseRefundPolicy from "./CourseRefundPolicy";
import CourseSchedule from "./CourseSchedule";
import CourseTitle from "./CourseTitle";
import CourseType from "./CourseType";

export default function CreateCourse() {
  return (
    <form className="flex flex-col gap-3">
      <fieldset className="flex flex-col gap-3">
        <legend className="w-full! h-full! opacity-100! text-center font-bold mb-4 text-xl">
          훈련과정업로드
        </legend>
        <CreateCourseCard classNames="[&>label]:font-bold">
          <CourseTitle />
          <CourseLocation />
        </CreateCourseCard>
        <CreateCourseCard>
          <div className="flex flex-col gap-2 justify-around *:flex *:gap-2 *:py-2">
            {/* 유-무료 */}
            <CourseIsFree />
          </div>
          {/* 수업 유형 */}
          <CourseLessonForm />
          {/* 회차여부 */}
          <CourseType />
          <p className="p-2 text-(--mt-blue) bg-(--mt-blue-light) rounded-md">
            회차형 수업은 전체 회차 중 50% 이상 이수한 반려견만 중간 참여 가능
          </p>
        </CreateCourseCard>

        <CreateCourseCard classNames="[&>h5]:font-bold">
          <CourseDifficulty />
          <CourseDogSize />
        </CreateCourseCard>

        <CreateCourseCard classNames="[&>label]:font-bold">
          <CourseDescription />
        </CreateCourseCard>
        <CreateCourseCard classNames="[&>label]:font-bold">
          <CourseRefundPolicy />
        </CreateCourseCard>

        <CreateCourseCard classNames="[&>label]:font-bold">
          <CourseSchedule />
        </CreateCourseCard>

        <CreateCourseCard classNames="[&>label]:font-bold">
          <CourseItems />
        </CreateCourseCard>
      </fieldset>
      <button
        type="submit"
        className="w-full bg-(--mt-blue-point) py-2 rounded-lg shadow text-(--mt-white) font-bold"
      >
        개설하기
      </button>
    </form>
  );
}
