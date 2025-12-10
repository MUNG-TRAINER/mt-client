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
  const prevMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };
  const nextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        return 0;
      }
      return prev + 1;
    });
    setYear((y) => (month === 11 ? y + 1 : y));
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
