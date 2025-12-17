"use client";

import SessionItems from "./SessionItems";
import {ISessionDataTypes} from "@/types/course/sessionType";

export default function SessionComp({count}: {count: number}) {
  const session = Array.from(
    {length: count},
    (_, i) =>
      ({
        sessionNo: i + 1,
        sessionDate: "",
        startTime: "",
        endTime: "",
        locationDetail: "",
        status: "SCHEDULED",
        maxStudents: 1,
        price: 0,
        content: "",
      } as ISessionDataTypes)
  );

  return (
    <div className="flex flex-col gap-2">
      {session.map((val, index, array) => (
        <SessionItems key={Number(val.sessionNo)} index={index} val={array} />
      ))}
    </div>
  );
}
