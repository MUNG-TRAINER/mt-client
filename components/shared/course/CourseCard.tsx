"use client";

import Image from "next/image";
import {
  CourseItem,
  LESSON_FORM_LABEL,
  TYPE_LABEL,
} from "@/types/course/courseType";
import { CalendarIcon } from "@/components/icons/calendar";
import { ClockIcon } from "@/components/icons/courseInfoIcons";
import { MapPinIcon } from "@/components/icons/location";
import { UserIcon } from "@/components/icons/user";

interface CourseCardProps {
  course: CourseItem;
  onReserve?: (courseId: number) => void;
}

export const CourseCard = ({ course, onReserve }: CourseCardProps) => {
  const handleReserve = () => {
    onReserve?.(course.courseId);
  };

  // 날짜 포맷팅 헬퍼 함수
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // 태그 파싱
  const tags = course.tags
    ? course.tags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      {/* 이미지 섹션 */}
      <div className="relative w-full h-44 bg-gray-200">
        {course.mainImage ? (
          <Image
            src={course.mainImage}
            alt={course.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 컨텐츠 섹션 */}
      <div className="p-4 space-y-2.5">
        {/* 뱃지 */}
        <div className="flex gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-md font-semibold">
            {TYPE_LABEL[course.type]}
          </span>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-md">
            {LESSON_FORM_LABEL[course.lessonForm]}
          </span>
          <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-md">
            {course.difficulty}
          </span>
          <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-md">
            {course.dogSize}
          </span>
          {course.isFree && (
            <span className="px-2 py-0.5 bg-yellow-50 text-yellow-600 text-xs rounded-md font-semibold">
              무료
            </span>
          )}
        </div>

        {/* 태그 */}
        {tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {tags.slice(0, 5).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 제목 */}
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-gray-900 line-clamp-1 flex-1">
            {course.title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 shrink-0">
            <span>{TYPE_LABEL[course.type]}</span>
            {course.session && (
              <>
                <span>·</span>
                <span>{course.session.maxStudents}명</span>
              </>
            )}
          </div>
        </div>

        {/* 정보 */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <UserIcon className="w-3.5 h-3.5" />
            <span>{course.trainerName}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <MapPinIcon className="w-3.5 h-3.5" />
            <span className="line-clamp-1">
              {course.location}
              {course.session?.locationDetail &&
                ` · ${course.session.locationDetail}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{course.schedule}</span>
            {course.session && (
              <>
                <span className="mx-2">·</span>
                <ClockIcon className="w-3.5 h-3.5" />
                <span>
                  {formatTime(course.session.startTime)} ~{" "}
                  {formatTime(course.session.endTime)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* 가격 및 버튼 */}
        <div className="flex items-end justify-between pt-2 border-t border-gray-100">
          {course.session ? (
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">참가비</p>
              <p className="text-lg font-bold text-gray-900">
                <span className="text-sm text-gray-500 font-medium mr-1">
                  회당
                </span>
                {course.session.price.toLocaleString()}
                <span className="text-sm">원~</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-500">가격 미정</p>
            </div>
          )}
          {course.status === "CANCELLED" ? (
            <button
              disabled
              className="px-6 py-2.5 text-sm font-bold rounded-xl bg-gray-300 text-gray-500 cursor-not-allowed whitespace-nowrap"
            >
              취소됨
            </button>
          ) : course.status === "DONE" ? (
            <button
              disabled
              className="px-6 py-2.5 text-sm font-bold rounded-xl bg-gray-300 text-gray-500 cursor-not-allowed whitespace-nowrap"
            >
              완료됨
            </button>
          ) : !course.session ? (
            <button
              disabled
              className="px-6 py-2.5 text-sm font-bold rounded-xl bg-gray-300 text-gray-500 cursor-not-allowed whitespace-nowrap"
            >
              신청불가
            </button>
          ) : (
            <button
              onClick={handleReserve}
              className="px-6 py-2.5 text-sm font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              신청하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
