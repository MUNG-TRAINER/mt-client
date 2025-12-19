"use client";

import React from "react";
import CourseCard from "@/components/shared/cards/CourseCard";
import {UserCourseType} from "@/types/course/userCourse";
import Image from "next/image";

interface Props {
  courses: UserCourseType[];
}
export default function PlanCourseList({courses}: Props) {
  const formatTime = (time: string) => time.slice(0, 5);
  if (!courses || courses.length === 0) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        예약된 훈련이 없습니다.
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-4">
      {courses.map((course, courseIndex) =>
        course.sessions.map((session, sessionIndex) => (
          <li
            key={`${course.courseId}-${session.sessionId}-${courseIndex}-${sessionIndex}`} // course+session으로 고유 key
            className="relative cursor-pointer flex flex-col rounded-2xl shadow-md bg-white p-4"
            style={{border: "1px solid #E9ECEF"}}
          >
            {/* ===== Course Card ===== */}
            <CourseCard
              title={course.title}
              description={course.description}
              tags={course.tags ? course.tags.split(",") : []}
              mainImage={course.mainImage ?? ""}
              location={course.location}
              sessionSchedule={`${session.sessionDate} ${formatTime(
                session.startTime
              )} ~ ${formatTime(session.endTime)}`}
            />

            {/* ===== Session Info ===== */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between pl-1 pr-1">
                <div className="flex items-center text-xs font-medium text-gray-700 mb-2 gap-1">
                  <Image
                    src="/images/application/dog.jpg"
                    alt="강아지"
                    width={19}
                    height={19}
                  />
                  {session.dogName}
                </div>
                <div className="flex gap-1">
                  {/* 상태 표시 */}
                  <span className="flex gap-1 text-xs items-center leading-none px-1.5 py-0.5 rounded-full">
                    <Image
                      src="/images/application/repeat.jpg"
                      alt="타입"
                      width={13}
                      height={5}
                      className="w-[14px] h-[15px] items-center"
                    />
                    {course.type}
                  </span>
                  {course.lessonForm && (
                    <span className="flex gap-1 text-xs items-center leading-none px-1.5 py-0.5 rounded-full">
                      <Image
                        src="/images/application/check.jpg"
                        alt="lessonform"
                        width={13}
                        height={5}
                        className="w-[14px] h-[15px] items-center"
                      />
                      {course.lessonForm}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
