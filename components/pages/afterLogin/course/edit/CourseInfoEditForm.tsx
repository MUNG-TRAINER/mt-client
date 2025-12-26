"use client";

import CourseTextAtrea from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseTextAtrea";
import CourseDifficulty from "@/components/pages/afterLogin/course/create/formDataComps/CourseDifficulty";
import CourseDogSize from "@/components/pages/afterLogin/course/create/formDataComps/CourseDogSize";
import CourseSchedule from "@/components/pages/afterLogin/course/create/formDataComps/CourseSchedule";
import {ICourseType} from "@/types/course/courseType";
import EditCourseTitle from "./form/items/EditCourseTitle";
import EditCourseLocation from "./form/items/EditCourseLocation";
import EditCourseMainImg from "./form/items/EditCourseMainImg";
import EditCourseDetailImg from "./form/items/EditCourseDetailImg";
import EditCourseIsFree from "./form/items/EditCourseIsFree";
import EditCourseLessonForm from "./form/items/EditCourseLessonForm";
import CourseItems from "@/components/pages/afterLogin/course/create/formDataComps/CourseItems";
import Link from "next/link";
import {useActionState, useEffect, useState} from "react";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import {useRouter} from "next/navigation";
import {editCoureAction} from "@/app/(afterLogin)/course/[id]/(trainer)/edit/actions";
import {SessionInfo} from "@/types/applications/applicationType";
import {ISessionType} from "@/types/course/sessionType";
import {IFormResultType} from "@/types/formResultType";
import {courseEditSchema} from "@/schemas/courseEditSchema";
import EditCourseStatus from "./form/items/EditCourseStatus";

const initialState = {
  errMsg: undefined,
  resMsg: undefined,
};
export default function CourseInfoEditForm({
  courseInfo,
  courseId,
  sessionList,
}: {
  courseInfo: ICourseType;
  courseId: string;
  sessionList: ISessionType[];
}) {
  const router = useRouter();
  const detailImageKey = courseInfo.detailImageKey;
  const items = courseInfo?.items.trim().split(", ");
  const [state, action] = useActionState(
    async (
      state: IFormResultType<typeof courseEditSchema>,
      formData: FormData,
    ): Promise<IFormResultType<typeof courseEditSchema>> => {
      const lessonForm = formData.get("lessonForm");
      formData.set("trainerId", courseInfo.trainerId + "");
      formData.set("tags", courseInfo.tags);
      formData.set("isFree", courseInfo.isFree + "");
      formData.set("mainImageKey", courseInfo.mainImageKey + "");
      formData.set("status", courseInfo.status);
      formData.set(
        "lessonForm",
        lessonForm === null ? courseInfo.lessonForm + "" : lessonForm,
      );
      formData.set("detailImageKey", detailImageKey);
      const result = await editCoureAction(
        courseId,
        sessionList,
        state,
        formData,
      );
      if (!result.errMsg && !result.resMsg) {
        router.push("/plan");
      }
      return result;
    },
    initialState,
  );

  return (
    <div className="bg-(--mt-white) w-full h-full p-6 rounded-md overflow-y-scroll">
      <form action={action}>
        <fieldset className="flex flex-col gap-3">
          <legend>훈련수정</legend>
          {/* 메인이미지 */}
          <EditCourseMainImg img={courseInfo?.mainImage + ""} />
          {/* 훈련제목 */}
          <EditCourseTitle title={courseInfo?.title + ""} />
          {/* 훈련장소 */}
          <EditCourseLocation location={courseInfo?.location + ""} />
          <EditCourseStatus status={courseInfo.status} />
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
              detailImg1={courseInfo?.detailImageUrls[0]}
              detailImg2={courseInfo?.detailImageUrls[1]}
              detailImg3={courseInfo?.detailImageUrls[2]}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full py-2 bg-(--mt-blue) rounded-md font-bold text-(--mt-white)"
            >
              수정하기
            </button>
            <Link
              href={`/course/${courseId}`}
              className="w-full py-2 bg-(--mt-gray-point) rounded-md font-bold text-(--mt-white) text-center"
            >
              취소
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
