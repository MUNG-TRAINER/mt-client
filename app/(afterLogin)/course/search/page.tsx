"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/shared/search/SearchBar";
import { CourseList } from "@/components/shared/course/CourseList";
import { useCourseSearch } from "@/hooks/course/useCourseSearch";
import { CourseSearchResponse } from "@/types/course/courseType";

export default function CourseSearchPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCourseSearch({
    keyword: keyword || undefined,
  });

  // 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  const handleReserve = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  // 모든 페이지의 데이터를 하나로 합침
  const allCourses =
    data?.pages.flatMap((page: CourseSearchResponse) => page.courses) || [];
  // 커서 기반에서는 totalCount가 없으므로 현재 로드된 개수만 표시
  const loadedCount = allCourses.length;

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
      {!isLoading && allCourses.length > 0 && (
        <div className="flex items-center justify-between text-xs">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{loadedCount}</span>개
            {keyword && (
              <span className="ml-1">
                (<span className="font-semibold">&quot;{keyword}&quot;</span>)
              </span>
            )}
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
          courses={allCourses}
          onReserve={handleReserve}
          isLoading={isLoading}
          isEmpty={!isLoading && allCourses.length === 0}
        />

        {/* 무한 스크롤 감지 영역 */}
        <div
          ref={observerTarget}
          className="h-10 flex items-center justify-center"
        >
          {isFetchingNextPage && (
            <div className="text-sm text-gray-500">로딩 중...</div>
          )}
        </div>
      </div>
    </div>
  );
}
