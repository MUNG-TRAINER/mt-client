"use client";

import type { PendingApplication } from "@/types/applications/applicationType";
import { ApplicationListItem } from "./ApplicationListItem";

interface ApplicationListProps {
  applications: PendingApplication[];
  selectedIds: number[];
  onToggle: (applicationId: number) => void;
  onCardClick: (application: PendingApplication) => void;
}

export const ApplicationList = ({
  applications,
  selectedIds,
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
      {applications.map((application) => (
        <ApplicationListItem
          key={application.applicationId}
          application={application}
          isSelected={selectedIds.includes(application.applicationId)}
          onToggle={onToggle}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};
