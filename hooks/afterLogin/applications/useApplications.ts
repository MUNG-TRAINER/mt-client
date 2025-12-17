"use client";

import {useState} from "react";
import {ApplicationType} from "@/types/applications/applicationsType";

export const useApplications = (initialData: ApplicationType[]) => {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">(
    "pending"
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [applications, setApplications] =
    useState<ApplicationType[]>(initialData);

  const pendingApplications = applications.filter(
    (app) =>
      app.applicationStatus === "APPLIED" || app.applicationStatus === "WAITING"
  );

  const completedApplications = applications.filter(
    (app) =>
      app.applicationStatus === "ACCEPT" ||
      app.applicationStatus === "REJECTED" ||
      app.applicationStatus === "CANCELLED"
  );

  const applicationsToShow =
    activeTab === "pending" ? pendingApplications : completedApplications;

  const toggleSelect = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const handleAction = async () => {
    if (activeTab !== "pending") {
      console.log("결제하기 클릭");
      return;
    }

    if (selectedIds.length === 0) {
      alert("취소할 신청을 선택해주세요.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/application`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({applicationId: selectedIds}),
        }
      );

      if (!res.ok) throw new Error();

      alert("신청이 정상적으로 취소되었습니다.");

      setApplications((prev) =>
        prev.filter((app) => !selectedIds.includes(app.applicationId))
      );
      setSelectedIds([]);
    } catch (e) {
      console.error("신청 취소 실패:", e);
      alert("신청 취소에 실패했습니다.");
    }
  };

  return {
    activeTab,
    setActiveTab,
    applicationsToShow,
    selectedIds,
    toggleSelect,
    handleAction,
  };
};
