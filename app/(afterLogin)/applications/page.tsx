"use client";

import {useEffect, useState} from "react";
import {ApplicationType} from "@/types/applications/applicationsType";
import Applications from "@/components/pages/afterLogin/applications/Applications";
import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";
const ApplicationsPage = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/application/list`, {
      method: "GET",
      credentials: "include", // 쿠키/세션 포함
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch applications");
        return res.json();
      })
      .then((data) => setApplications(data))
      .catch((err) => {
        console.error(err);
        alert("신청 내역을 불러오는 데 실패했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner message="신청 내역을 불러오는 중..." size="md" />;

  if (!applications.length)
    return (
      <div className=" w-full block text-align-center flex flex-col items-center justify-center h-[70vh] gap-4">
        <p className="text-gray-500 font-medium">신청 내역이 없습니다.</p>
      </div>
    );

  return <Applications initialData={applications} />;
};

export default ApplicationsPage;
