import CourseDetailPage from "@/components/pages/beforeLogin/course/CourseDetailPage";
import {ICourseType} from "@/types/course/courseType";
import {ISessionType} from "@/types/course/sessionType";
import {ITrainerInfoType} from "@/types/trainer/trainerType";
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

async function getTrainerProfile(trainerId: string): Promise<ITrainerInfoType> {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/users/trainer/${trainerId}`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  if (!res?.ok) {
    throw new Error("트레이너 정보를 불러오는데 실패하였습니다.");
  }
  return await res.json();
}

async function getSessionList(courseId: string): Promise<ISessionType[]> {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/course/${courseId}/sessions`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });
  if (!res?.ok) {
    throw new Error("트레이너 정보를 불러오는데 실패하였습니다.");
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
    title: courseInfo.title,
  };
}

export default async function Page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const courseInfo = await getCourseInfo(id);
  const trainerInfo = await getTrainerProfile(courseInfo.trainerId + "");
  const sessionList = await getSessionList(id);
  return (
    <CourseDetailPage
      courseInfo={courseInfo}
      trainerInfo={trainerInfo}
      sessionList={sessionList}
      courseId={id}
    />
  );
}
