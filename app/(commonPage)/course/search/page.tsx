"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/shared/search/SearchBar";
import { CourseList } from "@/components/shared/course/CourseList";
import { useCourseSearch } from "@/hooks/course/useCourseSearch";

export default function CourseSearchPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useCourseSearch({
    keyword: keyword || undefined,
    page: currentPage,
  });

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setCurrentPage(1); // 새로운 검색 시 첫 페이지로
  };

  const handleReserve = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  const handleLoadMore = () => {
    if (data && currentPage < data.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* 검색바 */}
      <div className="w-full">
        <SearchBar
          onSearch={handleSearch}
          placeholder="훈련 과정을 검색하세요"
          initialValue={keyword}
        />
      </div>

      {/* 검색 결과 정보 */}
      {data && !isLoading && (
        <div className="flex items-center justify-between text-xs">
          <p className="text-gray-600">
            총{" "}
            <span className="font-semibold text-gray-900">
              {data.totalCount}
            </span>
            개
            {keyword && (
              <span className="ml-1">
                (<span className="font-semibold">"{keyword}"</span>)
              </span>
            )}
          </p>
          <p className="text-gray-500">
            {data.currentPage} / {data.totalPages}
          </p>
        </div>
      )}

      {/* 에러 처리 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">
            검색 중 오류가 발생했습니다. 다시 시도해주세요.
          </p>
        </div>
      )}

      {/* 과정 목록 */}
      <div className="flex-1 overflow-y-auto">
        <CourseList
          courses={data?.courses || []}
          onReserve={handleReserve}
          isLoading={isLoading}
          isEmpty={!isLoading && data?.courses.length === 0}
        />
      </div>

      {/* 더보기 버튼 */}
      {data && data.currentPage < data.totalPages && !isLoading && (
        <div className="w-full">
          <button
            onClick={handleLoadMore}
            className="w-full py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            더보기 ({data.currentPage} / {data.totalPages})
          </button>
        </div>
      )}
    </div>
  );
}
