"use client";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import type {
  LessonFormFilter,
  ViewMode,
} from "@/types/course/courseFilterTypes";

// 유효한 LessonFormFilter 값인지 확인
const getValidFilter = (value: string | null): LessonFormFilter => {
  if (value === "WALK" || value === "GROUP" || value === "PRIVATE") {
    return value;
  }
  return "ALL";
};

interface UseCourseSearchFiltersProps {
  urlLessonForm: string | null;
}

export function useCourseSearchFilters({
  urlLessonForm,
}: UseCourseSearchFiltersProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<LessonFormFilter>(() =>
    getValidFilter(urlLessonForm),
  );

  // URL의 lessonForm 파라미터가 변경될 때 selectedFilter를 동기화
  useEffect(() => {
    setSelectedFilter(getValidFilter(urlLessonForm));
  }, [urlLessonForm]);

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

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

  const handleViewModeChange = () => {
    const newMode = viewMode === "list" ? "calendar" : "list";
    setViewMode(newMode);
    if (newMode === "list") {
      setSelectedDate(null);
    }
  };

  return {
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
  };
}
