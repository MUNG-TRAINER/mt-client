import z from "zod";
import {imageFileSchema} from "./fileSchema";

const DATE_YYYY_MM_DD = /^\d{4}-\d{2}-\d{2}$/;
const TIME_HH_MM_OR_HH_MM_SS = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/;

const emptyToUndefined = (value: unknown) => {
  if (value === "" || value === null || value === undefined) return undefined;
  return value;
};

const emptyFileToUndefined = (value: unknown) => {
  if (value instanceof File && value.size === 0) return undefined;
  return value;
};

const coerceBoolean = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value === "true") return true;
    if (value === "false") return false;
  }
  return value;
};

export const sessionUploadRequestSchema = z
  .object({
    status: z.enum(["SCHEDULED", "CANCELED", "DONE"]),
    sessionDate: z
      .string()
      .regex(DATE_YYYY_MM_DD, "sessionDate는 YYYY-MM-DD 형식이어야 합니다."),
    startTime: z
      .string()
      .regex(
        TIME_HH_MM_OR_HH_MM_SS,
        "startTime은 HH:mm 또는 HH:mm:ss 형식이어야 합니다.",
      ),
    endTime: z
      .string()
      .regex(
        TIME_HH_MM_OR_HH_MM_SS,
        "endTime은 HH:mm 또는 HH:mm:ss 형식이어야 합니다.",
      ),

    sessionNo: z.coerce.number().int().positive().optional(),
    locationDetail: z.coerce.string().optional(),
    maxStudents: z.coerce.number().int().nonnegative().optional(),
    content: z.coerce.string().optional(),
    price: z.coerce.number().int().nonnegative().optional(),
  })
  .superRefine((data, ctx) => {
    // 시간 비교(동일 포맷일 때만): endTime이 startTime보다 늦어야 함
    const normalize = (time: string) =>
      time.length === 5 ? `${time}:00` : time;
    const start = normalize(data.startTime);
    const end = normalize(data.endTime);
    if (start >= end) {
      ctx.addIssue({
        code: "custom",
        path: ["endTime"],
        message: "종료시간은 시작시간보다 늦어야 합니다.",
      });
    }
  });

export const courseCreateSchema = z
  .object({
    type: z.enum(["ONCE", "MULTI"], {
      message: "type은 ONCE 또는 MULTI만 가능합니다.",
    }),
    lessonForm: z.enum(["WALK", "GROUP", "PRIVATE"], {
      message: "lessonForm은 WALK, GROUP, PRIVATE 중 하나여야 합니다.",
    }),
    sessionUploadRequests: z
      .array(sessionUploadRequestSchema)
      .min(1, "최소 1개 이상의 세션 정보가 필요합니다."),
    title: z.coerce.string().min(1, "title은 필수입니다."),
    description: z.coerce.string().min(1, "description은 필수입니다."),
    status: z.coerce.string().min(1, "status는 필수입니다."),
    isFree: z.preprocess(
      coerceBoolean,
      z.boolean({message: "isFree는 필수입니다."}),
    ),
    location: z.coerce.string().min(1, "location은 필수입니다."),
    mainImage: z.preprocess(
      emptyFileToUndefined,
      z.union([imageFileSchema, z.null(), z.undefined()]),
    ),
    mainImageKey: z.preprocess(emptyToUndefined, z.string().optional()),
    detailImageKey: z.preprocess(emptyToUndefined, z.string().optional()),
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
    trainerId: z.preprocess(emptyToUndefined, z.coerce.string().optional()),
    tags: z.preprocess(emptyToUndefined, z.coerce.string().optional()),
    refundPolicy: z.coerce.string().optional(),
    schedule: z.coerce.string().optional(),
    dogSize: z.coerce.string().optional(),
    items: z.coerce.string().optional(),
    difficulty: z.coerce.string().optional(),
  })
  .superRefine((data, ctx) => {
    const hasUploadedMainImage =
      data.mainImage instanceof File && data.mainImage.size > 0;
    const hasMainImageKey =
      typeof data.mainImageKey === "string" &&
      data.mainImageKey.trim().length > 0;

    if (!hasUploadedMainImage && !hasMainImageKey) {
      ctx.addIssue({
        code: "custom",
        path: ["mainImageKey"],
        message: "메인 이미지를 업로드하거나 기존 메인 이미지 키가 필요합니다.",
      });
    }
  });

export type CourseCreateType = z.infer<typeof courseCreateSchema>;
export type SessionUploadRequestType = z.infer<
  typeof sessionUploadRequestSchema
>;
