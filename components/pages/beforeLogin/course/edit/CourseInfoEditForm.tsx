"use client";

import CourseTextAtrea from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseTextAtrea";
import CourseDifficulty from "@/components/pages/afterLogin/course/create/formDataComps/CourseDifficulty";
import CourseDogSize from "@/components/pages/afterLogin/course/create/formDataComps/CourseDogSize";
import CourseSchedule from "@/components/pages/afterLogin/course/create/formDataComps/CourseSchedule";
import {useCourseState} from "@/stores/courseState";
import {ICourseType} from "@/types/course/courseType";
import {useQueryClient} from "@tanstack/react-query";
import EditCourseTitle from "./form/items/EditCourseTitle";
import EditCourseLocation from "./form/items/EditCourseLocation";
import EditCourseMainImg from "./form/items/EditCourseMainImg";
import EditCourseDetailImg from "./form/items/EditCourseDetailImg";
import EditCourseIsFree from "./form/items/EditCourseIsFree";
import EditCourseLessonForm from "./form/items/EditCourseLessonForm";
import CourseItems from "@/components/pages/afterLogin/course/create/formDataComps/CourseItems";

export default function CourseInfoEditForm({courseId}: {courseId: string}) {
  const {setEditModeOff} = useCourseState();
  const queryClient = useQueryClient();
  const courseInfo: ICourseType | undefined = queryClient.getQueryData([
    "courseDetail",
    courseId,
  ]);

  const items = courseInfo?.items.trim().split(", ");
  return (
    <div>
      <form action="">
        <fieldset className="flex flex-col gap-3">
          <legend>훈련수정</legend>
          {/* 메인이미지 */}
          <EditCourseMainImg img={courseInfo?.mainImage + ""} />
          {/* 훈련제목 */}
          <EditCourseTitle title={courseInfo?.title + ""} />
          {/* 훈련장소 */}
          <EditCourseLocation location={courseInfo?.location + ""} />
          <CourseSchedule
            labelId="schedule"
            inputName="schedule"
            defaultValue={courseInfo?.schedule}
          />
          <div className="flex flex-col gap-2 justify-around *:flex *:gap-2">
            {/* 유무료 */}
            <EditCourseIsFree isFree={courseInfo?.isFree as boolean} />
            {/* 레슨 형식 */}
            <EditCourseLessonForm lessonForm={courseInfo?.lessonForm + ""} />
            <div className="flex justify-between">
              {/* 난이도 */}
              <CourseDifficulty difficulty={courseInfo?.difficulty} />
              {/* 반려견 사이즈 */}
              <CourseDogSize dogSize={courseInfo?.dogSize} />
            </div>
            <CourseItems itemsProps={items} />
            {/* 훈련과정내용 */}
            <CourseTextAtrea
              inputId="description"
              labelTxt="훈련과정내용"
              name="description"
              row={5}
              defaultValue={courseInfo?.description}
              placeholder="대략적인 해당 훈련내용을 작성해주세요."
            />
            {/* 세부이미지 */}
            <EditCourseDetailImg
              detailImg1={courseInfo?.detailImageUrls[0] + ""}
              detailImg2={courseInfo?.detailImageUrls[1] + ""}
              detailImg3={courseInfo?.detailImageUrls[2] + ""}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={setEditModeOff}
              type="button"
              className="w-full py-2 bg-(--mt-blue) rounded-md font-bold text-(--mt-white)"
            >
              수정하기
            </button>
            <button
              onClick={setEditModeOff}
              type="button"
              className="w-full py-2 bg-(--mt-gray-point) rounded-md font-bold text-(--mt-white)"
            >
              취소
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
