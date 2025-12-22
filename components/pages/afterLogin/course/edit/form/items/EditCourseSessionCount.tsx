"use client";

import CourseTypeBtn from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseTypeBtn";
import {ICourseType} from "@/types/course/courseType";

export default function EditCourseSessionCount({
  type,
}: {
  type: ICourseType["type"];
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <h5 className="font-bold">회차 여부</h5>
        <small className="text-sm text-red-500">
          (회차여부는 수정하실수 없습니다.)
        </small>
      </div>
      <div className="flex justify-between gap-3 *:flex *:items-center *:gap-2 ">
        <CourseTypeBtn
          labelFor="type_once"
          labelTxt="일회성 수업"
          isActive={type === "ONCE"}
          name="type"
          inputValue="ONCE"
          defaultChecked
          readOnly
        />
        <CourseTypeBtn
          labelFor="type_multi"
          labelTxt="다회성 수업"
          isActive={type === "MULTI"}
          name="type"
          inputValue="MULTI"
          readOnly
        />
      </div>
    </div>
  );
}
