"use client";

import {CalendarIcon} from "@/components/icons/calendar";
import {
  ClockIcon,
  LocationIcon,
  UsersIcon,
} from "@/components/icons/courseInfoIcons";
import {formatDate, formatTime} from "@/util/session/sessionDateConverter";

interface ISessionAccordionDetail {
  sessionDate: string;
  startTime: string;
  endTime: string;
  locationDetail: string;
  maxStudents: string;
}

export default function SessionAccordionDetail({
  sessionDate,
  startTime,
  endTime,
  locationDetail,
  maxStudents,
}: ISessionAccordionDetail) {
  return (
    <>
      <div className="flex items-start gap-2">
        <CalendarIcon className="size-5 text-(--mt-blue-point) mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-(--mt-gray) mb-1">진행 날짜</p>
          <p className="text-sm font-medium text-(--mt-black)">
            {formatDate(sessionDate)}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <ClockIcon className="size-5 text-(--mt-blue-point) mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-(--mt-gray) mb-1">시간</p>
          <p className="text-sm font-medium text-(--mt-black)">
            {formatTime(startTime)} ~ {formatTime(endTime)}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <LocationIcon className="size-5 text-(--mt-blue-point) mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-(--mt-gray) mb-1">위치</p>
          <p className="text-sm font-medium text-(--mt-black)">
            {locationDetail}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <UsersIcon className="size-5 text-(--mt-blue-point) mt-0.5" />
        <div className="flex-1">
          <p className="text-xs text-(--mt-gray) mb-1">정원</p>
          <p className="text-sm font-medium text-(--mt-black)">
            {maxStudents}명
          </p>
        </div>
      </div>
    </>
  );
}
