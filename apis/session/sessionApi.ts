import {fetchWithAuth} from "../common/fetchWithAuth";

export const sessionApi = {
  editSession: async ({
    courseId,
    sessionId,
    formData,
  }: {
    courseId: string;
    sessionId: string;
    formData: FormData;
  }) => {
    const data = {
      sessionId: formData.get("sessionId"),
      sessionDate: formData.get("sessionDate"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      locationDetail: formData.get("locationDetail"),
      maxStudents: formData.get("maxStudents"),
    };
    const res = await fetchWithAuth(
      `/api/training/course/${courseId}/sessions/${sessionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      throw new Error("세션에 업로드하는데 실패했습니다.");
    }
    const result = await res.json();
    return result;
  },
};
