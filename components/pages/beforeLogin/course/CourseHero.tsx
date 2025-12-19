import Image from "next/image";
import { ICourseHeroProps } from "@/types/course/courseType";
import {
  BoltIcon,
  CheckBadgeIcon,
  ClockIcon,
  PhotoIcon,
  UsersIcon,
} from "@/components/icons/courseInfoIcons";

export default function CourseHero({
  course,
  durationMinutes,
  maxStudents,
  lessonFormLabel,
  difficultyLabel,
}: ICourseHeroProps) {
  return (
    <>
      {course.mainImage ? (
        <div className="relative w-full h-64 bg-(--mt-gray-light)">
          <Image
            src={course.mainImage}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-64 bg-(--mt-gray-light) flex flex-col items-center justify-center">
          <PhotoIcon />
          <p className="text-sm text-(--mt-gray) mt-2">콘텐츠 프로그램 배너</p>
        </div>
      )}

      <div className="pt-5 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 space-y-3">
            <h1 className="text-xl font-bold text-(--mt-black)">
              {course.title}
            </h1>

            <div className="grid grid-cols-4 gap-4">
              <InfoBadge
                icon={<ClockIcon />}
                label="소요"
                value={`${durationMinutes}분`}
              />
              <InfoBadge
                icon={<UsersIcon />}
                label="정원"
                value={`${maxStudents}명`}
              />
              <InfoBadge
                icon={<CheckBadgeIcon />}
                label="형태"
                value={lessonFormLabel}
              />
              <InfoBadge
                icon={<BoltIcon />}
                label="난이도"
                value={difficultyLabel}
              />
            </div>
          </div>

          <span
            className={`px-4 py-1 rounded-md font-bold text-sm whitespace-nowrap ${
              course.isFree
                ? "bg-(--mt-blue-light) text-(--mt-blue-point)"
                : "bg-(--mt-green-smoke) text-(--mt-green-point)"
            }`}
          >
            {course.isFree ? "무료" : "유료"}
          </span>
        </div>
      </div>
    </>
  );
}

function InfoBadge({
  icon,
  label,
  value,
  badgeClassName,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  badgeClassName?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={badgeClassName ? badgeClassName : undefined}>{icon}</div>
      <div className="text-center">
        <p className="text-xs text-(--mt-gray) leading-tight">{label}</p>
        <p className="text-sm font-bold text-(--mt-black)">{value}</p>
      </div>
    </div>
  );
}
