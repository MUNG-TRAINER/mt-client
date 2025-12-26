"use client";
import CourseTypeBtn from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseTypeBtn";
import {useSessionState} from "@/stores/session/sessionState";

export default function EditCourseIsFree({isFree}: {isFree: boolean}) {
  const {free} = useSessionState();

  return (
    <>
      <div className="flex items-center gap-1">
        <h5 className="font-bold before:content-['*'] before:text-sm before:text-red-500 before:mr-1">
          유료 / 무료
        </h5>
        <small className="text-sm text-red-500">
          (유료/무료는 수정하실수 없습니다.)
        </small>
      </div>
      <div className="w-full flex justify-around *:w-full">
        <CourseTypeBtn
          labelFor={"free"}
          labelTxt={"무료"}
          name="isFree"
          inputValue={"true"}
          isActive={isFree === free}
        />
        <CourseTypeBtn
          labelFor={"nonFree"}
          labelTxt={"유료"}
          name="isFree"
          inputValue={"false"}
          isActive={isFree !== free}
        />
      </div>
    </>
  );
}
