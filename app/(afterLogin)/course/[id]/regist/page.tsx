import CourseRegistModal from "@/components/pages/afterLogin/course/regist/CourseRegistModal";
import {IDogProfileType} from "@/types/dog/dogType";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";

async function getDogs(): Promise<IDogProfileType[]> {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/dogs`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return await res.json();
  }
  const result: IDogProfileType[] = await res.json();
  return result;
}
export default async function Page({params}: {params: Promise<{id: string}>}) {
  const param = await params;
  const dogs = await getDogs();

  return <CourseRegistModal dogs={dogs} courseId={param.id} />;
}
