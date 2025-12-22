import CourseInfoEditForm from "@/components/pages/afterLogin/course/edit/CourseInfoEditForm";
import {ICourseType} from "@/types/course/courseType";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";

async function getCourseInfo(id: string): Promise<ICourseType> {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/course/${id}`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("훈련과정을 불러오는데 실패했습니다.");
  }
  return await res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const courseInfo = await getCourseInfo(id);
  return {
    title: courseInfo.title + "",
  };
}
export default async function Page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const courseInfo: ICourseType = await getCourseInfo(id);

  return <CourseInfoEditForm courseInfo={courseInfo} courseId={id} />;
}
