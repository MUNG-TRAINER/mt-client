"use client";
import CreateCourseCard from "../CreateCourseCard";
import CourseTextAtrea from "./common/CourseTextAtrea";
import CourseDifficulty from "./CourseDifficulty";
import CourseDogSize from "./CourseDogSize";
import CourseImage from "./CourseImage";
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

        <CreateCourseCard>
          {/* 훈련 제목 */}
          <CourseTitle />
          {/* 훈련 장소 */}
          <CourseLocation />
        </CreateCourseCard>

        {/* 이미지 업로드 */}
        <CreateCourseCard>
          <CourseImage />
        </CreateCourseCard>

        <CreateCourseCard>
          {/* 훈련 일자 */}
          <CourseSchedule
            labelId="schedule"
            inputName="schedule"
            placeholder="예 :: yyyy년 mm월 dd일 ~ yyyy년 mm월 dd일"
          />
        </CreateCourseCard>

        <CreateCourseCard>
          {/* 유-무료 */}
          <CourseIsFree />
          {/* 수업 유형 */}
          <CourseLessonForm />
          {/* 수업 난이도 */}
          <CourseDifficulty />
          {/* 반려견 사이즈 */}
          <CourseDogSize />
          <CourseTextAtrea
            inputId="description"
            labelTxt="훈련과정내용"
            name="description"
            row={5}
            placeholder="대략적인 해당 훈련내용을 작성해주세요."
          />
          {/* 회차여부 */}
          <CourseType />
          <p className="p-2 text-(--mt-blue) bg-(--mt-blue-light) rounded-md">
            회차형 수업은 전체 회차 중 50% 이상 이수한 반려견만 중간 참여 가능
          </p>
        </CreateCourseCard>

        <CreateCourseCard>
          <CourseRefundPolicy />
        </CreateCourseCard>

        <CreateCourseCard>
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
