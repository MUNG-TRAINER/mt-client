"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/shared/search/SearchBar";
import { CourseList } from "@/components/shared/course/CourseList";
import { useCourseSearch } from "@/hooks/course/useCourseSearch";
import { CourseSearchResponse } from "@/types/course/courseType";

type LessonFormFilter = "ALL" | "WALK" | "GROUP" | "PRIVATE";

export default function CourseSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null);

  // URL에서 lessonForm 파라미터 가져오기 (없으면 "ALL")
  const urlLessonForm = searchParams.get("lessonForm") as
    | "WALK"
    | "GROUP"
    | "PRIVATE"
    | null;

  const [selectedFilter, setSelectedFilter] = useState<LessonFormFilter>(
    () => urlLessonForm || "ALL"
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCourseSearch({
    keyword: keyword || undefined,
    lessonForm: selectedFilter === "ALL" ? undefined : selectedFilter,
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

  // 필터 변경 핸들러
  const handleFilterChange = (filter: LessonFormFilter) => {
    setSelectedFilter(filter);

    // URL 업데이트
    const params = new URLSearchParams();
    if (filter !== "ALL") {
      params.set("lessonForm", filter);
    }

    const newUrl = params.toString()
      ? `/course/search?${params.toString()}`
      : "/course/search";

    router.push(newUrl);
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

      {/* 훈련형태 필터 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { value: "ALL" as const, label: "전체" },
          { value: "WALK" as const, label: "무료 산책" },
          { value: "PRIVATE" as const, label: "개인 레슨" },
          { value: "GROUP" as const, label: "그룹 레슨" },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedFilter === filter.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
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
