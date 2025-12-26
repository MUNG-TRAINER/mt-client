"use server";

import {courseRegistSchema} from "@/schemas/courseRegistSchema";
import {IFormResultType} from "@/types/formResultType";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {treeifyError} from "zod";

export async function registCounselingAction(
  state: IFormResultType<typeof courseRegistSchema>,
  formData: FormData,
): Promise<IFormResultType<typeof courseRegistSchema>> {
  const cookie = await cookies();
  const data = {
    dogId: formData.get("dogId"),
    phone: formData.get("phone"),
  };
  const result = await courseRegistSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      errMsg: treeifyError(result.error),
      resMsg: undefined,
    };
  }
  const res = await fetch(`${API_BASE_URL}/users/counseling`, {
    method: "POST",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result.data),
  });
  if (!res.ok) {
    const json = await res.json();
    console.error("ERROR :: ", json);
    return {
      errMsg: undefined,
      resMsg: "훈련 신청에 실패했습다.",
    };
  }
  return {
    errMsg: undefined,
    resMsg: undefined,
  };
}
