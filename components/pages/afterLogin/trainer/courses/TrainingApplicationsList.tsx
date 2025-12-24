import { CalendarIcon } from "@/components/icons/calendar";
import { getDifficultyBadgeConfig } from "@/util/course/difficultyUtils";
import type { IDogStatsResponse } from "@/types/trainer/trainerUserType";

interface TrainingApplicationsListProps {
  trainingApplications: IDogStatsResponse["trainingApplications"];
}

export function TrainingApplicationsList({
  trainingApplications,
}: TrainingApplicationsListProps) {
  if (!trainingApplications || trainingApplications.length === 0) {
    return null;
  }

  const getDifficultyBadge = (difficulty: string | undefined) => {
    const config = getDifficultyBadgeConfig(difficulty);
    if (!config) return null;

    const { label, color } = config;

    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${color}`}
      >
        {label}
      </span>
    );
  };

  const getAttendanceStatusBadge = (status: string | null | undefined) => {
    if (status === "ATTENDED") {
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          출석
        </span>
      );
    }
    if (status === "ABSENT") {
      return (
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          결석
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
        예정
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-(--mt-black)">단회차 훈련 이력</h3>
      <div className="space-y-2">
        {trainingApplications.map((training) => {
          return (
            <div
              key={training.sessionId}
              className="border border-(--mt-gray-light) rounded-xl p-3"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <h4 className="text-base font-bold text-(--mt-black) mb-1.5">
                    {training.courseTitle}
                  </h4>
                  {getDifficultyBadge(training.difficulty)}
                </div>
                <div className="ml-2">
                  {getAttendanceStatusBadge(training.attendanceStatus)}
                </div>
              </div>
              <p className="text-sm text-(--mt-gray) mb-2">
                {training.courseDescription}
              </p>
              <div className="flex items-center gap-1.5 text-sm text-(--mt-gray)">
                <CalendarIcon className="size-4" />
                <span>
                  {training.sessionDate} {training.sessionStartTime.slice(0, 5)}{" "}
                  ~ {training.sessionEndTime.slice(0, 5)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
