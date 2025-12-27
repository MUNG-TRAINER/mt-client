import {HeartIcon} from "@/components/icons/courseInfoIcons";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import Link from "next/link";

import {ICourseType} from "@/types/course/courseType";
import {ISessionType} from "@/types/course/sessionType";
import {checkIsClose} from "@/util/course/checkIsClose";
import {useSessionState} from "@/stores/session/sessionState";
import useMyDogs from "@/hooks/afterLogin/dogs/useMyDogs";
import {useState} from "react";
import CourseRegistModal from "../regist/CourseRegistModal";

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
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState<"wishlist" | "apply" | null>(null);
  const {editMode} = useSessionState();
  const {data, checkIsOwner} = useCheckLoggedIn();
  const {data: myDogs} = useMyDogs();
  /* fn */
  const isOwner = checkIsOwner(trainerId);
  const isClose = checkIsClose(sessionList, courseInfo);
  if (data && "code" in data) return null;
  return (
    <>
      <div
        className={`sticky mt-5 bottom-10 z-50 flex flex-col justify-end items-center gap-3 w-full h-full transition-transform duration-200 ease-in-out ${
          editMode ? "translate-y-[200%]" : "translate-y-0"
        }`}
      >
        {isOwner && (
          <div className="flex justify-center gap-3 w-full *:w-full *:flex *:items-center *:justify-center *:bg-white *:gap-2 *:px-6 *:py-3 *:border-2 *:border-(--mt-gray-light) *:text-(--mt-gray) *:rounded-lg *:font-bold">
            {isClose && (
              <Link
                href={isClose ? `/course/${courseId}/reupload-course` : `#`}
                className=" hover:bg-(--mt-gray-smoke)"
              >
                재업로드하기
              </Link>
            )}
            {!isClose && (
              <Link
                aria-disabled={isClose}
                href={isClose ? "#" : `/course/${courseId}/edit`}
                className={`${
                  isClose
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : "hover:bg-(--mt-gray-smoke)"
                } `}
              >
                수정하기
              </Link>
            )}
          </div>
        )}
        {data && "role" in data && data.role === "USER" && (
          <div className="flex justify-center gap-3 *:flex *:items-center *:justify-center *:font-bold *:px-6 *:py-3 *:rounded-lg w-full">
            <button
              aria-disabled={isClose}
              tabIndex={isClose ? -1 : 0}
              disabled={isClose}
              onClick={(e) => {
                if (isClose) e.preventDefault();
                setModal(true);
                setMode("wishlist");
              }}
              className={`bg-white gap-2 border-2 border-(--mt-gray-light) text-(--mt-gray) ${
                isClose
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : "hover:bg-(--mt-gray-smoke)"
              } `}
            >
              <HeartIcon className="size-5" />
              찜하기
            </button>
            <button
              aria-disabled={isClose}
              tabIndex={isClose ? -1 : 0}
              disabled={isClose}
              onClick={(e) => {
                if (isClose) e.preventDefault();
                setModal(true);
                setMode("apply");
              }}
              className={`flex-1 bg-(--mt-blue-point) text-white shadow-lg ${
                isClose
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : "hover:bg-(--mt-blue)"
              }`}
            >
              수강 신청
            </button>
          </div>
        )}
      </div>
      {modal && (
        <CourseRegistModal
          courseId={courseId}
          dogs={myDogs}
          mode={mode}
          modalOff={setModal}
        />
      )}
    </>
  );
}
