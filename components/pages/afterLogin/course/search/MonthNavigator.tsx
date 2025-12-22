interface MonthNavigatorProps {
  currentMonth: Date;
  onMonthChange: (direction: "prev" | "next") => void;
}

export function MonthNavigator({
  currentMonth,
  onMonthChange,
}: MonthNavigatorProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
      <button
        onClick={() => onMonthChange("prev")}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <span className="text-lg font-semibold">
        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
      </span>
      <button
        onClick={() => onMonthChange("next")}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
