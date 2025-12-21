import {InputHTMLAttributes, useId} from "react";
import CreateCourseInput from "../CreateCourseInput";
import CourseLabelBox from "./common/CourseLabelBox";
interface ICourseSchedule extends InputHTMLAttributes<HTMLInputElement> {
  labelId: string;
  inputName: string;
}
export default function CourseSchedule({
  labelId,
  inputName,
  ...props
}: ICourseSchedule) {
  const id = useId();
  return (
    <CourseLabelBox>
      <label htmlFor={`${id}_${labelId}`}>일자</label>
      <CreateCourseInput
        id={`${id}_${labelId}`}
        name={inputName}
        type="text"
        {...props}
      />
    </CourseLabelBox>
  );
}
