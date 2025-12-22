"use server";

import {joinUserSchema, joinTrainerSchema} from "@/schemas/joinSchema";
import {IFormResultType} from "@/types/formResultType";
import {IErrorResponse} from "@/types/response/errorResponse";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {treeifyError} from "zod";

export async function joinUserAction(
  state: IFormResultType<typeof joinUserSchema>,
  formData: FormData,
): Promise<IFormResultType<typeof joinUserSchema>> {
  const data = {
    isAgree: formData.get("isAgree") === "1",
    userName: formData.get("userName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    passwordCheck: formData.get("passwordCheck"),
    name: formData.get("name"),
    birth: formData.get("birth"),
    registCode: formData.get("registCode"),
    sido: formData.get("sido"),
    sigungu: formData.get("sigungu"),
    roadname: formData.get("roadname"),
    postcode: formData.get("postcode"),
    restAddress: formData.get("restAddress"),
  };

  const result = await joinUserSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      errMsg: treeifyError(result.error),
      resMsg: undefined,
    };
  }
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/auth/join/user`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result.data),
  });
  if (!res.ok) {
    const responseResult: IErrorResponse = await res.json();
    return {
      errMsg: undefined,
      resMsg: responseResult.message,
    };
  }
  redirect("/login");
}

export async function joinTrainerAction(
  state: IFormResultType<typeof joinTrainerSchema>,
  formData: FormData,
): Promise<IFormResultType<typeof joinTrainerSchema>> {
  const data = {
    isAgree: formData.get("isAgree") === "1",
    userName: formData.get("userName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    passwordCheck: formData.get("passwordCheck"),
    name: formData.get("name"),
    birth: formData.get("birth"),
    sido: formData.get("sido"),
    sigungu: formData.get("sigungu"),
    roadname: formData.get("roadname"),
    postcode: formData.get("postcode"),
    restAddress: formData.get("restAddress"),
  };
  const result = await joinTrainerSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      errMsg: treeifyError(result.error),
      resMsg: undefined,
    };
  }
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/auth/join/trainer`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result.data),
  });
  if (!res.ok) {
    const responseResult: IErrorResponse = await res.json();
    return {
      errMsg: undefined,
      resMsg: responseResult.message,
    };
  }
  redirect("/login");
}
