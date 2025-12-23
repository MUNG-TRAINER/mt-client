"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/shared/search/SearchBar";
import { useCourseSearch } from "@/hooks/course/useCourseSearch";
import { useCoursesByDate } from "@/hooks/course/useCoursesByDate";
import { useCourseSearchFilters } from "@/hooks/course/useCourseSearchFilters";
import { CourseSearchResponse } from "@/types/course/courseType";
import { CourseFilterBar } from "./CourseFilterBar";
import { MonthNavigator } from "./MonthNavigator";
import { SearchResultInfo } from "./SearchResultInfo";
import { CalendarView } from "./CalendarView";
import { ListView } from "./ListView";

export default function CourseSearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const observerTarget = useRef<HTMLDivElement>(null);

  // 필터 및 검색 상태 관리
  const {
    keyword,
    viewMode,
    currentMonth,
    selectedDate,
    selectedFilter,
    handleSearch,
    handleDateClick,
    handleMonthChange,
    handleFilterChange,
    handleViewModeChange,
  } = useCourseSearchFilters({
    urlLessonForm: searchParams.get("lessonForm"),
  });

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
    enabled: viewMode === "list",
  });

  // 달력 뷰용 데이터
  const { data: dateCoursesData, isLoading: isDateCoursesLoading } =
    useCoursesByDate({
      date: selectedDate,
      keyword: keyword || undefined,
      lessonForm: selectedFilter === "ALL" ? undefined : selectedFilter,
      enabled: viewMode === "calendar" && !!selectedDate,
    });

  // 무한 스크롤 구현 (리스트 뷰에서만)
  useEffect(() => {
    if (viewMode !== "list") return;

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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, viewMode]);

  const handleReserve = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  // 모든 페이지의 데이터를 하나로 합침 (리스트 뷰)
  const allCourses =
    viewMode === "list"
      ? data?.pages.flatMap((page: CourseSearchResponse) => page.courses) || []
      : [];

  // 달력 뷰에서 선택된 날짜의 코스 목록
  const dateCourses =
    viewMode === "calendar" && selectedDate
      ? dateCoursesData?.courses || []
      : [];

  // 표시할 코스 목록
  const displayCourses = viewMode === "list" ? allCourses : dateCourses;

  // 커서 기반에서는 totalCount가 없으므로 현재 로드된 개수만 표시
  const loadedCount = displayCourses.length;

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

      {/* 훈련형태 필터 + 뷰 모드 토글 버튼 */}
      <CourseFilterBar
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {/* 달력 뷰일 때 월 네비게이션 */}
      {viewMode === "calendar" && (
        <MonthNavigator
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
        />
      )}

      {/* 검색 결과 정보 */}
      {!isLoading && !isDateCoursesLoading && displayCourses.length > 0 && (
        <SearchResultInfo
          count={loadedCount}
          keyword={keyword}
          selectedDate={selectedDate}
          viewMode={viewMode}
        />
      )}

      {/* 에러 처리 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">
            검색 중 오류가 발생했습니다. 다시 시도해주세요.
          </p>
        </div>
      )}

      {/* 달력 뷰 */}
      {viewMode === "calendar" && (
        <CalendarView
          currentMonth={currentMonth}
          keyword={keyword}
          selectedFilter={selectedFilter}
          selectedDate={selectedDate}
          dateCourses={dateCourses}
          isLoading={isDateCoursesLoading}
          onDateClick={handleDateClick}
          onReserve={handleReserve}
        />
      )}

      {/* 리스트 뷰 */}
      {viewMode === "list" && (
        <ListView
          courses={allCourses}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          observerTarget={observerTarget}
          onReserve={handleReserve}
        />
      )}
    </div>
  );
}
