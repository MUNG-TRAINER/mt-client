import React from "react";
import SessionDate from "./SessionDate";
import MaxStudents from "./MaxStudents";
import CourseTextAtrea from "../common/CourseTextAtrea";
import SessionPrice from "./SessionPrice";
import {useSessionState} from "@/stores/sessionState";
import SessionSchedule from "./SessionSchedule";
import CourseLocation from "../CourseLocation";
import {IUploadCourseTypes} from "@/types/course/courseType";

const SessionItems = React.memo(function SessionItems({
  val,
  index,
}: {
  val: IUploadCourseTypes[];
  index: number;
}) {
  const {free, price, setPrice} = useSessionState();
  return (
    <div className="flex flex-col gap-1 p-3 border border-(--mt-blue-smoke) rounded-md shadow">
      <span className="font-bold text-xl">{index + 1}회차</span>
      <hr className="text-(--mt-gray-light)" />
      <input
        type="text"
        name={`session[${index}].sessionNo`}
        defaultValue={val[index].sessionNo}
        hidden
      />
      <input
        type="text"
        name={`session[${index}].status`}
        defaultValue={val[index].status}
        hidden
      />
      <MaxStudents
        index={index}
        name={`session[${index}].maxStudents`}
        defaultValue={val[index].maxStudents}
      />
      <SessionPrice
        index={index}
        inputId="price"
        name={`session[${index}].price`}
        state={free}
        type="number"
        defaultValue={price + ""}
        onChange={(e) => setPrice(Number(e.target.value))}
        classNames={free ? "text-(--mt-gray)" : ""}
        placeholder="가격을 입력해주세요"
      />
      <SessionSchedule
        index={index}
        labelId="sessionDate"
        inputName={`session[${index}].sessionDate`}
      />
      <CourseLocation
        inputName={`session[${index}].locationDetail`}
        labelTxt="훈련 세부 장소"
        placeholder="훈련 세부 장소"
      />
      <SessionDate
        index={index}
        startLabelTxt="시작시간"
        startName={`session[${index}].startTime`}
        endLabelTxt="종료시간"
        endName={`session[${index}].endTime`}
      />
      <CourseTextAtrea
        index={index}
        inputId="content"
        name={`session[${index}].content`}
        labelTxt="세부내용"
        placeholder="세부내용을 작성해주세요"
      />
    </div>
  );
});

export default SessionItems;
