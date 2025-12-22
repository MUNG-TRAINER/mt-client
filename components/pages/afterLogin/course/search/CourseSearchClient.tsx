"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/shared/search/SearchBar";
import { CourseList } from "@/components/shared/course/CourseList";
import { CourseCalendar } from "@/components/shared/calendar/CourseCalendar";
import { useCourseSearch } from "@/hooks/course/useCourseSearch";
import { useCoursesByDate } from "@/hooks/course/useCoursesByDate";
import { CourseSearchResponse } from "@/types/course/courseType";

type LessonFormFilter = "ALL" | "WALK" | "GROUP" | "PRIVATE";
type ViewMode = "list" | "calendar";

// 유효한 LessonFormFilter 값인지 확인
const getValidFilter = (value: string | null): LessonFormFilter => {
  if (value === "WALK" || value === "GROUP" || value === "PRIVATE") {
    return value;
  }
  return "ALL";
};

export default function CourseSearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null);

  // 뷰 모드 상태
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // 달력 관련 상태
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // URL에서 lessonForm 파라미터 가져오기
  const urlLessonForm = searchParams.get("lessonForm");

  const [selectedFilter, setSelectedFilter] = useState<LessonFormFilter>(() =>
    getValidFilter(urlLessonForm)
  );

  // URL의 lessonForm 파라미터가 변경될 때 selectedFilter를 동기화
  useEffect(() => {
    setSelectedFilter(getValidFilter(urlLessonForm));
  }, [urlLessonForm]);

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

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  const handleReserve = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };

  // 달력 날짜 클릭 핸들러
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  // 월 변경 핸들러
  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
    setSelectedDate(null); // 월 변경 시 선택된 날짜 초기화
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
      <div className="flex gap-2 items-center">
        {/* 훈련형태 필터 */}
        {[
          { value: "ALL" as const, label: "전체" },
          { value: "WALK" as const, label: "산책모임" },
          { value: "PRIVATE" as const, label: "개인레슨" },
          { value: "GROUP" as const, label: "그룹레슨" },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
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
          onClick={() => {
            const newMode = viewMode === "list" ? "calendar" : "list";
            setViewMode(newMode);
            if (newMode === "list") {
              setSelectedDate(null);
            }
          }}
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

      {/* 달력 뷰일 때 월 네비게이션 */}
      {viewMode === "calendar" && (
        <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
          <button
            onClick={() => handleMonthChange("prev")}
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
            onClick={() => handleMonthChange("next")}
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
      )}

      {/* 검색 결과 정보 */}
      {!isLoading && !isDateCoursesLoading && displayCourses.length > 0 && (
        <div className="flex items-center justify-between text-xs">
          <p className="text-gray-600">
            {viewMode === "calendar" && selectedDate && (
              <span className="mr-2 font-semibold text-blue-600">
                {selectedDate}
              </span>
            )}
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

      {/* 달력 뷰 */}
      {viewMode === "calendar" && (
        <div className="flex-1 overflow-y-auto">
          <div className="mb-4">
            <CourseCalendar
              currentMonth={currentMonth}
              keyword={keyword || undefined}
              lessonForm={selectedFilter === "ALL" ? undefined : selectedFilter}
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
          </div>

          {/* 선택된 날짜의 코스 목록 */}
          {selectedDate && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3">
                {selectedDate} 훈련 과정
              </h3>
              <CourseList
                courses={dateCourses}
                onReserve={handleReserve}
                isLoading={isDateCoursesLoading}
                isEmpty={!isDateCoursesLoading && dateCourses.length === 0}
              />
            </div>
          )}
        </div>
      )}

      {/* 리스트 뷰 */}
      {viewMode === "list" && (
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
      )}
    </div>
  );
}
