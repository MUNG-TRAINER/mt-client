"use server";

import {loginAPi} from "@/apis/login/loginApi";
import {loginSchema} from "@/schemas/loginSchema";
import {IFormResultType} from "@/types/formResultType";
import {redirect} from "next/navigation";
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
  const response = await loginAPi.login(result.data);
  if (!response.ok) {
    return {
      errMsg: undefined,
      resMsg: "로그인에 실패하였습니다.",
    };
  }
  redirect("/");
}
