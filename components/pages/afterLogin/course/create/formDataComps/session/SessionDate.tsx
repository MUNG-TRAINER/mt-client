import {useId} from "react";
import CreateCourseInput from "../../CreateCourseInput";

interface ISessionDateProps {
  labelTxt: string;
  inputId: string;
  startName: string;
  endName: string;
}
export default function SessionDate({
  inputId,
  labelTxt,
  startName,
  endName,
}: ISessionDateProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={`${id}_${inputId}`}>{labelTxt}</label>
      <CreateCourseInput id={`${id}_${inputId}`} name={startName} type="time" />
      <label htmlFor={`${id}_${inputId}`}>{labelTxt}</label>
      <CreateCourseInput id={`${id}_${inputId}`} name={endName} type="time" />
    </div>
  );
}
