"use client";

import type { GroupedApplication } from "@/types/applications/applicationType";
import { ApplicationListItem } from "./ApplicationListItem";

interface ApplicationListProps {
  applications: GroupedApplication[];
  selectedItems: Set<string>;
  onToggle: (courseId: number, dogId: number) => void;
  onCardClick: (application: GroupedApplication) => void;
}

export const ApplicationList = ({
  applications,
  selectedItems,
  onToggle,
  onCardClick,
}: ApplicationListProps) => {
  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <div className="text-base">승인 대기 중인 신청이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="space-y-3 h-full">
      {applications.map((application) => {
        const key = `${application.courseId}-${application.dogId}`;
        return (
          <ApplicationListItem
            key={key}
            application={application}
            isSelected={selectedItems.has(key)}
            onToggle={onToggle}
            onCardClick={onCardClick}
          />
        );
      })}
    </div>
  );
};
