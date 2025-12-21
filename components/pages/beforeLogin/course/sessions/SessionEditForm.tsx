"use client";

import {CalendarIcon} from "@/components/icons/calendar";
import {CheckIcon} from "@/components/icons/check";
import {
  ClockIcon,
  LocationIcon,
  UsersIcon,
} from "@/components/icons/courseInfoIcons";
import {XMarkIcon} from "@/components/icons/xMark";
import {useSessionState} from "@/stores/session/sessionState";
import {ISessionType} from "@/types/course/sessionType";
import SessionEditInputs from "./SessionEditItems";
import useEditSession from "@/hooks/afterLogin/session/useEditSession";
import {FormEvent} from "react";
import {ArrowPathIcon} from "@/components/icons/arrow";
import {useSessionEditState} from "@/stores/session/sessionEditState";

export default function SessionEditForm({
  session,
  courseId,
}: {
  session: Partial<ISessionType>;
  courseId: string;
}) {
  const {setEditModeOff} = useSessionState();
  const {updateSession} = useSessionEditState();
  const {mutate, isError, isPending} = useEditSession({
    sessionId: session.sessionId + "",
  });
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateSession({
      sessionId: Number(formData.get("sessionId")),
      sessionDate: formData.get("sessionDate") + "",
      startTime: formData.get("startTime") + "",
      endTime: formData.get("endTime") + "",
      locationDetail: formData.get("locationDetail") + "",
      maxStudents: Number(formData.get("maxStudents")),
    });
    mutate({
      courseId: courseId + "",
      sessionId: session.sessionId + "",
      formData,
    });
  };
  return (
    <form
      onSubmit={(e) => handleOnSubmit(e)}
      className="relative w-full h-full"
    >
      <fieldset className="flex flex-col gap-2">
        <legend>세션수정</legend>
        <input
          type="text"
          name="sessionId"
          defaultValue={session.sessionId}
          hidden
        />
        <SessionEditInputs
          icons={<CalendarIcon className="size-5 text-(--mt-blue-point)" />}
          labelId="sessionDate"
          labelTxt="진행 날짜"
          type="date"
          defaultValue={session.sessionDate}
        />
        <div className="flex gap-2">
          <SessionEditInputs
            icons={<ClockIcon className="size-5 text-(--mt-blue-point)" />}
            labelId="startTime"
            labelTxt="시작시간"
            type="time"
            defaultValue={session.startTime}
          />
          <SessionEditInputs
            icons={<ClockIcon className="size-5 text-(--mt-blue-point)" />}
            labelId="endTime"
            labelTxt="종료시간"
            type="time"
            defaultValue={session.endTime}
          />
        </div>
        <SessionEditInputs
          icons={<LocationIcon className="size-5 text-(--mt-blue-point)" />}
          labelId="locationDetail"
          labelTxt="세부장소"
          type="text"
          defaultValue={session.locationDetail}
        />
        <SessionEditInputs
          icons={<UsersIcon className="size-5 text-(--mt-blue-point)" />}
          labelId="maxStudents"
          labelTxt="최대정원"
          type="text"
          min={1}
          defaultValue={session.maxStudents}
        />
        {isError && (
          <small className="text-xs text-red-500 text-end">
            업데이트에 오류가 났습니다.
          </small>
        )}
      </fieldset>
      <div className="absolute top-0 right-0 flex items-center gap-2">
        <button className="size-5 text-green-500" disabled={isPending}>
          {isPending ? (
            <ArrowPathIcon className="animate-spin text-(--mt-gray) size-5" />
          ) : (
            <CheckIcon />
          )}
        </button>
        <button
          type="button"
          onClick={setEditModeOff}
          className="size-5 text-red-500"
        >
          <XMarkIcon />
        </button>
      </div>
    </form>
  );
}
