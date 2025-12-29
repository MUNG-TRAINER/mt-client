"use client";

import React, { useState } from "react";
import ApplicationCard from "./ApplicationCard";
import ApplicationsTabs from "./ApplicationTabs";
import ApplicationsActionButton from "./ActionButton";
import { useApplications } from "@/hooks/afterLogin/applications/useApplications";
import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";

const Applications = () => {
  const { applicationsToShow, selectedIndex, isPending } = useApplications();
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState<string | null>(null);

  const openRejectModal = (reason?: string | null) => {
    setRejectReason(reason ?? null);
    setRejectModalOpen(true);
  };

  if (isPending) {
    return <LoadingSpinner message="신청 내역을 불러오는 중..." size="md" />;
  }

  return (
    <div className="relative flex flex-col w-full h-full bg-white ">
      <ApplicationsTabs />
      {applicationsToShow.length < 1 ? (
        <div className=" w-full text-align-center flex flex-col items-center justify-center h-[70vh] gap-4">
          <p className="text-gray-500 font-medium">신청 내역이 없습니다.</p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto flex flex-col gap-4 p-5">
          {applicationsToShow.map((app) => (
            <ApplicationCard
              key={app.applicationId}
              app={app}
              isSelected={selectedIndex.includes(app.applicationId)}
              onOpenRejectModal={openRejectModal}
            />
          ))}
        </ul>
      )}

      <ApplicationsActionButton applications={applicationsToShow} />
      {rejectModalOpen && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setRejectModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-80 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">거절 사유</h3>
            <p className="text-sm text-gray-700 bg-blue-100 p-4">
              {rejectReason?.trim() || "사유 없음"}
            </p>
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setRejectModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
