import { fetchWithAuth } from "../common/fetchWithAuth";
import { API_BASE_URL } from "@/util/env";
import { ITrainerInfoType } from "@/types/trainer/trainerType";

export const trainerApi = {
  uploadProfile: async (data: ITrainerInfoType) => {
    const res = await fetchWithAuth(`${API_BASE_URL}/trainer/me`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (!res?.ok) {
      throw new Error("프로필 업로드에 실패하였습니다.");
    }
    return await res.json();
  },
  getPresignedUrl: async (
    category: string,
    fileName: string,
    contentType: string
  ) => {
    const res = await fetchWithAuth(`${API_BASE_URL}/presigned-url`, {
      method: "POST",
      body: JSON.stringify({
        category,
        fileName,
        contentType,
      }),
    });
    if (!res?.ok) {
      throw new Error("Presigned URL을 가져오는데 실패하였습니다.");
    }
    return await res.json();
  },
  fileUpload: async (url: string, file: File) => {
    const res = await fetch(url, {
      method: "PUT",
      body: file,
    });
    if (!res?.ok) {
      throw new Error("파일 업로드에 실패하였습니다.");
    }
  },
};
