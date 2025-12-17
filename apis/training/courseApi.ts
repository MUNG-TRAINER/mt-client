import {IResultResponse} from "@/types/response/resultResponse";
import {presignedUrlApi} from "../common/presignedUrl";
import {IUploadCourseTypes} from "@/types/course/courseType";

export const courseApi = {
  createCourse: async (formData: FormData, count: number) => {
    // zod
    // file size validate
    const detailImageUrl: string[] = [];
    const sessions: IUploadCourseTypes[] = [];

    for (let i = 0; i < count; i++) {
      const sessionNo =
        formData.get(`session[${i}].sessionNo`)?.toString() || "";
      const status = formData.get(`session[${i}].status`)?.toString() || "";
      const maxStudents =
        formData.get(`session[${i}].maxStudents`)?.toString() || "";
      const price = formData.get(`session[${i}].price`)?.toString() || "";
      const sessionDate =
        formData.get(`session[${i}].sessionDate`)?.toString() || "";
      const startTime =
        formData.get(`session[${i}].startTime`)?.toString() || "";
      const endTime = formData.get(`session[${i}].endTime`)?.toString() || "";
      const content = formData.get(`session[${i}].content`)?.toString() || "";
      const locationDetail =
        formData.get(`session[${i}].locationDetail`)?.toString() || "";

      // 비어 있는 세션은 건너뛰기
      if (!sessionNo && !sessionDate) continue;

      sessions.push({
        sessionNo: Number(sessionNo),
        status,
        maxStudents: Number(maxStudents),
        price: Number(price),
        sessionDate,
        startTime,
        endTime,
        content,
        locationDetail,
      });
    }
    const MAX_SIZE = 5 * 1024 * 1024;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "image/gif",
    ];

    const mainImgFile = formData.get(`mainImage`) as File;
    //파일크키 유효성검사 추가
    if (mainImgFile.size === 0) {
      throw new Error("빈파일은 업로드할 수 없습니다.");
    }
    if (mainImgFile.size > MAX_SIZE) {
      throw new Error("이미지 파일은 5MB이하만 업로드 가능합니다.");
    }
    if (!allowedTypes.includes(mainImgFile.type)) {
      throw new Error("지원하지않는 파일 입니다.");
    }
    if (mainImgFile) {
      const response = await fetch("/api/s3/getPresignedUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "course-upload",
          fileName: mainImgFile.name,
          contentType: mainImgFile.type,
        }),
      });

      const presignedURL = await response.json();
      const mainImgUrl = await presignedUrlApi.uploadToS3(
        presignedURL.presignedUrl,
        mainImgFile
      );
      formData.set("mainImgUrl", mainImgUrl);
    }
    for (let i = 0; i < 3; i++) {
      const file = formData.get(`detailImage[${i}].detailImage`) as File;
      if (!file || file.size === 0) continue;
      const response = await fetch("/api/s3/getPresignedUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: "course-upload",
          fileName: file.name,
          contentType: file.type,
        }),
      });
      const presignedURL = await response.json();
      const s3Key = await presignedUrlApi.uploadToS3(
        presignedURL.presignedUrl,
        file
      );
      detailImageUrl.push(s3Key);
    }
    formData.set("detailImgUrl", detailImageUrl.join(","));

    const data = {
      title: formData.get("title"),
      status: formData.get("status"),
      location: formData.get("location"),
      mainImage: formData.get("mainImgUrl"),
      detailImage: formData.get("detailImgUrl"),
      schedule: formData.get("schedule"),
      isFree: formData.get("isFree"),
      lessonForm: formData.get("lessonForm"),
      difficulty: formData.get("difficulty"),
      dogSize: formData.get("dogSize"),
      description: formData.get("description"),
      type: formData.get("type"),
      refundPolicy: formData.get("refundPolicy"),
      items: formData.get("items"),
      sessionUploadRequests: sessions,
    };

    const res = await fetch(`/api/training/course/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resultData = await res.json();
    if (!res.ok) {
      throw new Error("훈련과정 업로드에 실패했습니다.");
    }

    return resultData.result as IResultResponse;
  },
};
