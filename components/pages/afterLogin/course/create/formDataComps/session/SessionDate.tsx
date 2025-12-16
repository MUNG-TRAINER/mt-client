import {useId} from "react";
import CreateCourseInput from "../../CreateCourseInput";

interface ISessionDateProps {
  startLabelTxt: string;
  endLabelTxt: string;
  inputId: string;
  startName: string;
  endName: string;
}
export default function SessionDate({
  inputId,
  startLabelTxt,
  endLabelTxt,
  startName,
  endName,
}: ISessionDateProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={`${id}_${inputId}_start`}>{startLabelTxt}</label>
      <CreateCourseInput
        id={`${id}_${inputId}_start`}
        name={startName}
        type="time"
      />
      <label htmlFor={`${id}_${inputId}_end`}>{endLabelTxt}</label>
      <CreateCourseInput
        id={`${id}_${inputId}_end`}
        name={endName}
        type="time"
      />
    </div>
  );
}
