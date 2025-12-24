import { CalendarIcon } from "@/components/icons/calendar";
import { CheckCircleIcon } from "@/components/icons/check";
import { StarIcon } from "@/components/icons/start";
import { StatCard } from "../common/StatCard";
import type { IDogStatsResponse } from "@/types/trainer/trainerUserType";

interface DogStatsCardsProps {
  stats: IDogStatsResponse["stats"];
}

export function DogStatsCards({ stats }: DogStatsCardsProps) {
  const totalAttendanceRate =
    stats.timesApplied > 0
      ? ((stats.attendedCount / stats.timesApplied) * 100).toFixed(1)
      : "0";

  return (
    <div className="grid grid-cols-3 gap-3 mt-2">
      <StatCard
        label="총 신청"
        value={`${stats.timesApplied}회`}
        icon={<CalendarIcon className="size-6" />}
      />
      <StatCard
        label="총 출석"
        value={`${stats.attendedCount}회`}
        icon={<CheckCircleIcon className="size-6" />}
      />
      <StatCard
        label="출석률"
        value={`${totalAttendanceRate}%`}
        icon={<StarIcon className="size-6" />}
        highlight
      />
    </div>
  );
}
