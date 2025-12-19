import { CounselingDogListResponse } from "@/types/counseling/counselingType";

/**
 * 상담 관련 API
 */
export const counselingApi = {
  /**
   * 상담 완료 전/후 반려견 리스트 조회
   * @param completed - true: 상담 완료, false: 상담 대기
   */
  getCounselingDogs: async (
    completed: boolean
  ): Promise<CounselingDogListResponse> => {
    const response = await fetch(`/api/counseling?completed=${completed}`, {
      method: "GET",
    });

    if (!response?.ok) {
      throw new Error("상담 리스트를 불러올 수 없습니다.");
    }

    const data: CounselingDogListResponse = await response.json();
    return data;
  },

  /**
   * 상담 내용 저장
   * @param counselingId - 상담 ID
   * @param content - 상담 내용
   */
  saveCounselingContent: async (
    counselingId: number,
    content: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`/api/counseling/${counselingId}/content`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response?.ok) {
      throw new Error("상담 내용 저장에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  },
};
