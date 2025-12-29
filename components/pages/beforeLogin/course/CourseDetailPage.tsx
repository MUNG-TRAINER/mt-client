"use client";

import CourseInfoComp from "./getComps/CourseInfoComp";
import {checkIsClose} from "@/util/course/checkIsClose";
import {ICourseType} from "@/types/course/courseType";
import {ITrainerInfoType} from "@/types/trainer/trainerType";
import {ISessionType} from "@/types/course/sessionType";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import useMyDogs from "@/hooks/afterLogin/dogs/useMyDogs";
import {useRegistModal} from "@/stores/coures/registModalState";
import CourseRegistModal from "../../afterLogin/course/regist/CourseRegistModal";

interface ICourseDetailPageProps {
  courseInfo: ICourseType;
  trainerInfo: ITrainerInfoType;
  sessionList: ISessionType[];
  courseId: string;
}
export default function CourseDetailPage({
  courseInfo,
  trainerInfo,
  sessionList,
  courseId,
}: ICourseDetailPageProps) {
  /* state */
  const {isError} = useCheckLoggedIn();
  const {data: myDogs} = useMyDogs();
  const {modal, mode, setModalOff} = useRegistModal();
  const isClose = checkIsClose(sessionList, courseInfo);
  if (!courseInfo) {
    return <div className="p-6 text-center">과정 정보를 찾을 수 없습니다.</div>;
  }
  return (
    <>
      <div className={`relative w-full max-w-4xl mx-auto "bg-(--mt-white) p-6`}>
        {isClose && (
          <>
            <div className="sticky top-0 z-50 w-full bg-red-600 text-white py-3 px-4 text-center font-semibold shadow-md">
              {/* 빨간색 경고 배너 */}
              ⚠️ 이 과정은 종료되었습니다. 수강 신청이 불가능합니다.
            </div>
            <div className="absolute top-0 left-0 z-40 w-full min-h-full bg-black/50" />
          </>
        )}
        {isError && (
          <div className="sticky top-0 z-50 w-full bg-red-600 text-white py-3 px-4 text-center font-semibold shadow-md">
            {/* 빨간색 경고 배너 */}
            ⚠️ 인증 오류입니다.
          </div>
        )}
        <div className={`flex flex-col gap-4 w-full relative pb-5`}>
          <CourseInfoComp
            courseInfo={courseInfo}
            trainerInfo={trainerInfo || undefined}
            sessionList={sessionList || []}
            courseId={courseId}
          />
        </div>
      </div>
      {modal && (
        <CourseRegistModal
          trainerToken={trainerInfo.fcmToken ?? ""}
          courseId={courseId}
          dogs={myDogs}
          mode={mode}
          modalOff={setModalOff}
        />
      )}
    </>
  );
}
