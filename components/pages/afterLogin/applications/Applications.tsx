"use client";

import React, {useState} from "react";
import ApplicationCard from "./ApplicationCard";
import {ApplicationType} from "@/types/applications/applicationsType";

interface ApplicationsProps {
  initialData: ApplicationType[];
}

const Applications: React.FC<ApplicationsProps> = ({initialData}) => {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">(
    "pending"
  );

  const pendingApplications = initialData.filter(
    (app) =>
      app.applicationStatus === "APPLIED" || app.applicationStatus === "WAITING"
  );

  const completedApplications = initialData.filter(
    (app) =>
      app.applicationStatus === "ACCEPT" || app.applicationStatus === "REJECTED"
  );

  const applicationsToShow =
    activeTab === "pending" ? pendingApplications : completedApplications;

  return (
    <div className="flex flex-col w-full h-full gap-3">
      {/* 탭 */}
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("pending")}
          className={`w-1/2 py-2 font-semibold ${
            activeTab === "pending"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          승인 전
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`w-1/2 py-2 font-semibold ${
            activeTab === "completed"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          승인 결과
        </button>
      </div>

      {/* 카드 */}
      <ul className="flex flex-col gap-4">
        {applicationsToShow.map((app) => (
          <ApplicationCard key={app.applicationId} app={app} />
        ))}
      </ul>
    </div>
  );
};

export default Applications;
