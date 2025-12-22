"use client";

import CourseCard from "@/components/shared/cards/CourseCard";
import {UserCourseType} from "@/types/course/userCourse";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {TrainerCourseType} from "@/types/trainer/trainerCourseType";

import DogImage from "@/public/images/application/dog.jpg";
import TypeImage from "@/public/images/application/repeat.jpg";
import LessonformImage from "@/public/images/application/check.jpg";
import SessionNoImage from "@/public/images/application/star.jpg";
import BellImage from "@/public/images/application/bell.jpg";
import {useState} from "react";
import AttendanceModal from "../trainer/attendance/AttendanceModal";

interface Props {
  courses: UserCourseType[] | TrainerCourseType[];
  isTrainer: boolean;
}
export default function PlanCourseList({courses, isTrainer = false}: Props) {
  const router = useRouter();
  const formatTime = (time: string) => time.slice(0, 5);
  const [selectedSession, setSelectedSession] = useState<{
    courseId: number;
    sessionId: number;
    sessionNo: number;
    isScheduled: boolean;
  } | null>(null);
  if (!courses || courses.length === 0) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        예약된 훈련이 없습니다.
      </div>
    );
  }
  const handleClick = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };
  return (
    <>
      <ul className="flex flex-col gap-4">
        {courses.map((course, courseIndex) =>
          course.sessions.map((session, sessionIndex) => (
            <li
              key={`${course.courseId}-${session.sessionId}-${courseIndex}-${sessionIndex}`} // course+session으로 고유 key
              onClick={() => handleClick(course.courseId)}
              className="relative cursor-pointer flex flex-col rounded-2xl shadow-md bg-white p-4"
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
                  <div className="min-w-20">
                    {!isTrainer && (
                      <div className="flex items-center text-xs font-medium text-gray-700 mb-2 gap-1">
                        <Image
                          src={DogImage}
                          placeholder="blur"
                          alt="강아지"
                          width={19}
                          height={19}
                        />
                        {(session as UserCourseType["sessions"][0]).dogName}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {/* 상태 표시 */}
                    <span className="flex gap-1 text-xs items-center leading-none px-1.5 py-0.5 rounded-full">
                      <Image
                        src={TypeImage}
                        placeholder="blur"
                        alt="타입"
                        width={13}
                        height={5}
                        className="w-3.5 h-[15px] items-center"
                      />
                      {course.type}
                    </span>
                    {course.lessonForm && (
                      <span className="flex gap-1 text-xs items-center leading-none px-1.5 py-0.5 rounded-full">
                        <Image
                          src={LessonformImage}
                          placeholder="blur"
                          alt="lessonform"
                          width={13}
                          height={5}
                          className="w-3.5 h-[15px] items-center"
                        />
                        {course.lessonForm}
                      </span>
                    )}
                    {session.sessionNo && (
                      <span className="flex gap-1 text-xs items-center leading-none px-1.5 py-0.5">
                        <Image
                          src={SessionNoImage}
                          placeholder="blur"
                          alt="회차 정보"
                          width={13}
                          height={5}
                          className="w-3.75 h-3.75 items-center"
                        />
                        {session.sessionNo}회차
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {isTrainer && (
                <div className="mt-2">
                  <button
                    className="flex items-center justify-center gap-1 py-2 text-sm font-semibold rounded-lg w-full"
                    style={{border: "1px solid #C5C5C5", color: "#444"}}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSession({
                        courseId: course.courseId,
                        sessionId: session.sessionId,
                        sessionNo: session.sessionNo,
                        isScheduled:
                          (session as TrainerCourseType["sessions"][0])
                            .sessionStatus === "SCHEDULED",
                      });
                    }}
                  >
                    <Image
                      src={BellImage}
                      placeholder="blur"
                      alt="출석부"
                      width={15}
                      height={5}
                      className="w-4 h-4 items-center"
                    />
                    출석부
                  </button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
      {/* 출석 모달 - 예정된 훈련은 편집 가능, 완료된 훈련은 읽기 전용 */}
      {selectedSession && (
        <AttendanceModal
          isOpen={!!selectedSession}
          courseId={selectedSession.courseId}
          sessionId={selectedSession.sessionId}
          sessionNo={selectedSession.sessionNo}
          onClose={() => setSelectedSession(null)}
          isEditable={selectedSession.isScheduled}
        />
      )}
    </>
  );
}
