"use client";
import PlanTabs from "./PlanTabs";
import PlanCourseList from "./PlanCourseList";
import {useState} from "react";
import Image from "next/image";
import PlanFloatingBtn from "./PlanFloatingBtn";
import Calendar from "./Calendar";
import {UserCourseType} from "@/types/course/userCourse";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import {TrainerCourseType} from "@/types/trainer/trainerCourseType";
import {useRouter} from "next/navigation";
import DogImage from "@/public/images/application/dog.jpg";
import CalendarImage from "@/public/images/application/calendar.jpg";
import SessionNoImage from "@/public/images/application/star.jpg";
import locationImage from "@/public/images/application/location.jpg";
import PlanCalendarList from "./PlanCalendarList";

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
  const {role} = useCheckLoggedIn();

  // 선택한 날짜 상태 (캘린더용)
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 선택된 날짜에 해당하는 세션만 필터링
  const selectedSessions = selectedDate
    ? isTrainer
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
          .filter((course) => course.sessions.length > 0)
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
      {/*  */}
      <PlanCalendarList
        courses={selectedSessions}
        isTrainer={isTrainer}
        onClickCourse={handleClick}
      />
      {/*  */}
      <div className="text-[18px] font-semibold mt-5 mb-5">
        나의 훈련 전체 보기
      </div>
      <PlanTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PlanCourseList courses={planCourses} isTrainer={isTrainer} />
      {(role === "TRAINER" || role === "USER") && <PlanFloatingBtn />}
    </div>
  );
}
