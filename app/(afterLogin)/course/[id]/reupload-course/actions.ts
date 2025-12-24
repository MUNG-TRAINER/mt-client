"use server";

import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

interface SessionUploadRequest {
  sessionNo: number;
  status: string;
  maxStudents: number;
  price: number;
  sessionDate: string;
  startTime: string;
  endTime: string;
  content: string;
  locationDetail: string;
}

export async function reuploadCourseAction(
  courseId: string,
  sessionCount: number,
  state: any,
  formData: FormData,
) {
  try {
    const cookie = await cookies();

    const data = {
      title: formData.get("title"),
      location: formData.get("location"),
      schedule: formData.get("schedule"),
      isFree: formData.get("isFree"),
      mainImage: formData.get("mainImage") as File | null,
      mainImageKey: formData.get("mainImageKey") as string,
      lessonForm: formData.get("lessonForm"),
      difficulty: formData.get("difficulty"),
      detailImageKey: formData.get("detailImageKey") as string,
      dogSize: formData.get("dogSize"),
      description: formData.get("description"),
      type: formData.get("type"),
      refundPolicy: formData.get("refundPolicy"),
      items: formData.get("items"),
    };

    // 2. 세션 정보 추출
    const sessions: SessionUploadRequest[] = [];
    for (let i = 0; i < sessionCount; i++) {
      const sessionNo = formData.get(`session[${i}].sessionNo`)?.toString();
      const status = formData.get(`session[${i}].status`)?.toString();
      const maxStudents = formData.get(`session[${i}].maxStudents`)?.toString();
      const price = formData.get(`session[${i}].price`)?.toString();
      const sessionDate = formData.get(`session[${i}].sessionDate`)?.toString();
      const startTime = formData.get(`session[${i}].startTime`)?.toString();
      const endTime = formData.get(`session[${i}].endTime`)?.toString();
      const content = formData.get(`session[${i}].content`)?.toString();
      const locationDetail = formData
        .get(`session[${i}].locationDetail`)
        ?.toString();

      if (!sessionNo && !sessionDate) continue;

      sessions.push({
        sessionNo: Number(sessionNo),
        status: status || "SCHEDULED",
        maxStudents: Number(maxStudents),
        price: Number(price),
        sessionDate: sessionDate || "",
        startTime: startTime || "",
        endTime: endTime || "",
        content: content || "",
        locationDetail: locationDetail || "",
      });
    }

    let mainImageUrl = data.mainImageKey;

    if (data.mainImage && data.mainImage.size > 0) {
      const presignedResponse = await fetch(`${API_BASE_URL}/presigned-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
        body: JSON.stringify({
          category: "course-upload",
          fileName: data.mainImage.name,
          contentType: data.mainImage.type,
        }),
      });

      if (!presignedResponse.ok) {
        throw new Error("메인 이미지 업로드 URL 발급에 실패했습니다.");
      }

      const {uploadUrl} = await presignedResponse.json();

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": data.mainImage.type,
        },
        body: data.mainImage,
      });

      if (!uploadResponse.ok) {
        throw new Error("메인 이미지 업로드에 실패했습니다.");
      }

      const url = new URL(uploadUrl);
      mainImageUrl = url.pathname.substring(1);
    }

    const detailImageKeys = data.detailImageKey
      ? data.detailImageKey.split(",")
      : [];
    const detailImageUrls: string[] = [];

    for (let i = 0; i < 3; i++) {
      const detailImageFile = formData.get(
        `detailImage[${i}].detailImage`,
      ) as File | null;
      if (detailImageFile && detailImageFile.size > 0) {
        const presignedResponse = await fetch(`${API_BASE_URL}/presigned-url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookie.toString(),
          },
          body: JSON.stringify({
            category: "course-upload",
            fileName: detailImageFile.name,
            contentType: detailImageFile.type,
          }),
        });
        if (!presignedResponse.ok) {
          throw new Error(
            `상세 이미지 ${i + 1} 업로드 URL 발급에 실패했습니다.`,
          );
        }
        const {uploadUrl} = await presignedResponse.json();
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": detailImageFile.type,
          },
          body: detailImageFile,
        });
        if (!uploadResponse.ok) {
          throw new Error(`상세 이미지 ${i + 1} 업로드에 실패했습니다.`);
        }
        const url = new URL(uploadUrl);
        detailImageUrls.push(url.pathname.substring(1));
      } else if (detailImageKeys[i]) {
        detailImageUrls.push(detailImageKeys[i]);
      }
    }

    const reuploadData = {
      title: data.title,
      status: "SCHEDULED",
      location: data.location,
      mainImage: mainImageUrl,
      detailImage: detailImageUrls.join(","),
      schedule: data.schedule,
      isFree: data.isFree,
      lessonForm: data.lessonForm,
      difficulty: data.difficulty,
      dogSize: data.dogSize,
      description: data.description,
      type: data.type,
      refundPolicy: data.refundPolicy,
      items: data.items,
      sessionUploadRequests: sessions,
    };
    // 맞는지 확인해야해
    const reuploadResponse = await fetch(
      `${API_BASE_URL}/trainer/course/${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookie.toString(),
        },
        body: JSON.stringify(reuploadData),
      },
    );

    if (!reuploadResponse.ok) {
      const errorData = await reuploadResponse.json();
      throw new Error(errorData.message || "훈련과정 재업로드에 실패했습니다.");
    }
    redirect("/plan");
  } catch (error) {
    console.error("Reupload course error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "예상치 못한 오류가 발생했습니다.",
    };
  }
}
