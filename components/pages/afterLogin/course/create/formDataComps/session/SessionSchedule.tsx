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
  const now = new Date();

  // YYYY-MM-DD 포맷 함수
  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // 이번 달 시작 (오늘)
  const minDate = formatDate(now);

  // 이번 달 마지막 날
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 4, 0);
  const maxDate = formatDate(lastDayOfMonth);
  return (
    <CourseLabelBox>
      <label
        htmlFor={`${id}_${index}_${labelId}`}
        className="before:content-['*'] before:text-sm before:text-red-500 before:mr-1"
      >
        세부일자
      </label>
      <CreateCourseInput
        id={`${id}_${index}_${labelId}`}
        name={inputName}
        type="date"
        {...props}
        min={minDate}
        max={maxDate}
        required
      />
    </CourseLabelBox>
  );
}
