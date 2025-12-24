"use server";

import {courseEditSchema} from "@/schemas/courseEditSchema";
import {IFormResultType} from "@/types/formResultType";
import {cookies} from "next/headers";
import {API_BASE_URL} from "@/util/env";

export async function editCoureAction(
  courseId: string,
  state: IFormResultType<typeof courseEditSchema>,
  formData: FormData,
): Promise<IFormResultType<typeof courseEditSchema>> {
  try {
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
    };

    let mainImageUrl = data.mainImageKey;

    if (data.mainImage && data.mainImage.size > 0) {
      const presignedResponse = await fetch(`${API_BASE_URL}/presigned-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: (await cookies()).toString(),
        },
        body: JSON.stringify({
          category: "course-upload",
          fileName: data.mainImage.name,
          contentType: data.mainImage.type,
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
          "Content-Type": data.mainImage.type,
        },
        body: data.mainImage,
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
      title: data.title,
      location: data.location,
      schedule: data.schedule,
      isFree: data.isFree,
      mainImage: mainImageUrl,
      detailImage: detailImageUrls.join(","),
      lessonForm: data.lessonForm,
      difficulty: data.difficulty,
      dogSize: data.dogSize,
      description: data.description,
    };

    const updateResponse = await fetch(`${API_BASE_URL}/course/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify(updateData),
    });

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
