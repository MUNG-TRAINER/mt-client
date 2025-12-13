import z from "zod";

export const joinUserSchema = z
  .object({
    isAgree: z.boolean({error: "약관 동의는 필수 입니다."}),
    userName: z.coerce
      .string()
      .min(4, {error: "아이디는 4~20자여야 합니다."})
      .max(20, {error: "아이디는 4~20자여야 합니다."}),
    email: z.email({error: "이메일 양식이어야합니다."}),
    phone: z.coerce
      .string()
      .min(10, {error: "전화번호를 올바르게 작성해주세요"})
      .transform((val) => val.replace(/-/g, "")),
    password: z.coerce.string().min(8, {error: "8자보다 길어야합니다."}),
    passwordCheck: z.coerce.string().min(8, {error: "8자보다 길어야합니다."}),
    name: z.coerce.string().min(3, {error: "이름은 필수입니다."}),
    birth: z.coerce.string().min(1, {error: "생일을 입력해주세요."}),
    registCode: z.coerce.string().length(8, {error: "코드는 8자여야합니다."}),
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

export const joinTrainerSchema = z
  .object({
    isAgree: z.boolean({error: "약관 동의는 필수 입니다."}),
    userName: z.coerce
      .string()
      .min(4, {error: "아이디는 4~20자여야 합니다."})
      .max(20, {error: "아이디는 4~20자여야 합니다."}),
    email: z.email({error: "이메일 양식이어야합니다."}),
    phone: z.coerce
      .string()
      .min(10, {error: "전화번호를 올바르게 작성해주세요"})
      .transform((val) => val.replace(/-/g, "")),
    password: z.coerce.string().min(8, {error: "8자보다 길어야합니다."}),
    passwordCheck: z.coerce.string().min(8, {error: "8자보다 길어야합니다."}),
    name: z.coerce.string().min(3, {error: "이름은 필수입니다."}),
    birth: z.coerce.string().min(1, {error: "생일을 입력해주세요."}),
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
