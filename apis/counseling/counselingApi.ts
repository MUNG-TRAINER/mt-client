import {
  CounselingDogListResponse,
  IDogForCounselingType,
  ICreateCounselingRequestType,
  ICreateCounselingResponseType,
  IUserCounselingListType,
  IUserCounselingDetailType,
  ICancelCounselingResponseType,
} from "@/types/counseling/counselingType";
import {fetchWithAuth} from "../common/fetchWithAuth";

/**
 * 상담 관련 API
 */
export const counselingApi = {
  // ===== 훈련사용 API =====
  /**
   * 상담 완료 전/후 반려견 리스트 조회
   * @param completed - true: 상담 완료, false: 상담 대기
   */
  getCounselingDogs: async (
    completed: boolean,
  ): Promise<CounselingDogListResponse> => {
    const response = await fetchWithAuth(
      `/api/counseling?completed=${completed}`,
      {
        method: "GET",
      },
    );

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
    content: string,
  ): Promise<{success: boolean; message: string}> => {
    const response = await fetchWithAuth(
      `/api/counseling/${counselingId}/content`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({content}),
      },
    );

    if (!response?.ok) {
      throw new Error("상담 내용 저장에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  },

  // ===== 사용자용 API =====
  /**
   * GET /api/users/counseling/dogs/{dogId}
   * 상담 신청용 반려견 정보 조회 (중복 신청 체크)
   */
  getDogForCounseling: async (
    dogId: number,
  ): Promise<IDogForCounselingType> => {
    const response = await fetchWithAuth(
      `/api/users/counseling/dogs/${dogId}`,
      {
        method: "GET",
      },
    );

    if (!response?.ok) {
      throw new Error("반려견 정보를 불러올 수 없습니다.");
    }

    const data: IDogForCounselingType = await response.json();
    return data;
  },

  /**
   * POST /api/users/counseling
   * 상담 신청
   */
  createCounseling: async (
    requestData: ICreateCounselingRequestType,
  ): Promise<ICreateCounselingResponseType> => {
    const response = await fetchWithAuth("/api/users/counseling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response?.ok) {
      throw new Error("상담 신청에 실패했습니다.");
    }

    const data: ICreateCounselingResponseType = await response.json();
    return data;
  },

  /**
   * GET /api/users/counseling
   * 내 상담 목록 조회
   */
  getMyCounselings: async (): Promise<IUserCounselingListType> => {
    const response = await fetchWithAuth("/api/users/counseling", {
      method: "GET",
    });

    if (!response?.ok) {
      throw new Error("상담 목록을 불러올 수 없습니다.");
    }

    const data: IUserCounselingListType = await response.json();
    console.log(data);
    return data;
  },

  /**
   * GET /api/users/counseling/{counselingId}
   * 상담 상세 조회
   */
  getCounselingDetail: async (
    counselingId: number,
  ): Promise<IUserCounselingDetailType> => {
    const response = await fetchWithAuth(
      `/api/users/counseling/${counselingId}`,
      {
        method: "GET",
      },
    );

    if (!response?.ok) {
      throw new Error("상담 정보를 불러올 수 없습니다.");
    }

    const data: IUserCounselingDetailType = await response.json();
    return data;
  },

  /**
   * DELETE /api/users/counseling/{counselingId}
   * 상담 취소
   */
  cancelCounseling: async (
    counselingId: number,
  ): Promise<ICancelCounselingResponseType> => {
    const response = await fetchWithAuth(
      `/api/users/counseling/${counselingId}`,
      {
        method: "DELETE",
      },
    );

    if (!response?.ok) {
      throw new Error("상담 취소에 실패했습니다.");
    }

    const data: ICancelCounselingResponseType = await response.json();
    return data;
  },
};
