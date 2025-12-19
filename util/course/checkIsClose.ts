import {ICourseType} from "@/types/course/courseType";
import {ISessionType} from "@/types/course/sessionType";

export function checkIsClose(
  sessionList: ISessionType[] | undefined,
  courseDetail: ICourseType | undefined,
) {
  const now = new Date();
  const lastSession = sessionList?.[sessionList.length - 1];
  const courseEndDate = new Date(
    `${lastSession?.sessionDate}T${lastSession?.endTime}`,
  );
  return courseDetail?.status === "DONE" ||
    courseDetail?.status === "CANCELLED" ||
    now > courseEndDate
    ? true
    : false;
}
