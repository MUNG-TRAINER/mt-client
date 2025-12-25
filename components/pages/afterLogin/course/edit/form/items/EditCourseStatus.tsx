"use client";

import {useRef, useState} from "react";
import CourseTypeBtn from "../../../create/formDataComps/common/CourseTypeBtn";

export default function EditCourseStatus({status}: {status: string}) {
  const [state, setState] = useState(status);
  const scheduledRef = useRef<HTMLInputElement | null>(null);
  const canceledRef = useRef<HTMLInputElement | null>(null);
  const doneRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <div className="flex flex-col gap-2">
        <h5 className="font-bold before:content-['*'] before:text-sm before:text-red-500 before:mr-1">
          수업 상태
        </h5>
        <div className="flex justify-between gap-3 [&>div]:w-full [&>div]:flex [&>div]:items-center [&>div]:gap-2">
          <CourseTypeBtn
            labelFor="scheduled"
            labelTxt="진행중"
            name="status"
            inputRef={scheduledRef}
            inputValue="SCHEDULED"
            isActive={state === "SCHEDULED"}
            handleFn={() => setState("SCHEDULED")}
          />
          <CourseTypeBtn
            labelFor="canceled"
            labelTxt="취소됨"
            name="status"
            inputRef={canceledRef}
            inputValue="CANCELED"
            isActive={state === "CANCELED"}
            handleFn={() => setState("CANCELED")}
          />
          <CourseTypeBtn
            labelFor="done"
            labelTxt="완료됨"
            name="status"
            inputRef={doneRef}
            inputValue="DONE"
            isActive={state === "DONE"}
            handleFn={() => setState("DONE")}
          />
        </div>
      </div>
    </>
  );
}
