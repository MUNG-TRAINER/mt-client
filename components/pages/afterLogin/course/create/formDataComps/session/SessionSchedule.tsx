import {InputHTMLAttributes, useId} from "react";
import CreateCourseInput from "../../CreateCourseInput";
import CourseLabelBox from "../common/CourseLabelBox";
interface ISessionSchedule extends InputHTMLAttributes<HTMLInputElement> {
  index: number;
  labelId: string;
  inputName: string;
}
export default function SessionSchedule({
  index,
  labelId,
  inputName,
  ...props
}: ISessionSchedule) {
  const id = useId();
  return (
    <CourseLabelBox>
      <label htmlFor={`${id}_${index}_${labelId}`}>세부일자</label>
      <CreateCourseInput
        id={`${id}_${index}_${labelId}`}
        name={inputName}
        type="date"
        {...props}
      />
    </CourseLabelBox>
  );
}
