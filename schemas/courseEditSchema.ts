import z from "zod";
import {imageFileSchema} from "./fileSchema";

const emptyToUndefined = (value: unknown) => {
  if (value === "" || value === null || value === undefined) return undefined;
  return value;
};

const emptyFileToUndefined = (value: unknown) => {
  if (value instanceof File && value.size === 0) return undefined;
  return value;
};

export const courseEditSchema = z
  .object({
    title: z.coerce.string().min(4, {error: "4글자이상이여야합니다."}),
    location: z.coerce.string().min(1, {error: "장소를 입력해주세요"}),
    schedule: z.coerce.string().min(1, {error: "일자를 입력해주세요"}),
    isFree: z.coerce.boolean(),
    mainImage: z.preprocess(
      emptyFileToUndefined,
      z.union([imageFileSchema, z.null(), z.undefined()]),
    ),
    // mainImage가 없을 때(업로드 안 할 때) 기존 key가 필요합니다.
    mainImageKey: z.preprocess(emptyToUndefined, z.string().optional()),
    status: z.coerce.string(),
    trainerId: z.coerce.string(),
    tags: z.coerce.string(),
    lessonForm: z.coerce.string(),
    difficulty: z.coerce.string(),
    dogSize: z.coerce.string(),
    items: z.coerce.string().optional(),
    description: z.coerce.string().optional(),
    detailImageKey: z.coerce.string(),
    "detailImage[0].detailImage": z.preprocess(
      emptyFileToUndefined,
      z.union([imageFileSchema, z.null(), z.undefined()]),
    ),
    "detailImage[1].detailImage": z.preprocess(
      emptyFileToUndefined,
      z.union([imageFileSchema, z.null(), z.undefined()]),
    ),
    "detailImage[2].detailImage": z.preprocess(
      emptyFileToUndefined,
      z.union([imageFileSchema, z.null(), z.undefined()]),
    ),
  })
  .superRefine((data, ctx) => {
    const hasUploadedMainImage =
      data.mainImage instanceof File && data.mainImage.size > 0;
    const hasMainImageKey =
      typeof data.mainImageKey === "string" &&
      data.mainImageKey.trim().length > 0;

    // 업로드가 없으면 기존 key를 필수로
    if (!hasUploadedMainImage && !hasMainImageKey) {
      ctx.addIssue({
        code: "custom",
        path: ["mainImageKey"],
        message: "메인 이미지를 업로드하거나 기존 메인 이미지 키가 필요합니다.",
      });
    }
  });
