"use client";

import Image from "next/image";
import CalendarImage from "@/public/images/application/calendar.jpg";
import locationImage from "@/public/images/application/location.jpg";
import DogImage from "@/public/images/application/dog.jpg";
import {SessionCardCourse} from "@/types/course/sessionCardCourse";

interface SessionCardListProps {
  courses: SessionCardCourse[]; // ✅ SessionCardCourse[]로 통일
  isTrainer: boolean;
  onClickCourse: (courseId: number) => void;
}

export default function SessionCardList({
  courses,
  isTrainer,
  onClickCourse,
}: SessionCardListProps) {
  const formatTime = (time: string) => time.slice(0, 5);

  return (
    <div className="flex flex-col gap-1">
      {courses.map((course, courseIndex) =>
        course.sessions.map((session, sessionIndex) => (
          <div
            key={`${course.courseId}-${session.sessionId}-${courseIndex}-${sessionIndex}`}
            className="p-3 mt-4 rounded-md shadow-md bg-white border border-[#E8E8E8]"
            onClick={() => onClickCourse(course.courseId)}
          >
            {/* 상단 */}
            <div className="flex items-center gap-2 mb-1">
              {session.sessionStatus === "SCHEDULED" && (
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
              {session.sessionStatus === "DONE" && (
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
              )}
              <div className="text-[15px]">{course.title}</div>
            </div>

            {/* 하단 */}
            <div className="flex w-full justify-end gap-3 mt-4">
              {!isTrainer && session.dogName && (
                <div className="text-sm flex items-center gap-1">
                  <Image src={DogImage} alt="강아지" width={14} height={14} />
                  {session.dogName}
                </div>
              )}

              <div className="text-sm flex items-center gap-1">
                <Image src={CalendarImage} alt="달력" width={14} height={14} />
                {formatTime(session.startTime)} ~ {formatTime(session.endTime)}
              </div>

              <div className="text-sm flex items-center gap-1">
                <Image src={locationImage} alt="위치" width={14} height={14} />
                {course.location}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
