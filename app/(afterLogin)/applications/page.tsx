"use client";

import {useEffect, useState} from "react";
import {ApplicationType} from "@/types/applications/applicationsType";
import Applications from "@/components/pages/afterLogin/applications/Applications";

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

  // if (loading) return <div>로딩중...</div>;
  // if (!applications.length) return <div>신청 내역이 없습니다.</div>;
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4 w-full block text-align-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-500 font-medium">신청 내역을 불러오는 중...</p>
      </div>
    );

  if (!applications.length)
    return (
      <div className=" w-full block text-align-center flex flex-col items-center justify-center h-[70vh] gap-4">
        <p className="text-gray-500 font-medium">신청 내역이 없습니다.</p>
      </div>
    );

  return <Applications initialData={applications} />;
};

export default ApplicationsPage;
