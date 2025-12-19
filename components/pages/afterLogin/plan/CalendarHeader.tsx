import {ChevronLeftIcon, ChevronRightIcon} from "@/components/icons/chevron";
import {Dispatch, SetStateAction} from "react";
interface ICalendarHeaderProps {
  year: number;
  month: number;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
}
export default function CalendarHeader({
  year,
  month,
  setYear,
  setMonth,
}: ICalendarHeaderProps) {
  const nextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1); // prev 기준으로 year 업데이트
        return 0;
      }
      return prev + 1;
    });
  };

  const prevMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };
  return (
    <div className="flex items-center justify-between">
      <h4 className="font-bold">
        {year}년 {month + 1}월
      </h4>
      <div className="*:bg-(--mt-gray-smoke) *:p-2 *:rounded-lg flex gap-2 *:focus:animate-pulse">
        <button onClick={prevMonth}>
          <i>
            <ChevronLeftIcon className="size-5 text-(--mt-black)" />
          </i>
        </button>
        <button onClick={nextMonth}>
          <i>
            <ChevronRightIcon className="size-5 text-(--mt-black)" />
          </i>
        </button>
      </div>
    </div>
  );
}
