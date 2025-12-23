import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function reuploadCourseAction(state: any, formData: FormData) {
  const cookie = await cookies();
  // trainerId
  // tags
  await fetch(`${API_BASE_URL}/trainer/course/${courseId}`);
  redirect("/plan");
}
