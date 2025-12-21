import {useId} from "react";
import CreateCourseInput from "../../CreateCourseInput";

interface ISessionDateProps {
  index: number;
  startLabelTxt: string;
  endLabelTxt: string;
  startName: string;
  endName: string;
}
export default function SessionDate({
  index,
  startLabelTxt,
  endLabelTxt,
  startName,
  endName,
}: ISessionDateProps) {
  const id = useId();
  return (
    <div className="flex items-center gap-3 [&>div>label]:font-bold">
      <div>
        <label htmlFor={`${id}_${index}_start`}>{startLabelTxt}</label>
        <CreateCourseInput
          id={`${id}_${index}_start`}
          name={startName}
          type="time"
        />
      </div>
      <div>
        <label htmlFor={`${id}_${index}_end`}>{endLabelTxt}</label>
        <CreateCourseInput
          id={`${id}_${index}_end`}
          name={endName}
          type="time"
        />
      </div>
    </div>
  );
}
