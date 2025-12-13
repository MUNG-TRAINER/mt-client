import z from "zod";

export const loginSchema = z.object({
  userName: z
    .string()
    .min(4, {error: "아이디는 4~20자여야 해요."})
    .max(20, {error: "아이디는 4~20자여야 해요."}),
  password: z.string().min(8, {error: "비밀번호는 8자 이상이여야 해요."}),
});
