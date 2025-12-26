import {
  AttendanceType,
  UpdateAttendanceRequest,
} from "@/types/trainer/attendanceType";
import {fetchWithAuth} from "../common/fetchWithAuth";

export const attendanceAPI = {
  /**
   * 출석 목록 조회
   */
  getAttendanceList: async (
    courseId: number,
    sessionId: number,
  ): Promise<AttendanceType[]> => {
    const res = await fetchWithAuth(
      `/api/trainer/course/${courseId}/session/${sessionId}/attendance`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error("출석 목록을 불러오는데 실패했습니다.");
    }

    return await res.json();
  },

  /**
   * 출석 상태 변경
   */
  updateAttendanceStatus: async (
    courseId: number,
    sessionId: number,
    userName: string,
    data: UpdateAttendanceRequest,
  ): Promise<void> => {
    const res = await fetchWithAuth(
      `/api/trainer/course/${courseId}/session/${sessionId}/attendance/${encodeURIComponent(
        userName,
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error("출석 상태 변경에 실패했습니다.");
    }
  },
};
