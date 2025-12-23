import type { ViewMode } from "@/types/course/courseFilterTypes";

interface SearchResultInfoProps {
  count: number;
  keyword?: string;
  selectedDate?: string | null;
  viewMode: ViewMode;
}

export function SearchResultInfo({
  count,
  keyword,
  selectedDate,
  viewMode,
}: SearchResultInfoProps) {
  return (
    <div className="flex items-center justify-between text-xs">
      <p className="text-gray-600">
        {viewMode === "calendar" && selectedDate && (
          <span className="mr-2 font-semibold text-blue-600">
            {selectedDate}
          </span>
        )}
        <span className="font-semibold text-gray-900">{count}</span>개
        {keyword && (
          <span className="ml-1">
            (<span className="font-semibold">&quot;{keyword}&quot;</span>)
          </span>
        )}
      </p>
    </div>
  );
}
