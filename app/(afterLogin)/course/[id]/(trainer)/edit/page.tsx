import CourseInfoEditForm from "@/components/pages/afterLogin/course/edit/CourseInfoEditForm";
import {ICourseType} from "@/types/course/courseType";
import {ISessionType} from "@/types/course/sessionType";
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
async function getSessionList(courseId: string) {
  const res = await fetch(`${API_BASE_URL}/course/${courseId}/sessions`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });
  if (!res.ok) {
    throw new Error("회차 정보를 가져오는데 실패했습니다.");
  }
  const result = await res.json();
  return result;
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
  const sessonList: ISessionType[] = await getSessionList(id);

  return (
    <CourseInfoEditForm
      courseInfo={courseInfo}
      courseId={id}
      sessionList={sessonList}
    />
  );
}
