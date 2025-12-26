"use server";

import {IFormResultType} from "@/types/formResultType";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {courseCreateSchema} from "@/schemas/courseUploadSchema";
import {treeifyError} from "zod";

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
  state: IFormResultType<typeof courseCreateSchema>,
  formData: FormData,
): Promise<IFormResultType<typeof courseCreateSchema>> {
  const cookie = await cookies();

  try {
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
    const data = {
      tags: formData.get("tags"),
      trainerId: formData.get("trainerId"),
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
      "detailImage[0].detailImage": formData.get("detailImage[0].detailImage"),
      "detailImage[1].detailImage": formData.get("detailImage[1].detailImage"),
      "detailImage[2].detailImage": formData.get("detailImage[2].detailImage"),
      sessionUploadRequests: sessions,
    };
    const result = await courseCreateSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: treeifyError(result.error),
        resMsg: undefined,
      };
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
      tags: result.data.tags,
      trainerId: result.data.trainerId,
      title: result.data.title,
      status: result.data.status,
      location: result.data.location,
      schedule: result.data.schedule,
      isFree: result.data.isFree,
      mainImage: mainImageUrl,
      lessonForm: result.data.lessonForm,
      difficulty: result.data.difficulty,
      detailImage: detailImageUrls.join(","),
      dogSize: result.data.dogSize,
      description: result.data.description,
      type: result.data.type,
      refundPolicy: result.data.refundPolicy,
      items: result.data.items,
      sessionUploadRequests: result.data.sessionUploadRequests,
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
      console.error(
        "Error ::" + errorData.message || "훈련과정 재업로드에 실패했습니다.",
      );
      return {
        errMsg: undefined,
        resMsg: "훈련과정 재업로드에 실패했습니다.",
      };
    }
    return {
      errMsg: undefined,
      resMsg: undefined,
    };
  } catch (error) {
    console.error("Reupload course error:", error);
    return {
      errMsg: undefined,
      resMsg: "훈련과정 재업로드에 실패했습니다.",
    };
  }
}
