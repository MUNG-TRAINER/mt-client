import Image from "next/image";
import {ICourseType} from "@/types/course/courseType";
import {InfoIcon, WarningIcon} from "@/components/icons/courseInfoIcons";

export default function CourseIntroSection({course}: {course: ICourseType}) {
  return (
    <div className="space-y-4">
      {course.description && (
        <div className="flex items-start gap-3">
          <div>
            <h3 className="text-lg font-bold text-(--mt-black) mb-1">
              과정 소개
            </h3>
            <p className="text-sm text-(--mt-gray) whitespace-pre-line">
              {course.description}
            </p>
          </div>
        </div>
      )}

      {course.detailImage && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-(--mt-gray-light)">
          <Image
            src={course.detailImage}
            alt={`${course.title} 상세 이미지`}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <WarningIcon className="size-5 text-yellow-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-yellow-800 mb-2">주의사항</h3>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>
                • 수업 시 다른 강아지를 만지면 물거나 공격할 수 있으니
                주의해주세요.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {course.refundPolicy && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <InfoIcon className="size-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-blue-800 mb-2">환불 정책</h3>
              <div className="text-sm text-blue-700 whitespace-pre-line">
                {course.refundPolicy}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
