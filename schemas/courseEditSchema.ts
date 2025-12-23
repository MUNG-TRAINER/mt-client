import z from "zod";
import {imageFileSchema} from "./fileSchema";

export const courseEditSchema = z.object({
  title: z.coerce.string().min(5, {error: "5글자이상이여야합니다."}),
  location: z.coerce.string().min(1, {error: "장소를 입력해주세요"}),
  schedule: z.coerce.string().min(1, {error: "일자를 입력해주세요"}),
  difficulty: z.coerce.string(),
  dogSize: z.coerce.string(),
  items: z.coerce.string().optional(),
  description: z.coerce.string().optional(),
  mainImage: imageFileSchema,
  "detailImage[0].detailImage": imageFileSchema.optional(),
  "detailImage[1].detailImage": imageFileSchema.optional(),
  "detailImage[2].detailImage": imageFileSchema.optional(),
});
