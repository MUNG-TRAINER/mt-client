import {fetchWithAuth} from "@/apis/common/fetchWithAuth";
import {CourseSearchResponse} from "@/types/course/courseType";
import {API_BASE_URL} from "@/util/env";

interface SearchParams {
  keyword?: string;
  lastCourseId?: number; // 커서 기반: 마지막으로 조회한 courseId
  size?: number;
  lessonForm?: "WALK" | "GROUP" | "PRIVATE"; // 훈련 형태 필터
}

export const courseAPI = {
  /**
   * 훈련 과정 검색 (커서 기반 무한 스크롤)
   */
  searchCourses: async (
    params: SearchParams = {},
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
    if (params.lessonForm) {
      queryParams.append("lessonForm", params.lessonForm);
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
    // /api/training/course/${courseId}
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
    // /api/training/course/${courseId}/sessions
    const res = await fetchWithAuth(
      `${API_BASE_URL}/course/${courseId}/sessions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      throw new Error("세션 목록을 불러오는데 실패했습니다.");
    }
    return res.json();
  },

  /**
   * 달력 조회 - 특정 기간의 세션이 있는 날짜 목록
   */
  getCalendar: async (params: {
    startDate: string;
    endDate: string;
    keyword?: string;
    lessonForm?: "WALK" | "GROUP" | "PRIVATE";
  }) => {
    const queryParams = new URLSearchParams({
      startDate: params.startDate,
      endDate: params.endDate,
    });

    if (params.keyword) {
      queryParams.append("keyword", params.keyword);
    }
    if (params.lessonForm) {
      queryParams.append("lessonForm", params.lessonForm);
    }

    const response = await fetchWithAuth(
      `${API_BASE_URL}/course/calendar?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("달력 데이터를 불러오는데 실패했습니다.");
    }

    return response.json();
  },

  /**
   * 특정 날짜의 코스 목록 조회
   */
  getCoursesByDate: async (params: {
    date: string;
    keyword?: string;
    lessonForm?: "WALK" | "GROUP" | "PRIVATE";
  }): Promise<CourseSearchResponse> => {
    const queryParams = new URLSearchParams({
      date: params.date,
    });

    if (params.keyword) {
      queryParams.append("keyword", params.keyword);
    }
    if (params.lessonForm) {
      queryParams.append("lessonForm", params.lessonForm);
    }

    const response = await fetchWithAuth(
      `${API_BASE_URL}/course/calendar/courses?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("코스 목록을 불러오는데 실패했습니다.");
    }

    return response.json();
  },
};
