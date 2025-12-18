"use client";

import Applications from "@/components/pages/afterLogin/applications/Applications";
import {useApplications} from "@/hooks/afterLogin/applications/useApplications";

const ApplicationsPage = () => {
  const {applicationsToShow, isPending} = useApplications();

  if (isPending)
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4 w-full block text-align-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-500 font-medium">신청 내역을 불러오는 중...</p>
      </div>
    );

  if (!applicationsToShow.length)
    return (
      <div className=" w-full block text-align-center flex flex-col items-center justify-center h-[70vh] gap-4">
        <p className="text-gray-500 font-medium">신청 내역이 없습니다.</p>
      </div>
    );

  return <Applications />;
};

export default ApplicationsPage;
