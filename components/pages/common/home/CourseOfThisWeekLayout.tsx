"use client";
import {ApplicationType} from "@/types/applications/applicationsType";
import {ICourseType} from "@/types/course/courseType";
import Image from "next/image";
import Link from "next/link";
import {useEffect} from "react";

type TWeekType =
  | {type: "course"; data: ICourseType[]}
  | {type: "application"; data: ApplicationType[]};
interface ICourseOfThisWeekLayoutProps {
  title: string;
  data: TWeekType;
}

export default function CourseOfThisWeekLayout({
  title,
  data,
}: ICourseOfThisWeekLayoutProps) {
  console.log(data);
  return (
    <section className="flex flex-col gap-2">
      <div>
        <h3 className="font-dohyeon">{title}</h3>
      </div>
      <ul className="flex flex-col *:w-full gap-3 *:bg-blue-200 *:rounded-lg *:px-5 *:py-3">
        {data.type === "course" &&
          data.data.map((v, i) => (
            <li key={i}>
              <Link
                href={`/course/${v.courseId}`}
                className="flex justify-between items-center"
              >
                <div className="relative size-14 rounded-full overflow-hidden">
                  <Image src={v.mainImage} alt="메인이미지" fill sizes="100" />
                </div>
                <div>
                  <h3 className="font-bold">{v.title}</h3>
                </div>
              </Link>
            </li>
          ))}
        {data.type === "application" &&
          data.data.map((v, i) => (
            <li key={i} className="flex justify-between items-center">
              <div className="flex flex-col gap-2 *:w-32 *:h-6 *:bg-blue-100 *:rounded-md *:animate-pulse">
                <div />
                <div />
              </div>
              <div className="w-32 h-7 rounded-lg bg-blue-100 animate-pulse" />
            </li>
          ))}
      </ul>
    </section>
  );
}
