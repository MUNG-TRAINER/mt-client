import z from "zod";

export const updateUserInfoSchema = z.object({
  name: z.coerce.string().min(1, { message: "이름은 필수입니다." }),
  phone: z.coerce
    .string()
    .min(10, { message: "전화번호를 올바르게 작성해주세요" })
    .transform((val) => val.replace(/-/g, "")),
  birth: z.coerce.string().min(1, { message: "생일을 입력해주세요." }),
  sido: z.coerce.string().optional(),
  sigungu: z.coerce.string().optional(),
  roadname: z.coerce.string().optional(),
  postcode: z.coerce.string().optional(),
  restAddress: z.coerce.string().optional(),
  profileImage: z.string().optional(),
});

export type UpdateUserInfoType = z.infer<typeof updateUserInfoSchema>;
