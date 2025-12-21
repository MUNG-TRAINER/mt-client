import PlanTabs from "./PlanTabs";
import PlanCourseList from "./PlanCourseList";
import {useState} from "react";
import Image from "next/image";
import PlanFloatingBtn from "./PlanFloatingBtn";
import Calendar from "./Calendar";
import {UserCourseType} from "@/types/course/userCourse";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";

interface PlanProps {
  courses: UserCourseType[];
  allCourses: UserCourseType[];
  activeTab: "scheduled" | "completed";
  setActiveTab: (tab: "scheduled" | "completed") => void;
}

export default function Plan({
  courses,
  activeTab,
  allCourses,
  setActiveTab,
}: PlanProps) {
  useCheckLoggedIn();

  // 선택한 날짜 상태 (캘린더용)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 선택된 날짜에 해당하는 세션만 필터링
  const selectedSessions = selectedDate
    ? allCourses
        .map((course) => ({
          ...course,
          sessions: course.sessions.filter(
            (s) => s.sessionDate === selectedDate
          ),
        }))
        .filter((course) => course.sessions.length > 0)
    : [];
  const formatTime = (time: string) => time.slice(0, 5);
  return (
    <div className="relative w-full -h-screen bg-(--mt-white) p-6 rounded-md flex flex-col gap-3 ">
      <Calendar
        courses={allCourses}
        selectedDate={selectedDate as string | undefined}
        onDateClick={(date) => setSelectedDate(date)}
      />
      {selectedDate && selectedSessions.length > 0 && (
        <div className="flex flex-col gap-1">
          {selectedSessions.map((course, courseIndex) =>
            course.sessions.map((session, sessionIndex) => (
              <div
                key={`${course.courseId}-${session.sessionId}-${courseIndex}-${sessionIndex}`}
                className="p-3 mt-4 rounded-md shadow-md bg-white"
                style={{border: "1px solid #E8E8E8"}}
              >
                {/* 카드에 표시할 내용만 선택 */}
                <div className="flex items-center gap-2 mb-1">
                  {/* 삼항 연산자로 점 표시 */}
                  {session.sessionStatus === "SCHEDULED" ? (
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  ) : session.sessionStatus === "DONE" ? (
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  ) : null}

                  <div className="text-[15px]">{course.title}</div>
                </div>
                <div className="text-sm flex justify-end items-center w-full gap-1">
                  <Image
                    src="/images/application/calendar.jpg"
                    alt="달력"
                    width={13}
                    height={5}
                    className="w-2.5 h-3.75 items-center"
                  />
                  {formatTime(session.startTime)} ~{" "}
                  {formatTime(session.endTime)}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <div className="text-[18px] font-semibold mt-5 mb-5">
        나의 훈련 전체 보기
      </div>
      <PlanTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PlanCourseList courses={courses} />
      <PlanFloatingBtn />
    </div>
  );
}
