"use client";
import {ICourseType} from "@/types/course/courseType";
import {ISessionType} from "@/types/course/sessionType";
import EditCourseTitle from "../edit/form/items/EditCourseTitle";
import EditCourseMainImg from "../edit/form/items/EditCourseMainImg";
import EditCourseLocation from "../edit/form/items/EditCourseLocation";
import CourseSchedule from "../create/formDataComps/CourseSchedule";
import Link from "next/link";
import EditCourseDetailImg from "../edit/form/items/EditCourseDetailImg";
import CourseTextAtrea from "../create/formDataComps/common/CourseTextAtrea";
import CourseItems from "../create/formDataComps/CourseItems";
import CourseDogSize from "../create/formDataComps/CourseDogSize";
import CourseDifficulty from "../create/formDataComps/CourseDifficulty";
import EditCourseLessonForm from "../edit/form/items/EditCourseLessonForm";
import EditCourseIsFree from "../edit/form/items/EditCourseIsFree";
import EditCourseSessionCount from "../edit/form/items/EditCourseSessionCount";
import EditCourseSessionComp from "../edit/form/items/EditCourseSessionComp";
import {useActionState} from "react";
import {reuploadCourseAction} from "@/app/(afterLogin)/course/[id]/(trainer)/reupload-course/actions";
import {courseCreateSchema} from "@/schemas/courseUploadSchema";
import {IFormResultType} from "@/types/formResultType";
import {useRouter} from "next/navigation";

interface IReuploadCourseProps {
  courseId: string;
  course: ICourseType;
  sessionList: ISessionType[];
}
const initialData = {
  errMsg: undefined,
  resMsg: undefined,
};
export default function ReuploadComp({
  courseId,
  course,
  sessionList,
}: IReuploadCourseProps) {
  const router = useRouter();
  const items = course.items.split(", ");
  const [state, action] = useActionState(
    async (
      state: IFormResultType<typeof courseCreateSchema>,
      formData: FormData,
    ): Promise<IFormResultType<typeof courseCreateSchema>> => {
      formData.set("schedule", course.schedule);
      formData.set("mainImageKey", course.mainImageKey);
      formData.set("detailImageKey", course.detailImageKey);
      formData.set("tags", course.tags);
      formData.set("trainerId", course.trainerId + "");
      formData.set("refundPolicy", course.refundPolicy);
      formData.set("lessonForm", course.lessonForm);
      formData.set("isFree", course.isFree + "");
      const result = await reuploadCourseAction(
        courseId,
        sessionList.length,
        state,
        formData,
      );
      if (!result.errMsg && !result.resMsg) {
        router.push("/plan");
      }
      console.log(result.errMsg);
      console.log(result.resMsg);
      return result;
    },
    initialData,
  );
  return (
    <form
      action={action}
      className="w-full h-full overflow-y-scroll p-5 bg-(--mt-white) rounded-md"
    >
      <fieldset className="flex flex-col gap-5">
        <legend>수업재업로드하기</legend>
        <EditCourseMainImg img={course.mainImage} />
        <EditCourseTitle title={course.title} />
        <EditCourseLocation location={course.location} />
        <CourseSchedule
          labelId="schedule"
          inputName="schedule"
          defaultValue={course.schedule}
        />
        <div className="flex flex-col gap-2 justify-around *:flex *:gap-2">
          {/* 유무료 */}
          <EditCourseIsFree isFree={course?.isFree as boolean} />
          {/* 레슨 형식 */}
          <EditCourseLessonForm lessonForm={course?.lessonForm + ""} />
          <div className="flex justify-between">
            {/* 난이도 */}
            <CourseDifficulty difficulty={course?.difficulty} />
            {/* 반려견 사이즈 */}
            <CourseDogSize dogSize={course?.dogSize} />
          </div>
          <EditCourseSessionCount type={course.type} />
          <EditCourseSessionComp session={sessionList} />
          <CourseItems itemsProps={items} />
          {/* 훈련과정내용 */}
          <CourseTextAtrea
            inputId="description"
            labelTxt="훈련과정내용"
            name="description"
            row={5}
            defaultValue={course?.description}
            placeholder="대략적인 해당 훈련내용을 작성해주세요."
          />
          {/* 세부이미지 */}

          <EditCourseDetailImg
            detailImg1={course?.detailImageUrls[0]}
            detailImg2={course?.detailImageUrls[1]}
            detailImg3={course?.detailImageUrls[2]}
          />
        </div>
        <div className="flex gap-2">
          <button className="w-full py-2 bg-(--mt-blue) rounded-md font-bold text-(--mt-white)">
            훈련 재개설하기
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
  );
}
