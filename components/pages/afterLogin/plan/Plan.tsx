import PlanTabs from "./PlanTabs";
import PlanCourseList from "./PlanCourseList";
import {useState} from "react";
import Image from "next/image";
import PlanFloatingBtn from "./PlanFloatingBtn";
import Calendar from "./Calendar";
import {UserCourseType} from "@/types/course/userCourse";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import { TrainerCourseType } from "@/types/trainer/trainerCourseType";
import { useRouter } from "next/navigation";
import DogImage from "@/public/images/application/dog.jpg";
import CalendarImage from "@/public/images/application/calendar.jpg";
import SessionNoImage from "@/public/images/application/star.jpg";
import LocationImage from "@/public/images/application/location.jpg";

interface PlanProps {
  courses: UserCourseType[] | TrainerCourseType[];
  allCourses: UserCourseType[] | TrainerCourseType[];
  activeTab: "scheduled" | "completed";
  setActiveTab: (tab: "scheduled" | "completed") => void;
  isTrainer: boolean; // Trainer인지 구분
}

export default function Plan({
  courses,
  activeTab,
  allCourses,
  setActiveTab,
  isTrainer,
}: PlanProps) {
  useCheckLoggedIn();

  // 선택한 날짜 상태 (캘린더용)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 선택된 날짜에 해당하는 세션만 필터링
  const selectedSessions = selectedDate
  ? (isTrainer
      ? (allCourses as TrainerCourseType[])
          .map((course) => ({
            ...course,
            sessions: course.sessions.filter(
              (s) => s.sessionDate === selectedDate
            ),
          }))
          .filter((course) => course.sessions.length > 0)
      : (allCourses as UserCourseType[])
          .map((course) => ({
            ...course,
            sessions: course.sessions.filter(
              (s) => s.sessionDate === selectedDate
            ),
          }))
          .filter((course) => course.sessions.length > 0))
  : [];
  const formatTime = (time: string) => time.slice(0, 5);

  const planCourses = isTrainer
  ? (courses as TrainerCourseType[])
  : (courses as UserCourseType[]);

const planAllCourses = isTrainer
  ? (allCourses as TrainerCourseType[])
  : (allCourses as UserCourseType[]);

  const router = useRouter();
  const handleClick = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };
  return (
    <div className="relative w-full -h-screen bg-(--mt-white) p-6 rounded-md flex flex-col gap-3 ">
      <Calendar
         courses={planAllCourses}
        selectedDate={selectedDate as string | undefined}
        onDateClick={(date) => setSelectedDate(date)}
        isTrainer={isTrainer}
      />
      {selectedDate && selectedSessions.length > 0 && (
        <div className="flex flex-col gap-1">
          {selectedSessions.map((course, courseIndex) =>
            course.sessions.map((session, sessionIndex) => (
              <div
                key={`${course.courseId}-${session.sessionId}-${courseIndex}-${sessionIndex}`}
                className="p-3 mt-4 rounded-md shadow-md bg-white"
                style={{border: "1px solid #E8E8E8"}}
                onClick={() => handleClick(course.courseId)}
              >
                {/* 카드에 표시할 내용만 선택 */}
                <div className="flex items-center gap-2 mb-1">
                  {session.sessionStatus === "SCHEDULED" ? (
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  ) : session.sessionStatus === "DONE" ? (
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  ) : null}

                  <div className="text-[15px]">{course.title}</div>
                </div>
                <div className="flex w-full gap-3 mt-4">
                {!isTrainer && (
                  <div className="text-sm flex items-center gap-1">
                    <Image
                      src={DogImage}
                      placeholder="blur"
                      alt="강아지"
                      width={13}
                      height={13}
                      className="w-4.75 h-4.75 items-center"
                    />
                  {(session as UserCourseType['sessions'][0]).dogName}
                  </div>
                )}
                  <div className="text-sm flex items-center gap-1">
                    <Image
                      src={CalendarImage}
                      placeholder="blur"
                      alt="달력"
                      width={13}
                      height={5}
                      className="w-3.5 h-3.75 items-center"
                    />
                    {formatTime(session.startTime)} ~{" "}
                    {formatTime(session.endTime)}
                  </div>
                        <span className="flex gap-1 text-sm items-center leading-none ">
                            <Image
                              src={LocationImage}
                              placeholder="blur"
                              alt="회차 정보"
                              width={14}
                              height={5}
                              className="w-3.75 h-3.75 items-center"
                            />
                            {course.location}
                          </span>
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
      <PlanCourseList courses={planCourses} isTrainer={isTrainer} />
      <PlanFloatingBtn />
    </div>
  );
}
