import TagBadges from "@/components/shared/badges/TagBadges";
import {
  CalendarIcon,
  CheckBadgeIcon,
  DocumentIcon,
  LocationIcon,
  MoneyIcon,
} from "@/components/icons/courseInfoIcons";
import { ICourseBasicsSectionProps } from "@/types/course/courseType";
import { getDogSizeLabel } from "@/util/course/courseMappings";

export default function CourseBasicsSection({
  course,
  totalSessions,
  schedule,
  firstSessionPrice,
  sessionCount,
}: ICourseBasicsSectionProps) {
  const dogSize = getDogSizeLabel(course.dogSize);
  return (
    <div className="space-y-6">
      <InfoRow
        icon={<MoneyIcon className="size-5 text-(--mt-gray)" />}
        title="수강료"
        content={
          <p className="text-lg font-bold text-(--mt-blue-point)">
            {((firstSessionPrice || 0) * sessionCount).toLocaleString()}원
          </p>
        }
      />

      <InfoRow
        icon={<CheckBadgeIcon className="size-5 text-(--mt-gray) mt-0.5" />}
        title="적합 견종"
        content={
          <div className="flex flex-wrap gap-2">
            {dogSize.map((size, idx) => (
              <TagBadges
                key={idx}
                txt={size}
                classNames="text-sm font-bold text-(--mt-green-point) bg-(--mt-green-smoke)"
              />
            ))}
          </div>
        }
      />

      <InfoRow
        icon={<CalendarIcon className="size-5 text-(--mt-gray) mt-0.5" />}
        title="수강 회차"
        content={
          <p className="text-sm text-(--mt-gray)">
            {totalSessions}회차 과정 ({schedule})
          </p>
        }
      />

      <InfoRow
        icon={<LocationIcon className="size-5 text-(--mt-gray) mt-0.5" />}
        title="강의 장소"
        content={<p className="text-sm text-(--mt-gray)">{course.location}</p>}
      />

      {course.items && (
        <InfoRow
          icon={<DocumentIcon className="size-5 text-(--mt-gray) mt-0.5" />}
          title="기타 문의"
          content={
            <p className="text-sm text-(--mt-gray) whitespace-pre-line">
              {course.items}
            </p>
          }
          hasDivider={false}
        />
      )}
    </div>
  );
}

function InfoRow({
  icon,
  title,
  content,
  hasDivider = true,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  hasDivider?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 pb-4 ${
        hasDivider ? "border-b border-(--mt-gray-light)" : ""
      }`}
    >
      <div className="mt-0.5">{icon}</div>
      <div>
        <h3 className="text-sm font-bold text-(--mt-black) mb-1">{title}</h3>
        {content}
      </div>
    </div>
  );
}
