import z from "zod";

export const joinSchema = z
  .object({
    userName: z.coerce.string(),
    email: z.email({error: "이메일 양식이여야합니다."}),
    phone: z.coerce
      .string()
      .min(10, {error: "전화번호를 올바르게 작성해주세요"}),
    password: z.coerce.string().min(8, {error: "8자보다 길어야합니다."}),
    passwordCheck: z.coerce.string().min(8, {error: "8자보다 길어야합니다."}),
    name: z.coerce.string(),
    birth: z.coerce.string(),
    sido: z.coerce.string().optional(),
    sigungu: z.coerce.string().optional(),
    roadname: z.coerce.string().optional(),
    postcode: z.coerce.string().optional(),
    restAddress: z.coerce.string().optional(),
  })
  .superRefine(({password, passwordCheck}, ctx) => {
    if (password !== passwordCheck) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordCheck"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });
