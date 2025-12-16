"use client";

import {useEffect, useState} from "react";
import {ApplicationType} from "@/types/applications/applicationsType";
import Applications from "@/components/pages/afterLogin/applications/Applications";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/application/list", {
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
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (!applications.length) return <div>신청 내역이 없습니다.</div>;

  return <Applications initialData={applications} />;
};

export default ApplicationsPage;
