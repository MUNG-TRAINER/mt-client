import type {
  LessonFormFilter,
  ViewMode,
} from "@/types/course/courseFilterTypes";

interface CourseFilterBarProps {
  selectedFilter: LessonFormFilter;
  onFilterChange: (filter: LessonFormFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: () => void;
}

const FILTERS = [
  { value: "ALL" as const, label: "전체" },
  { value: "WALK" as const, label: "산책모임" },
  { value: "PRIVATE" as const, label: "개인레슨" },
  { value: "GROUP" as const, label: "그룹레슨" },
];

export function CourseFilterBar({
  selectedFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
}: CourseFilterBarProps) {
  return (
    <div className="flex gap-2 items-center">
      {/* 훈련형태 필터 */}
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
            selectedFilter === filter.value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}

      {/* 뷰 모드 토글 버튼 */}
      <button
        onClick={onViewModeChange}
        className="ml-auto px-3 py-2 rounded-full transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1.5 flex-shrink-0 text-sm font-semibold whitespace-nowrap"
      >
        {viewMode === "list" ? (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>달력</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span>목록</span>
          </>
        )}
      </button>
    </div>
  );
}
