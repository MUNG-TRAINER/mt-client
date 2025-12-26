"use server";

import {courseEditSchema} from "@/schemas/courseEditSchema";
import {IFormResultType} from "@/types/formResultType";
import {cookies} from "next/headers";
import {API_BASE_URL} from "@/util/env";
import {ISessionType} from "@/types/course/sessionType";
import {treeifyError} from "zod";

export async function editCoureAction(
  courseId: string,
  sessionList: ISessionType[],
  state: IFormResultType<typeof courseEditSchema>,
  formData: FormData,
): Promise<IFormResultType<typeof courseEditSchema>> {
  const data = {
    title: formData.get("title"),
    location: formData.get("location"),
    schedule: formData.get("schedule"),
    isFree: formData.get("isFree"),
    mainImage: formData.get("mainImage") as File | null,
    mainImageKey: formData.get("mainImageKey") as string,
    trainerId: formData.get("trainerId"),
    status: formData.get("status"),
    tags: formData.get("tags"),
    lessonForm: formData.get("lessonForm"),
    items: formData.get("items"),
    difficulty: formData.get("difficulty"),
    dogSize: formData.get("dogSize"),
    description: formData.get("description"),
    detailImageKey: formData.get("detailImageKey") as string,
    "detailImage[0].detailImage": formData.get(`detailImage[0].detailImage`),
    "detailImage[1].detailImage": formData.get(`detailImage[1].detailImage`),
    "detailImage[2].detailImage": formData.get(`detailImage[2].detailImage`),
  };
  const result = await courseEditSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      errMsg: treeifyError(result.error),
      resMsg: undefined,
    };
  }
  try {
    let mainImageUrl = result.data.mainImageKey;

    if (result.data.mainImage && result.data.mainImage.size > 0) {
      const presignedResponse = await fetch(`${API_BASE_URL}/presigned-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: (await cookies()).toString(),
        },
        body: JSON.stringify({
          category: "course-upload",
          fileName: result.data.mainImage.name,
          contentType: result.data.mainImage.type,
        }),
      });

      if (!presignedResponse.ok) {
        return {
          errMsg: undefined,
          resMsg: "메인 이미지 업로드 URL 발급에 실패했습니다.",
        };
      }

      const {uploadUrl} = await presignedResponse.json();

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": result.data.mainImage.type,
        },
        body: result.data.mainImage,
      });

      if (!uploadResponse.ok) {
        return {
          errMsg: undefined,
          resMsg: "메인 이미지 업로드에 실패했습니다.",
        };
      }

      const url = new URL(uploadUrl);
      mainImageUrl = url.pathname.substring(1);
    }

    const detailImageKeys = result.data.detailImageKey
      ? result.data.detailImageKey.split(",")
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
            Cookie: (await cookies()).toString(),
          },
          body: JSON.stringify({
            category: "course-upload",
            fileName: detailImageFile.name,
            contentType: detailImageFile.type,
          }),
        });

        if (!presignedResponse.ok) {
          return {
            errMsg: undefined,
            resMsg: `상세 이미지 ${i + 1} 업로드 URL 발급에 실패했습니다.`,
          };
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
          return {
            errMsg: undefined,
            resMsg: `상세 이미지 ${i + 1} 업로드에 실패했습니다.`,
          };
        }

        const url = new URL(uploadUrl);
        detailImageUrls.push(url.pathname.substring(1));
      } else if (detailImageKeys[i]) {
        detailImageUrls.push(detailImageKeys[i]);
      }
    }

    const updateData = {
      title: result.data.title,
      location: result.data.location,
      schedule: result.data.schedule,
      isFree: result.data.isFree,
      mainImage: mainImageUrl,
      detailImage: detailImageUrls.join(","),
      trainerId: result.data.trainerId,
      tags: result.data.tags,
      status: result.data.status,
      lessonForm: result.data.lessonForm,
      difficulty: result.data.difficulty,
      dogSize: result.data.dogSize,
      items: result.data.items,
      description: result.data.description,
      sessionUploadRequests: sessionList,
    };

    const updateResponse = await fetch(
      `${API_BASE_URL}/trainer/course/${courseId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: (await cookies()).toString(),
        },
        body: JSON.stringify(updateData),
      },
    );

    if (!updateResponse.ok) {
      return {
        errMsg: undefined,
        resMsg: "훈련과정 수정에 실패했습니다.",
      };
    }
    return {
      errMsg: undefined,
      resMsg: undefined,
    };
  } catch (error) {
    console.error("Edit course error:", error);
    return {
      errMsg: undefined,
      resMsg: "예상치 못한 오류가 발생했습니다.",
    };
  }
}
