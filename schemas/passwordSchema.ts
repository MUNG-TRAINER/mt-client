import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    newPassword: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "새 비밀번호는 기존 비밀번호와 달라야 합니다.",
    path: ["newPassword"],
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
