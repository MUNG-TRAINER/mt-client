import { useQuery } from "@tanstack/react-query";
import { courseApi } from "@/apis/course/courseApi";

interface UseCourseSearchParams {
  keyword?: string;
  page?: number;
  size?: number;
  enabled?: boolean;
}

/**
 * 훈련 과정 검색 훅
 */
export const useCourseSearch = ({
  keyword,
  page = 1,
  size = 20,
  enabled = true,
}: UseCourseSearchParams = {}) => {
  return useQuery({
    queryKey: ["courses", "search", keyword, page, size],
    queryFn: () => courseApi.searchCourses({ keyword, page, size }),
    enabled,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
