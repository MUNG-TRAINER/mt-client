import {HeartIcon} from "@/components/icons/courseInfoIcons";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import Link from "next/link";

import {ICourseType} from "@/types/course/courseType";
import {ISessionType} from "@/types/course/sessionType";
import {checkIsClose} from "@/util/course/checkIsClose";

export default function CourseActionButtons({
  trainerId,
  courseId,
  courseInfo,
  sessionList,
}: {
  courseInfo: ICourseType;
  sessionList: ISessionType[];
  courseId: string;
  trainerId: number;
}) {
  /* State */
  const {data, checkIsOwner} = useCheckLoggedIn();
  const isOwner = checkIsOwner(trainerId);
  /* fn */
  const isClose = checkIsClose(sessionList, courseInfo);
  if (data && "code" in data) return null;
  return (
    <div className="sticky mt-5 bottom-10 z-50 flex flex-col gap-3 w-full">
      {isOwner && (
        <div className="flex justify-center gap-3 *:w-full *:flex *:items-center *:justify-center *:bg-white *:gap-2 *:px-6 *:py-3 *:border-2 *:border-(--mt-gray-light) *:text-(--mt-gray) *:rounded-lg *:font-bold">
          {isClose && (
            <Link href={`/`} className="z-60 hover:bg-(--mt-gray-smoke)">
              재업로드하기
            </Link>
          )}
          {!isClose && (
            <Link
              aria-disabled={isClose}
              href={isClose ? "#" : `/course/${courseId}/edit`}
              className={`${isClose ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-(--mt-gray-smoke)"} `}
            >
              수정하기
            </Link>
          )}
        </div>
      )}
      {data && "role" in data && data.role === "USER" && (
        <div className="flex justify-center gap-3 *:flex *:items-center *:justify-center *:font-bold *:py-3 *:rounded-lg">
          <Link
            href={isClose ? "#" : "/"}
            aria-disabled={isClose}
            tabIndex={isClose ? -1 : 0}
            onClick={(e) => {
              if (isClose) e.preventDefault();
            }}
            className={`bg-white gap-2 px-6 border-2 border-(--mt-gray-light) text-(--mt-gray) ${isClose ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-(--mt-gray-smoke)"} `}
          >
            <HeartIcon className="size-5" />
            찜하기
          </Link>
          <Link
            href={isClose ? "#" : "/"}
            aria-disabled={isClose}
            tabIndex={isClose ? -1 : 0}
            onClick={(e) => {
              if (isClose) e.preventDefault();
            }}
            className={`flex-1 bg-(--mt-blue-point) text-white shadow-lg ${isClose ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-(--mt-blue)"}`}
          >
            수강 신청
          </Link>
        </div>
      )}
    </div>
  );
}
