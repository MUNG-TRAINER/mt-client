import { fetchWithAuth } from "@/apis/common/fetchWithAuth";
import { CourseSearchResponse } from "@/types/course/courseType";
import { API_BASE_URL } from "@/util/env";

interface SearchParams {
  keyword?: string;
  lastCourseId?: number; // 커서 기반: 마지막으로 조회한 courseId
  size?: number;
}

export const courseAPI = {
  /**
   * 훈련 과정 검색 (커서 기반 무한 스크롤)
   */
  searchCourses: async (
    params: SearchParams = {}
  ): Promise<CourseSearchResponse> => {
    const queryParams = new URLSearchParams();

    if (params.keyword) {
      queryParams.append("keyword", params.keyword);
    }
    if (params.lastCourseId) {
      queryParams.append("lastCourseId", params.lastCourseId.toString());
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

  getCourseDetail: async (courseId: string) => {
    const res = await fetchWithAuth(`${API_BASE_URL}/course/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("훈련과정을 불러오는데 실패했습니다.");
    }
    return res.json();
  },

  getSessionList: async (courseId: string) => {
    const res = await fetchWithAuth(
      `${API_BASE_URL}/course/${courseId}/sessions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("세션 목록을 불러오는데 실패했습니다.");
    }
    return res.json();
  },
};
