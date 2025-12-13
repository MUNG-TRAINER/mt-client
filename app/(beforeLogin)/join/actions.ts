"use server";

import {joinApi} from "@/apis/join/joinApi";
import {joinUserSchema, joinTrainerSchema} from "@/schemas/joinSchema";
import {IFormResultType} from "@/types/formResultType";
import {IErrorResponse} from "@/types/response/errorResponse";
import {redirect} from "next/navigation";
import {treeifyError} from "zod";

export async function joinUserAction(
  state: IFormResultType<typeof joinUserSchema>,
  formData: FormData
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
  const response = await joinApi.joinUser(result.data);
  if (!response.ok) {
    const responseResult: IErrorResponse = await response.json();
    return {
      errMsg: undefined,
      resMsg: responseResult.message,
    };
  }
  redirect("/login");
}

export async function joinTrainerAction(
  state: IFormResultType<typeof joinTrainerSchema>,
  formData: FormData
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
  const response = await joinApi.joinTrainer(result.data);
  if (!response.ok) {
    const responseResult: IErrorResponse = await response.json();
    return {
      errMsg: undefined,
      resMsg: responseResult.message,
    };
  }
  redirect("/login");
}
