import {InputHTMLAttributes, useId} from "react";
import CreateCourseInput from "../../CreateCourseInput";
interface IMaxStudents extends InputHTMLAttributes<HTMLInputElement> {
  inputId: string;
}
export default function MaxStudents({inputId, ...props}: IMaxStudents) {
  const id = useId();
  return (
    <div>
      <label htmlFor={`${id}_${inputId}`}>최대 수강생 수</label>
      <CreateCourseInput id={`${id}_${inputId}`} {...props} />
    </div>
  );
}
