"use server";
import {joinApi} from "@/apis/join/joinApi";
import {joinSchema} from "@/schemas/joinSchema";
import {IFormResultType} from "@/types/formResultType";
import {IErrorResponse} from "@/types/response/errorResponse";
import {redirect} from "next/navigation";
import z, {treeifyError} from "zod";

export async function joinAction(
  state: IFormResultType<typeof joinSchema>,
  formData: FormData
): Promise<IFormResultType<typeof joinSchema>> {
  const data = {
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
  const result = await joinSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.data);
    console.log(result.error);
    return {
      errMsg: treeifyError(result.error),
      resMsg: undefined,
    };
  }
  // const response = await joinApi.join(result.data);
  // if (!response.ok) {
  //   const responseResult: IErrorResponse = await response.json();
  //   return {
  //     errMsg: undefined,
  //     resMsg: responseResult.message,
  //   };
  // }
  // redirect("/login");
  return {
    errMsg: undefined,
    resMsg: undefined,
  };
}
