"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { trainerUserApi } from "@/apis/trainer/trainerUserApi";
import { DogIcon } from "@/components/icons/dog";
import { CalendarIcon } from "@/components/icons/calendar";
import { CakeIcon } from "@/components/icons/cake";
import { MaleIcon, FemaleIcon } from "@/components/icons/gender";
import { ChevronLeftIcon } from "@/components/icons/chevron";
import Image from "next/image";
import { useState } from "react";

export default function DogStatsPage() {
  const router = useRouter();
  const params = useParams();
  const dogId = Number(params.dogId);

  const {
    data: statsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dogStats", dogId],
    queryFn: () => trainerUserApi.getDogStats(dogId),
    enabled: !!dogId,
  });

  if (isLoading) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex items-center justify-center">
        <p className="text-(--mt-gray)">로딩 중...</p>
      </div>
    );
  }

  if (error || !statsData) {
    return (
      <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col items-center justify-center gap-4">
        <p className="text-(--mt-gray)">반려견 정보를 불러올 수 없습니다.</p>
        <button
          onClick={() => router.back()}
          className="py-2 px-6 bg-(--mt-blue-point) text-(--mt-white) rounded-xl font-bold"
        >
          돌아가기
        </button>
      </div>
    );
  }

  const { dog, counselings, stats, trainingApplications, multiCourses } =
    statsData;

  // 전체 출석률 계산
  const totalAttendanceRate =
    stats.timesApplied > 0
      ? ((stats.attendedCount / stats.timesApplied) * 100).toFixed(1)
      : "0";

  console.log("📊 Dog Stats Data:", {
    stats,
    totalAttendanceRate,
    timesApplied: stats.timesApplied,
    attendedCount: stats.attendedCount,
  });

  return (
    <div className="bg-white w-full h-full m-auto p-6 rounded-md flex flex-col gap-3 overflow-y-auto">
      {/* 반려견 프로필 */}
      <div className="flex flex-col items-center gap-2">
        {dog.profileImage && dog.profileImage.trim() ? (
          <div className="relative size-30 rounded-full overflow-hidden">
            <Image
              src={dog.profileImage}
              alt={dog.name}
              fill
              sizes="120px"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center relative size-30 rounded-full overflow-hidden"
            style={{
              backgroundColor: `hsl(${(dog.dogId * 137.5) % 360}, 70%, 80%)`,
            }}
          >
            <DogIcon className="size-16 text-white" />
          </div>
        )}
        <h2 className="font-bold text-2xl text-(--mt-black)">{dog.name}</h2>
      </div>

      {/* 반려견 정보 */}
      <div className="flex flex-col gap-3 [&>div>span]:border [&>div>span]:border-(--mt-gray-light) [&>div>span]:p-2 [&>div>span]:rounded-md [&>div>h3]:font-bold [&>div>h3]:text-(--mt-black)">
        <div className="flex flex-col gap-2">
          <h3>견종</h3>
          <span>{dog.breed}</span>

          <h3>나이</h3>
          <span>{dog.age}살</span>

          <h3>성별</h3>
          <span>{dog.gender === "MALE" ? "남" : "여"}</span>

          <h3>체중</h3>
          <span>{dog.weight}kg</span>

          <h3>중성화</h3>
          <span>{dog.neutered ? "완료" : "미완료"}</span>
        </div>
      </div>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        <StatCard label="총 신청" value={`${stats.timesApplied}회`} />
        <StatCard label="총 출석" value={`${stats.attendedCount}회`} />
        <StatCard label="출석률" value={`${totalAttendanceRate}%`} highlight />
      </div>

      {/* 상담 기록 */}
      {counselings && counselings.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-(--mt-black)">상담 기록</h3>
          <div className="space-y-2">
            {counselings.map((counseling) => (
              <div
                key={counseling.counselingId}
                className="border border-(--mt-gray-light) p-3 rounded-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      counseling.isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {counseling.isCompleted ? "완료" : "진행중"}
                  </span>
                  <span className="text-xs text-(--mt-gray)">
                    {new Date(counseling.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">
                  {counseling.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 단회차 훈련 */}
      {trainingApplications && trainingApplications.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-(--mt-black)">단회차 훈련 이력</h3>
          <div className="space-y-2">
            {trainingApplications.map((training) => (
              <div
                key={training.sessionId}
                className="border border-(--mt-gray-light) rounded-xl p-3"
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-base font-bold text-(--mt-black)">
                    {training.courseTitle}
                  </h4>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {training.tags}
                  </span>
                </div>
                <p className="text-sm text-(--mt-gray) mb-2">
                  {training.courseDescription}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-(--mt-gray)">
                  <CalendarIcon className="size-4" />
                  <span>
                    {training.sessionDate}{" "}
                    {training.sessionStartTime.slice(0, 5)} ~{" "}
                    {training.sessionEndTime.slice(0, 5)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 다회차 훈련 (태그별) */}
      {multiCourses && multiCourses.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-(--mt-black)">다회차 훈련 이력</h3>
          <div className="space-y-4">
            {multiCourses.map((category) => (
              <div key={category.tags}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-(--mt-blue-point) to-blue-600 text-white rounded-full text-sm font-bold">
                    {category.tags}
                  </span>
                  <span className="text-xs text-(--mt-gray)">
                    {category.courses.length}개 코스
                  </span>
                </div>
                <div className="space-y-3">
                  {category.courses.map((course) => (
                    <MultiCourseCard key={course.courseId} course={course} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 돌아가기 버튼 */}
      <button
        onClick={() => router.back()}
        className="border border-(--mt-gray-light) text-(--mt-gray) py-3 rounded-xl font-bold mt-2"
      >
        돌아가기
      </button>
    </div>
  );
}

// 다회차 코스 카드 컴포넌트
function MultiCourseCard({
  course,
}: {
  course: import("@/types/trainer/trainerUserType").IMultiCourseGroupResponse;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return "bg-green-100 text-green-700";
      case "INTERMEDIATE":
        return "bg-yellow-100 text-yellow-700";
      case "ADVANCED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "BEGINNER":
        return "초급";
      case "INTERMEDIATE":
        return "중급";
      case "ADVANCED":
        return "고급";
      default:
        return difficulty;
    }
  };

  const getAttendanceStatusColor = (status: string | null) => {
    if (status === "ATTENDED") return "bg-green-500";
    if (status === "ABSENT") return "bg-red-500";
    return "bg-gray-300";
  };

  const getAttendanceStatusLabel = (status: string | null) => {
    if (status === "ATTENDED") return "출석";
    if (status === "ABSENT") return "결석";
    return "예정";
  };

  return (
    <div className="border border-(--mt-gray-light) rounded-xl overflow-hidden">
      {/* 코스 헤더 */}
      <div
        className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-base font-bold text-(--mt-black)">
                {course.title}
              </h4>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                  course.difficulty
                )}`}
              >
                {getDifficultyLabel(course.difficulty)}
              </span>
            </div>
            <p className="text-sm text-(--mt-gray) mb-2">
              {course.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-(--mt-gray)">
              <span>📍 {course.location}</span>
              <span>
                {course.attendedSessions} / {course.totalSessions} 세션
              </span>
              <span className="font-bold text-(--mt-blue-point)">
                {course.attendanceRate.toFixed(1)}%
              </span>
            </div>
          </div>
          <button className="text-xl ml-2">{isExpanded ? "🔼" : "🔽"}</button>
        </div>

        {/* 출석률 프로그레스 바 */}
        <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-(--mt-blue-point) to-blue-600 h-full transition-all duration-300"
            style={{ width: `${course.attendanceRate}%` }}
          />
        </div>
      </div>

      {/* 세션 상세 (펼쳤을 때만 표시) */}
      {isExpanded && course.sessions && course.sessions.length > 0 && (
        <div className="p-4 bg-white space-y-3">
          <h5 className="font-semibold text-(--mt-black) mb-2">세션 상세</h5>
          {course.sessions.map((session, index) => (
            <div key={session.sessionId} className="flex items-start gap-3">
              {/* 타임라인 점 */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 rounded-full ${getAttendanceStatusColor(
                    session.attendanceStatus
                  )}`}
                />
                {index < course.sessions.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200" />
                )}
              </div>

              {/* 세션 정보 */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-(--mt-black)">
                    {session.sessionNo}회차
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      session.attendanceStatus === "ATTENDED"
                        ? "bg-green-100 text-green-700"
                        : session.attendanceStatus === "ABSENT"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {getAttendanceStatusLabel(session.attendanceStatus)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-(--mt-gray)">
                  <CalendarIcon className="size-3" />
                  <span>
                    {session.sessionDate} {session.startTime.slice(0, 5)} ~{" "}
                    {session.endTime.slice(0, 5)}
                  </span>
                </div>
                <p className="text-xs text-(--mt-gray) mt-1">
                  {session.locationDetail}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 통계 카드 컴포넌트
function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        highlight
          ? "bg-gradient-to-br from-(--mt-blue-point) to-blue-600 text-white"
          : "border border-(--mt-gray-light)"
      }`}
    >
      <p
        className={`text-xs mb-1.5 ${
          highlight ? "text-blue-100" : "text-(--mt-gray)"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-xl font-bold ${
          highlight ? "text-white" : "text-(--mt-black)"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
