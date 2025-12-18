"use client";

import Image from "next/image";
import {
  CourseItem,
  DIFFICULTY_LABEL,
  LESSON_FORM_LABEL,
} from "@/types/course/courseType";
import RoundboxColorBtn from "@/components/shared/buttons/RoundboxColorBtn";
import { CalendarIcon } from "@/components/icons/calendar";
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

  // 태그를 배열로 변환
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
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-md">
            {LESSON_FORM_LABEL[course.lessonForm]}
          </span>
          <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-md">
            {DIFFICULTY_LABEL[course.difficulty]}
          </span>
          {tags.length > 0 &&
            tags.slice(0, 1).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* 제목 */}
        <h3 className="text-base font-bold text-gray-900 line-clamp-1">
          {course.title}
        </h3>

        {/* 정보 */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <UserIcon className="w-3.5 h-3.5" />
            <span>{course.trainerName}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <MapPinIcon className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{course.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>매주 토요일 오전 10:00</span>
          </div>
        </div>

        {/* 가격 및 버튼 */}
        <div className="flex items-end justify-between pt-2 border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-500 mb-0.5">참가비</p>
            <p className="text-lg font-bold text-gray-900">
              <span className="text-sm text-gray-500 font-medium mr-1">
                회당
              </span>
              {course.price.toLocaleString()}
              <span className="text-sm">원~</span>
            </p>
          </div>
          <button
            onClick={handleReserve}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
};
