export default function CalendarBody({
  today,
  calendar,
}: {
  today: Date;
  calendar: (number | null)[][];
}) {
  const koreanWeeks = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className="*:grid *:grid-cols-7 *:gap-2 *:place-items-center ">
      <ul className="*:font-bold *:first:text-red-500 *:last:text-blue-600">
        {koreanWeeks.map((days, index) => (
          <li key={index}>{days}</li>
        ))}
      </ul>
      <ul>
        {calendar.map((week) =>
          week.map((days, j) => {
            const isToday = today.getDay() === days;
            return (
              <li
                key={j}
                className={`flex justify-center items-center w-full min-h-12 rounded-lg ${
                  isToday ? "font-bold bg-(--mt-blue-light)" : ""
                }`}
              >
                {days}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
