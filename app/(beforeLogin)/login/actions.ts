"use server";

import {loginSchema} from "@/schemas/loginSchema";
import {IFormResultType} from "@/types/formResultType";
import {
  cookieExtractor,
  NAME_ACCESS_TOKEN,
  NAME_REFRESH_TOKEN,
} from "@/util/cookieExtractor";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {treeifyError} from "zod";

export async function loginAction(
  prevState: IFormResultType<typeof loginSchema>,
  formData: FormData,
): Promise<IFormResultType<typeof loginSchema>> {
  try {
    const cookie = await cookies();
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
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });
    if (!response.ok) {
      const json = await response.json();
      return {
        errMsg: undefined,
        resMsg: json.message || "로그인에 실패했습니다.",
      };
    }

    const setCookies = response.headers.getSetCookie();
    const {ACCESS_TOKEN, REFRESH_TOKEN, accessMaxAge, refreshMaxAge} =
      cookieExtractor(setCookies);
    cookie.set(NAME_ACCESS_TOKEN, ACCESS_TOKEN, {
      httpOnly: true,
      path: "/",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: Number(accessMaxAge),
      secure: process.env.NODE_ENV === "production",
    });
    cookie.set(NAME_REFRESH_TOKEN, REFRESH_TOKEN, {
      httpOnly: true,
      path: "/",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: Number(refreshMaxAge),
      secure: process.env.NODE_ENV === "production",
    });
    return {
      errMsg: undefined,
      resMsg: undefined,
    };
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    return {
      errMsg: undefined,
      resMsg: "서버에 오류가 발생했습니다. 다시 시도해주세요.",
    };
  }
}
