import {ApplicationType} from "@/types/applications/applicationsType";
import {IResultResponseData} from "@/types/response/resultResponse";
import type {
  PendingApplication,
  ApplicationStatusUpdateRequest,
  DogDetailResponse,
  GroupedApplication,
  BulkStatusUpdateRequest,
} from "@/types/applications/applicationType";
import {fetchWithAuth} from "../common/fetchWithAuth";

export const applicationAPI = {
  getApplicationList: async () => {
    const res = await fetchWithAuth("/api/application/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("신청내역 리스트를 불러오는데 실패했습니다.");
    }
    const data = (await res.json()) as IResultResponseData<ApplicationType[]>;
    return data.data;
  },
  deleteApplication: async (data: number[]) => {
    const res = await fetchWithAuth("/api/application", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("훈련신청 취소에 실패했습니다.");
    }
    const result = (await res.json()) as IResultResponseData<{
      success: boolean;
    }>;
    return result;
  },

  applyCourse: async (
    courseId: number,
    data: Partial<ApplicationType>
  ): Promise<ApplicationType[]> => {
  
    const res = await fetch(`/api/course/${courseId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorBody = await res.json();

      if (errorBody.code === "ALREADY_APPLIED") {
        throw new Error("ALREADY_APPLIED");
      }

      throw new Error("APPLY_FAILED");
    }

    const result = (await res.json()) as IResultResponseData<ApplicationType[]>;
    return result.data;
  },

  // 훈련사용: 승인 대기 중인 신청 목록 조회
  getPendingApplications: async (): Promise<PendingApplication[]> => {
    const response = await fetchWithAuth("/api/trainer/applications", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("승인 대기 목록을 불러오는데 실패했습니다.");
    }

    return response.json();
  },
  // 훈련사용: 신청 반려견 상세 정보 조회
  getDogDetail: async (applicationId: number): Promise<DogDetailResponse> => {
    const response = await fetchWithAuth(
      `/api/trainer/applications/${applicationId}/dog-detail`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("반려견 정보를 불러오는데 실패했습니다.");
    }

    return response.json();
  },
  // 훈련사용: 신청 승인/거절 처리
  updateApplicationStatus: async (
    applicationId: number,
    data: ApplicationStatusUpdateRequest,
  ): Promise<string> => {
    const response = await fetchWithAuth(
      `/api/trainer/applications/${applicationId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("신청 상태 변경에 실패했습니다.");
    }

    return response.text();
  },
  // 훈련사용: 코스별 그룹핑된 승인 대기 목록 조회 (신규)
  getGroupedApplications: async (): Promise<GroupedApplication[]> => {
    const response = await fetchWithAuth("/api/trainer/applications/grouped", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("승인 대기 목록을 불러오는데 실패했습니다.");
    }

    return response.json();
  },
  // 훈련사용: 코스별 일괄 승인/거절 처리 (신규)
  bulkUpdateApplicationStatus: async (
    courseId: number,
    dogId: number,
    data: BulkStatusUpdateRequest,
  ): Promise<string> => {
    const response = await fetchWithAuth(
      `/api/trainer/applications/bulk/${courseId}/dog/${dogId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("일괄 상태 변경에 실패했습니다.");
    }

    return response.text();
  },
};
