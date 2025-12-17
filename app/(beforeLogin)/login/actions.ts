"use server";

import {loginSchema} from "@/schemas/loginSchema";
import {IFormResultType} from "@/types/formResultType";
import {treeifyError} from "zod";

export async function loginAction(
  state: IFormResultType<typeof loginSchema>,
  formData: FormData
): Promise<IFormResultType<typeof loginSchema>> {
  const data = {
    userName: formData.get("userName"),
    password: formData.get("password"),
  };
  const result = await loginSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      errMsg: treeifyError(result.error),
      resMsg: undefined,
    };
  }
  const response = await fetch("/api/auth/login");
  if (!response.ok) {
    return {
      errMsg: undefined,
      resMsg: "로그인하는데 실패했습니다.",
    };
  }
  return {
    errMsg: undefined,
    resMsg: undefined,
  };
}
