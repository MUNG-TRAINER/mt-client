import { fetchWithAuth } from "@/apis/common/fetchWithAuth";
import { CourseSearchResponse } from "@/types/course/courseType";
import { API_BASE_URL } from "@/util/env";

interface SearchParams {
  keyword?: string;
  page?: number;
  size?: number;
}

export const courseApi = {
  /**
   * 훈련 과정 검색
   */
  searchCourses: async (
    params: SearchParams = {}
  ): Promise<CourseSearchResponse> => {
    const queryParams = new URLSearchParams();

    if (params.keyword) {
      queryParams.append("keyword", params.keyword);
    }
    if (params.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params.size) {
      queryParams.append("size", params.size.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${API_BASE_URL}/course/search?${queryString}`
      : `${API_BASE_URL}/course/search`;

    const response = await fetchWithAuth(url);

    if (!response.ok) {
      throw new Error("훈련 과정 검색에 실패했습니다.");
    }

    return response.json();
  },
};
