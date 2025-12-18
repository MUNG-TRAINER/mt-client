import { useInfiniteQuery } from "@tanstack/react-query";
import { courseAPI } from "@/apis/course/courseApi";

interface UseCourseSearchParams {
  keyword?: string;
  size?: number;
  enabled?: boolean;
}

/**
 * 훈련 과정 무한 스크롤 검색 훅 (커서 기반)
 */
export const useCourseSearch = ({
  keyword,
  size = 20,
  enabled = true,
}: UseCourseSearchParams = {}) => {
  return useInfiniteQuery({
    queryKey: ["courses", "search", keyword, size],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      courseAPI.searchCourses({
        keyword,
        lastCourseId: pageParam, // 커서로 사용
        size,
      }),
    getNextPageParam: (lastPage) => {
      // hasMore가 true이고 lastCourseId가 있으면 반환
      return lastPage.hasMore ? lastPage.lastCourseId : undefined;
    },
    initialPageParam: undefined as number | undefined, // 첫 페이지는 lastCourseId 없음
    enabled,
  });
};
