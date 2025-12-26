import ReuploadComp from "@/components/pages/afterLogin/course/reupload/ReuploadComp";
import {ICourseType} from "@/types/course/courseType";
import {ISessionType} from "@/types/course/sessionType";
import {API_BASE_URL} from "@/util/env";

async function getCourse(id: string) {
  const res = await fetch(`${API_BASE_URL}/course/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("훈련과정을 불러오는데 실패했습니다.");
  }
  const result: ICourseType = await res.json();
  return result;
}
async function getSession(courseId: string) {
  const res = await fetch(`${API_BASE_URL}/course/${courseId}/sessions`, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  });
  if (!res.ok) {
    throw new Error("회차 정보를 가져오는데 실패했습니다.");
  }
  const result: ISessionType[] = await res.json();
  return result;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const course = await getCourse(id);
  return {
    title: course.title,
  };
}
export default async function Page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const course = await getCourse(id);
  const sessionList = await getSession(id);
  return (
    <ReuploadComp course={course} sessionList={sessionList} courseId={id} />
  );
}
