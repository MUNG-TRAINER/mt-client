import { API_BASE_URL } from "@/util/env";
import { fetchWithAuth } from "./fetchWithAuth";

interface IPresignedUrlRequest {
  category: string;
  fileName: string;
  contentType: string;
}

export const presignedUrlApi = {
  // POST /presigned-url - S3 업로드용 Presigned URL 발급
  getPresignedUrl: async (data: IPresignedUrlRequest): Promise<string> => {
    const response = await fetchWithAuth(`${API_BASE_URL}/presigned-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response?.ok) {
      throw new Error("Presigned URL 발급에 실패했습니다.");
    }

    const result = await response.json();
    const presignedUrl: string = result.uploadUrl || result;
    return presignedUrl;
  },

  // Presigned URL로 S3에 파일 업로드
  uploadToS3: async (presignedUrl: string, file: File): Promise<string> => {
    console.log("[uploadToS3] start:", {
      url: presignedUrl.substring(0, 120) + "...",
      contentType: file.type,
      size: file.size,
    });

    try {
      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        const text = await response.text().catch(() => "");
        console.error("[uploadToS3] error body:", text);
        throw new Error(`S3 업로드에 실패했습니다: ${response.status}`);
      }

      // URL에서 S3 키(파일 경로)만 추출
      const url = new URL(presignedUrl);
      const s3Key = url.pathname.substring(1); // 맨 앞의 '/' 제거
      return s3Key;
    } catch (error) {
      console.error("[uploadToS3] fetch error:", error);
      throw error;
    }
  },
};
