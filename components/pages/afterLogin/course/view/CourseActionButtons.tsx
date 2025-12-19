import {HeartIcon} from "@/components/icons/courseInfoIcons";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import Link from "next/link";
import {useCourseState} from "@/stores/courseState";
import {useQueryClient} from "@tanstack/react-query";
import {ICourseType} from "@/types/course/courseType";
import {ISessionType} from "@/types/course/sessionType";
import {checkIsClose} from "@/util/course/checkIsClose";

export default function CourseActionButtons({
  trainerId,
  courseId,
}: {
  trainerId: number;
  courseId: string;
}) {
  /* State */
  const {checkIsOwner} = useCheckLoggedIn();
  const {setEditModeOn} = useCourseState();
  const isOwner = checkIsOwner(trainerId);
  /* Query */
  const queryClient = useQueryClient();
  const courseDetail: ICourseType | undefined = queryClient.getQueryData([
    "courseDetail",
    courseId,
  ]);
  const sessionList: ISessionType[] | undefined = queryClient.getQueryData([
    "sessionList",
    courseId,
  ]);
  /* fn */
  const isClose = checkIsClose(sessionList, courseDetail);

  return (
    <div className="sticky mt-5 bottom-0 z-50 flex flex-col gap-3 w-full">
      {isOwner && (
        <div className="flex justify-center gap-3 *:w-full *:flex *:items-center *:justify-center *:bg-white *:gap-2 *:px-6 *:py-3 *:border-2 *:border-(--mt-gray-light) *:text-(--mt-gray) *:rounded-lg *:font-bold">
          <Link
            href={`/`}
            className="hover:bg-(--mt-gray-smoke) transition-colors"
          >
            재업로드하기
          </Link>

          <button
            aria-disabled={isClose}
            onClick={setEditModeOn}
            className={`${isClose ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-(--mt-gray-smoke) transition-colors"} `}
            disabled={isClose}
          >
            수정하기
          </button>
        </div>
      )}
      <div className="flex justify-center gap-3 *:flex *:items-center *:justify-center *:font-bold *:py-3 *:rounded-lg">
        <Link
          href={isClose ? "#" : "/"}
          aria-disabled={isClose}
          tabIndex={isClose ? -1 : 0}
          onClick={(e) => {
            if (isClose) e.preventDefault();
          }}
          className={`bg-white gap-2 px-6 border-2 border-(--mt-gray-light) text-(--mt-gray) ${isClose ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-(--mt-gray-smoke) transition-colors"} `}
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
          className={`flex-1 bg-(--mt-blue-point) text-white shadow-lg ${isClose ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-(--mt-blue) transition-colors"}`}
        >
          수강 신청
        </Link>
      </div>
    </div>
  );
}
