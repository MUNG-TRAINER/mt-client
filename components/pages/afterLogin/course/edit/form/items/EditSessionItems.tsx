"use client";
import CourseTextAtrea from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseTextAtrea";
import CourseLocation from "@/components/pages/afterLogin/course/create/formDataComps/CourseLocation";
import MaxStudents from "@/components/pages/afterLogin/course/create/formDataComps/session/MaxStudents";
import SessionDate from "@/components/pages/afterLogin/course/create/formDataComps/session/SessionDate";
import SessionPrice from "@/components/pages/afterLogin/course/create/formDataComps/session/SessionPrice";
import SessionSchedule from "@/components/pages/afterLogin/course/create/formDataComps/session/SessionSchedule";
import {useSessionState} from "@/stores/session/sessionState";
import {IUploadCourseTypes} from "@/types/course/courseType";
import React from "react";

const EditSessionItems = React.memo(function EditSessionItems({
  val,
  list,
  index,
}: {
  val: IUploadCourseTypes;
  list: IUploadCourseTypes[];
  index: number;
}) {
  const {free, setPrice} = useSessionState();

  return (
    <div className="flex flex-col gap-3 p-3 border border-(--mt-blue-smoke) rounded-md shadow">
      <span className="font-bold text-xl before:content-['*'] before:text-sm before:text-red-500 before:mr-1">
        {index + 1}회차
      </span>
      <hr className="text-(--mt-gray-light)" />
      <input
        type="text"
        name={`session[${index}].sessionNo`}
        defaultValue={list[index].sessionNo}
        hidden
      />
      <input
        type="text"
        name={`session[${index}].status`}
        defaultValue={list[index].status}
        hidden
      />
      <MaxStudents
        index={index}
        name={`session[${index}].maxStudents`}
        defaultValue={list[index].maxStudents}
      />
      <SessionPrice
        index={index}
        inputId="price"
        name={`session[${index}].price`}
        state={free}
        type="number"
        defaultValue={val.price}
        onChange={(e) => setPrice(Number(e.target.value))}
        classNames={free ? "text-(--mt-gray)" : ""}
        placeholder="가격을 입력해주세요"
      />
      <SessionSchedule
        index={index}
        labelId="sessionDate"
        defaultValue={val.sessionDate}
        inputName={`session[${index}].sessionDate`}
      />
      <CourseLocation
        inputName={`session[${index}].locationDetail`}
        labelTxt="훈련 세부 장소"
        placeholder="훈련 세부 장소"
        defaultVal={val.locationDetail}
      />
      <SessionDate
        index={index}
        startLabelTxt="시작시간"
        startName={`session[${index}].startTime`}
        endLabelTxt="종료시간"
        endName={`session[${index}].endTime`}
        startTime={val.startTime}
        endTime={val.endTime}
      />
      <CourseTextAtrea
        index={index}
        inputId="content"
        name={`session[${index}].content`}
        labelTxt="세부내용"
        placeholder="세부내용을 작성해주세요"
        defaultValue={val.content}
      />
    </div>
  );
});
export default EditSessionItems;
