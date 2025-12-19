import {InputHTMLAttributes, useId} from "react";
import CreateCourseInput from "../../CreateCourseInput";
interface IMaxStudents extends InputHTMLAttributes<HTMLInputElement> {
  index: number;
}
export default function MaxStudents({index, ...props}: IMaxStudents) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1 [&>label]:font-bold">
      <label htmlFor={`${id}_${index}_maxStudents`}>최대 수강생 수</label>
      <div className="flex items-center gap-2">
        <CreateCourseInput
          id={`${id}_${index}_maxStudents`}
          type="number"
          {...props}
        />
        <span className="font-bold">명</span>
      </div>
    </div>
  );
}
