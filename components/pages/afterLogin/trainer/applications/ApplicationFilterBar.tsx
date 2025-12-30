import type { LessonFormFilter } from "@/types/applications/applicationFilterTypes";

interface ApplicationFilterBarProps {
  selectedFilter: LessonFormFilter;
  onFilterChange: (filter: LessonFormFilter) => void;
}

const FILTERS = [
  { value: "ALL" as const, label: "전체" },
  { value: "WALK" as const, label: "산책모임" },
  { value: "GROUP" as const, label: "그룹레슨" },
  { value: "PRIVATE" as const, label: "개인레슨" },
];

export function ApplicationFilterBar({
  selectedFilter,
  onFilterChange,
}: ApplicationFilterBarProps) {
  return (
    <div className="flex gap-2 items-center">
      {/* 과정 타입 필터 */}
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors shrink-0 ${
            selectedFilter === filter.value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
